# TESTING.md - Testing Overview

## Status: No Test Framework

This project currently has **no test framework configured**. Per `AGENTS.md`:

> No test framework configured. Do not add tests unless explicitly requested.

## Quality Assurance Without Tests

Despite the absence of automated unit/integration tests, the project maintains quality through:

### 1. Static Analysis

- **Biome linting** (`pnpm lint` / `npx biome ci .`) — catches code quality and style issues
- **Biome formatting** (`pnpm format`) — ensures consistent code style
- **CSpell** — spelling checks in code

### 2. TypeScript Compilation

- TypeScript `strict: false` but still provides basic type checking
- Build process (`pnpm build`) catches type errors via Next.js compilation

### 3. Pre-commit Hooks

- Biome check runs on every commit
- Prettier formats HTML/CSS/markdown

### 4. CI Pipeline

- `deploy-verify.yml` — Runs lint + build on every push
- `fetch-blog-posts.yml`, `fetch-data.yml` — Scheduled data validation

### 5. Manual Testing Patterns

- Preview deployments on Vercel for PR review
- `bun scripts/fetch-*.ts` — Manual execution to verify data scripts work

## Project Fit

The lack of tests is acceptable given the project profile:

- **Static site** — No user interaction, no forms, no API mutations
- **Personal blog** — Low risk, single contributor
- **File-based data** — No database to mock
- **Simple data flow** — Data → SSG → HTML (no complex state management)

## When Tests Would Add Value

- If dynamic features are added (e.g., contact form, search)
- If multiple contributors join
- If a database is introduced
- If the scraping scripts need reliability guarantees

## Suggested Test Framework (if needed)

- **Vitest** — Fast, TypeScript-native, compatible with Next.js
- **Playwright** — For end-to-end testing if interactive features are added
