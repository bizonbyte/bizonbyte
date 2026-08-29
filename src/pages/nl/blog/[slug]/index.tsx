import BlogPostContent from '@/app/components/BlogPostContent';
import { getPost, getPostSlugs } from '@/lib/posts';

export async function getStaticPaths() {
  return {
    paths: getPostSlugs('nl').map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPost('nl', params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function DutchPost({ post }: { post: Awaited<ReturnType<typeof getPost>> }) {
  if (!post) return null;
  return <BlogPostContent locale="nl" post={post} />;
}
