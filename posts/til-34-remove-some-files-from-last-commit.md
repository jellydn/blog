---
date: "12/05/2022 12:24 PM +0800"
tag:
  - git
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 34 - Remove some files from last commit"
description: Undo last commit and unstage files
_template: post
---

## What

Undo the last commit but keep changes as staged modifications.

## Why

Accidentally committed files you want to exclude, or need to amend the commit.

## How

```sh
git reset --soft HEAD~1
```

Files return to staging area. Remove unwanted files with `git reset <files>`, then re-commit.
