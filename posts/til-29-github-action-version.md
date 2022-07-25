---
date: 07/25/2022 11:27 AM +0800
tag:
    - github action
    - semver
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 29 - Git version'
description: How to get version with github action
---

    # .github/workflows/version.yml
    name: Git Version

    on:
      push:
        branches:
          - release
          - main

    jobs:
      version:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout Code
            uses: actions/checkout@v3
            with:
              ref: ${{ github.head_ref }}   # checkout the correct branch name
              fetch-depth: 0                # fetch the whole repo history

          - name: Git Version
            id: get-version
            uses: codacy/git-version@2.5.4

          - name: New Version
            run: echo ${{ steps.get-version.outputs.version }}
