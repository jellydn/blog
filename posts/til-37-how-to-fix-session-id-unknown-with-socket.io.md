---
date: "02/23/2023 7:19 PM +0800"
tag:
  - Session ID unknown
  - socket.io
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 37 - How to fix Session ID unknown with socket.io"
description: "Fix Socket.io Session ID unknown in multi-server setups by forcing websocket transport only"
_template: post
---

## What

Fix "Session ID unknown" errors when Socket.io runs behind a load balancer with multiple server instances.

## Why

HTTP long-polling sends separate requests that can land on different nodes — each node maintains its own session store, so the second request finds no matching session ID. Restricting transport to `websocket` keeps a persistent connection on one node, eliminating the need for sticky sessions.

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
