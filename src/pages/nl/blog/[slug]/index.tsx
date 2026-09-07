import BlogPostContent from '@/app/components/BlogPostContent';
import { getLocalePath, type Locale } from '@/lib/locale';
import { getPost, getPostSlugs } from '@/lib/posts';

export async function getStaticPaths() {
  return {
    paths: getPostSlugs('nl').map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPost('nl', params.slug);
  if (!post) {
    return { redirect: { destination: '/nl/blog', permanent: false } };
  }

  const englishSlug = getLocalePath(`/nl/blog/${params.slug}`, 'en').replace('/blog/', '');
  const availableLocales: Locale[] = getPostSlugs('en').includes(englishSlug) ? ['en', 'nl'] : ['nl'];

  return { props: { post, availableLocales } };
}

export default function DutchPost({ post, availableLocales }: { post: Awaited<ReturnType<typeof getPost>>; availableLocales: Locale[] }) {
  if (!post) return null;
  return <BlogPostContent locale="nl" post={post} availableLocales={availableLocales} />;
}
