# CONCERNS.md - Technical Debt & Areas of Concern

## ✅ Resolved

### 1. TypeScript Strict Mode Enabled

- **File**: `tsconfig.json`
- **Status**: `Resolved` — `"strict": true` enabled with `"ignoreDeprecations": "6.0"` (for TS 6.0 compat on `target: ES5` and `baseUrl`) and `"downlevelIteration": true` (for `matchAll()` support)
- **Fix**: All 12 strict mode type errors fixed across 8 source files (commit `d12248b`)
  - `as string` assertions after guard checks (YouTube API keys)
  - `?? ''` fallbacks for optional env vars
  - `@types/prismjs` 1.26.6 added for dynamic import type resolution
  - Custom `<lite-youtube>` type declaration → 2 `@ts-expect-error` removed
  - Fallback throw in retry loop
- **Validation**: Typecheck, lint, and build all pass

### 2. Pre-commit Hook Fixed

- **Status**: `Resolved` — Pre-commit reinstalled via pip under Python 3.14
- **Fix**: `pip install --user pre-commit` installed v4.6.0 under the working Python 3.14 env
- **Hook versions**: All hooks confirmed up to date via `pre-commit autoupdate` (biome v2.5.1, prettier v4.0.0-alpha.8)
- **Note**: The Homebrew-installed pre-commit binary at `/opt/homebrew/bin/pre-commit` still points to a missing Python 3.11 interpreter. The pip-installed version at `~/.local/bin/pre-commit` should be used instead. Running `pre-commit` commands via `~/.local/bin/pre-commit` works correctly.

## 🟡 Known Tech Debt

### 1. `@ts-expect-error` Suppressions

- **Files**: 5 remaining suppressions in `pages/index.tsx`, `pages/notes/index.tsx`, `pages/notes/tag/[tag].tsx` (×2), `pages/videos/index.tsx`
- **Context**: All related to `require.context` (Webpack-specific function)
- **Issue**: Webpack-specific APIs not typed in TypeScript
- **Risk**: Low — these are known, platform-specific API limitations
- **Note**: 2 suppressions were removed (`components/YoutubeVideo.tsx` — fixed via custom element type declaration; `pages/notes/index.tsx` — unused directive removed during markdown refactor)

### 2. Sitemap Generation

- **File**: `public/sitemap.xml`
- **Issue**: Static XML file with mixed date formats (ISO 8601 + custom `+0800` format) and inconsistency — some paths use `//` (double slash) in URLs
- **Risk**: Low — search engines still index the pages, but may not parse all dates correctly

### 3. `scripts/fetch-github-repos.sh` — Duplicate

- **File**: `scripts/fetch-github-repos.sh`
- **Issue**: Redundant bash alternative to `scripts/fetch-repos.ts`
- **Risk**: Low — likely unused, the TS version is the active one

## 🟠 Potential Issues

### 1. `pnpm-workspace.yaml` Single Package

- **File**: `pnpm-workspace.yaml`
- **Issue**: `packages: []` means the workspace has no sub-packages — essentially a single package project
- **Note**: This works but is unusual. The workspace is used primarily for the `pnpm.onlyBuiltDependencies` and `allowBuilds` features

### 2. Multiple Analytics Services

- **Files**: `pages/_app.tsx`
- **Issue**: Two analytics services loaded (GoatCounter + Umami)
- **Risk**: Performance overhead from loading two analytics scripts
- **Note**: May be intentional for comparison/fallback

## 🔴 Security Concerns

### 1. `noDangerouslySetInnerHtml` Disabled

- **File**: `biome.json` (override for `pages/posts/[slug].tsx`)
- **Reason**: Blog post content from Hashnode includes HTML that must be rendered
- **Mitigation**: Content is from a trusted source (own blog via Hashnode)

### 2. No Content Sanitization

- **Note**: Blog post content rendered via `dangerouslySetInnerHTML` without explicit sanitization
- **Risk**: Low since content comes from own crawled data, but XSS vector if Hashnode is compromised

### 3. No Authentication/Authorization

- **Note**: This is appropriate for a public blog; no sensitive data or user accounts

## 🟢 Performance Observations

### 1. Largest Source Files

- **`styles.css`**: Contains DaisyUI theme definitions + pattern SVG
- **`pages/index.tsx`**: Large component with inline card sub-components
- **`scripts/fetch-youtube-videos.ts`**: Largest script with playlist fetching logic

### 2. Image Optimization

- All images use `next/image` with proper sizing
- Remote images allowed from: `gyazo.com`, `cdn.hashnode.com`, `hashnode.com`, `i.ytimg.com`

### 3. Bundle Size

- Dynamic imports for YouTube and Blog sections (code-splitting)
- PrismJS CSS imported in `_app.tsx` (global, not lazy-loaded)

## 📋 CI/CD Notes

### 1. Pre-commit CI Check

- **File**: `.github/workflows/pre-commit.yml`
- **Issue**: Runs `pre-commit run --all-files` in CI — may fail if the environment doesn't match local expectations

### 2. Scheduled Data Workflows

- `fetch-blog-posts.yml` and `fetch-data.yml` run on schedule
- Will fail silently if APIs change without notification
- **Mitigation**: Manual runs via `bun scripts/fetch-*.ts`

## 🧹 Suggested Improvements (Not Implemented)

1. **Extract inline card components** from `pages/index.tsx` into separate files (currently ~650 lines)
2. **Add type safety** to the `require.context` pattern (e.g., a utility wrapper)
3. **Centralize ISR revalidation interval** into a shared constant
4. **Automate sitemap generation** as part of CI (currently static)
5. **Remove unused `scripts/fetch-github-repos.sh`** if confirmed unused
6. **Consolidate analytics** to one service if both aren't needed
