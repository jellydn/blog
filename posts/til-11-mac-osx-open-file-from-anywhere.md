---
date: "04/29/2021 14:36 AM +0800"
tag:
  - CLI
  - MacOSX
author: Dung Huynh
hero_image: /til.jpeg
title: "#TIL 11 - Mac OSX - Open file from anywhere"
description: Bypass macOS Gatekeeper for unsigned apps
---

## What

Disable Gatekeeper to run apps from unidentified developers.

## Why

Some apps aren't signed or can't be verified by Apple. Gatekeeper blocks them by default.

## How

```sh
# Disable Gatekeeper
sudo spctl --master-disable

# Remove app quarantine attributes
xattr -cr /Applications/YourApp.app

# Re-enable when done
sudo spctl --master-enable
```
