---
date: 08/21/2021 10:22 PM +0800
tag:
  - React
  - Typescript
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 15 - Fix Duplicate identifier 'LibraryManagedAttributes'"
description: Fix duplicate @types/react with yarn-deduplicate
---

## What

Fix TypeScript duplicate identifier errors in React projects.

## Why

Multiple versions of `@types/react` in `node_modules` cause type conflicts.

## How

```sh
npx yarn-deduplicate yarn.lock
```

Then reinstall dependencies:
```sh
yarn install
```
