---
date: 08/28/2020 11:17 AM +0800
tag:
  - CLI
  - GIT
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 5 - Delete all local branches except master'
description: 'Clean up your local branches with one command'
---

```sh
    git branch | grep -v "master" | xargs git branch -D
```
