---
date: "11/09/2022 12:27 PM +0800"
tag:
  - renovate
  - auto-merge
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 33 - Auto-merge your pull request on GitHub with Renovate bot"
description: "Auto-merge passing Renovate PRs for non-major dependency updates via renovate.json"
_template: post
---

## What

Configure Renovate to auto-merge pull requests for minor and patch dependency updates when CI passes.

## Why

Renovate opens a PR per dependency bump, which clutters your review queue. Setting `automerge: true` with `major.automerge: false` lets safe updates land automatically while you manually review breaking major releases.

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
