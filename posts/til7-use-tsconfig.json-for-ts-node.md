---
date: 10/08/2020 12:06 PM +0800
author: Dung Huynh
hero_image: ''
title: "#TIL 7 - Use tsconfig.json for ts-node"
description: ''

---
Use the same tsconfig.json for [https://github.com/TypeStrong/ts-node](https://github.com/TypeStrong/ts-node "ts-node")

    {
      "ts-node": {
        // these options are overrides used only by ts-node
        // same as our --compilerOptions flag and our TS_NODE_COMPILER_OPTIONS environment variable
        "compilerOptions": {
          "module": "commonjs"
        }
      },
      "compilerOptions": {
        ...
      },
      ...
    =}