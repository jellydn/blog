---
date: "08/28/2020 11:17 AM +0800"
tag:
  - CLI
  - GIT
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 5 - Delete all local branches except master"
description: Clean up local git branches
_template: post
---

## What

Delete all local branches except the current branch (master/main).

## Why

Local branches accumulate over time. Clean up to reduce clutter and confusion.

## How

```sh
git branch | grep -v "master" | xargs git branch -D
```

**For main branch:**
```sh
git branch | grep -v "main" | xargs git branch -D
```
