---
date: "08/28/2020 11:17 AM +0800"
tag:
  - CLI
  - GIT
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 5 - Delete all local branches except master"
description: "Delete local Git branches except the checked-out keeper branch"
_template: post
---

## What

Delete all local git branches except the one you want to keep (master or main).

## Why

Feature branches pile up after merges and clutter `git branch` output. Check out the branch you want to keep, list local refs, and exclude that exact branch name. Preview the list before using `-D`, which discards even unmerged work.

## How

```sh
git switch master
git for-each-ref --format='%(refname:short)' refs/heads | grep -vx master
```

After you verify the preview, delete the listed branches:

```sh
git for-each-ref --format='%(refname:short)' refs/heads \
  | grep -vx master \
  | while IFS= read -r branch; do git branch -D "$branch"; done
```

Replace `master` with `main` in all three places if `main` is your keeper branch.
