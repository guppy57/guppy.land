import { NextApiRequest, NextApiResponse } from 'next';
import RSS from 'rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const feed = new RSS({
      title: "Guppy's Notes & Articles",
      description: "Thoughts, ideas, and creative projects by Armaan 'Guppy' Gupta",
      site_url: 'https://guppy.land',
      feed_url: 'https://guppy.land/api/rss.xml',
      copyright: `${new Date().getFullYear()} Armaan Gupta`,
      language: 'en',
      pubDate: new Date().toISOString(),
      ttl: 60,
    });

    // Get all article files
    const postsDirectory = path.join(process.cwd(), 'data/posts');
    const filenames = fs.readdirSync(postsDirectory);
    
    // Process each article
    const articles = filenames
      .filter(filename => filename.endsWith('.mdx'))
      .map(filename => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug,
          frontmatter: data,
          content: content.slice(0, 500) + '...', // First 500 chars as excerpt
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishingDate || 0);
        const dateB = new Date(b.frontmatter.publishingDate || 0);
        return dateB.getTime() - dateA.getTime();
      });

    // Add articles to feed
    articles.forEach(article => {
      feed.item({
        title: article.frontmatter.title || 'Untitled',
        description: article.frontmatter.description || article.content,
        url: `https://guppy.land/articles/${article.slug}`,
        guid: `https://guppy.land/articles/${article.slug}`,
        categories: article.frontmatter.tags || [article.frontmatter.category] || [],
        date: article.frontmatter.publishingDate || new Date(),
        author: article.frontmatter.author || 'Armaan Gupta',
      });
    });

    // Generate RSS XML
    const xml = feed.xml({ indent: true });

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'max-age=3600, public');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}