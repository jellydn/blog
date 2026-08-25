---
date: "04/29/2021 2:36 PM +0800"
tag:
  - CLI
  - MacOSX
author: Dung Huynh
hero_image: /til.jpeg
title: "#TIL 11 - Mac OSX - Open file from anywhere"
description: "Run a trusted unsigned macOS app by removing its quarantine attribute"
---

## What

Remove the quarantine attribute from one trusted unsigned app so macOS can open it.

## Why

Gatekeeper checks app signatures before launch and blocks software Apple has not notarized. After you verify the app and its source, remove only that app's `com.apple.quarantine` attribute. This change is not automatically reversible, so avoid disabling Gatekeeper globally or recursively deleting every extended attribute.

## How

```sh
# Inspect the app's extended attributes first
xattr /Applications/YourApp.app

# Remove only the quarantine attribute from this trusted app
xattr -dr com.apple.quarantine /Applications/YourApp.app
```
