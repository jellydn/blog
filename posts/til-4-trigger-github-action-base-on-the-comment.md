---
date: "08/20/2020 4:14 PM +0800"
tag:
  - Github
  - Github Action
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 4 - Trigger github action base on the comment"
description: "Run a GitHub Actions workflow when someone posts a specific comment on an issue or PR"
_template: post
---

## What

Trigger a GitHub Actions workflow when a specific comment is posted on an issue or pull request.

## Why

The `issue_comment` event fires on every comment, but you can gate the job with an `if` condition on `github.event.comment.body`. That lets you deploy from a PR by typing a keyword — no push access or extra branch needed.

## How

```yaml
# .github/workflows/comment.yml
on:
  issue_comment:
    types: [created, edited]

name: Deploy action
jobs:
  web-image:
    runs-on: ubuntu-latest
    if: github.event.comment.body == 'Build web'
    steps:
      - run: echo "Deploying..."
```
