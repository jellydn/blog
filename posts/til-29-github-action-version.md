---
date: "07/25/2022 11:27 AM +0800"
tag:
  - github action
  - semver
author: Dung Huynh
hero_image: "/static/til.jpeg"
title: "#TIL 29 - Git version"
description: "Auto-generate semantic versions from git history in GitHub Actions with codacy/git-version"
---

## What

Generate a semantic version string from your git commit history inside a GitHub Actions workflow.

## Why

Manual version bumps drift from actual releases. The `codacy/git-version` action reads tags and conventional commits to produce a semver string you can tag artifacts or Docker images with on every push.

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
