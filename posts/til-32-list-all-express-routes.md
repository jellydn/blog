---
date: 10/09/2022 3:07 PM +0800
tag:
    - nodejs
    - expressjs
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 32 - List all express routes'
description: Find all routes mapping for your ExpressJs App
---

I'm pretty surprised this has been an [open issue for ExpressJs](https://github.com/expressjs/express/issues/3308) for a long time.

1.  Create a helper for ExpressJs

```javascript
    /_ eslint-disable no-underscore-dangle _/
    import { Application } from 'express';

    // borrow from https://github.com/expressjs/express/issues/3308#issuecomment-618993790
    function split(thing: any): string {
    if (typeof thing === 'string') {
    return thing;
    }
    if (thing.fast_slash) {
    return '';
    }
    const match = thing
    .toString()
    .replace('\\/?', '')
    .replace('(?=\\/|$)', '$')
    .match(/^\/\^((?:\\[._+?^${}()|[\]\\/]|[^._+?^${}()|[\]\\/])*)\$\//);
      return match ? match[1].replace(/\\(.)/g, '$1') : `<complex:${thing.toString()}>`;
    }

    function getRoutesOfLayer(path: string, layer: any): string[] {
    if (layer.method) {
    return [`${layer.method.toUpperCase()} ${path}`];
    }
    if (layer.route) {
    return getRoutesOfLayer(path + split(layer.route.path), layer.route.stack[0]);
    }
    if (layer.name === 'router' && layer.handle.stack) {
    let routes: string[] = [];

        layer.handle.stack.forEach((stackItem: any) => {
          routes = routes.concat(getRoutesOfLayer(path + split(layer.regexp), stackItem));
        });

        return routes;

    }

    return [];
    }

    export function getRoutes(app: Application): string[] {
    let routes: string[] = [];

    app.\_router.stack.forEach((layer: any) => {
    routes = routes.concat(getRoutesOfLayer('', layer));
    });

    return routes;
    }

    export default { getRoutes };
```

2.  Then call from your main app

```javascript
    import { getRoutes } from './express/helper';

    ...
    // show load routes on dev mode
    try {
    const allRoutes = getRoutes(app);
    logger.info('all routes', allRoutes);
    } catch (error) {
    logger.error(error);
    }

```
