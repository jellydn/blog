---
date: "10/12/2021 1:37 AM +0800"
tag:
  - android studio
  - flutter
author: Dung Huynh
hero_image: /static/til.jpeg
title: >-
  #TIL 19 - How to fix Android Studio missing essential plugin
  org.jetbrains.android
description: Fix Android Studio plugin error after upgrade
_template: post
---

## What

Fix "missing essential plugin" error after Android Studio upgrade.

## Why

Upgrade may disable plugins incorrectly. The `disabled_plugins.txt` file blocks required plugins.

## How

```sh
cd ~/Library/Application\ Support/AndroidStudio*.*
rm disabled_plugins.txt
```

Restart Android Studio. Adjust version number in path as needed.
