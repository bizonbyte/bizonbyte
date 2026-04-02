import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import { defaultSchema } from 'hast-util-sanitize'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';

const markdownPostsDirectory = path.join(process.cwd(), 'posts');
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    video: [
      ...(defaultSchema.attributes?.video || []),
      'controls',
      'autoplay',
      'muted',
      'loop',
      'playsinline',
      'style',
    ],
    source: [
      ...(defaultSchema.attributes?.source || []),
      'src',
      'type',
    ],
  },
}

export async function getStaticPaths() {
  const filenames = fs.readdirSync(markdownPostsDirectory);
  const paths = filenames.map(filename => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

// @ts-ignore
export async function getStaticProps({ params }) {
  const fullPath = path.join(markdownPostsDirectory, `${params.slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSanitize, sanitizeSchema)
      .use(rehypeStringify)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const plainText = matterResult.content
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/[#*_>~\-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = plainText.split(' ').filter(Boolean).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    return {
      props: {
        title: matterResult.data.title,
        date: matterResult.data.date,
        author: matterResult.data.author || null,
        contentHtml,
        readingTime,
      },
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
}

// @ts-ignore
export default function Post({ title, date, contentHtml, readingTime, author }) {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('blog-post');
      if (!article) return;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const progress = Math.min(
        100,
        Math.max(0, ((window.scrollY - articleTop + window.innerHeight * 0.1) / articleHeight) * 100)
      );
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const postRoot = document.getElementById('blog-post');
    if (!postRoot) return;
    const videos = postRoot.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    });
  }, [contentHtml]);

  if (!contentHtml) {
    router.replace('/404');
    return null;
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="blog-progress-bar-track">
        <div className="blog-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <article id="blog-post" className="w-full min-h-screen">
        <Link href="/blog" className="blog-back-link">
          ← Back to Blog
        </Link>

        <h1>{title}</h1>

        <div className="blog-post-meta">
          <span className="blog-post-date">{formattedDate}</span>
          {author && <span className="blog-post-author">{author}</span>}
          <span className="blog-reading-time">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '0.3em', verticalAlign: 'middle' }}>
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {readingTime} min read
          </span>
        </div>

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      {showBackToTop && (
        <button
          className="blog-back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
