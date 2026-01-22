---
author: Dung Huynh
date: "01/13/2024 6:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 43 - Delete all remote branches except main"
description: Clean up remote git branches
tag:
  - github
  - git
  - hub
---

## What

Delete all remote branches except main from origin.

## Why

Remote branches accumulate over time. Clean up to reduce clutter.

## How

```sh
git branch -r | grep -v 'main' | sed 's/origin\///' | xargs -I {} git push origin --delete {}
```

**Prune outdated tracking branches first:**
```sh
git remote prune origin
```
