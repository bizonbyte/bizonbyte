import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'posts');
const ENGLISH_POSTS_DIR = path.join(POSTS_DIR, 'en');
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

function loadEnvFiles() {
  for (const relative of ['.env.local', '.env', path.join('..', '.env')]) {
    const filePath = path.join(ROOT, relative);
    if (!fs.existsSync(filePath)) continue;
    for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

function listMarkdownSlugs(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''));
}

function yamlQuote(value) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function toDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function parseJsonObject(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(trimmed);
}

function readLocalEnglishArticle(slug) {
  const filePath = path.join(ENGLISH_POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const frontmatter = Object.fromEntries(
    match[1].split(/\r?\n/).flatMap((line) => {
      const pair = line.match(/^(\w+):\s*"(.*)"$/);
      return pair ? [[pair[1], pair[2].replace(/\\"/g, '"')]] : [];
    }),
  );
  return {
    slug,
    title: frontmatter.title || slug,
    meta_description: frontmatter.description || '',
    created_at: frontmatter.date,
    content_markdown: match[2].trim(),
  };
}

async function translateArticle(article, apiKey) {
  const source = article.content_markdown?.trim() || '';
  if (!source) throw new Error(`Article ${article.slug} has no markdown to translate`);

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      thinking: { type: 'disabled' },
      response_format: { type: 'json_object' },
      max_tokens: 8192,
      messages: [
        {
          role: 'system',
          content:
            'Je vertaalt blogartikelen van het Engels naar professioneel Nederlands (nl-NL) voor Nederlandse bedrijven. Behoud markdown-structuur, koppen, lijsten, links, codeblokken en afbeeldings-URL\'s. Vertaal geen URL\'s, code of bestandspaden. Behoud afbeeldings-URL\'s byte voor byte, in het bijzonder de URL van de eerste hero-afbeelding. Schrijf alsof een Nederlandstalige consultant het zelf heeft geschreven. Antwoord alleen met JSON: {"title","description","body"}.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            title: article.title,
            description: article.meta_description || '',
            body: source,
          }),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek request failed (${response.status}): ${await response.text()}`);
  }

  const payload = await response.json();
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error('DeepSeek returned an empty translation');

  const translated = parseJsonObject(content);
  if (!translated.title || !translated.body) {
    throw new Error('DeepSeek JSON was missing title or body');
  }

  return {
    title: translated.title.trim(),
    description: (translated.description || article.meta_description || '').trim(),
    body: translated.body.trim(),
  };
}

function preserveHeroImage(article, translation) {
  const imageMatch = article.content_markdown.match(/^!\[[^\]]*\]\(([^)\r\n]+)\)/);
  const body = translation.body.trim();
  if (!imageMatch) return body;

  const hero = `![${translation.title}](${imageMatch[1]})`;
  const translatedHeroPattern = /^!\[[^\]]*\]\([^)\r\n]+\)/;
  if (translatedHeroPattern.test(body)) {
    return body.replace(translatedHeroPattern, hero);
  }
  return `${hero}\n\n${body}`;
}

function writeDutchPost(article, translation) {
  const body = preserveHeroImage(article, translation);
  const file = `---
title: ${yamlQuote(translation.title)}
description: ${yamlQuote(translation.description)}
date: ${yamlQuote(toDate(article.created_at))}
author: ${yamlQuote('Bizonbyte Team')}
---

${body}
`;
  fs.writeFileSync(path.join(POSTS_DIR, `${article.slug}.md`), file, 'utf8');
}

async function main() {
  loadEnvFiles();

  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (!deepseekKey) throw new Error('DEEPSEEK_API_KEY is not set');

  const force = process.argv.includes('--force');
  const onlySlug = process.argv.find((arg) => arg.startsWith('--slug='))?.slice('--slug='.length);
  const existingDutch = new Set(listMarkdownSlugs(POSTS_DIR));
  const slugs = onlySlug ? [onlySlug] : listMarkdownSlugs(ENGLISH_POSTS_DIR);

  let written = 0;
  let skipped = 0;

  for (const slug of slugs) {
    if (existingDutch.has(slug) && !force) {
      console.log(`skip ${slug} (Dutch file already exists; pass --force to overwrite)`);
      skipped += 1;
      continue;
    }

    const article = readLocalEnglishArticle(slug);
    if (!article) {
      console.log(`skip ${slug} (local English markdown missing)`);
      skipped += 1;
      continue;
    }

    console.log(`translate ${slug}`);
    let translation;
    try {
      translation = await translateArticle(article, deepseekKey);
    } catch (error) {
      console.error(`retry ${slug} after ${error instanceof Error ? error.message : error}`);
      translation = await translateArticle(article, deepseekKey);
    }
    writeDutchPost(article, translation);
    written += 1;
  }

  console.log(JSON.stringify({ written, skipped, total: slugs.length }));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
