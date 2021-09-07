---
date: 04/30/2021 9:53 PM +0800
tag:
  - React
  - Hooks
author: Dung Huynh
hero_image: '/static/use-wait-for-transaction-hash.png'
title: React Hook - Use wait for transaction hash
description: Simple hook for getting transaction status from the ETH network.
---

Hi there,

It's been a while when I am working on [https://use-wait-for-transaction-hash.vercel.app/](https://use-wait-for-transaction-hash.vercel.app/ 'use-wait-for-transaction-hash') react-hook library. Let me share with you about my journey when I wrote this library.

## What

If you have ever worked with blockchain, ETH is my case, after submitting a transaction to the network, you will get a transaction hash. From the end-user perspective, you need to tell the result of that transaction: fail or success.

## Why

I tried to search and found a good library but it's not free :) [https://docs.blocknative.com/notify](https://docs.blocknative.com/notify 'BlockNative Notify')

Then I asked myself, could I write simple react-hook ? I think that would not be tricky for me to do so.

## How

There is a solution comes up to my mind right away. That's "HTTP polling" technic. Basically, it will have a timer (interval) for constantly calling and check the transaction result.

## Usage

```typescript
import { useWaitForTransactionHash } from 'use-wait-for-transaction-hash'

interface Props {
  providerUrl: string
  transactionHash: string
}

function Notify({ providerUrl, transactionHash }: Props) {
  const { status } = useWaitForTransactionHash({
    hash: transactionHash,
    providerUrl,
  })
  return (
    <div>
      <pre>Hash: {transactionHash}</pre>
      <pre>Provider Url: {providerUrl}</pre>
      <pre>Status: {status}</pre>
    </div>
  )
}
```
