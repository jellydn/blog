---
date: "03/07/2022 10:20 AM +0800"
tag:
  - fastify
  - trpc
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 24 - Workaround for tRPC Fastify adapter CORS policy"
description: Handle CORS preflight in tRPC Fastify adapter
_template: post
---

## What

Fix CORS preflight (OPTIONS) requests in tRPC with Fastify adapter.

## Why

tRPC Fastify adapter doesn't handle OPTIONS requests by default, causing browser CORS errors.

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
