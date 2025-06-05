# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit portfolio/blog website using:
- **SvelteKit v2** with Svelte 5
- **TypeScript** with strict mode
- **Tailwind CSS v4** (new Vite plugin approach)
- **Vercel** for deployment
- **Yarn** as package manager

## Essential Commands

### Development
```bash
yarn dev          # Start dev server at http://localhost:5173
yarn build        # Build for production
yarn preview      # Preview production build
```

### Code Quality
```bash
yarn check        # Run type checking
yarn check:watch  # Type checking in watch mode
yarn lint         # Check code formatting
yarn format       # Auto-format code with Prettier
```

## Architecture Overview

The codebase follows SvelteKit's file-based routing convention:

- **`src/routes/`**: Page components and layouts
  - `+page.svelte` files define routes
  - `+layout.svelte` wraps child routes
  
- **`src/lib/`**: Reusable code imported with `$lib` alias
  - `components/`: Shared UI components (Container, Navbar)
  - `assets/`: Static assets accessible via imports
  
- **`static/`**: Public files served at root (favicons, manifests)

## Key Technical Details

### Tailwind CSS v4
This project uses Tailwind CSS v4's new approach - no `tailwind.config.js` file. Configuration is done through CSS in `src/app.css`:
- Uses `@theme` directive for customization
- Typography plugin enabled via `@plugin`

### Component Imports
Use the `$lib` alias for importing from the lib directory:
```typescript
import Container from '$lib/components/Container.svelte';
```

### Deployment
The project auto-deploys to Vercel. The adapter is already configured in `svelte.config.js`.