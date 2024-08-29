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
description: This is the issue which I got when upgraded Android Studio
_template: post
---

This is an issue which people often get when upgrading Android Studio. Here are 2 steps for fixing this on Mac OSX.

> Step 1:
>
> cd \~/Library/Application\\ Support/AndroidStudio4.0

> Step 2:
>
> rm disabled_plugins.txt

Then restart Android Studio.

Cheers.
