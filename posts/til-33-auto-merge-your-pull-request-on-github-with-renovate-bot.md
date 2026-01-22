---
date: "11/09/2022 12:27 PM +0800"
tag:
  - renovate
  - auto-merge
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 33 - Auto-merge your pull request on GitHub with Renovate bot"
description: Auto-merge non-major Renovate PRs
_template: post
---

## What

Auto-merge Renovate PRs for minor/patch dependencies when tests pass.

## Why

Reduce noise in PR list. Safe updates (non-major) can be merged automatically.

## How

**renovate.json:**

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["config:base", "group:allNonMajor"],
  "automerge": true,
  "major": { "automerge": false }
}
```

- `automerge: true` - auto-merge passing PRs
- `major.automerge: false` - require manual review for major versions
