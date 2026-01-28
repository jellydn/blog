# AGENTS.md - Development Guidelines for productsway-blog

## Project Overview

A Next.js 15 blog with TinaCMS for content management, using TypeScript, Tailwind CSS v4, and DaisyUI. The blog features posts, videos, and experimental content for developers.

## Build, Lint, and Test Commands

### Package Manager

This project uses **pnpm** as the package manager.

### Core Commands

```bash
# Install dependencies
pnpm install

# Development server with TinaCMS
pnpm dev

# Build for production (includes TinaCMS build)
pnpm build

# Start production server
pnpm start

# Run Biome linting (CI mode - no file modifications)
pnpm lint

# Run Biome formatter with auto-fix
pnpm format

# Fetch YouTube videos data
pnpm fetch:videos
```

### Single Test

No test framework is currently configured. Do not add tests unless explicitly requested.

### Pre-commit Hooks

Pre-commit hooks run Biome automatically via Husky. Run manually:

```bash
pnpm exec biome check .
```

## Code Style Guidelines

### TypeScript

- **Strict mode**: Disabled in `tsconfig.json` (`strict: false`)
- **Target**: ES5, **JSX**: Preserve, **Module**: ESNext with Node resolution
- Use explicit type annotations for function parameters and return types
- Use `interface` for object types, `type` for unions/primitives
- Define custom types in `lib/types.ts`

### React Components

- Use `React.FC<Props>` for component typing
- Named exports for components: `export default ComponentName`
- Props interfaces: inline for simple components (see `components/Layout.tsx`)
- Prefer functional components with hooks over class components
- Handle null/undefined states explicitly

### Imports

```typescript
// Relative imports for local files
import Layout from "./Layout";

// Alias imports (configured in tsconfig)
import { client } from "../tina/__generated__/client";

// Standard library
import React from "react";

// Third-party (alphabetical within groups)
import { useState } from "react";
```

### Formatting (Biome)

Configured in `biome.json`:

- **Indent**: 4 spaces, **Line width**: 80 characters
- **Line endings**: LF, **Quotes**: Single for JS, double for JSX
- **Semicolons**: Always, **Trailing commas**: All
- **Bracket spacing**: Enabled

### Naming Conventions

- **Components**: PascalCase (`Layout`, `BlogList`)
- **Files**: camelCase for utilities, PascalCase for components
- **Variables/functions**: camelCase (`fetchLatestPosts`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Interfaces**: PascalCase, optionally prefixed with `T` (`TPost`)

### Error Handling

- Use try/catch for async operations
- Log errors with descriptive messages
- Return empty arrays/defaults on error (see `lib/tina.ts`)
- Never expose internal errors to users
- Never commit secrets or API keys

### CSS/Styling

- Tailwind CSS v4 with CSS-first configuration (`styles.css`)
- DaisyUI themes: `minimal` (default), `winter`, `dark`
- Typography plugin for prose content
- Minimal custom CSS; leverage DaisyUI/Tailwind utilities

## File Organization

```
components/  - React components (Pages, Layout, UI)
lib/         - Utility functions and API clients
pages/       - Next.js pages and routes
posts/       - Blog post content (Markdown)
tina/        - TinaCMS configuration and schema
public/      - Static assets
data/        - JSON data files
scripts/     - Build and utility scripts
```

## Important Configuration Files

- `biome.json` - Linting and formatting rules
- `tsconfig.json` - TypeScript configuration
- `package.json` - Scripts and dependencies
- `next.config.js` - Next.js configuration
- `styles.css` - Tailwind v4 and DaisyUI theme configuration
- `.nvmrc` - Node.js version

## Development Notes

- TinaCMS requires `tinacms build` before production build
- Markdown files use raw-loader for direct import
- Image domains: `gyazo.com` configured in Next.js
- Three DaisyUI themes available: `minimal`, `winter`, `dark`
- Webfinger redirects configured for Fediverse support
- Node.js version specified in `.nvmrc`

## Common Tasks

```bash
# Create a new blog post
# Add .md file to posts/ with frontmatter

# Create a new page
# Add .tsx file to pages/

# Create a new component
# Create in components/ with PascalCase name
```

## After Code Changes

Run linting and format:

```bash
pnpm lint && pnpm format
```
