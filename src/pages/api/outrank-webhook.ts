import type { NextApiRequest, NextApiResponse } from 'next';
import { dispatchOutrankArticle } from '@/lib/arty-final-pass-dispatch';
import { captureException } from '@/lib/observability';
import {
  articleBody,
  formatEnglishPost,
  resolveSyncArticle,
  type SyncableArticle,
} from '@/lib/outrank-sync';
import { dedupeOutrankArticles } from '@/lib/outrank';

export const config = {
  api: { bodyParser: { sizeLimit: '4mb' } },
  maxDuration: 60,
};

type WebhookArticle = SyncableArticle & {
  content_html?: string;
};

function getWebhookSecret() {
  return process.env.OUTRANK_WEBHOOK_SECRET || '';
}

function isAuthorized(req: NextApiRequest) {
  const secret = getWebhookSecret();
  if (!secret) return false;
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return false;
  return header.slice('Bearer '.length) === secret;
}

function asArticles(body: {
  event_type?: string;
  data?: { articles?: WebhookArticle[]; article?: WebhookArticle };
}): WebhookArticle[] {
  if (body.event_type === 'update_article' && body.data?.article) {
    return [body.data.article];
  }
  return Array.isArray(body.data?.articles) ? body.data.articles : [];
}

function toSyncable(article: WebhookArticle): SyncableArticle {
  return {
    ...article,
    content_markdown: article.content_markdown?.trim() || '',
    html: article.html || article.content_html,
    created_at: article.created_at || new Date().toISOString(),
    updated_at: article.updated_at || article.created_at || new Date().toISOString(),
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Invalid access token' });
  }

  const articles = dedupeOutrankArticles(
    asArticles(req.body).map(toSyncable).filter((article) => article.slug && article.title && articleBody(article)),
  );

  const queued = [];
  for (const article of articles) {
    console.log(`Outrank webhook ${article.slug} markdown=${article.content_markdown?.length || 0} html=${article.html?.length || 0}`);

    try {
      const source = resolveSyncArticle(article);
      const markdown = formatEnglishPost(source);
      const job = await dispatchOutrankArticle(source, markdown);
      queued.push({
        slug: source.slug,
        status: 'queued',
        request_id: job.requestId,
        target_path: job.targetPath,
      });
    } catch (error) {
      const slug = article.slug || '(unknown)';
      console.error(`Could not queue Outrank article ${slug}`, error);
      captureException(error, { component: 'outrank-webhook', slug });
      return res.status(503).json({
        error: 'Article processing could not be queued',
        queued,
      });
    }
  }

  return res.status(202).json({
    message: 'Article final pass queued',
    queued,
  });
}
