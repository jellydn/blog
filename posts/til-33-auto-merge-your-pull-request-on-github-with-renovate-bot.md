---
date: '11/09/2022 12:27 PM +0800'
tag:
    - renovate
    - auto-merge
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 33 - Auto-merge your pull request on GitHub with Renovate bot'
description: 'How to auto merge your PR on Github '
_template: post
---

This is a neat trick for auto-merge your pull request on GitHub with Renovate
bot if that's passed the check (build, linter) for non-major update packages.

Here is the `renovate.json` file.

    {
      "$schema": "https://docs.renovatebot.com/renovate-schema.json",
      "extends": [
        "config:base",
        "group:allNonMajor",
        ":pinAllExceptPeerDependencies"
      ],
      "lockFileMaintenance": {
        "enabled": true
      },
      "automerge": true,
      "major": {
        "automerge": false
      }
    }
