---
date: 2021-04-29T14:36:00.000Z
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
