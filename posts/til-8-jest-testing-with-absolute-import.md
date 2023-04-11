---
date: '02/03/2021 4:31 PM +0800'
tag:
    - Testing
    - Jest
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 8 - Jest testing with absolute import'
description: ''
_template: post
---

```js
// add below setting to jest.config.js
module.exports = {
    moduleDirectories: ['node_modules', './'],
};
```
