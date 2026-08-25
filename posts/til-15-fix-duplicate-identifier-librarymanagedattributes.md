---
date: "08/21/2021 10:22 PM +0800"
tag:
  - React
  - Typescript
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 15 - Fix Duplicate identifier 'LibraryManagedAttributes'"
description: "Fix Duplicate identifier LibraryManagedAttributes by deduplicating @types/react with yarn-deduplicate"
---

## What

Fix the TypeScript "Duplicate identifier 'LibraryManagedAttributes'" error in React projects.

## Why

When two packages depend on compatible ranges of `@types/react`, Yarn can still install duplicate versions and TypeScript sees conflicting global declarations. `yarn-deduplicate` can select one version that satisfies both ranges. If the ranges are incompatible, align the dependencies or add a resolution before deduplicating.

## How

```sh
npx yarn-deduplicate yarn.lock
```

Then reinstall dependencies:

```sh
yarn install
```
