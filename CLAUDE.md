# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (guppy.land) built with Next.js 13 showcasing "Kreations" - creative projects by Armaan "Guppy" Gupta. The site uses a markdown-driven content architecture with static generation.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production (includes sitemap generation)
npm run start      # Start production server
npm run lint       # Run ESLint
npm test          # Run Jest tests
```

## Architecture

### Content Management
- **Kreations**: Markdown files in `data/creations/` with frontmatter containing project metadata (name, description, status, tags, founding_year, email, url, icon, logo)
- **Articles**: MDX files in `data/posts/` with frontmatter for blog content
- Content is statically generated with 60-second ISR revalidation

### Tech Stack
- Next.js 13 (Pages Router) with TypeScript
- Tailwind CSS with extensive custom theme and animations
- shadcn/ui components with Radix UI primitives
- Framer Motion for animations
- Local fonts: Satoshi (primary), Departure Mono, Coming Soon

### Key Files
- `next.config.js`: MDX support, image domains, CORS headers, redirects
- `tailwind.config.js`: Custom design system with animations and color variables
- `components.json`: shadcn/ui configuration
- `sitemap.config.js`: SEO sitemap generation

### Component Structure
- `components/ui/`: shadcn/ui components
- `components/`: Custom React components
- `lib/`: Utility functions and data fetching logic
- `types/`: TypeScript interfaces for content and API structures

### Styling Patterns
- Utility-first CSS with Tailwind
- Custom CSS variables for theming
- Responsive design with mobile-first approach
- Custom animations: fadeIn, scaleIn, slideIn variants

### Data Flow
- Markdown/MDX files → gray-matter parsing → static props → React components
- Dynamic filtering and search on client-side
- Image optimization through Next.js Image component with remote patterns

## Development Notes

- Content files use consistent frontmatter schemas - maintain these when adding new kreations or posts
- The site is deployed as guppy.land (canonical URL) though the package name references kreativeusa.com
- Images for kreations should be placed in `public/creations/` and referenced in markdown frontmatter
- TypeScript interfaces in `types/` define the expected data structures for content files