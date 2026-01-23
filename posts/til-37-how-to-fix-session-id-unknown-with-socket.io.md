---
date: "02/23/2023 7:19 PM +0800"
tag:
  - Session ID unknown
  - socket.io
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 37 - How to fix Session ID unknown with socket.io"
description: Fix Socket.io session errors in multi-server setups
_template: post
---

## What

Fix "Session ID unknown" errors in Socket.io deployments.

## Why

HTTP long-polling requires sticky sessions. Without load balancer affinity, requests hit different servers causing session mismatch.

## How

Disable HTTP long-polling, use WebSockets only:

```typescript
// Client-side
const socket = io({
  transports: ["websocket"],
});
```

WebSockets maintain persistent connection, eliminating the need for sticky sessions.

[Reference](https://socket.io/docs/v4/using-multiple-nodes/)
