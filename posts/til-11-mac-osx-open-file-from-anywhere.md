---
date: "04/29/2021 2:36 PM +0800"
tag:
  - CLI
  - MacOSX
author: Dung Huynh
hero_image: /til.jpeg
title: "#TIL 11 - Mac OSX - Open file from anywhere"
description: "Run unsigned macOS apps by disabling Gatekeeper with spctl and clearing quarantine xattrs"
---

## What

Disable macOS Gatekeeper temporarily and remove quarantine attributes so you can open an unsigned app.

## Why

Gatekeeper checks app signatures before launch and blocks anything Apple hasn't notarized. `spctl --master-disable` turns off that check, and `xattr -cr` strips the quarantine flag downloaded files carry — both are reversible when you're done.

## How

```sh
# Disable Gatekeeper
sudo spctl --master-disable

# Remove app quarantine attributes
xattr -cr /Applications/YourApp.app

# Re-enable when done
sudo spctl --master-enable
```
