---
date: "08/20/2020 4:14 PM +0800"
tag:
  - Github
  - Github Action
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 4 - Trigger github action base on the comment"
description: Use github issue comment as the CD/CI
_template: post
---

```sh
    # .github/workflows/comment.yml
    on:
      issue_comment:
        types: [created, edited]

    name: Deploy action
    jobs:
      web-image:
        name: build and deploy web docker image to AWS ECR
        runs-on: ubuntu-latest
        if: github.event.comment.body == 'Build web'
        steps:
         ...
```
