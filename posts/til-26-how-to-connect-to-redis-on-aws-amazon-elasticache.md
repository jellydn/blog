---
date: "05/31/2022 11:41 AM +0800"
tag:
  - redis
  - aws
  - Amazon ElastiCache
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 26 - How to connect to Redis on AWS (Amazon ElastiCache)"
description: "Connect ioredis to AWS ElastiCache over TLS with lazyConnect and reconnectOnError"
_template: post
---

## What

Connect ioredis to AWS ElastiCache Redis with TLS and resilient reconnection settings.

## Why

ElastiCache can enforce TLS through a `rediss://` URL and can briefly return `READONLY` during failover. `lazyConnect` defers the handshake until your first command. Returning `2` from `reconnectOnError` reconnects and resends a command rejected with `READONLY`; do not automatically resend timed-out writes because the server may already have applied them.

## How

```typescript
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL, {
  lazyConnect: true,
  connectTimeout: 15000,
  retryStrategy: (times) => Math.min(times * 30, 1000),
  reconnectOnError(err) {
    // The replica rejected the command, so it is safe to resend after reconnecting.
    return /READONLY/.test(err.message) ? 2 : false;
  },
});
```
