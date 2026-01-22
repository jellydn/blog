---
date: "05/31/2022 11:41 AM +0800"
tag:
  - redis
  - aws
  - Amazon ElastiCache
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 26 - How to connect to Redis on AWS (Amazon ElastiCache)"
description: Connect ioredis to AWS ElastiCache with TLS
_template: post
---

## What

Connect ioredis to AWS ElastiCache Redis with proper TLS and reconnection handling.

## Why

ElastiCache requires TLS (`rediss://`) and needs special handling for connection errors.

## How

```typescript
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL, {
  lazyConnect: true,
  connectTimeout: 15000,
  retryStrategy: (times) => Math.min(times * 30, 1000),
  reconnectOnError(err) {
    // Retry on specific errors
    return [/READONLY/, /ETIMEDOUT/].some((re) => re.test(err.message));
  },
});
```
