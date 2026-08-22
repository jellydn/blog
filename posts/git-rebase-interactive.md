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

Reviewers see one commit per logical change when you squash related work together. Interactive rebase rewrites commit history on your branch only — it does not affect remote history until you force-push, so you can fix typos or split oversized commits without opening extra PRs.

## How

```sh
git rebase -i HEAD~N
```

Replace `N` with the number of commits to edit. In the editor:

- `squash` / `s`: combine with previous commit
- `drop` / `d`: remove commit
- `reword` / `r`: edit commit message
- `pick` / `p`: keep commit as-is
