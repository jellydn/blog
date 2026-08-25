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

Re-encoding merged videos is slow and lossy. When every input has compatible codecs, stream layouts, time bases, and other parameters, the concat demuxer with `-c copy` can copy their packets directly into one output without changing quality. Re-encode or normalize incompatible inputs first.

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

The `-c copy` flag avoids re-encoding; it does not make incompatible inputs compatible.
