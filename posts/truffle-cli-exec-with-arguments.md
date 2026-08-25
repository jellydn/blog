---
date: "07/14/2021 6:15 PM +0800"
tag:
  - DApp
  - Truffle
author: Dung Huynh
hero_image: ""
title: Truffle CLI exec with arguments
description: "Parse custom CLI flags in Truffle exec scripts with yargs-parser"
_template: post
---

## Context

`truffle exec` runs a script inside the Truffle environment but does not forward arbitrary CLI flags to your script — only Truffle's own options like `--network` are parsed. You can read raw arguments from `process.argv` and parse them yourself with `yargs-parser`, which leaves Truffle's built-in flags untouched.

## Usage

```javascript
const argv = require("yargs-parser")(process.argv.slice(2));

module.exports = async (callback) => {
  const name = argv?.n || "World";
  callback(`Hello ${name}`);
};
```

```sh
truffle exec hello.js -n=Dung --network development
```

- `-n=Dung`: Custom argument
- `--network`: Standard Truffle option (still works)
