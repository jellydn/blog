---
author: Dung Huynh
date: "01/13/2024 6:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 43 - Delete all remote branches except main"
description: >-
  How to delete all remote branches except main
tag:
  - github
  - git
  - hub
---

### Remove all remote branches except for the one named "main"

```sh
git branch -r | grep -v 'main' | sed 's/origin\///' | xargs -I {} git push origin --delete {}
```

It may be necessary to execute `git remote prune origin` first in order to eliminate outdated remote branches.
