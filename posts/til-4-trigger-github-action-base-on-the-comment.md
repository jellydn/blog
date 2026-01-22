---
date: "08/20/2020 4:14 PM +0800"
tag:
  - Github
  - Github Action
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 4 - Trigger github action base on the comment"
description: Trigger GitHub Actions via issue comments
_template: post
---

## What

Run GitHub Actions workflows when specific comments are posted on issues/PRs.

## Why

Enable manual deployments via comments without push access or creating branches.

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
