---
date: "07/06/2022 3:25 PM +0800"
tag:
  - brew
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 27 - Install Homebrew manually"
description: "Install Homebrew to a local directory without sudo on restricted servers"
_template: post
---

## What

Install Homebrew into a local directory when you don't have sudo access.

## Why

The default Homebrew installer writes to `/usr/local` and needs admin rights. Cloning the brew repo into your home folder and adding `eval "$(brew shellenv)"` to your shell gives you the same package manager without touching system paths.

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
