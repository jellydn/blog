---
date: "07/23/2021 11:09 AM +0800"
tag:
  - Git
  - CLI
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 16 - Revert to 1st commit with Git command"
description: "Start a Git repository history over while keeping the working-tree files"
---

## What

Delete the current branch history while keeping every working-tree file, then clear the index so the files are unstaged.

## Why

`git update-ref -d HEAD` deletes the branch pointer without touching your working tree or index. The old tracked files therefore appear as staged additions on the unborn branch. Remove them from the index to leave the files untracked, then start a fresh history. The old commits remain recoverable through `git reflog` until Git prunes them.

## How

```sh
git update-ref -d HEAD
git rm --cached -r .
```

This rewrites local history. Back up the repository first, and do not use it on a shared branch. Recover the previous commit ID with `git reflog` if needed.
