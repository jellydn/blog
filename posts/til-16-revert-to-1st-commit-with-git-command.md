---
date: "07/23/2021 11:09 AM +0800"
tag:
  - Git
  - CLI
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 16 - Revert to 1st commit with Git command"
description: Reset repository to initial state
---

## What

Reset repository to its first commit, making all subsequent changes uncommitted.

## Why

Clean slate for experiments or starting over while keeping commit history reachable.

## How

```sh
git update-ref -d HEAD
```

All commits become unstaged. Recover with `git reflog` if needed.
