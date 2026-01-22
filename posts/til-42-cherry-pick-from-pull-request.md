---
author: Dung Huynh
date: "10/16/2023 3:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 42 - Cherry pick from pull request"
description: >-
  Apply PR changes to your branch using hub CLI
tag:
  - github
  - git
  - hub
---

## What

Cherry-pick changes from any GitHub pull request directly to your local branch using `hub am`.

## Why

Manual cherry-picking requires finding commits, copying hashes, and handling conflicts. `hub am` downloads and applies PR patches in one command.

## How

### Install hub

```bash
brew install hub
```

### Configure

Edit `~/.config/hub`:

```yaml
github.com:
  - user: YOUR_USERNAME
    oauth_token: ghp_YOUR_TOKEN
    protocol: https
```

### Apply PR

```bash
hub am -3 https://github.com/user/repo/pull/123
```

- `-3`: three-way merge for better conflict resolution
- URL: any PR or commit URL
