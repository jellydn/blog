---
date: "09/07/2021 7:43 PM +0800"
tag:
  - Web3
  - EthersJs
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 17 - Call eth_sync"
description: "Call unsupported JSON-RPC methods like eth_syncing with ethers.js provider.send"
_template: post
---

## What

Call Ethereum JSON-RPC methods that ethers.js does not wrap (like `eth_syncing`) via `provider.send`.

## Why

Ethers.js exposes many JSON-RPC methods as typed functions, but a particular version may not wrap every standard method. The underlying `JsonRpcProvider.send(method, params)` lets you call standard methods such as `eth_syncing`, as well as node-specific methods that your endpoint supports.

## How

```typescript
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const syncing = await provider.send("eth_syncing", []);
```
