import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import type { Locale } from './locale';

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string | null;
  readingTime: number;
  locale: Locale;
  thumbnail: { src: string; alt: string } | null;
}

export interface Post extends PostSummary {
  contentHtml: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');
const englishPostsDirectory = path.join(postsDirectory, 'en');

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    video: [
      ...(defaultSchema.attributes?.video || []),
      'controls', 'autoplay', 'muted', 'loop', 'playsinline',
      'webkit-playsinline', 'preload', 'style',
    ],
    source: [...(defaultSchema.attributes?.source || []), 'src', 'type'],
  },
};

function getDirectory(locale: Locale) {
  return locale === 'en' ? englishPostsDirectory : postsDirectory;
}

function getFiles(locale: Locale) {
  const directory = getDirectory(locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((filename) => filename.endsWith('.md'));
}

function getPlainText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#*_>~\-]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function getDescription(content: string, explicitDescription?: unknown) {
  if (typeof explicitDescription === 'string' && explicitDescription.trim()) {
    return explicitDescription.trim();
  }
  return getPlainText(content).slice(0, 155).trim();
}

function getFirstImage(markdown: string) {
  const match = markdown.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  return match ? { alt: match[1], src: match[2] } : null;
}

function getSummary(filename: string, locale: Locale): PostSummary {
  const filePath = path.join(getDirectory(locale), filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const plainText = getPlainText(content);
  const wordCount = plainText.split(' ').filter(Boolean).length;

  return {
    slug: filename.replace(/\.md$/, ''),
    title: String(data.title || filename.replace(/\.md$/, '')),
    description: getDescription(content, data.description),
    date: String(data.date || ''),
    author: data.author ? String(data.author) : null,
    readingTime: Math.max(1, Math.round(wordCount / 200)),
    locale,
    thumbnail: getFirstImage(content),
  };
}

export function getPostSlugs(locale: Locale) {
  return getFiles(locale).map((filename) => filename.replace(/\.md$/, ''));
}

export function getPostSummaries(locale: Locale) {
  return getFiles(locale)
    .map((filename) => getSummary(filename, locale))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const filePath = path.join(getDirectory(locale), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(content);
  const summary = getSummary(`${slug}.md`, locale);

  return {
    ...summary,
    title: String(data.title || summary.title),
    description: getDescription(content, data.description),
    contentHtml: processedContent.toString(),
  };
}
