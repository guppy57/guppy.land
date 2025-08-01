# Article Frontmatter Guide

This guide explains the frontmatter structure for blog posts to ensure optimal SEO.

## Required Fields

```yaml
---
title: Your Article Title
description: A compelling description (under 160 characters for SEO)
slug: url-friendly-slug
publishingDate: 2025-04-01
---
```

## Optional SEO Fields

```yaml
---
# Author information
author: Armaan Gupta  # Defaults to "Armaan Gupta" if not specified

# Category/Section
category: Tutorial  # Article section/type (e.g., Tutorial, Essay, Guide)

# Keywords and tags
tags: 
  - javascript
  - react
  - web-development

# Featured image for social sharing
featuredImage: /images/articles/your-image.jpg  # Should be 1200x630px for optimal social sharing

# Last modified date (if different from publishing date)
lastModified: 2025-04-15

# Custom excerpt (if different from description)
excerpt: A longer excerpt for the article preview
---
```

## Example Complete Frontmatter

```yaml
---
title: Building a Modern Next.js Blog with SEO in Mind
description: Learn how to create an SEO-optimized blog using Next.js 13, with dynamic meta tags and structured data
slug: nextjs-seo-blog-guide
publishingDate: 2025-04-01
author: Armaan Gupta
category: Tutorial
tags:
  - nextjs
  - seo
  - web-development
  - react
featuredImage: /images/articles/nextjs-seo-guide.jpg
---
```

## SEO Best Practices

1. **Title**: Keep under 60 characters, include primary keyword
2. **Description**: Keep under 160 characters, compelling and includes keywords
3. **Slug**: URL-friendly, lowercase, hyphens instead of spaces
4. **Tags**: Include relevant keywords for better categorization
5. **Featured Image**: Use 1200x630px images for optimal social media display

## Dynamic Open Graph Images

If no `featuredImage` is specified, the site will automatically generate an Open Graph image using the article title and description.