import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Get all article files
  const postsDirectory = path.join(process.cwd(), 'data/posts');
  const filenames = fs.readdirSync(postsDirectory);
  
  const articles: ISitemapField[] = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      // Get file stats for last modified date
      const stats = fs.statSync(fullPath);
      const lastmod = stats.mtime.toISOString();
      
      return {
        loc: `https://guppy.land/articles/${slug}`,
        lastmod: data.lastModified || lastmod,
        changefreq: 'weekly' as const,
        priority: 0.8,
      };
    });
  
  // Add other dynamic content here if needed
  const fields: ISitemapField[] = [...articles];
  
  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent Next.js errors
export default function Sitemap() {
  // getServerSideProps will do the work
}