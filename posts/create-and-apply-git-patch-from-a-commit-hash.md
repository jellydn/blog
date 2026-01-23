---
date: "08/12/2020 2:35 PM +0800"
tag:
  - Git
  - TIL
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 2 - Create and apply git patch from a commit hash"
description: Port commits between branches with git patch
_template: post
---

## What

Create a patch from one branch and apply it to another branch.

## Why

Cherry-pick commits when direct merge isn't possible or desired.

## How

```sh
git checkout master
git format-patch -1 COMMIT_HASH
git checkout WORKING_BRANCH
git am FILE_PATH
```

- `format-patch -1`: creates patch file for single commit
- `am`: applies patch file (commit message preserved)
