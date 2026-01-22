---
date: 10/08/2020 12:06 PM +0800
tag:
  - Typescript
  - TS-Node
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 7 - Use tsconfig.json for ts-node"
description: Configure ts-node overrides in tsconfig.json
---

## What

Add ts-node-specific configuration to your existing `tsconfig.json`.

## Why

ts-node may need different compiler options than your build (e.g., CommonJS for runtime execution).

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
