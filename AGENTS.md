# AGENTS.md - Development Guidelines for productsway-blog

## Project Overview

A Next.js 15 blog with TinaCMS, using TypeScript, Tailwind CSS v4, and DaisyUI.

## Build, Lint, and Test Commands

### Package Manager

This project uses **pnpm**.

### Core Commands

```bash
pnpm install          # Install dependencies
pnpm dev / develop    # Development server with TinaCMS
pnpm build            # Production build (includes TinaCMS)
pnpm start            # Start production server
pnpm lint             # Run Biome linting (CI mode)
pnpm format           # Run Biome formatter with auto-fix
pnpm fetch:videos     # Fetch YouTube videos data
pnpm fetch:repos      # Fetch GitHub repositories data
```

### Testing

No test framework configured. Do not add tests unless explicitly requested.

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
components/  - React components (Pages, Layout, UI)
lib/         - Utility functions and API clients
lib/utils/   - Helper functions (date, array utilities)
pages/       - Next.js pages and routes
posts/       - Blog post content (Markdown)
tina/        - TinaCMS configuration and schema
public/      - Static assets
data/        - JSON data files
scripts/     - Build and utility scripts (run with bun)
```

## Important Configuration Files

- `biome.json` - Linting and formatting rules
- `tsconfig.json` - TypeScript config (baseUrl: ".")
- `package.json` - Scripts and dependencies
- `next.config.js` - Next.js configuration
- `styles.css` - Tailwind v4 and DaisyUI theme config
- `.nvmrc` - Node.js version (LTS/\* pattern)

## Development Notes

- TinaCMS requires `tinacms build` before production build
- Markdown files use raw-loader for direct import
- Image domains: `gyazo.com`, `cdn.hashnode.com`, `hashnode.com`
- Three DaisyUI themes: `minimal`, `winter`, `dark`
- Webfinger redirects configured for Fediverse support
- Scripts use `bun` for execution

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
