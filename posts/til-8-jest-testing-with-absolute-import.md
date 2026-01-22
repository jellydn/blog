---
date: "02/03/2021 4:31 PM +0800"
tag:
  - Testing
  - Jest
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 8 - Jest testing with absolute import"
description: Enable absolute imports in Jest tests
_template: post
---

## What

Configure Jest to resolve modules using absolute imports like `@/components/Button`.

## Why

Avoid relative import hell: `import Button from '../../../../components/Button'`.

## How

```js
// jest.config.js
module.exports = {
  moduleDirectories: ["node_modules", "./"],
};
```
