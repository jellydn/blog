---
date: 08/12/2020 2:35 PM +0800
tag:
  - Git
  - TIL
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 2 - Create and apply git patch from a commit hash'
description: 'Create a path from other branch and apply to your working branch'
---

Create a patch from master then apply to work branch

```sh
    git checkout master
    git format-patch -1 COMMIT_HASH
    git checkout WORKING_BRANCH
    git am FILE_PATH
```
