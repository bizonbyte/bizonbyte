import Head from 'next/head';
import BlogIndexContent from '@/app/components/BlogIndexContent';
import { getLanguageAlternates, siteUrl } from '@/lib/locale';
import { getBlogRevalidateSeconds, getEnglishBlogSummaries } from '@/lib/outrank';
import type { PostSummary } from '@/lib/posts';

export async function getStaticProps() {
  return {
    props: { posts: await getEnglishBlogSummaries() },
    revalidate: getBlogRevalidateSeconds(),
  };
}

export default function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const alternates = getLanguageAlternates('/blog');
  return (
    <>
      <Head>
        <title>Blog — bizonbyte.nl | AI & Technology Insights</title>
        <meta name="description" content="Practical articles on AI, software, and digital transformation from the bizonbyte.nl team in the Netherlands." />
        <link rel="canonical" href={`${siteUrl}/blog`} />
        {Object.entries(alternates).map(([hreflang, href]) => <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />)}
      </Head>
      <BlogIndexContent locale="en" posts={posts} />
    </>
  );
}
