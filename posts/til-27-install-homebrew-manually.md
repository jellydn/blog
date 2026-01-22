---
date: "07/06/2022 3:25 PM +0800"
tag:
  - brew
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 27 - Install Homebrew manually"
description: Install Homebrew without sudo
_template: post
---

## What

Install Homebrew to a local directory without root access.

## Why

Some servers don't allow sudo. Local installation works without system permissions.

## How

```sh
# Clone Homebrew
git clone https://github.com/Homebrew/brew homebrew

# Add to PATH
eval "$(homebrew/bin/brew shellenv)"

# Initialize
brew update --force --quiet
chmod -R go-w "$(brew --prefix)/share/zsh"
```
