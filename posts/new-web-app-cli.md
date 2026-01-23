---
date: "2021-05-30T07:12:00.000Z"
tag:
  - React
  - CLI
author: Dung Huynh
hero_image: /static/new-web-app.png
title: New Web APP CLI
description: "React app generator built on Vite"
---

## Context

Vite is fast, but creating a new app requires additional setup: ESLint, Prettier, Tailwind, Storybook, React Query, React Hook Form. `new-web-app` CLI provides pre-configured templates so you don't have to manually add these tools.

## Usage

```sh
npx new-web-app
```

### Options

| Option                  | Description                             |
| ----------------------- | --------------------------------------- |
| `-n, --name`            | Folder name to create                   |
| `-a, --airbnb`          | Add ESLint + Prettier with Airbnb style |
| `-t, --tailwind`        | Add Tailwind CSS                        |
| `-q, --react-query`     | Add React Query                         |
| `-f, --react-hook-form` | Add React Hook Form                     |
| `-s, --storybook`       | Add Storybook                           |

### Examples

```sh
# Full stack with Airbnb style
npx new-web-app -n=react-app -a=yes -q=yes -t=yes

# Long form
npx new-web-app --name=react-app --airbnb=yes --react-query=yes
```

[Demo](https://gyazo.com/2ace08cfb1435f82a1c8e9550f547e44.gif)
