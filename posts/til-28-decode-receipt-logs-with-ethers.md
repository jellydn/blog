---
date: '07/15/2022 11:27 PM +0800'
tag:
    - tx receipt
    - abi decoder
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 28 - Decode receipt logs with ethers'
description: How to decode event logs with ABI
_template: post
---

    import { ethers } from 'ethers';

    // create an interface with your abi
    const iface = ACX__factory.createInterface(abi);

    function decodeLogsByEsther(
      logs: Log[],
      contractAddress: string,
    ): Array<ethers.utils.LogDescription & { values?: any }> {
      logger.info('decodeLogsByEsther', logs);
      const decodedLogs = logs
        .filter((log) => log.address.toLowerCase() === contractAddress.toLowerCase()) // only check log if from same smart contract address
        .map((log) =>
          iface.parseLog({
            topics: log.topics,
            data: log.data,
          }),
        );
      logger.info('decodedLogs', JSON.stringify(decodedLogs, null, 2));
      return decodedLogs.filter(Boolean);
    }
