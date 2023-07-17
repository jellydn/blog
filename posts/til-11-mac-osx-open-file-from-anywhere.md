---
date: '04/29/2021 14:36 AM +0800'
tag:
    - CLI
    - MacOSX
author: Dung Huynh
hero_image: /til.jpeg
title: '#TIL 11 - Mac OSX - Open file from anywhere'
description: >
    How to Allow Apps from Anywhere in macOS Gatekeeper (Big Sur, Catalina,
    Mojave, Sierra, High Sierra)
---

```sh
    sudo spctl --master-disable
    sudo spctl --master-enable
```

Then run

```sh
xattr -cr /Applications/YourApp
```
