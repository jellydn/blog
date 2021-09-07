---
date: 05/30/2021 3:12 PM +0800
tag:
  - React
  - CLI
author: Dung Huynh
hero_image: ''
title: New Web APP CLI
description: Frontend app generator, built on top vitejs
---

Hi there,

Recently, I often create react app with [http://vitejs.dev/](http://vitejs.dev/ 'http://vitejs.dev/') but it's missing some pre-configuration for me. So that's why I decided to build `new-web-app` CLI.

    npx new-web-app

Simple usage and friendly for developers

    .New Web App Generator

    USAGE
      $ new-web-app

    OPTIONS
      -a, --airbnb=yes|no           add ESLint, Prettier with Airbnb style (Typescript)
      -f, --react-hook-form=yes|no  add react-hook-form
      -h, --help                    show CLI help
      -n, --name=name               folder name to create
      -q, --react-query=yes|no      add react-query
      -s, --storybook=yes|no        add storybook
      -t, --tailwind=yes|no         add tailwind css
      -v, --version                 show CLI version

    EXAMPLES
      $ npx new-web-app -n=react-app -a=yes -q=yes
      $ npx new-web-app --name=react-app --airbnb=yes --react-query=yes

Demo

![](https://gyazo.com/2ace08cfb1435f82a1c8e9550f547e44.gif)
