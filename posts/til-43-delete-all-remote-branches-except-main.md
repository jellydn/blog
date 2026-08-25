---
author: Dung Huynh
date: "01/13/2024 6:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 43 - Delete all remote branches except main"
description: "Delete origin branches except main with exact ref filtering and git push --delete"
tag:
  - github
  - git
  - hub
---

## What

Delete all remote branches on origin except the one you want to keep (main).

## Why

Merged feature branches linger on origin after local cleanup. Prune stale tracking refs, list only refs under `origin`, and exclude the exact `HEAD` and `main` names before deleting anything. Preview the list first because remote deletion affects everyone using the repository.

## How

```sh
git remote prune origin
git for-each-ref --format='%(refname:strip=3)' refs/remotes/origin \
  | grep -Ev '^(HEAD|main)$'
```

After you verify the preview, run the same exact filter and delete each branch:

```sh
git for-each-ref --format='%(refname:strip=3)' refs/remotes/origin \
  | grep -Ev '^(HEAD|main)$' \
  | while IFS= read -r branch; do git push origin --delete "$branch"; done
```
