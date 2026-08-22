---
date: "08/12/2020 2:35 PM +0800"
tag:
  - Git
  - TIL
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 2 - Create and apply git patch from a commit hash"
description: "Export one commit as a patch with format-patch and apply it on another branch with git am"
_template: post
---

## What

Export a single commit as a `.patch` file with `git format-patch`, then apply it on another branch with `git am`.

## Why

Cherry-pick rewrites the commit hash and can conflict when the target branch diverged. A patch file carries the full diff plus the original commit message, so you can port one change to a fork, a release branch, or a teammate's repo without merging entire histories.

## How

```sh
git checkout master
git format-patch -1 COMMIT_HASH
git checkout WORKING_BRANCH
git am FILE_PATH
```

- `format-patch -1`: creates patch file for single commit
- `am`: applies patch file (commit message preserved)
