import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import IKreation from '@/types/IKreation';

export async function getKreationsFromFiles(): Promise<IKreation[]> {
  const kreationsDirectory = path.join(process.cwd(), 'data/creations');
  const fileNames = fs.readdirSync(kreationsDirectory);

  const kreations = fileNames.map((fileName) => {
    const fullPath = path.join(kreationsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      _id: data.id || null,
      _createdAt: data.created_at || null,
      name: data.name || null,
      description: data.description || null,
      brief: content.trim(),
      logo: {
        asset: {
          url: `/creations/${data.logo}` || null
        }
      },
      images: [], // We can add support for multiple images later if needed
      icon: {
        asset: {
          url: `/creations/${data.icon}` || null
        }
      },
      status: data.status || null,
      tags: data.tags || [],
      url: data.url || null,
      founding_year: data.founding_year || null,
      email: data.email || null
    } as IKreation;
  });

  return kreations;
} 