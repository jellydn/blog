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
description: "Fix Android Studio missing essential plugin org.jetbrains.android by deleting disabled_plugins.txt"
_template: post
---

## What

Fix the "missing essential plugin org.jetbrains.android" error after an Android Studio upgrade.

## Why

Upgrades sometimes write plugin names to `disabled_plugins.txt` even though they're required for Android development. Deleting that file lets Android Studio re-enable the bundled Android plugin on next launch.

## How

```sh
cd ~/Library/Application\ Support/AndroidStudio*.*
rm disabled_plugins.txt
```

Restart Android Studio. Adjust version number in path as needed.
