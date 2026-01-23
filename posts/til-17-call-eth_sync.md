---
date: "09/07/2021 7:43 PM +0800"
tag:
  - Web3
  - EthersJs
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 17 - Call eth_sync"
description: Call unsupported ETH RPC methods with ethers.js
_template: post
---

## What

Call Ethereum JSON-RPC methods not directly exposed by ethers.js.

## Why

Ethers.js doesn't wrap every RPC method. Some like `eth_syncing` need raw calls.

## How

```typescript
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const syncing = await provider.send("eth_syncing", []);
```
