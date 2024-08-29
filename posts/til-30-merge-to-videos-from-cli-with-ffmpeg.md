---
date: "09/06/2022 10:11 AM +0800"
tag:
  - ffmpeg
  - cli
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 30 - Merge to videos from CLI with ffmpeg"
description: Simple command for concat videos
_template: post
---

Step 1: Create a text file for merge. For instance: list.txt

    file 'video1.mp4'
    file 'video2.mp4'

Step 2: Run the below command

    ffmpeg -f concat -safe 0 -i list.txt -c copy video.mp4

More usage on [https://trac.ffmpeg.org/wiki/Concatenate](https://trac.ffmpeg.org/wiki/Concatenate "https://trac.ffmpeg.org/wiki/Concatenate")
