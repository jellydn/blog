# CONVENTIONS.md - Code Style & Patterns

## TypeScript Conventions

### Configuration

- **strict mode**: Enabled (`"strict": true` with `"ignoreDeprecations": "6.0"` for TS 6.0 compat)
- **target**: ES5 (limitation for broader browser support)
- **module resolution**: `bundler` (modern, fast resolution)
- **baseUrl**: `"."` (enables absolute imports like `components/Button`)

### Type Definitions

```typescript
// Use interface for object types
interface TinaPost {
  _sys: { filename: string };
  title: string;
  // ...
}

// Use type for unions and primitives
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type BlogPostSummary = {
  slug: string;
  title: string;
  // ...
};
```

### Error Handling

```typescript
// Try-catch returning default values (no throwing)
try {
  const result = await someAsyncOperation();
  return result;
} catch {
  return []; // Return empty/default on error
}
```

## React Conventions

### Component Patterns

- Functional components with hooks
- Default exports for pages/layouts: `export default Layout`
- Named exports for reusable components: `export function Button`
- `React.FC<Props>` type annotation for page/layout components
- Inline props interfaces for simple components

### Imports

```typescript
// Absolute (baseUrl-based) for project imports
import { Button } from "components/Button";
import Layout from "components/Layout";
import { formatDate } from "lib/utils/date";

// Relative for same-directory imports
import Footer from "./Footer";

// Standard library imports
import React from "react";
```

### Dynamic Imports

```typescript
const YoutubeSection = dynamic(() =>
  import("components/YoutubeSection").then((mod) => mod.YoutubeSection),
);
```

### SSG Pattern

```typescript
export async function getStaticProps() {
  return {
    props: {
      /* data */
    },
    revalidate: 86400, // ISR: daily
  };
}
```

## CSS/Styling Conventions

- **Tailwind CSS v4** with `@import "tailwindcss"` directive
- **DaisyUI 5.6.0** component classes (`btn`, `card`, `badge`, etc.)
- **Three themes** defined in `styles.css`:
  - `minimal` (default, light) — Monochrome black/white
  - `winter` (prefers dark) — Blue/white
  - `dark` — Dark slate/purple
- Custom scrollbar styling in `styles.css`
- Background pattern SVG in `.pattern` class
- Markdown prose styling with dark code blocks

## Testing

- **Vitest 4** with `@testing-library/react` and `jsdom`
- **Test location**: `tests/` mirroring `components/` and `lib/` structure
- **Run**: `pnpm test` (single run) or `pnpm test:watch`
- **Setup**: `tests/setup.tsx` with mocks for `next/image`, `next/head`, `next/script`
- **Current coverage**: 62 tests across 4 files (data utilities, card components, section components)

## Code Formatting (Biome)

| Rule            | Setting |
| --------------- | ------- |
| Indent style    | Spaces  |
| Indent width    | 4       |
| Line width      | 80      |
| Quotes (JS)     | Single  |
| Quotes (JSX)    | Double  |
| Semicolons      | Always  |
| Trailing commas | All     |
| Arrow parens    | Always  |
| Bracket spacing | Enabled |

## Naming Conventions

| Category              | Convention       | Examples                           |
| --------------------- | ---------------- | ---------------------------------- |
| Components            | PascalCase       | `BlogPostsSection`, `YoutubeVideo` |
| Files (utilities)     | camelCase        | `formatDate`, `dedupeBySlug`       |
| Files (components)    | PascalCase       | `Header.tsx`, `Layout.tsx`         |
| Data files            | kebab-case       | `blog-posts.json`, `repos.json`    |
| Scripts               | kebab-case       | `fetch-youtube-videos.ts`          |
| Environment variables | UPPER_SNAKE_CASE | `YOUTUBE_API_KEY`, `GITHUB_TOKEN`  |

## Markdown Content Pattern

### Post/Notes Frontmatter

```yaml
---
title: "Post Title"
description: "Short description"
date: "2024-01-01"
tag: ["neovim", "vim"]
hero_image: "https://example.com/image.jpg"
---
```

### Video Frontmatter (auto-generated)

```yaml
---
title: "Video Title"
description: "Video description..."
date: "2024-01-01"
youtube_id: "dQw4w9WgXcQ"
tag: ["Neovim", "CLI"]
hero_image: "https://i.ytimg.com/vi/..."
---
```

## Biome Overrides

```json
{
  "overrides": [
    { "includes": ["admin/**"], "linter": { "enabled": false } },
    {
      "includes": ["pages/posts/\\[slug\\].tsx"],
      "linter": {
        "rules": { "security": { "noDangerouslySetInnerHtml": "off" } }
      }
    },
    {
      "includes": ["styles.css"],
      "linter": { "enabled": false },
      "formatter": { "enabled": false }
    }
  ]
}
```

## Pre-commit Hooks

- Biome check (format + lint + organize imports)
- Prettier for HTML/CSS/markdown (files Biome doesn't support)
