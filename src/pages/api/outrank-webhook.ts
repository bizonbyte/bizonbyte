import type { NextApiRequest, NextApiResponse } from 'next';
import {
  articleBody,
  createOutrankReviewPr,
  prepareProcessedEnglishArticle,
  resolveSyncArticle,
  syncPublishedDutchArticle,
  syncPublishedEnglishArticle,
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

  const synced = [];
  for (const article of articles) {
    console.log(`Outrank webhook ${article.slug} markdown=${article.content_markdown?.length || 0} html=${article.html?.length || 0}`);

    const source = resolveSyncArticle(article);
    let publishSource = source;
    let processed = null;
    try {
      processed = await prepareProcessedEnglishArticle(source);
      publishSource = processed.source;
    } catch (error) {
      console.error(`Outrank final pass failed for ${source.slug}; publishing sanitised source`, error);
    }

    if (processed && !processed.result.readyToPublish) {
      try {
        const review = await createOutrankReviewPr(
          processed.source,
          processed.markdown,
          processed.result,
        );
        synced.push({
          slug: source.slug,
          status: 'review_required',
          path: 'posts/en/' + source.slug + '.md',
          pull_request_number: review.number,
          pull_request_url: review.url,
          changes: processed.result.changes,
          flags: processed.result.flags,
          search_id: processed.result.searchId,
        });
        continue;
      } catch (error) {
        console.error(`Outrank review PR failed for ${source.slug}; publishing sanitised source`, error);
        publishSource = source;
      }
    }

    const english = await syncPublishedEnglishArticle(publishSource);
    let dutch = null;
    try {
      dutch = await syncPublishedDutchArticle(english.source);
    } catch (error) {
      console.error(`Failed to write Dutch translation for ${english.slug}`, error);
    }
    try {
      await res.revalidate('/blog');
      await res.revalidate(`/blog/${english.slug}`);
      await res.revalidate('/nl/blog');
      await res.revalidate(`/nl/blog/${english.slug}`);
    } catch (error) {
      console.error(`Failed to revalidate ${english.slug}`, error);
    }
    synced.push({ ...english, dutch });
  }

  return res.status(200).json({
    message: 'Webhook processed successfully',
    synced,
  });
}
