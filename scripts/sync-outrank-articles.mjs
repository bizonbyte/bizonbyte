import fs from 'fs';
import path from 'path';
import { BlogClient } from 'outrank-next-js-blog';

const ROOT = process.cwd();
const ENGLISH_POSTS_DIR = path.join(ROOT, 'posts', 'en');
const OUTRANK_API_BASE_URL = 'https://outrank.so';

function loadEnvFiles() {
  for (const relative of ['.env.local', '.env']) {
    const filePath = path.join(ROOT, relative);
    if (!fs.existsSync(filePath)) continue;
    for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
    }
  }
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function toDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

function articleFamily(slug) {
  return slug.replace(/-\d+$/, '');
}

function dedupeLatest(articles) {
  const kept = new Map();
  for (const article of articles) {
    const family = articleFamily(article.slug);
    const current = kept.get(family);
    const articleTime = new Date(article.updated_at || article.created_at).getTime();
    const currentTime = current ? new Date(current.updated_at || current.created_at).getTime() : 0;
    if (!current || articleTime > currentTime) kept.set(family, article);
  }
  return [...kept.values()];
}

function writeEnglishPost(article) {
  const body = article.content_markdown?.trim() || '';
  const image = article.image_url && !body.startsWith('![')
    ? `![${article.title}](${article.image_url})\n\n`
    : '';
  const file = `---
title: ${yamlQuote(article.title)}
description: ${yamlQuote(article.meta_description || '')}
date: ${yamlQuote(toDate(article.created_at))}
author: ${yamlQuote('Bizonbyte Team')}
---

${image}${body}
`;
  const dest = path.join(ENGLISH_POSTS_DIR, `${article.slug}.md`);
  fs.writeFileSync(dest, file, 'utf8');
  const family = articleFamily(article.slug);
  for (const filename of fs.readdirSync(ENGLISH_POSTS_DIR)) {
    if (!filename.endsWith('.md')) continue;
    const slug = filename.replace(/\.md$/, '');
    if (slug !== article.slug && articleFamily(slug) === family) {
      fs.unlinkSync(path.join(ENGLISH_POSTS_DIR, filename));
    }
  }
  return dest;
}

async function main() {
  loadEnvFiles();
  const apiKey = process.env.OUTRANK_BLOG_API_KEY || process.env.OUTRANK_API_KEY;
  if (!apiKey) throw new Error('OUTRANK_BLOG_API_KEY is not set');

  const client = new BlogClient(apiKey, { baseUrl: OUTRANK_API_BASE_URL });
  const latest = dedupeLatest(await client.getAllArticles(100));
  const written = [];

  for (const summary of latest) {
    const article = await client.getArticle(summary.slug);
    if (!article) continue;
    written.push({
      slug: article.slug,
      path: path.relative(ROOT, writeEnglishPost(article)),
    });
  }

  console.log(JSON.stringify({ written, skippedDuplicates: true }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
