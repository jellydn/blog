---
date: "07/15/2022 11:27 PM +0800"
tag:
  - tx receipt
  - abi decoder
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 28 - Decode receipt logs with ethers"
description: "Decode Ethereum transaction receipt event logs with ethers.js Interface.parseLog"
_template: post
---

## What

Decode hex-encoded event logs from an Ethereum transaction receipt using your contract ABI.

## Why

Receipt logs store topics and data as raw bytes — you can't read event names or arguments without the ABI. `Interface.parseLog` matches topic0 to the event signature and decodes the remaining fields into typed JavaScript values.

## How

```typescript
import { ethers } from "ethers";

const iface = new ethers.utils.Interface(abi);

function decodeLogs(logs: Log[], contractAddress: string) {
  return logs
    .filter(
      (log) => log.address.toLowerCase() === contractAddress.toLowerCase(),
    )
    .map((log) => iface.parseLog({ topics: log.topics, data: log.data }))
    .filter(Boolean);
}
```
