---
date: 08/20/2020 4:14 PM +0800
author: Dung Huynh
hero_image: ''
title: '#TIL 4 - Trigger github action base on the comment'
description: 'Use github issue comment as the CD/CI'
---

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
