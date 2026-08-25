---
date: "02/03/2021 4:31 PM +0800"
tag:
  - Testing
  - Jest
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 8 - Jest testing with absolute import"
description: "Resolve @/ absolute imports in Jest with moduleNameMapper"
_template: post
---

## What

Configure Jest so it resolves absolute imports the same way your app does (e.g., `@/components/Button`).

## Why

Jest does not automatically apply your TypeScript path aliases. Map the `@/` prefix to the project root with `moduleNameMapper` so tests resolve `@/components/Button` like the application does.

## How

```js
// jest.config.js
module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
```
