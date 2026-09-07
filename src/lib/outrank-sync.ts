export type SyncableArticle = {
  slug: string;
  title: string;
  meta_description?: string;
  content_markdown?: string;
  html?: string;
  image_url?: string;
  tier?: string | number;
  created_at?: string;
  updated_at?: string;
};

export function articleBody(article: SyncableArticle) {
  return stripOutrankCredit(article.content_markdown?.trim() || article.html?.trim() || '');
}

export function stripOutrankCredit(body: string) {
  return body
    .replace(/(?:\r?\n)+\s*(?:\*|_){0,2}\s*(?:Produced|Geproduceerd)\s+via\s+[^\n]*Outrank[^\n]*$/i, '')
    .replace(/(?:\r?\n)+\s*<p>[\s\S]*?Outrank[\s\S]*?<\/p>\s*$/i, '')
    .trim();
}

export function articleFamily(slug: string) {
  return slug.replace(/-\d+$/, '');
}

function yamlQuote(value: string) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function toDate(value?: string) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value.slice(0, 10);
  return parsed.toISOString().slice(0, 10);
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

export function resolveSyncArticle(article: SyncableArticle): SyncableArticle {
  const body = articleBody(article);
  if (!article.slug || !article.title || !body) {
    throw new Error(`Cannot sync Outrank article ${article.slug || '(missing slug, title, or body)'}`);
  }
  return {
    ...article,
    slug: articleFamily(article.slug),
    content_markdown: stripOutrankCredit(article.content_markdown?.trim() || body),
    html: article.html,
  };
}
