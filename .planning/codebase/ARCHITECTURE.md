# ARCHITECTURE.md - System Architecture

## Overview

Single-page application (with static generation) built on Next.js. The site is a personal blog/portfolio for Dung Huynh Duc (IT Man). Content is pre-rendered at build time and regenerated incrementally.

## Rendering Strategy

- **Static Site Generation (SSG)**: All pages use `getStaticProps` to pre-render HTML at build time
- **Incremental Static Regeneration (ISR)**: `revalidate: 86400` (daily) on most pages
- **Client-side data fetching**: YouTube videos section uses SWR + prefetch script for fresh data without rebuild
- **Dynamic routes**: `[slug].tsx` patterns for notes, posts, videos

## Data Flow

```
┌─────────────────────────┐
│   CI (GitHub Actions)   │
│  ┌────────────────┐    │
│  │ fetch:blog     │    │  ← Scrapes blog.productsway.com
│  │ fetch:videos   │    │  ← YouTube Data API
│  │ fetch:repos    │    │  ← GitHub REST API
│  └──────┬─────────┘    │
│         │ writes to    │
└─────────┼──────────────┘
          ▼
┌──────────────────────┐
│   Static Data Files  │
│  data/blog-posts.json│
│  data/repos.json     │
│  videos/*.md         │
│  posts/*.md          │
└──────┬───────────────┘
       │ imported at SSG build time
       ▼
┌──────────────────────┐
│  Next.js SSG + ISR   │
│  pages/index.tsx     │
│  pages/notes/*       │
│  pages/videos/*      │
│  pages/posts/*       │
└──────┬───────────────┘
       │ Vercel deployment
       ▼
┌──────────────────────┐
│  productsway.com     │
│  (Vercel edge)       │
└──────────────────────┘
```

## Page Architecture

### Entry Points

| Path               | Component                   | Data Source                                              | Revalidation    |
| ------------------ | --------------------------- | -------------------------------------------------------- | --------------- |
| `/`                | `pages/index.tsx`           | `data/blog-posts.json`, `data/repos.json`, `videos/*.md` | SSG+ISR (86400) |
| `/notes`           | `pages/notes/index.tsx`     | `posts/*.md` (markdown)                                  | SSG+ISR (86400) |
| `/notes/[slug]`    | `pages/notes/[slug].tsx`    | `posts/*.md` (renders markdown)                          | SSG+ISR (86400) |
| `/notes/tag/[tag]` | `pages/notes/tag/[tag].tsx` | Filtered from `posts/*.md`                               | SSG+ISR (86400) |
| `/posts`           | `pages/posts/index.tsx`     | `data/blog-posts.json`                                   | SSG+ISR (86400) |
| `/videos`          | `pages/videos/index.tsx`    | `videos/*.md`                                            | SSG+ISR (86400) |
| `/video/[slug]`    | `pages/video/[slug].tsx`    | `videos/*.md`                                            | SSG+ISR (86400) |
| `/resume.pdf`      | `pages/resume.pdf.tsx`      | Server-side rendering                                    | N/A             |

### API Routes

| Route                 | Purpose                                          | Method             |
| --------------------- | ------------------------------------------------ | ------------------ |
| `/api/youtube-videos` | Proxy to YouTube API for live videos on homepage | `GET` → JSON array |
| `/api/posts`          | Legacy API endpoint                              | `GET` → JSON array |

### Component Tree

```
MyApp (_app.tsx)
└── ThemeProvider (next-themes)
    ├── Scripts (GoatCounter, Umami analytics)
    └── Component (page content)
        └── Layout
            ├── Meta (SEO)
            ├── Header
            │   ├── Logo (Image)
            │   ├── NavLink items
            │   ├── ThemeToggleButton
            │   └── SocialLink items
            ├── Page Content
            │   ├── Hero section
            │   ├── About section
            │   ├── Projects grid
            │   ├── VS Code Extensions
            │   ├── Neovim Plugins
            │   ├── CLI/TUI Tools
            │   ├── YoutubeSection (dynamic import)
            │   ├── BlogPostsSection (dynamic import)
            │   └── Contact section
            └── Footer
```

## Key Patterns

### 1. Layout Pattern

`Layout` wraps all pages with header + footer + meta. Uses React children prop pattern.

### 2. Dynamic Imports

YouTube and Blog sections use `next/dynamic` for code-splitting:

```typescript
const YoutubeSection = dynamic(() =>
  import("components/YoutubeSection").then((mod) => mod.YoutubeSection),
);
```

### 3. SSG with fallback data

Pages pre-render with cached data, then optionally fetch fresh data client-side:

- YouTube: Prefetch script runs before hydration, fetches `/api/youtube-videos`
- Blog posts: Static data from `blog-posts.json`, with live API fallback (legacy)

### 4. Theme Toggle

Custom `useTheme` hook wrapping `next-themes`:

- Toggles between `minimal` (light) and `dark` DaisyUI themes
- Uses `data-theme` attribute on `<html>`
- Disables system preference detection

### 5. Data Scripts (CI)

All data fetching scripts run via CI on a schedule (daily), not at runtime:

- `scripts/fetch-blog-posts.ts` — bun script
- `scripts/fetch-youtube-videos.ts` — bun script
- `scripts/fetch-repos.ts` — bun script
- `scripts/generate-sitemap.sh` — bash script

## Key Architectural Decisions

1. **No database** — Everything is file-based (markdown posts, JSON data files)
2. **Crawl, don't API** — Hashnode blog is scraped via sitemap/meta tags rather than API
3. **CI-driven data refresh** — External data is fetched in CI, not at request time
4. **SSG + ISR over SSR** — Maximizes performance, static files served from CDN
5. **Single package** — Not a true monorepo despite pnpm workspace config
