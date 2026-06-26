# AGENTS.md - Development Guidelines for productsway-blog

## Project Overview

A Next.js 16 blog using the Pages Router, TypeScript, Tailwind CSS v4, and DaisyUI.

Content sources:
- Local markdown files (`posts/`, `videos/`) via gray-matter + webpack require.context
- Hashnode blog (`blog.productsway.com`) fetched daily by CI into `data/blog-posts.json`
- YouTube videos fetched client-side via `/api/youtube-videos`

## Build, Lint, and Test Commands

### Package Manager

This project uses **pnpm**.

### Core Commands

```bash
pnpm install          # Install dependencies
pnpm dev / develop    # Development server
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run Biome linting (CI mode)
pnpm format           # Run Biome formatter with auto-fix
pnpm fetch:videos     # Fetch YouTube videos data
pnpm fetch:repos      # Fetch GitHub repositories data
pnpm fetch:blog       # Fetch Hashnode blog posts data
```

### Testing

```bash
pnpm test              # Run Vitest (single run)
pnpm test:watch        # Run Vitest in watch mode
```

Uses **Vitest 4** with **@testing-library/react** and **jsdom**. Tests live in `tests/` mirroring the `components/` and `lib/` structure.

## Code Style Guidelines

### TypeScript

- **Strict mode**: Disabled (`strict: false`)
- **Target**: ES5, **JSX**: Preserve, **Module**: ESNext with Node resolution
- Use explicit type annotations for params and return types
- Use `interface` for object types, `type` for unions/primitives
- Define custom types in `lib/types.ts`

### React Components

- Use `React.FC<Props>` for page/layout components
- Named exports for reusable components: `export function Button`
- Default exports for page/layout: `export default Layout`
- Props interfaces: inline for simple components
- Prefer functional components with hooks
- Handle null/undefined states explicitly
- Use dynamic imports: `dynamic(() => import('path'))`

### Imports

```typescript
// baseUrl-based resolution (tsconfig baseUrl: ".")
import { Button } from "components/Button";
import Layout from "components/Layout";
import { fetchLatestPosts } from "lib/tina";

// Relative imports (same directory)
import Footer from "./Footer";

// Standard library
import React from "react";
```

### Formatting (Biome)

- **Indent**: 4 spaces, **Line width**: 80 characters
- **Line endings**: LF, **Quotes**: Single (JS), double (JSX)
- **Semicolons**: Always, **Trailing commas**: All
- **Bracket spacing**: Enabled, Auto-organize imports on save

### Naming Conventions

- **Components**: PascalCase (`Layout`, `BlogList`, `Button`)
- **Files**: camelCase (utilities), PascalCase (components)
- **Variables/functions**: camelCase (`fetchLatestPosts`)
- **Constants**: UPPER_SNAKE_CASE (true constants), `Record<T, U>` (mappings)
- **Interfaces**: PascalCase, optionally prefixed with `T` (`TPost`)

### Common Patterns

```typescript
// Type unions for variants
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

// Record for style mappings
const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  ghost: "btn-ghost",
};

// Error handling pattern
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error("Failed to fetch:", error);
  return []; // Return empty/default on error
}
```

## File Organization

```
components/  - React components
components/sections/ - Homepage section components
components/cards/   - Card sub-components (ExtensionCard, NvimPluginCard, CliToolCard)
lib/         - Utility functions and API clients
lib/utils/   - Helper functions (date, array utilities)
pages/       - Next.js pages and routes (Pages Router)
posts/       - Markdown notes and TILs
videos/      - Markdown video post metadata
data/        - JSON data files (config, repos, blog posts)
scripts/     - Build and utility scripts (run with bun)
tests/       - Vitest test files (mirrors source structure)
.planning/   - Architecture planning and codebase documentation
```

## Important Configuration Files

- `biome.json` - Linting and formatting rules
- `tsconfig.json` - TypeScript config (baseUrl: ".")
- `package.json` - Scripts and dependencies
- `next.config.js` - Next.js configuration
- `styles.css` - Tailwind v4 and DaisyUI theme config
- `.nvmrc` - Node.js version (LTS/\* pattern)

## Development Notes

- Markdown files use raw-loader for direct import via webpack `require.context`
- Image domains: `gyazo.com`, `cdn.hashnode.com`, `hashnode.com`, `i.ytimg.com`
- Two active DaisyUI themes: `minimal` (light) and `dark` (with an unused `winter` theme)
- Webfinger redirects configured for Fediverse support
- Scripts use `bun` for execution
- Tests use Vitest with React Testing Library + jsdom
- ISR revalidation constants in `lib/constants.ts`

## Common Tasks

```bash
# Create blog post: Add .md file to posts/ with frontmatter
# Create page: Add .tsx file to pages/ with export default
# Create component: Create in components/ with PascalCase and named export
```

## After Code Changes

```bash
pnpm lint && pnpm format
```
