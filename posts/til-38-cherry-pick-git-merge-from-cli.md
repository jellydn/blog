---
date: "03/09/2023 11:21 AM +0800"
tag:
  - git
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 38 - Cherry pick git merge from CLI"
description: Cherry-pick a merge commit
_template: post
---

## What

Cherry-pick a merge commit to another branch.

## Why

Sometimes you need the changes from a merge commit without merging the entire branch.

## How

```sh
git cherry-pick <merge-commit-hash> -m 1
```

`-m 1` specifies the first parent branch as the source of changes.
