import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = fs.readdirSync(postsDirectory);
    
    const posts = filenames.map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontMatter } = matter(fileContents);
  
      return {
        slug: filename.replace(/\.md$/, ''),
        title: frontMatter.title,
        date: frontMatter.date,
      };
    });

    // Sort posts by date
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
    return {
      props: {
        posts,
      },
    };
  }

// React component for the blog homepage
const BlogIndex = ({ posts }) => {
  return (
    <div class="w-full min-h-screen py-14">
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
                {post.date} - {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndex;
