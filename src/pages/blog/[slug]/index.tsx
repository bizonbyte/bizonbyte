import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import { useRouter } from 'next/navigation';
import RootLayout from '@/app/layout';

const markdownPostsDirectory = path.join(process.cwd(), 'posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(markdownPostsDirectory);
  const paths = filenames.map(filename => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

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
    console.log(contentHtml);


    return {
      props: {
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

export default function Post({ contentHtml }) {
  const router = useRouter();

  // If the markdown file doesn't exist, display 404 page
  if (!contentHtml) {
    if (typeof window !== 'undefined') {
      router.replace('/404');
    }
    return null;
  }

  return (
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  )
}
