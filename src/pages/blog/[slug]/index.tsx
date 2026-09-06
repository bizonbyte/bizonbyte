import BlogPostContent from '@/app/components/BlogPostContent';
import { getBlogRevalidateSeconds, getCanonicalLocalSlug, getEnglishPost } from '@/lib/outrank';
import { getPostSlugs, type Post } from '@/lib/posts';

export async function getStaticPaths() {
  return {
    paths: getPostSlugs('en').map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const canonicalSlug = getCanonicalLocalSlug(params.slug);
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
