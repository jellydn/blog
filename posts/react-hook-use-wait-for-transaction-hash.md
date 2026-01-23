---
date: "04/30/2021 9:53 PM +0800"
tag:
  - React
  - Hooks
author: Dung Huynh
hero_image: /static/use-wait-for-transaction-hash.png
title: React Hook - Use wait for transaction hash
description: Poll ETH transaction status in React
_template: post
---

## Context

When submitting transactions to Ethereum, you get a hash but need to poll for the receipt to know if it succeeded. Libraries like BlockNative exist but are paid. `use-wait-for-transaction-hash` provides a free hook using HTTP polling.

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
