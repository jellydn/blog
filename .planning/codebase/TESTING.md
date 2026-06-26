# TESTING.md - Testing Overview

## Status: Vitest Configured

This project uses **Vitest 4** with `@testing-library/react` and `jsdom` for unit testing.

- **Test location**: `tests/` mirroring `components/` and `lib/` structure
- **Run**: `pnpm test` (single run) or `pnpm test:watch` (watch mode)
- **Setup**: `tests/setup.tsx` with mocks for `next/image`, `next/head`, `next/script`
- **Configuration**: `vitest.config.ts` (react plugin, path aliases, jsdom environment)
- **Coverage**: 62 tests across 4 test files

## Test Files

| Test File                                | Tests | Coverage              |
| ---------------------------------------- | ----- | --------------------- |
| `tests/lib/repos.test.ts`                | 15    | Data utility functions|
| `tests/components/RepoStars.test.tsx`    | 7     | Star formatting       |
| `tests/components/Cards.test.tsx`        | 11    | 3 card components    |
| `tests/components/Sections.test.tsx`     | 29    | 7 section components |

## Quality Assurance

### 1. Static Analysis

- **Biome linting** (`pnpm lint` / `npx biome ci .`) — catches code quality and style issues
- **Biome formatting** (`pnpm format`) — ensures consistent code style
- **CSpell** — spelling checks in code

### 2. TypeScript Compilation

- TypeScript `strict: true` with full strict mode enabled
- Build process (`pnpm build`) catches type errors via Next.js compilation

### 3. Pre-commit Hooks

- Biome check runs on every commit
- Prettier formats HTML/CSS/markdown

### 4. CI Pipeline

- `deploy-verify.yml` — Runs lint, test, and build on every push
- `fetch-blog-posts.yml`, `fetch-data.yml` — Scheduled data validation

## Suggested Improvements

- Add tests for: API routes (`pages/api/*`), page `getStaticProps` logic, data scripts
- Add Playwright for E2E testing of the full site
- Add CI step to run `pnpm test` in the deploy-verify workflow
