---
date: 08/28/2020 11:17 AM +0800
author: Dung Huynh
hero_image: ''
title: "#TIL 5 - Delete all local branches except master"
description: ''

---
    git branch | grep -v "master" | xargs git branch -D