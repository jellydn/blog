---
date: "07/14/2021 6:15 PM +0800"
tag:
  - DApp
  - Truffle
author: Dung Huynh
hero_image: ""
title: Truffle CLI exec with arguments
description: Pass arguments to Truffle exec scripts
_template: post
---

## Context

`truffle exec` doesn't support CLI arguments natively. Use `yargs-parser` to parse `process.argv` in your script.

## Usage

```javascript
const argv = require('yargs-parser')(process.argv.slice(2));

module.exports = async (callback) => {
  const name = argv?.n || 'World';
  callback(`Hello ${name}`);
};
```

```sh
truffle exec hello.js -n=Dung --network development
```

- `-n=Dung`: Custom argument
- `--network`: Standard Truffle option (still works)
