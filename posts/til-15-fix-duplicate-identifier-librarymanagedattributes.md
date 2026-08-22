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

When two packages each depend on a different `@types/react` version, Yarn installs both and TypeScript sees conflicting global type declarations. `yarn-deduplicate` collapses them to a single version in the lockfile.

## How

```sh
npx yarn-deduplicate yarn.lock
```

Then reinstall dependencies:

```sh
yarn install
```
