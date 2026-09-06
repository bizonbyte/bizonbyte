import fs from 'fs';
import path from 'path';
import type { Article } from 'outrank-next-js-blog';
import { getOutrankArticleSource } from './outrank';

const ENGLISH_POSTS_DIR = path.join(process.cwd(), 'posts', 'en');
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

export function formatEnglishPost(article: SyncableArticle) {
  const body = article.content_markdown?.trim() || '';
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

async function githubContentSha(relativePath: string) {
  const headers = githubHeaders();
  if (!headers) return null;
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}?ref=${GITHUB_BRANCH}`,
    { headers },
  );
  if (!response.ok) return null;
  const payload = await response.json() as { sha?: string };
  return payload.sha || null;
}

async function commitGithubFile(relativePath: string, content: string, message: string) {
  const headers = githubHeaders();
  if (!headers) return false;
  const sha = await githubContentSha(relativePath);
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${relativePath}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: GITHUB_BRANCH,
      sha: sha || undefined,
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

function siblingSlugs(slug: string) {
  if (!fs.existsSync(ENGLISH_POSTS_DIR)) return [];
  const family = articleFamily(slug);
  return fs.readdirSync(ENGLISH_POSTS_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, ''))
    .filter((candidate) => candidate !== slug && articleFamily(candidate) === family);
}

export async function resolveSyncArticle(article: SyncableArticle): Promise<Article | SyncableArticle | null> {
  if (article.content_markdown?.trim() || article.html) return article;
  return getOutrankArticleSource(article.slug);
}

export async function syncPublishedEnglishArticle(article: SyncableArticle) {
  const source = await resolveSyncArticle(article);
  if (!source?.slug || !source.title) {
    throw new Error(`Cannot sync Outrank article ${article.slug || '(missing slug)'}`);
  }

  const markdown = formatEnglishPost(source);
  const relativePath = `posts/en/${source.slug}.md`;
  const localPath = path.join(process.cwd(), relativePath);

  fs.mkdirSync(path.dirname(localPath), { recursive: true });
  try {
    fs.writeFileSync(localPath, markdown, 'utf8');
  } catch (error) {
    if (process.env.VERCEL) {
      console.warn('Skipping local write on Vercel', error);
    } else {
      throw error;
    }
  }

  for (const sibling of siblingSlugs(source.slug)) {
    const siblingPath = path.join(ENGLISH_POSTS_DIR, `${sibling}.md`);
    if (fs.existsSync(siblingPath)) fs.unlinkSync(siblingPath);
    await deleteGithubFile(`posts/en/${sibling}.md`, `Remove older Outrank draft ${sibling}`);
  }

  const committed = await commitGithubFile(
    relativePath,
    markdown,
    `Sync published Outrank article ${source.slug}`,
  );

  return { slug: source.slug, path: relativePath, committed };
}
