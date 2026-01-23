---
date: "02/22/2022 11:33 AM +0800"
tag:
  - macosx
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 23 - Restart Mac OS X coreaudio daemon"
description: Restart macOS coreaudio when sound stops working
_template: post
---

## What

Restart the coreaudio daemon when macOS audio stops working.

## Why

Audio may fail after sleep/wake or updates. Restarting the daemon fixes most issues.

## How

```sh
sudo kill $(ps -ax | grep 'coreaudiod' | grep 'sbin' | awk '{print $1}')
```

Audio will restart automatically.
