---
date: "07/06/2022 3:25 PM +0800"
tag:
  - brew
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 27 - Install Homebrew manually"
description: Install homebrew without root account
_template: post
---

Clone repo

    mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew

or

    git clone https://github.com/Homebrew/brew homebrew

then

    eval "$(homebrew/bin/brew shellenv)"
    brew update --force --quiet
    chmod -R go-w "$(brew --prefix)/share/zsh"
