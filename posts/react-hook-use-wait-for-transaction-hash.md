---
date: "04/30/2021 9:53 PM +0800"
tag:
  - React
  - Hooks
author: Dung Huynh
hero_image: /static/use-wait-for-transaction-hash.png
title: React Hook - Use wait for transaction hash
description: "Poll an Ethereum RPC provider for transaction receipt status in React without a paid SDK"
_template: post
---

## Context

When you send a transaction on Ethereum, your wallet returns a hash immediately — but the chain hasn't confirmed it yet. You need to poll the RPC provider's `eth_getTransactionReceipt` endpoint until a receipt appears with `status: 1` (success) or `status: 0` (reverted). Paid services like BlockNative handle this for you; `use-wait-for-transaction-hash` is a free React hook that does the same polling over plain HTTP.

## Usage

```typescript
import { useWaitForTransactionHash } from 'use-wait-for-transaction-hash';

function TransactionStatus({ hash, providerUrl }: { hash: string; providerUrl: string }) {
  const { status } = useWaitForTransactionHash({ hash, providerUrl });

  return <div>Status: {status}</div>;
}
```

**Returns:** `"pending"` → `"success"` or `"failed"`

[Demo & Docs](https://use-wait-for-transaction-hash.vercel.app/)
