import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/locale';
import type { PostSummary } from '@/lib/posts';

export default function BlogIndexContent({ locale, posts }: { locale: Locale; posts: PostSummary[] }) {
  const dutch = locale === 'nl';
  return (
    <section id="blog-index" className="w-full min-h-screen">
      <div className="blog-index-header">
        <h1>{dutch ? 'Artikelen' : 'Articles'}</h1>
        <p className="blog-index-subtitle">
          {dutch
            ? 'Praktische inzichten over AI, software en digitale transformatie vanuit Amsterdam.'
            : 'Practical insights on AI, software, and digital transformation from Amsterdam.'}
        </p>
      </div>

      <ul className="blog-card-list">
        {posts.map((post, index) => {
          const formattedDate = new Date(post.date).toLocaleDateString(dutch ? 'nl-NL' : 'en-NL', {
            year: 'numeric', month: 'long', day: 'numeric',
          });
          const prefix = dutch ? '/nl/blog' : '/blog';
          return (
            <li key={post.slug}>
              <Link href={`${prefix}/${post.slug}`} className="blog-card">
                {post.thumbnail && (
                  <div className="blog-card-media">
                    <Image
                      src={post.thumbnail.src}
                      alt={post.thumbnail.alt || post.title}
                      fill
                      sizes="(min-width: 768px) 864px, 100vw"
                    />
                  </div>
                )}
                <div className="blog-card-content">
                  {index === 0 && <span className="blog-card-badge">{dutch ? 'Nieuw' : 'Latest'}</span>}
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.description}</p>
                  <div className="blog-card-meta">
                    <span className="blog-card-date">{formattedDate}</span>
                    {post.author && <span className="blog-card-author">{post.author}</span>}
                    <span className="blog-card-reading-time">{post.readingTime} min {dutch ? 'lezen' : 'read'}</span>
                    <span className="blog-card-arrow">{dutch ? 'Lees artikel →' : 'Read article →'}</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
