---
date: "09/06/2022 10:11 AM +0800"
tag:
  - ffmpeg
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 30 - Merge to videos from CLI with ffmpeg"
description: "Concatenate multiple video files with ffmpeg concat demuxer and -c copy (no re-encode)"
_template: post
---

## What

Merge multiple video files into one using ffmpeg's concat demuxer.

## Why

Re-encoding merged videos is slow and lossy. The concat demuxer with `-c copy` streams each file's packets directly into the output container — you get a single file in seconds with identical quality.

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
