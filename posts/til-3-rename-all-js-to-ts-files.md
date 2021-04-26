---
date: 08/15/2020 12:41 AM +0800
author: Dung Huynh
hero_image: ''
title: '#TIL 3 - Rename all JS to TS files'
description: 'How to migrate from Javascript file to Typescript file'
---

    find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
