---
date: "02/03/2021 4:31 PM +0800"
tag:
  - Testing
  - Jest
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 8 - Jest testing with absolute import"
description: "Resolve absolute imports like @/components in Jest with moduleDirectories"
_template: post
---

## What

Configure Jest so it resolves absolute imports the same way your app does (e.g., `@/components/Button`).

## Why

Jest resolves modules from `node_modules` by default and ignores your tsconfig paths. Adding `"./"` to `moduleDirectories` tells Jest to look at the project root, so you stop writing `../../../../components/Button` in test files.

## How

```js
// jest.config.js
module.exports = {
  moduleDirectories: ["node_modules", "./"],
};
```
