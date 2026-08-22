---
date: "08/28/2020 11:17 AM +0800"
tag:
  - CLI
  - GIT
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 5 - Delete all local branches except master"
description: "Delete every local git branch except master or main with grep and xargs"
_template: post
---

## What

Delete all local git branches except the one you want to keep (master or main).

## Why

Feature branches pile up after merges and clutter `git branch` output. Piping branch names through `grep -v` and `xargs git branch -D` removes stale locals in one shot without touching the remote.

## How

```sh
git branch | grep -v "master" | xargs git branch -D
```

**For main branch:**

```sh
git branch | grep -v "main" | xargs git branch -D
```
