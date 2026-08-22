---
date: "03/07/2022 10:20 AM +0800"
tag:
  - fastify
  - trpc
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 24 - Workaround for tRPC Fastify adapter CORS policy"
description: "Fix tRPC Fastify adapter CORS preflight by returning 204 for OPTIONS in responseMeta"
_template: post
---

## What

Handle CORS preflight (OPTIONS) requests in tRPC's Fastify adapter via `responseMeta`.

## Why

Browsers send an OPTIONS request before cross-origin POSTs. The tRPC Fastify adapter rejects OPTIONS with `METHOD_NOT_SUPPORTED`, so the browser never sends the real request. Returning 204 with CORS headers in `responseMeta` satisfies the preflight check.

## How

```typescript
app.register(fp(fastifyTRPCPlugin), {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    responseMeta({ errors }) {
      // Handle OPTIONS preflight
      if (errors?.[0]?.code === "METHOD_NOT_SUPPORTED") {
        return {
          status: 204,
          headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "access-control-allow-origin": "*",
            vary: "Origin",
          },
        };
      }
      // Regular CORS headers
      return {
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "access-control-allow-origin": "*",
          vary: "Origin",
        },
      };
    },
  },
});
```
