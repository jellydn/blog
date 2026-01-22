---
date: "08/15/2020 12:41 AM +0800"
tag:
  - TIL
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 3 - Rename all JS to TS files"
description: Bulk rename JavaScript to TypeScript files
_template: post
---

## What

Rename all `.js` files to `.ts` in a directory recursively.

## Why

Migrating to TypeScript requires renaming files first. Manual renaming is tedious for large codebases.

## How

```sh
find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
```
