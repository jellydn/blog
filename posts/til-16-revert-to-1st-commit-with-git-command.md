---
date: "07/23/2021 11:09 AM +0800"
tag:
  - Git
  - CLI
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 16 - Revert to 1st commit with Git command"
description: "Reset a git repo to its first commit with update-ref -d HEAD while keeping files unstaged"
---

## What

Reset your repository to before the first commit, leaving all changes as unstaged files.

## Why

`git update-ref -d HEAD` deletes the branch pointer without touching your working tree — every file stays on disk but all commits become unreachable. You can start a fresh history or recover later via `git reflog`.

## How

```sh
git update-ref -d HEAD
```

All commits become unstaged. Recover with `git reflog` if needed.
