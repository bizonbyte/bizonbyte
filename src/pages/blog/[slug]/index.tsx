import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import { useRouter } from 'next/navigation';
import Head from 'next/head'

const markdownPostsDirectory = path.join(process.cwd(), 'posts');

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
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
        // Add other post data here
      },
    };
  } catch (err) {
    console.error(err);
    // If the markdown file doesn't exist, return empty props
    return { props: {} };
  }
}

// @ts-ignore
export default function Post({ title, date, contentHtml }) {
  const router = useRouter();

  // If the markdown file doesn't exist, display 404 page
  if (!contentHtml) {
    router.replace('/404');
    return null;
  }

  // Format date to a more human-readable format (e.g., "January 1, 2023")
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
      <div id="blog-post" className="w-full min-h-screen py-14" >
        <h1>{title}</h1>
        <div className="mt-2 text-gray-300">{formattedDate}</div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }}/>
      </div>
    </>
  )
}
