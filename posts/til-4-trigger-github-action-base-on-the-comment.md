---
date: "08/20/2020 4:14 PM +0800"
tag:
  - Github
  - Github Action
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 4 - Trigger github action base on the comment"
description: "Run a GitHub Actions workflow from an authorized pull-request comment"
_template: post
---

## What

Trigger a GitHub Actions workflow when an authorized collaborator posts a specific comment on a pull request.

## Why

The `issue_comment` event fires for issues and pull requests, including comments from untrusted users. Before a deployment job runs, verify the comment belongs to a pull request, matches the exact command, and comes from a repository owner, member, or collaborator.

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
    if: >-
      github.event.issue.pull_request &&
      github.event.comment.body == 'Build web' &&
      contains(
        fromJSON('["OWNER", "MEMBER", "COLLABORATOR"]'),
        github.event.comment.author_association
      )
    steps:
      - run: echo "Deploying..."
```
