import type { SyncableArticle } from './outrank-sync';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';

export type DutchTranslation = {
  title: string;
  description: string;
  body: string;
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

function parseJsonObject(text: string) {
  const trimmed = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  return JSON.parse(trimmed) as Partial<DutchTranslation>;
}

export async function translateArticleToDutch(article: SyncableArticle): Promise<DutchTranslation> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY is not set');

  const source = article.content_markdown?.trim() || article.html?.trim() || '';
  if (!source) throw new Error(`Article ${article.slug} has no markdown or HTML to translate`);

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

  const payload = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
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

export function formatDutchPost(article: SyncableArticle, translation: DutchTranslation) {
  const image = article.image_url && !translation.body.startsWith('![')
    ? `![${translation.title}](${article.image_url})\n\n`
    : '';

  return `---
title: ${yamlQuote(translation.title)}
description: ${yamlQuote(translation.description)}
date: ${yamlQuote(toDate(article.created_at))}
author: ${yamlQuote('Bizonbyte Team')}
---

${image}${translation.body}
`;
}
