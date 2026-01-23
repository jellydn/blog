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
description: Fix GitHub workflow scope error with Git Credential Manager
_template: post
---

## What

Fix OAuth app workflow scope rejection when pushing to GitHub.

## Why

Personal access tokens need the `workflow` scope to modify GitHub Actions files.

## How

Install Git Credential Manager Core:

```sh
# macOS
brew install git-credential-manager

# Or with gh CLI
gh auth switch
```

This authenticates with proper scopes automatically.
