import fs from 'fs';
import path from 'path';
import { formatDutchPost, translateArticleToDutch } from './outrank-translate';

const ENGLISH_POSTS_DIR = path.join(process.cwd(), 'posts', 'en');
const DUTCH_POSTS_DIR = path.join(process.cwd(), 'posts');
const GITHUB_REPO = process.env.GITHUB_REPOSITORY || 'bizonbyte/bizonbyte';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

export type SyncableArticle = {
  slug: string;
  title: string;
  meta_description?: string;
  content_markdown?: string;
  html?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
};

function yamlQuote(value: string) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function toDate(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value.slice(0, 10);
  return parsed.toISOString().slice(0, 10);
}

export function articleFamily(slug: string) {
  return slug.replace(/-\d+$/, '');
}

export function articleBody(article: SyncableArticle) {
  return article.content_markdown?.trim() || article.html?.trim() || '';
}

export function formatEnglishPost(article: SyncableArticle) {
  const body = articleBody(article);
  const image = article.image_url && !body.startsWith('![')
    ? `![${article.title}](${article.image_url})\n\n`
    : '';

  return `---
title: ${yamlQuote(article.title)}
description: ${yamlQuote(article.meta_description || '')}
date: ${yamlQuote(toDate(article.created_at))}
author: ${yamlQuote('Bizonbyte Team')}
---

${image}${body}
`;
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return null;
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'bizonbyte-outrank-sync',
  };
}

async function githubFile(relativePath: string) {
  const headers = githubHeaders();
  if (!headers) return null;
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}?ref=${GITHUB_BRANCH}`,
    { headers },
  );
  if (!response.ok) return null;
  return await response.json() as { sha?: string; content?: string; encoding?: string };
}

async function githubContentSha(relativePath: string) {
  const file = await githubFile(relativePath);
  return file?.sha || null;
}

function decodeGithubContent(file: { content?: string; encoding?: string }) {
  if (!file.content) return '';
  return Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf8');
}

async function commitGithubFile(relativePath: string, content: string, message: string) {
  const headers = githubHeaders();
  if (!headers) return false;
  const current = await githubFile(relativePath);
  if (current && decodeGithubContent(current) === content) return false;
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: GITHUB_BRANCH,
      sha: current?.sha || undefined,
    }),
  });
  if (!response.ok) {
    throw new Error(`GitHub commit failed for ${relativePath}: ${await response.text()}`);
  }
  return true;
}

async function deleteGithubFile(relativePath: string, message: string) {
  const headers = githubHeaders();
  if (!headers) return false;
  const sha = await githubContentSha(relativePath);
  if (!sha) return false;
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}`, {
    method: 'DELETE',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, branch: GITHUB_BRANCH, sha }),
  });
  if (!response.ok) {
    throw new Error(`GitHub delete failed for ${relativePath}: ${await response.text()}`);
  }
  return true;
}

function siblingSlugs(directory: string, slug: string) {
  if (!fs.existsSync(directory)) return [];
  const family = articleFamily(slug);
  return fs.readdirSync(directory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''))
    .filter((candidate) => candidate !== slug && articleFamily(candidate) === family);
}

function writeLocalFile(relativePath: string, content: string) {
  const localPath = path.join(process.cwd(), relativePath);
  try {
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    fs.writeFileSync(localPath, content, 'utf8');
  } catch (error) {
    if (process.env.VERCEL) {
      console.warn('Skipping local write on Vercel', error);
    } else {
      throw error;
    }
  }
}

export function resolveSyncArticle(article: SyncableArticle): SyncableArticle {
  const body = articleBody(article);
  if (!article.slug || !article.title || !body) {
    throw new Error(`Cannot sync Outrank article ${article.slug || '(missing slug, title, or body)'}`);
  }
  return {
    ...article,
    content_markdown: article.content_markdown?.trim() || body,
    html: article.html,
  };
}

export async function syncPublishedEnglishArticle(article: SyncableArticle) {
  const source = resolveSyncArticle(article);
  const markdown = formatEnglishPost(source);
  const relativePath = `posts/en/${source.slug}.md`;

  writeLocalFile(relativePath, markdown);

  for (const sibling of siblingSlugs(ENGLISH_POSTS_DIR, source.slug)) {
    const siblingPath = path.join(ENGLISH_POSTS_DIR, `${sibling}.md`);
    if (fs.existsSync(siblingPath)) fs.unlinkSync(siblingPath);
    await deleteGithubFile(`posts/en/${sibling}.md`, `Remove older Outrank draft ${sibling}`);
  }

  const committed = await commitGithubFile(
    relativePath,
    markdown,
    `Sync published Outrank article ${source.slug}`,
  );

  return { slug: source.slug, path: relativePath, committed, source };
}

export async function syncPublishedDutchArticle(article: SyncableArticle) {
  const source = resolveSyncArticle(article);
  let translation;
  try {
    translation = await translateArticleToDutch(source);
  } catch (error) {
    console.error(`Dutch translation failed for ${source.slug}, retrying once`, error);
    translation = await translateArticleToDutch(source);
  }

  const markdown = formatDutchPost(source, translation);
  const relativePath = `posts/${source.slug}.md`;
  writeLocalFile(relativePath, markdown);

  for (const sibling of siblingSlugs(DUTCH_POSTS_DIR, source.slug)) {
    const siblingPath = path.join(DUTCH_POSTS_DIR, `${sibling}.md`);
    if (fs.existsSync(siblingPath)) fs.unlinkSync(siblingPath);
    await deleteGithubFile(`posts/${sibling}.md`, `Remove older Dutch Outrank draft ${sibling}`);
  }

  const committed = await commitGithubFile(
    relativePath,
    markdown,
    `Sync Dutch translation of Outrank article ${source.slug}`,
  );

  return { slug: source.slug, path: relativePath, committed };
}
