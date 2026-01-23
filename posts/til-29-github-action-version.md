---
date: "07/25/2022 11:27 AM +0800"
tag:
  - github action
  - semver
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 29 - Git version"
description: Generate semantic version from git history
---

## What

Auto-generate semantic version from git commits in GitHub Actions.

## Why

Automate versioning based on commit history and tags.

## How

```yaml
name: Git Version
on:
  push:
    branches: [main, release]

jobs:
  version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - uses: codacy/git-version@2.5.4
        id: version

      - run: echo "${{ steps.version.outputs.version }}"
```
