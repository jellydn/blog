---
date: "08/11/2020 10:34 PM +0800"
tag:
  - Git
  - TIL
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 1 - Git Rebase Interactive"
description: Clean up git history before PR
_template: post
---

## What

Interactive rebase to squash, reorder, or edit recent commits.

## Why

Clean commit history before submitting PRs. Combine related commits or fix mistakes.

## How

```sh
git rebase -i HEAD~N
```

Replace `N` with the number of commits to edit. In the editor:

- `squash` / `s`: combine with previous commit
- `drop` / `d`: remove commit
- `reword` / `r`: edit commit message
- `pick` / `p`: keep commit as-is
