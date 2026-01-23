---
date: "05/13/2022 1:00 PM +0800"
tag:
  - yarn
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 25 - Yarn global upgrade all packages"
description: Upgrade all global Yarn packages
_template: post
---

## What

Upgrade all globally installed Yarn packages to their latest versions.

## Why

Yarn has no built-in command to upgrade all global packages at once.

## How

```sh
npx yarn-upgrade-all -g
```
