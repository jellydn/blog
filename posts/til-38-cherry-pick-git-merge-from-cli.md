---
date: "03/09/2023 11:21 AM +0800"
tag:
  - git
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 38 - Cherry pick git merge from CLI"
description: "Cherry-pick a merge commit to another branch with git cherry-pick -m 1"
_template: post
---

## What

Cherry-pick a merge commit onto another branch using the `-m 1` parent flag.

## Why

A merge commit has two parents, so git doesn't know which diff to apply. `-m 1` tells git to treat the first parent (usually main) as the baseline and replay the changes introduced by the merge.

## How

```sh
git cherry-pick <merge-commit-hash> -m 1
```

`-m 1` specifies the first parent branch as the source of changes.
