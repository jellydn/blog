---
date: 02/22/2022 11:33 AM +0800
tag:
    - macosx
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: 'TIL #23 - Restart Mac OS X coreaudio daemon'
description: Restart Mac OS X coreaudio daemon
---

    sudo kill `ps -ax | grep 'coreaudiod' | grep 'sbin' |awk '{print $1}'`
