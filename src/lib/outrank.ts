import { getPost, getPostSlugs, getPostSummaries, type Post, type PostSummary } from './posts';

const BLOG_REVALIDATE_SECONDS = process.env.NODE_ENV === 'development' ? 1 : 60;

function articleFamily(slug: string) {
  return slug.replace(/-\d+$/, '');
}

function newerArticle(left: { created_at?: string; updated_at?: string }, right: { created_at?: string; updated_at?: string }) {
  return new Date(right.updated_at || right.created_at || 0).getTime() - new Date(left.updated_at || left.created_at || 0).getTime();
}

export function dedupeOutrankArticles<T extends { slug: string; created_at?: string; updated_at?: string }>(articles: T[]) {
  const kept = new Map<string, T>();
  for (const article of articles) {
    const family = articleFamily(article.slug);
    const current = kept.get(family);
    if (!current || newerArticle(current, article) > 0) {
      kept.set(family, article);
    }
  }
  return Array.from(kept.values());
}

export function getBlogRevalidateSeconds() {
  return BLOG_REVALIDATE_SECONDS;
}

export function getCanonicalLocalSlug(slug: string) {
  const slugs = getPostSlugs('en');
  if (slugs.includes(slug)) return slug;
  const family = articleFamily(slug);
  return slugs.find((candidate) => articleFamily(candidate) === family) || slug;
}

export async function getEnglishBlogSummaries(): Promise<PostSummary[]> {
  return getPostSummaries('en');
}

export async function getEnglishPost(slug: string): Promise<Post | null> {
  return getPost('en', slug);
}
