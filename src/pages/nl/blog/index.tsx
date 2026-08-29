import Head from 'next/head';
import BlogIndexContent from '@/app/components/BlogIndexContent';
import { getLanguageAlternates, siteUrl } from '@/lib/locale';
import { getPostSummaries } from '@/lib/posts';

export async function getStaticProps() {
  return { props: { posts: getPostSummaries('nl') } };
}

export default function DutchBlogIndex({ posts }: { posts: ReturnType<typeof getPostSummaries> }) {
  const alternates = getLanguageAlternates('/nl/blog');
  return (
    <>
      <Head>
        <title>Artikelen — bizonbyte.nl | AI en software</title>
        <meta name="description" content="Praktische artikelen over AI, software en digitale transformatie voor Nederlandse bedrijven." />
        <link rel="canonical" href={`${siteUrl}/nl/blog`} />
        {Object.entries(alternates).map(([hreflang, href]) => <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />)}
      </Head>
      <BlogIndexContent locale="nl" posts={posts} />
    </>
  );
}
