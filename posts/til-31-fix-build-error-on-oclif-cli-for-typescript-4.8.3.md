---
date: "09/14/2022 12:27 PM +0800"
tag:
  - cli
  - oclif
  - tsup
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 31 - Fix build error on oclif CLI for Typescript 4.8.3"
description: Fix TS2344 error in oclif with tsup
_template: post
---

## What

Fix `error TS2344: Type 'F' does not satisfy the constraint 'FlagOutput'` in oclif with TypeScript 4.8+.

## Why

TypeScript 4.8 introduced stricter type checking that breaks oclif's default `tsc` build.

## How

Replace `tsc` with `tsup`:

**package.json:**

```json
{
  "build": "tsup"
}
```

**tsup.config.json:**

```json
{
  "entry": ["src/**/*.ts"],
  "splitting": false,
  "sourcemap": true,
  "clean": true
}
```
