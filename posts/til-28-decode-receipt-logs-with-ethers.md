---
date: "07/15/2022 11:27 PM +0800"
tag:
  - tx receipt
  - abi decoder
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 28 - Decode receipt logs with ethers"
description: Decode event logs with ethers.js
_template: post
---

## What

Decode transaction receipt event logs using contract ABI with ethers.js.

## Why

Logs are hex-encoded. Need ABI to parse them into readable event data.

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
