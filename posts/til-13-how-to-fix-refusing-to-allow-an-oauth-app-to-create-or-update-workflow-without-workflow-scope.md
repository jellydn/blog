---
date: "05/21/2021 1:56 AM +0800"
tag:
  - Github
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: >-
  #TIL 13 - How to fix refusing to allow an OAuth App to create or update
  workflow
description: "Fix GitHub's OAuth workflow scope error with gh auth refresh"
_template: post
---

## What

Fix the "refusing to allow an OAuth App to create or update workflow" error when you push GitHub Actions files.

## Why

GitHub requires the `workflow` scope on your token to modify files under `.github/workflows/`. If GitHub CLI's stored token lacks that scope, request it explicitly and authenticate again.

## How

Refresh GitHub CLI's token with the required scope:

```sh
gh auth refresh -s workflow
```

`gh auth switch` only selects an account that is already authenticated; it does not add scopes.
