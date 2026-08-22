---
author: Dung Huynh
date: "01/13/2024 6:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 43 - Delete all remote branches except main"
description: "Delete every remote git branch except main with grep, sed, and git push --delete"
tag:
  - github
  - git
  - hub
---

## What

Delete all remote branches on origin except the one you want to keep (main).

## Why

Merged feature branches linger on origin long after local cleanup. Listing remote refs, stripping the `origin/` prefix, and piping names to `git push origin --delete` removes stale remotes in bulk — run `git remote prune origin` first to drop outdated tracking refs.

## How

```sh
git branch -r | grep -v 'main' | sed 's/origin\///' | xargs -I {} git push origin --delete {}
```

**Prune outdated tracking branches first:**

```sh
git remote prune origin
```
