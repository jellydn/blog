---
author: Dung Huynh
date: "10/16/2023 3:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 42 - Cherry pick from pull request"
description: "Apply a GitHub pull request to your local branch in one step with hub am -3"
tag:
  - github
  - git
  - hub
---

## What

Apply all commits from a GitHub pull request to your local branch with `hub am`.

## Why

Manual cherry-picking means finding each commit hash, applying them one by one, and resolving conflicts separately. `hub am` downloads the PR as mailbox patches and applies the full series in order with three-way merge support via `-3`.

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
