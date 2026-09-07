import crypto from 'crypto';
import type { SyncableArticle } from './outrank-sync';

const DEFAULT_ARTY_REPOSITORY = 'dariomory/arty-bot';
const DEFAULT_TARGET_REPOSITORY = 'bizonbyte/bizonbyte';

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'bizonbyte-outrank-dispatch',
    'Content-Type': 'application/json',
  };
}

function requestId(article: SyncableArticle, markdown: string) {
  return crypto
    .createHash('sha256')
    .update(`${article.slug}\n${article.updated_at || article.created_at || ''}\n${markdown}`)
    .digest('hex')
    .slice(0, 24);
}

function configuredTier(article: SyncableArticle) {
  return String(article.tier ?? process.env.OUTRANK_TIER ?? '2').trim() || '2';
}

export async function dispatchOutrankArticle(article: SyncableArticle, markdown: string) {
  const token = process.env.ARTY_DISPATCH_PAT || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) throw new Error('ARTY_DISPATCH_PAT is not set');

  const targetRepository = process.env.OUTRANK_TARGET_REPOSITORY || DEFAULT_TARGET_REPOSITORY;
  const id = requestId(article, markdown);
  const payload = {
    event_type: 'bizonbyte_article_final_pass',
    client_payload: {
      request_id: id,
      source: 'bizonbyte-outrank',
      target_repo: targetRepository,
      target_branch: 'main',
      target_path: `posts/en/${article.slug}.md`,
      slug: article.slug,
      title: article.title,
      target_domain: (process.env.OUTRANK_TARGET_DOMAIN || 'bizonbyte.nl').trim(),
      tier: configuredTier(article),
      language: 'English',
      source_updated_at: article.updated_at || article.created_at || '',
      article_markdown_base64: Buffer.from(markdown, 'utf8').toString('base64'),
    },
  };

  const repository = process.env.ARTY_BOT_REPOSITORY || DEFAULT_ARTY_REPOSITORY;
  const response = await fetch(`https://api.github.com/repos/${repository}/dispatches`, {
    method: 'POST',
    headers: githubHeaders(token),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Could not queue article final pass (${response.status}): ${await response.text()}`);
  }

  return { requestId: id, repository, targetPath: payload.client_payload.target_path };
}
