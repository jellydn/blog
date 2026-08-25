---
date: "05/13/2022 1:00 PM +0800"
tag:
  - yarn
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 25 - Yarn global upgrade all packages"
description: "Upgrade globally installed Yarn Classic packages with yarn global upgrade"
_template: post
---

## What

Upgrade all globally installed Yarn packages to their latest versions in one command.

## Why

Yarn Classic includes `yarn global upgrade`, which updates global packages within their declared version ranges. Add `--latest` when you intentionally want the latest releases even if that ignores those ranges.

## How

```sh
yarn global upgrade

# Ignore declared version ranges and install the latest releases
yarn global upgrade --latest
```
