---
date: "10/09/2022 3:07 PM +0800"
tag:
  - nodejs
  - expressjs
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 32 - List all express routes"
description: "List every registered Express route by walking app._router.stack programmatically"
_template: post
---

## What

Print every HTTP method and path registered in an Express application.

## Why

Express has no built-in route listing — middleware and nested routers hide paths from a simple grep. Walking `app._router.stack` recursively resolves regex patterns and sub-routers into readable `GET /users` lines for debugging or docs.

## How

```typescript
import { Application } from "express";

function split(thing: any): string {
  if (typeof thing === "string") return thing;
  if (thing.fast_slash) return "";
  const match = thing
    .toString()
    .replace("\\/?", "")
    .replace("(?=\\/|$)", "$")
    .match(/^\/\^((?:\\[._+?^${}()|[\]\\/]|[^._+?^${}()|[\]\\/])*)\$\//);
  return match ? match[1].replace(/\\(.)/g, "$1") : `<complex:${thing}>`;
}

function getRoutesOfLayer(path: string, layer: any): string[] {
  if (layer.method) return [`${layer.method.toUpperCase()} ${path}`];
  if (layer.route)
    return getRoutesOfLayer(
      path + split(layer.route.path),
      layer.route.stack[0],
    );
  if (layer.name === "router" && layer.handle.stack) {
    return layer.handle.stack.flatMap((item: any) =>
      getRoutesOfLayer(path + split(layer.regexp), item),
    );
  }
  return [];
}

export function getRoutes(app: Application): string[] {
  return app._router.stack.flatMap((layer: any) => getRoutesOfLayer("", layer));
}

// Usage
const allRoutes = getRoutes(app);
console.log(allRoutes);
```
