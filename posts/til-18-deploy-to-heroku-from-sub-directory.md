---
date: "09/26/2021 1:05 PM +0800"
tag:
  - heroku
  - devops
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 18 - Deploy to heroku from sub directory"
description: Deploy monorepo subdirectory to Heroku
_template: post
---

## What

Deploy a subdirectory (e.g., `server/`) to Heroku from a monorepo.

## Why

Heroku expects app root at repository root. Monorepos need custom deployment.

## How

Add Heroku remote:
```sh
heroku git:remote -a your-app-name
```

Deploy subdirectory:
```sh
git subtree push --prefix server heroku main
```
