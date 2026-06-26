# CONCERNS.md - Technical Debt & Areas of Concern

## 🟡 Known Tech Debt

### 1. TypeScript Strict Mode Disabled

- **File**: `tsconfig.json`
- **Issue**: `"strict": false` disables all strict type checks (strictNullChecks, strictFunctionTypes, etc.)
- **Risk**: Allows potential null reference errors and type safety gaps
- **Effort**: Medium — would require adding null checks across many components
- **Note**: TS 6.0.3 is installed, which is very modern, making the lack of strict mode notable

### 2. `@ts-expect-error` Suppressions

- **Files**: Various (`pages/index.tsx`, `pages/notes/index.tsx`, `pages/notes/tag/[tag].tsx`, `pages/videos/index.tsx`, `components/YoutubeVideo.tsx`)
- **Context**: All related to `require.context` (webpack function) and `YoutubeVideo` JSX intrinsic type
- **Issue**: Webpack-specific APIs not typed, and custom YouTube embed has type issues
- **Risk**: Low — these are known, platform-specific API limitations

### 3. No Test Coverage

- **Issue**: No automated tests anywhere in the project
- **Risk**: Medium — data scripts (scraping, API fetching) could break without detection
- **Mitigation**: CI validation catches build/lint failures

### 4. Hardcoded `revalidate: 86400`

- **Files**: `pages/index.tsx`, `pages/notes/index.tsx`, `pages/notes/tag/[tag].tsx`, `pages/posts/index.tsx`, `pages/videos/index.tsx`
- **Issue**: ISR revalidation interval (24 hours) is hardcoded rather than configured
- **Risk**: Low — but changing interval requires editing multiple files

### 5. Sitemap Generation

- **File**: `public/sitemap.xml`
- **Issue**: Static XML file with mixed date formats (ISO 8601 + custom `+0800` format) and inconsistency — some paths use `//` (double slash) in URLs
- **Risk**: Low — search engines still index the pages, but may not parse all dates correctly

### 6. `scripts/fetch-github-repos.sh` — Duplicate

- **File**: `scripts/fetch-github-repos.sh`
- **Issue**: Redundant bash alternative to `scripts/fetch-repos.ts`
- **Risk**: Low — likely unused, the TS version is the active one

## 🟠 Potential Issues

### 1. Pre-commit Hook Discrepancy

- **Issue**: Local pre-commit hook uses cached Biome 2.4.x (doesn't support `preset` key), while `package.json` installs 2.5.1
- **Root cause**: The `pre-commit` tool's Python environment is broken (`Python 3.11` missing), preventing `pre-commit autoupdate`
- **Current workaround**: The project uses the old `"recommended": true` format (deprecated but functional)
- **Fix needed**: Fix Python environment to allow pre-commit updates, or migrate away from pre-commit tool

### 2. `pnpm-workspace.yaml` Single Package

- **File**: `pnpm-workspace.yaml`
- **Issue**: `packages: []` means the workspace has no sub-packages — essentially a single package project
- **Note**: This works but is unusual. The workspace is used primarily for the `pnpm.onlyBuiltDependencies` and `allowBuilds` features

### 3. Multiple Analytics Services

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
