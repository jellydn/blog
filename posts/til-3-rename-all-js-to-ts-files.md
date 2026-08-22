---
date: "08/15/2020 12:41 AM +0800"
tag:
  - TIL
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 3 - Rename all JS to TS files"
description: "Bulk-rename .js files to .ts recursively with find and mv during a TypeScript migration"
_template: post
---

## What

Rename every `.js` file under a directory to `.ts` in one shell command.

## Why

TypeScript only type-checks files with a `.ts` or `.tsx` extension. When you migrate a large codebase, renaming hundreds of files by hand is error-prone — a `find` loop handles the whole tree at once.

## How

```sh
find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
```
