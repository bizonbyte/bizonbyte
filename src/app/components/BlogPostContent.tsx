'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getLanguageAlternates, siteUrl, type Locale } from '@/lib/locale';
import type { Post } from '@/lib/posts';

export default function BlogPostContent({ locale, post }: { locale: Locale; post: Post }) {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const dutch = locale === 'nl';
  const pathname = `${dutch ? '/nl/blog' : '/blog'}/${post.slug}`;
  const alternates = getLanguageAlternates(pathname);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author || 'bizonbyte.nl' },
    publisher: { '@type': 'Organization', name: 'bizonbyte.nl', url: siteUrl },
    mainEntityOfPage: `${siteUrl}${pathname}`,
    inLanguage: locale,
  };

  useEffect(() => {
    const handleScroll = () => {
      const article = document.getElementById('blog-post');
      if (!article) return;
      const progress = Math.min(100, Math.max(0, ((window.scrollY - article.offsetTop + window.innerHeight * 0.1) / article.offsetHeight) * 100));
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const postRoot = document.getElementById('blog-post');
    if (!postRoot) return;
    postRoot.querySelectorAll('video').forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.play().catch(() => {});
    });
  }, [post.contentHtml]);

  const formattedDate = new Date(post.date).toLocaleDateString(dutch ? 'nl-NL' : 'en-NL', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <>
      <Head>
        <title>{post.title} — bizonbyte.nl</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`${siteUrl}${pathname}`} />
        {Object.entries(alternates).map(([hreflang, href]) => <link key={hreflang} rel="alternate" hrefLang={hreflang} href={href} />)}
      </Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <div className="blog-progress-bar-track"><div className="blog-progress-bar" style={{ width: `${scrollProgress}%` }} /></div>
      <article id="blog-post" className="w-full min-h-screen">
        <Link href={dutch ? '/nl/blog' : '/blog'} className="blog-back-link">{dutch ? '← Terug naar artikelen' : '← Back to articles'}</Link>
        <h1>{post.title}</h1>
        <div className="blog-post-meta"><span className="blog-post-date">{formattedDate}</span>{post.author && <span className="blog-post-author">{post.author}</span>}<span className="blog-reading-time">{post.readingTime} min {dutch ? 'lezen' : 'read'}</span></div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      {showBackToTop && <button className="blog-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={dutch ? 'Terug naar boven' : 'Back to top'}>↑</button>}
    </>
  );
}
