---
date: "10/09/2022 3:07 PM +0800"
tag:
  - nodejs
  - expressjs
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 32 - List all express routes"
description: "Inspect registered Express routes by walking the internal router stack"
_template: post
---

## What

Print HTTP methods and paths from an Express application's internal router stack.

## Why

Express has no public route-listing API. Walking the internal router stack recursively can turn route layers and nested routers into readable `GET /users` lines for debugging. Express 4 exposes `_router`, while newer versions may expose `router`; because both are private internals, verify this helper when upgrading Express.

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
  if (layer.route) {
    return layer.route.stack.flatMap((item: any) =>
      getRoutesOfLayer(path + split(layer.route.path), item),
    );
  }
  if (layer.name === "router" && layer.handle.stack) {
    return layer.handle.stack.flatMap((item: any) =>
      getRoutesOfLayer(path + split(layer.regexp), item),
    );
  }
  return [];
}

export function getRoutes(app: Application): string[] {
  const router = (app as any).router ?? (app as any)._router;
  return (router?.stack ?? []).flatMap((layer: any) =>
    getRoutesOfLayer("", layer),
  );
}

// Usage
const allRoutes = getRoutes(app);
console.log(allRoutes);
```
