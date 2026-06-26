# STACK.md - Technology Stack

## Language & Runtime

| Attribute       | Value                                          |
| --------------- | ---------------------------------------------- |
| Language        | TypeScript 6.0.3 (strict mode disabled)        |
| Runtime         | Node.js (LTS via `.nvmrc`: `lts/*`, local v24) |
| Package Manager | pnpm 11.9.0 (workspace mode, single package)   |
| Module System   | ESNext (`moduleResolution: bundler`)           |

## Framework

- **Next.js 16.2.9** (React 19.2.7)
  - Static Site Generation (SSG) via `getStaticProps`
  - Incremental Static Regeneration (ISR) with `revalidate: 86400`
  - API Routes (`/api/posts`, `/api/youtube-videos`)
  - Image Optimization via `next/image` with `sharp` 0.35.2
  - Turbopack for development
  - Webpack for production builds (`.md` raw-loader)

## Styling

| Layer        | Technology                                               |
| ------------ | -------------------------------------------------------- |
| Base         | Tailwind CSS v4.3.1 with `@tailwindcss/postcss`          |
| UI Framework | DaisyUI 5.6.0 (3 themes: minimal, winter, dark)          |
| Typography   | `@tailwindcss/typography` 0.5.20 (for blog content)      |
| PostCSS      | `postcss-flexbugs-fixes`, `postcss-preset-env` (stage 3) |
| PurgeCSS     | `@fullhuman/postcss-purgecss` 8.0.0                      |

## Linting & Formatting

- **Biome 2.5.1** (linter + formatter, single tool)
  - Preset: `recommended`
  - Indent: 4 spaces, Line width: 80, LF endings
  - Single quotes (JS), Double quotes (JSX)
  - Auto-organize imports on save
  - Exceptions: `admin/**` (linter disabled), `styles.css` (lint+format disabled)
- **Prettier** (via pre-commit hook, for HTML/CSS/markdown only — files Biome doesn't support)
- **CSpell** (`cspell.json`) with custom dictionary entries
- **Pre-commit hooks** (`.pre-commit-config.yaml`):
  - `biome-check` v2.5.1
  - `prettier` v4.0.0-alpha.8

## Key Dependencies

### Runtime (dependencies)

| Package               | Version | Purpose                      |
| --------------------- | ------- | ---------------------------- |
| `next`                | 16.2.9  | React framework              |
| `react` / `react-dom` | 19.2.7  | UI library                   |
| `next-themes`         | 0.4.6   | Theme toggle (light/dark)    |
| `next-seo`            | 7.2.0   | SEO metadata generation      |
| `@giscus/react`       | 3.1.0   | Comment system               |
| `@happykit/flags`     | 3.3.0   | Feature flags                |
| `swr`                 | 2.4.2   | Data fetching (client-side)  |
| `gray-matter`         | 4.0.3   | Frontmatter parsing          |
| `glob`                | 13.0.6  | File matching for SSG paths  |
| `react-markdown`      | 10.1.0  | Markdown rendering           |
| `remark-gfm`          | 4.0.1   | GFM markdown support         |
| `prismjs`             | 1.30.0  | Code syntax highlighting     |
| `raw-loader`          | 4.0.2   | Webpack raw loader for `.md` |
| `lite-youtube-embed`  | 0.3.4   | YouTube embed component      |
| `sharp`               | 0.35.2  | Image processing             |

### Dev Dependencies

| Package                | Version | Purpose                     |
| ---------------------- | ------- | --------------------------- |
| `typescript`           | 6.0.3   | TypeScript compiler         |
| `@biomejs/biome`       | 2.5.1   | Linter + formatter          |
| `tailwindcss`          | 4.3.1   | CSS framework               |
| `@tailwindcss/postcss` | 4.3.1   | PostCSS plugin for Tailwind |
| `autoprefixer`         | 10.5.2  | CSS vendor prefixes         |
| `postcss`              | 8.5.15  | CSS transformation          |
| `sort-package-json`    | 4.0.0   | Package.json sorting        |

## Configuration Files

| File                      | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| `next.config.js`          | Next.js config (image domains, webpack, redirects) |
| `tsconfig.json`           | TypeScript config (strict: false, baseUrl: ".")    |
| `biome.json`              | Linting & formatting rules                         |
| `postcss.config.js`       | PostCSS plugins                                    |
| `styles.css`              | Tailwind v4 + DaisyUI theme definitions            |
| `tailwind.config.js`      | Minimal (Tailwind v4 uses CSS config)              |
| `pnpm-workspace.yaml`     | Workspace config (single package + allowed builds) |
| `.nvmrc`                  | Node version (lts/\*)                              |
| `.npmrc`                  | npm client settings                                |
| `.pre-commit-config.yaml` | Git pre-commit hooks                               |
| `renovate.json`           | Automated dependency updates                       |
| `cspell.json`             | Spell check configuration                          |

## CI/CD

- **GitHub Actions** (`.github/workflows/`):
  - `deploy-verify.yml` — Lint + build on PR/branch
  - `fetch-blog-posts.yml` — Scheduled blog data refresh from Hashnode
  - `fetch-data.yml` — Scheduled YouTube + GitHub data refresh
  - `pre-commit.yml` — Pre-commit validation
- **Platform**: Vercel (production at productsway.com)
- **Renovate Bot**: Automated dependency PRs (auto-merge for non-major)
