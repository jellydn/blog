---
date: "12/05/2022 12:24 PM +0800"
tag:
  - git
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 34 - Remove some files from last commit"
description: "Undo the last git commit but keep changes staged with git reset --soft HEAD~1"
_template: post
---

## What

Undo your last commit while keeping all changes in the staging area.

## Why

`git reset --soft HEAD~1` moves the branch pointer back one commit without touching the index or working tree. You can unstage unwanted files with `git reset <files>` and recommit with a clean set — no re-editing needed.

## How

```sh
git reset --soft HEAD~1
```

Files return to staging area. Remove unwanted files with `git reset <files>`, then re-commit.
