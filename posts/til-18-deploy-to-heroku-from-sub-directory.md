---
date: "09/26/2021 1:05 PM +0800"
tag:
  - heroku
  - devops
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 18 - Deploy to heroku from sub directory"
description: "Deploy a monorepo subdirectory to Heroku with git subtree push --prefix"
_template: post
---

## What

Deploy a subdirectory (e.g., `server/`) from a monorepo to Heroku.

## Why

Heroku's buildpack expects the app at the repository root. `git subtree push --prefix server` creates a synthetic commit containing only that folder's history, so Heroku sees a standalone app without restructuring your repo.

## How

Add Heroku remote:

```sh
heroku git:remote -a your-app-name
```

Deploy subdirectory:

```sh
git subtree push --prefix server heroku main
```
