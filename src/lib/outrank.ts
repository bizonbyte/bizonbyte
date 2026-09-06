import { BlogClient, type Article, type ArticleSummary } from 'outrank-next-js-blog';
import { getPost, getPostSummaries, type Post, type PostSummary } from './posts';

const OUTRANK_API_BASE_URL = 'https://outrank.so';
const BLOG_REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 1 : 60;
const SITEMAP_PAGE_SIZE = 100;

function getOutrankApiKey() {
  return process.env.OUTRANK_BLOG_API_KEY || process.env.OUTRANK_API_KEY || '';
}

function getClient() {
  const apiKey = getOutrankApiKey();
  if (!apiKey) return null;
  return new BlogClient(apiKey, { baseUrl: OUTRANK_API_BASE_URL });
}

function toDate(value?: string) {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toISOString().slice(0, 10);
}

function toSummary(article: ArticleSummary): PostSummary {
  return {
    slug: article.slug,
    title: article.title,
    description: article.meta_description || '',
    date: toDate(article.created_at),
    author: 'Bizonbyte Team',
    readingTime: Math.max(1, article.reading_time_minutes || 1),
    locale: 'en',
    thumbnail: article.image_url ? { src: article.image_url, alt: article.title } : null,
  };
}

function toPost(article: Article): Post {
  return {
    ...toSummary(article),
    contentHtml: article.html || '',
  };
}

function articleFamily(slug: string) {
  return slug.replace(/-\d+$/, '');
}

function newerArticle(left: Pick<ArticleSummary, 'created_at' | 'updated_at'>, right: Pick<ArticleSummary, 'created_at' | 'updated_at'>) {
  return new Date(right.updated_at || right.created_at).getTime() - new Date(left.updated_at || left.created_at).getTime();
}

export function dedupeOutrankArticles<T extends Pick<ArticleSummary, 'slug' | 'created_at' | 'updated_at'>>(articles: T[]) {
  const kept = new Map<string, T>();
  for (const article of articles) {
    const family = articleFamily(article.slug);
    const current = kept.get(family);
    if (!current || newerArticle(current, article) > 0) {
      kept.set(family, article);
    }
  }
  return [...kept.values()];
}

export function getCanonicalOutrankSlug(slug: string, articles: ArticleSummary[]) {
  const canonical = dedupeOutrankArticles(articles).find((article) => articleFamily(article.slug) === articleFamily(slug));
  return canonical?.slug || slug;
}

export function getBlogRevalidateSeconds() {
  return BLOG_REVALIDATE_SECONDS;
}

export async function getOutrankArticleSummaries(): Promise<PostSummary[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const articles = dedupeOutrankArticles(await client.getAllArticles(SITEMAP_PAGE_SIZE));
    return articles.map(toSummary);
  } catch (error) {
    console.error('Failed to load Outrank article summaries', error);
    return [];
  }
}

export async function getOutrankArticle(slug: string): Promise<Post | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const article = await client.getArticle(slug);
    return article ? toPost(article) : null;
  } catch (error) {
    console.error(`Failed to load Outrank article ${slug}`, error);
    return null;
  }
}

export async function getOutrankArticleSource(slug: string): Promise<Article | null> {
  const client = getClient();
  if (!client) return null;

  try {
    return await client.getArticle(slug);
  } catch (error) {
    console.error(`Failed to load Outrank article source ${slug}`, error);
    return null;
  }
}

export async function getEnglishBlogSummaries(): Promise<PostSummary[]> {
  const local = getPostSummaries('en');
  const remote = await getOutrankArticleSummaries();
  const localSlugs = new Set(local.map((post) => post.slug));
  const extra = remote.filter((post) => !localSlugs.has(post.slug));
  return [...local, ...extra].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function resolveCanonicalOutrankSlug(slug: string) {
  const client = getClient();
  if (!client) return slug;

  try {
    const articles = await client.getAllArticles(SITEMAP_PAGE_SIZE);
    return getCanonicalOutrankSlug(slug, articles);
  } catch (error) {
    console.error('Failed to resolve canonical Outrank slug', error);
    return slug;
  }
}

export async function getEnglishPost(slug: string): Promise<Post | null> {
  const local = await getPost('en', slug);
  if (local) return local;
  return getOutrankArticle(slug);
}
