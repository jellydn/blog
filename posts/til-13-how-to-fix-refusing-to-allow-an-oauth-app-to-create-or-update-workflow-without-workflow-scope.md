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
description: "Fix GitHub refusing OAuth app workflow scope error with Git Credential Manager"
_template: post
---

## What

Fix the "refusing to allow an OAuth App to create or update workflow" error when you push GitHub Actions files.

## Why

GitHub requires the `workflow` scope on your token to modify files under `.github/workflows/`. Older credential helpers store tokens without that scope — Git Credential Manager re-authenticates and requests the correct permissions automatically.

## How

Install Git Credential Manager Core:

```sh
# macOS
brew install git-credential-manager

# Or with gh CLI
gh auth switch
```

This authenticates with proper scopes automatically.
