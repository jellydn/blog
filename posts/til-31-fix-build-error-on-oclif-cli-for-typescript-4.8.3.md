---
date: 09/14/2022 12:27 PM +0800
tag:
- cli
- oclif
- tsup
author: Dung Huynh
hero_image: ''
title: "#TIL 31 - Fix build error on oclif CLI for Typescript 4.8.3"
description: 'Fix error TS2344: Type ''F'' does not satisfy the constraint ''FlagOutput''
  for oclif'

---
I ran into an issue with TS 4.8.3 for [oclif](https://github.com/oclif/oclif/issues/720 "oclif"). 

> > shx rm -rf dist && tsc -b
>
> node_modules/@oclif/core/lib/command.d.ts:100:35 - error TS2344: Type 'F' does not satisfy the constraint 'FlagOutput'.

Fixed by use \[tsup\]([https://tsup.egoist.dev/](https://tsup.egoist.dev/ "https://tsup.egoist.dev/")) instead of \`tsc\`

Step 1:  change the build command on package.json

from

    "build": "shx rm -rf dist && tsc -b",

to

     "build": "shx rm -rf dist && tsup",

Step 2: add tsup config file, e.g: tsup.config.json

    {
    
      "entry": ["src/**/*.ts"],
    
      "splitting": false,
    
      "sourcemap": true,
    
      "clean": true
    
    }