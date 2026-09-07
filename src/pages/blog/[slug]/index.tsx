import BlogPostContent from '@/app/components/BlogPostContent';
import { getLocalePath, type Locale } from '@/lib/locale';
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

  const dutchSlug = getLocalePath(`/blog/${params.slug}`, 'nl').replace('/nl/blog/', '');
  const availableLocales: Locale[] = getPostSlugs('nl').includes(dutchSlug) ? ['en', 'nl'] : ['en'];

  return { props: { post, availableLocales }, revalidate: getBlogRevalidateSeconds() };
}

export default function EnglishPost({ post, availableLocales }: { post: Post; availableLocales: Locale[] }) {
  return <BlogPostContent locale="en" post={post} availableLocales={availableLocales} />;
}
