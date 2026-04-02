import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import matter from 'gray-matter';

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map(filename => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const plainText = content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/[#*_>~\-]/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const wordCount = plainText.split(' ').filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    const sentences = plainText.replace(/([.?!])\s+/g, '$1|').split('|');
    const excerpt = sentences.slice(0, 2).join(' ').slice(0, 200).trim();

    return {
      slug: filename.replace(/\.md$/, ''),
      title: frontMatter.title,
      date: frontMatter.date,
      author: frontMatter.author || null,
      readingTime,
      excerpt: excerpt ? excerpt + '…' : null,
    };
  });

  // @ts-ignore
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return { props: { posts } };
}

// @ts-ignore
const BlogIndex = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog — Bizonbyte | AI & Technology Insights</title>
        <meta name="description" content="In-depth articles on AI, machine learning, and digital transformation from the Bizonbyte team in the Netherlands." />
        <meta property="og:title" content="Blog — Bizonbyte" />
        <meta property="og:description" content="In-depth articles on AI, machine learning, and digital transformation." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <section id="blog-index" className="w-full min-h-screen">
        <div className="blog-index-header">
          <h1>Blog</h1>
          <p className="blog-index-subtitle">
            Insights on AI, machine learning and digital transformation from our team in Amsterdam.
          </p>
        </div>

        <ul className="blog-card-list">
          {/* @ts-ignore */}
          {posts.map((post, i) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });

            return (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="blog-card">
                  {i === 0 && <span className="blog-card-badge">Latest</span>}
                  <h2 className="blog-card-title">{post.title}</h2>
                  {post.excerpt && (
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                  )}
                  <div className="blog-card-meta">
                    <span className="blog-card-date">{formattedDate}</span>
                    {post.author && (
                      <span className="blog-card-author">{post.author}</span>
                    )}
                    <span className="blog-card-reading-time">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '0.3em', verticalAlign: 'middle' }}>
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {post.readingTime} min read
                    </span>
                    <span className="blog-card-arrow">Read article →</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default BlogIndex;
