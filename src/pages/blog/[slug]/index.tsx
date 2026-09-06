import BlogPostContent from '@/app/components/BlogPostContent';
import { getBlogRevalidateSeconds, getEnglishPost, getOutrankArticleSummaries, resolveCanonicalOutrankSlug } from '@/lib/outrank';
import { getPost, getPostSlugs, type Post } from '@/lib/posts';

export async function getStaticPaths() {
  const remote = await getOutrankArticleSummaries();
  const slugs = new Set([...getPostSlugs('en'), ...remote.map((article) => article.slug)]);
  return {
    paths: Array.from(slugs).map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const local = await getPost('en', params.slug);
  if (local) {
    return { props: { post: local }, revalidate: getBlogRevalidateSeconds() };
  }

  const canonicalSlug = await resolveCanonicalOutrankSlug(params.slug);
  if (canonicalSlug !== params.slug) {
    return { redirect: { destination: `/blog/${canonicalSlug}`, permanent: false } };
  }

  const post = await getEnglishPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: getBlogRevalidateSeconds() };
}

export default function EnglishPost({ post }: { post: Post }) {
  return <BlogPostContent locale="en" post={post} />;
}
