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
      _id: data.id,
      _createdAt: data.created_at,
      name: data.name,
      description: data.description,
      brief: content.trim(),
      logo: {
        asset: {
          url: data.logo || null
        }
      },
      images: [], // We can add support for multiple images later if needed
      icon: {
        asset: {
          url: data.icon || null
        }
      },
      status: data.status,
      tags: data.tags || [],
      url: data.url,
      founding_year: data.founding_year,
      email: data.email
    } as IKreation;
  });

  return kreations;
} 