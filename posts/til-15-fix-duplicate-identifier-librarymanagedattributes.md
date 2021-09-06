---
date: 08/21/2021 10:22 PM +0800
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: "#TIL 15 - Fix Duplicate identifier 'LibraryManagedAttributes'"
description:
  How to fix duplicate identifier 'LibraryManagedAttributes' with yarn
  log
---

Hi there,

If you run into some issues like mine

```
8:06:15.242  	node_modules/@types/react-dom/node_modules/@types/react/index.d.ts(3068,14): error TS2300: Duplicate identifier 'LibraryManagedAttributes'.
18:06:15.242  	node_modules/@types/react-dom/node_modules/@types/react/index.d.ts(3132,13): error TS2717: Subsequent property declarations must have the same type.  Property 'input' must be of type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>', but here has type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'.
18:06:15.247  	node_modules/@types/react/index.d.ts(3093,14): error TS2300: Duplicate identifier 'LibraryManagedAttributes'.
18:06:15.276
```

Here is the tip. What you need is run below command and push the `yarn.log` file to your repository.

    npx yarn-deduplicate yarn.lock

Enjoy and have a nice day!
