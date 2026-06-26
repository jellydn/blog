# INTEGRATIONS.md - External Integrations & APIs

## Hosting & Deployment

| Provider   | Purpose                                  | URL                                        |
| ---------- | ---------------------------------------- | ------------------------------------------ |
| **Vercel** | Production hosting & preview deployments | [productsway.com](https://productsway.com) |

## Content Sources

| Source                              | Purpose                       | Data Flow                                                                 |
| ----------------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| **Hashnode** (blog.productsway.com) | Blog posts hosted on Hashnode | Crawled via `fetch-blog-posts.ts` → `data/blog-posts.json` (daily via CI) |
| **YouTube**                         | Video content                 | Fetched via `fetch-youtube-videos.ts` → `videos/*.md` (daily via CI)      |
| **GitHub**                          | Repo/project data             | Fetched via `fetch-repos.ts` → `data/repos.json` (daily via CI)           |

## External APIs

### YouTube Data API v3

- **Purpose**: Fetch video metadata, playlists, view counts
- **Auth**: API key (`YOUTUBE_API_KEY` as env var)
- **Usage**:
  - `lib/youtube.ts` — Server-side runtime fetch (latest 6 videos for homepage)
  - `scripts/fetch-youtube-videos.ts` — CI script for full video catalog
  - Endpoints: `/search`, `/playlistItems`, `/videos`, `/playlists`
  - Channel: `CHANNEL_ID` env var

### GitHub REST API

- **Purpose**: Fetch user repos for project showcase
- **Auth**: Optional `GITHUB_TOKEN` for authenticated requests (60 req/hr unauthenticated, 5000 req/hr authenticated)
- **Usage**:
  - `scripts/fetch-repos.ts` — CI script, categorizes repos by topics (neovim, vscode, ai, cli, web, misc)
  - Endpoint: `GET /users/jellydn/repos`

### Hashnode (Scraping)

- **Purpose**: Fetch blog post metadata
- **Method**: HTTP scraping (sitemap.xml → post pages → meta tags)
  - No API key needed
  - Rate-limited (300ms delay between requests)
  - Extracts: og:title, og:description, og:image, article:published_time, article:tag
- **Script**: `scripts/fetch-blog-posts.ts`
- **Output**: `data/blog-posts.json`

## Analytics

| Service         | Type                    | Setup                                      |
| --------------- | ----------------------- | ------------------------------------------ |
| **GoatCounter** | Privacy-first analytics | `Script` with `data-goatcounter` attribute |
| **Umami**       | Privacy-first analytics | `Script` with `data-website-id` attribute  |

Both loaded via `next/script` with `strategy="afterInteractive"` in `pages/_app.tsx`.

## Comments

- **Giscus** (`@giscus/react` 3.1.0) — GitHub Discussions-powered comment system
  - Used on blog post pages
  - Requires GitHub Discussions to be enabled on the repo

## Feature Flags

- **HappyKit Flags** (`@happykit/flags` 3.3.0) — Feature flag service
  - Config: `flags/config.ts`
  - Current flags: `it_man_shop` (boolean, default false)
  - Client-side: `useFlags`, `useFlagBag`
  - Server-side: `getFlags`
  - Edge: `getEdgeFlags`
  - Env key: `NEXT_PUBLIC_FLAGS_ENVIRONMENT_KEY`

## Theme

- **next-themes** 0.4.6 — Theme management
  - Two themes: `minimal` (light), `dark`
  - Stored via `data-theme` attribute on `<html>`
  - No system preference detection (`enableSystem: false`)

## SEO

- **next-seo** 7.2.0 — SEO metadata generation
  - Open Graph, Twitter Cards, canonical URLs
  - Used on all pages via `generateNextSeo`

## Security

- No authentication system
- No database
- No user data collection (privacy-first analytics only)
- All external scripts loaded via `next/script` with explicit strategy
