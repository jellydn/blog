---
date: 08/11/2020 10:34 PM +0800
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 1 - Git Rebase Interactive'
description: 'Useful trick to clean git history'
---

A useful trick for clean git history before sending PR. Just need to replace `N` with the actual number of commit logs that you want to change.

```sh
    git rebase -i HEAD~N
```
