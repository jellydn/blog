---
date: "09/06/2022 10:11 AM +0800"
tag:
  - ffmpeg
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 30 - Merge to videos from CLI with ffmpeg"
description: Concatenate videos with ffmpeg
_template: post
---

## What

Merge multiple video files into one using ffmpeg.

## Why

Quick way to combine videos without re-encoding (preserves quality).

## How

Create `list.txt`:
```
file 'video1.mp4'
file 'video2.mp4'
```

Run:
```sh
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

The `-c copy` flag streams without re-encoding for fast merging.
