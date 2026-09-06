import fs from 'fs';
import path from 'path';
import { BlogClient } from 'outrank-next-js-blog';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, 'posts');
const ENGLISH_POSTS_DIR = path.join(POSTS_DIR, 'en');
const OUTRANK_API_BASE_URL = 'https://outrank.so';
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

function featuredImageMarkdown(article) {
  if (!article.image_url) return '';
  return `![${article.title}](${article.image_url})\n\n`;
}

function parseJsonObject(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(trimmed);
}

async function translateArticle(article, apiKey) {
  const source = article.content_markdown?.trim() || article.html || '';
  if (!source) {
    throw new Error(`Article ${article.slug} has no markdown or HTML to translate`);
  }

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
            'Je vertaalt blogartikelen van het Engels naar professioneel Nederlands (nl-NL) voor Nederlandse bedrijven. Behoud markdown-structuur, koppen, lijsten, links, codeblokken en afbeeldings-URL\'s. Vertaal geen URL\'s, code of bestandspaden. Schrijf alsof een Nederlandstalige consultant het zelf heeft geschreven. Antwoord alleen met JSON: {"title","description","body"}.',
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

function writeDutchPost(article, translation) {
  const image = featuredImageMarkdown(article);
  const body = translation.body.startsWith('![') ? translation.body : `${image}${translation.body}`;
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

  const outrankKey = process.env.OUTRANK_BLOG_API_KEY || process.env.OUTRANK_API_KEY;
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (!outrankKey) throw new Error('OUTRANK_BLOG_API_KEY is not set');
  if (!deepseekKey) throw new Error('DEEPSEEK_API_KEY is not set');

  const force = process.argv.includes('--force');
  const localEnglish = new Set(listMarkdownSlugs(ENGLISH_POSTS_DIR));
  const existingDutch = new Set(listMarkdownSlugs(POSTS_DIR));
  const client = new BlogClient(outrankKey, { baseUrl: OUTRANK_API_BASE_URL });
  const summaries = await client.getAllArticles(100);

  let written = 0;
  let skipped = 0;

  for (const summary of summaries) {
    if (localEnglish.has(summary.slug)) {
      console.log(`skip ${summary.slug} (local English markdown already exists)`);
      skipped += 1;
      continue;
    }

    if (existingDutch.has(summary.slug) && !force) {
      console.log(`skip ${summary.slug} (Dutch file already exists; pass --force to overwrite)`);
      skipped += 1;
      continue;
    }

    const article = await client.getArticle(summary.slug);
    if (!article) {
      console.log(`skip ${summary.slug} (article body missing)`);
      skipped += 1;
      continue;
    }

    console.log(`translate ${summary.slug}`);
    let translation;
    try {
      translation = await translateArticle(article, deepseekKey);
    } catch (error) {
      console.error(`retry ${summary.slug} after ${error instanceof Error ? error.message : error}`);
      translation = await translateArticle(article, deepseekKey);
    }
    writeDutchPost(article, translation);
    written += 1;
  }

  console.log(JSON.stringify({ written, skipped, total: summaries.length }));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
