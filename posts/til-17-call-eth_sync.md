---
date: 09/07/2021 7:43 PM +0800
author: Dung Huynh
hero_image: ''
title: "#TIL 17 - Call eth_sync"
description: How to call eth_syncing with ethersjs

---
Hi there,

There is a case you want to call some ETH RPC API but [ethersjs](https://docs.ethers.io/v5/ "Ethers") doesn't support it. If you check their document and couldn't find some `eth_SOMETHING then this is a solution for you.`

    const ethersHttpProvider = new ethers.providers.JsonRpcProvider(httpProviderUrl);
    const syncing = await ethersHttpProvider.send('eth_syncing', []);