---
date: "10/08/2020 12:06 PM +0800"
tag:
  - Typescript
  - TS-Node
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 7 - Use tsconfig.json for ts-node"
description: "Override ts-node compiler options like module: commonjs inside tsconfig.json"
---

## What

Add a `ts-node` section to your existing `tsconfig.json` with runtime-specific compiler overrides.

## Why

Your build may target ES modules while ts-node needs CommonJS to execute scripts with `require()`. Putting overrides in `tsconfig.json` keeps one config file instead of passing flags on every ts-node invocation.

## How

```json
{
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  },
  "compilerOptions": {
    // Your project config
  }
}
```
