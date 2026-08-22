---
date: "02/22/2022 11:33 AM +0800"
tag:
  - macosx
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 23 - Restart Mac OS X coreaudio daemon"
description: "Restart macOS coreaudiod when audio stops working after sleep or system updates"
_template: post
---

## What

Kill and restart the macOS `coreaudiod` daemon when system audio stops working.

## Why

After sleep/wake cycles or OS updates, the audio daemon can hang while apps still think output is available. macOS respawns `coreaudiod` automatically once you kill the stuck process — no reboot needed.

## How

```sh
sudo kill $(ps -ax | grep 'coreaudiod' | grep 'sbin' | awk '{print $1}')
```

Audio will restart automatically.
