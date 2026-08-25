---
date: "08/15/2020 12:41 AM +0800"
tag:
  - TIL
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 3 - Rename all JS to TS files"
description: "Bulk-rename .js files to .ts recursively with find and mv during a TypeScript migration"
_template: post
---

## What

Rename every `.js` file under a directory to `.ts` in one shell command.

## Why

TypeScript checks `.ts` and `.tsx` files by default. It can also check JavaScript when you enable `allowJs` and `checkJs`, so renaming is only necessary when you want the files converted to TypeScript. Preview the files and check for existing `.ts` destinations before a bulk rename.

## How

```sh
find src -name "*.js" -print
find src -name "*.js" -exec sh -c '
  for source do
    destination=${source%.js}.ts
    if [ -e "$destination" ]; then
      echo "Skipping $source: $destination already exists" >&2
    else
      mv "$source" "$destination"
    fi
  done
' sh {} +
```
