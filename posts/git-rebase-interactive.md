---
date: "08/11/2020 10:34 PM +0800"
tag:
  - Git
  - TIL
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 1 - Git Rebase Interactive"
description: "Squash, reorder, or edit recent commits with git rebase -i before opening a PR"
_template: post
---

## What

Use `git rebase -i` to squash, reorder, reword, or drop commits from your local branch before you push.

## Why

Reviewers see one commit per logical change when you squash related work together. Interactive rebase rewrites local commit IDs. Use it freely on an unpublished branch, but coordinate before rewriting a shared branch. If you already pushed the branch, update it with `git push --force-with-lease` rather than `--force` so you do not overwrite someone else's new commits.

## How

```sh
git rebase -i HEAD~N
```

Replace `N` with the number of commits to edit. In the editor:

- `squash` / `s`: combine with previous commit
- `drop` / `d`: remove commit
- `reword` / `r`: edit commit message
- `pick` / `p`: keep commit as-is
