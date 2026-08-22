---
date: "05/13/2022 1:00 PM +0800"
tag:
  - yarn
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 25 - Yarn global upgrade all packages"
description: "Upgrade every globally installed Yarn package at once with yarn-upgrade-all"
_template: post
---

## What

Upgrade all globally installed Yarn packages to their latest versions in one command.

## Why

Yarn has no built-in `yarn global upgrade` that touches every package. The `yarn-upgrade-all -g` utility reads your global list and bumps each entry individually.

## How

```sh
npx yarn-upgrade-all -g
```
