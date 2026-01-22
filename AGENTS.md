# AGENTS.md - Development Guidelines for productsway-blog

This document provides guidelines for agentic coding agents operating in this repository.

## Project Overview

A Next.js 15 blog with TinaCMS for content management, using TypeScript, Tailwind CSS, and DaisyUI. The blog features posts, videos, and experimental content for developers.

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

# Run linting (Next.js lint)
pnpm lint

# Run Biome formatter/linter
pnpm exec biome format --write .
pnpm exec biome check --apply .
```

### Pre-commit Hooks

Pre-commit hooks are configured via `.pre-commit-config.yaml`:

- Biome for formatting, importing, and linting
- Prettier for files Biome doesn't support (HTML, CSS, Markdown)

Run hooks manually:

```bash
pnpm exec biome-check
```

## Code Style Guidelines

### TypeScript

- **Strict mode**: Disabled in `tsconfig.json` (currently `strict: false`)
- **Target**: ES5
- **JSX**: Preserve
- **Module**: ESNext with Node resolution
- Use explicit type annotations for function parameters and return types
- Use `interface` for object types, `type` for unions/primitives
- Define custom types in `lib/*.ts` files

### React Components

- Use `React.FC<Props>` for component typing
- Use named exports for components: `export default ComponentName`
- Props interfaces should be inline or in the same file for simple components
- Prefer functional components with hooks over class components
- Handle null/undefined states explicitly

### Imports

```typescript
// Relative imports for local files
import Layout from "./Layout";

// Alias imports for project-wide imports (configured in tsconfig)
import { client } from "../tina/__generated__/client";

// Standard library imports
import React from "react";

// Third-party imports (alphabetical order within groups)
```

### Formatting (Biome)

- **Indent style**: Spaces (4 spaces)
- **Line width**: 80 characters
- **Line endings**: LF
- **Quotes**: Single quotes (`'`)
- **Semicolons**: Always
- **Trailing commas**: All
- **Bracket spacing**: Enabled

### Naming Conventions

- **Components**: PascalCase (`Layout`, `BlogList`)
- **Files**: camelCase for utility files, PascalCase for components
- **Variables/functions**: camelCase (`fetchLatestPosts`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Interfaces**: PascalCase, optionally prefixed with type (`TinaPost`)

### Error Handling

- Use try/catch for async operations
- Log errors with descriptive messages
- Return empty arrays or default values on error (see `lib/tina.ts`)
- Never expose internal errors to users
- Never commit secrets or API keys to the repository

### CSS/Styling

- Use Tailwind CSS utility classes
- DaisyUI themes: `corporate` and `winter` (configured in `tailwind.config.js`)
- Typography plugin for prose content
- Custom classes should be minimal; leverage DaisyUI/Tailwind

### File Organization

```
components/     - React components (Pages, Layout, UI)
lib/           - Utility functions and API clients
pages/         - Next.js pages and routes
posts/         - Blog post content (Markdown)
tina/          - TinaCMS configuration and schema
public/        - Static assets
data/          - JSON data files
scripts/       - Build and utility scripts
```

### Important Configuration Files

- `biome.json` - Linting and formatting rules
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind and DaisyUI config
- `next.config.js` - Next.js configuration
- `package.json` - Scripts and dependencies

### Development Notes

- TinaCMS requires running `tinacms build` before production build
- Markdown files use raw-loader for direct import
- Image domains: `gyazo.com` configured in Next.js config
- Webfinger redirects configured for Fediverse support

### Common Tasks

```bash
# Create a new blog post
# Add .md file to posts/ directory with frontmatter

# Create a new page
# Add .tsx file to pages/ directory

# Add a new component
# Create in components/ with PascalCase name
```
