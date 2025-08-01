export function generateArticleMetaTags(article: {
  title: string;
  description: string;
  slug: string;
  publishingDate: string;
  author?: string;
  tags?: string[];
  featuredImage?: string;
  category?: string;
}) {
  const canonicalUrl = `https://guppy.land/articles/${article.slug}`;
  const imageUrl = article.featuredImage 
    ? `https://guppy.land${article.featuredImage}`
    : `https://guppy.land/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description || '')}`;

  return {
    title: `${article.title} | Guppy's Notes & Articles`,
    description: article.description,
    canonical: canonicalUrl,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      article: {
        publishedTime: article.publishingDate,
        modifiedTime: article.publishingDate,
        authors: [article.author || 'Armaan Gupta'],
        section: article.category || 'Article',
        tags: article.tags || [],
      },
    },
    twitter: {
      handle: '@armaangupta',
      site: '@armaangupta',
      cardType: 'summary_large_image',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Guppy's Kreations",
    alternateName: 'Guppy Land',
    url: 'https://guppy.land',
    description: 'Creative projects and ideas by Armaan "Guppy" Gupta',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://guppy.land/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Armaan Gupta',
    alternateName: 'Guppy',
    url: 'https://guppy.land',
    sameAs: [
      'https://twitter.com/armaangupta',
      'https://github.com/guppy57',
      'https://linkedin.com/in/armaangupta',
    ],
    jobTitle: 'Creative Technologist',
    description: 'Building creative projects and sharing ideas',
  };
}