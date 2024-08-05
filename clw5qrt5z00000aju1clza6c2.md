---
title: "The Latest in Node.js Development for 2024"
seoTitle: "The Latest in Node.js Development for 2024"
seoDescription: "Discover the latest Node.js features for 2024, including built-in fetch, native .env support, and more"
datePublished: Tue May 14 2024 01:56:19 GMT+0000 (Coordinated Universal Time)
cuid: clw5qrt5z00000aju1clza6c2
slug: the-latest-in-nodejs-development-for-2024
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1715606265374/a71eaf7e-76df-423f-ac80-4cbe38c4e771.png
tags: nodejs, node-js-development

---

### Node [Fetch](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch) Built-in

With Node.js 18, developers can write cleaner, more efficient code thanks to built-in [fetch](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch) support, eliminating the need for external libraries.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715608660249/32503a6f-b26c-4406-81c2-3a36615c9522.png align="center")

```sh
node index.js
```

[![Node Fetch built-in in NodeJs 18](https://i.gyazo.com/4aedf45ff0747307dd231c4940711cbd.gif align="left")](https://gyazo.com/4aedf45ff0747307dd231c4940711cbd)

### Read .env File Natively

Node.js 20 introduces [native support](https://github.com/nodejs/node/pull/48890) for `.env` files, making it easier to manage environment variables. You no longer need to use the `dotenv` package.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715608823676/5b7738e9-f0e2-4466-98a5-7236c6bd0773.png align="center")

```sh
node --env-file=.env.local index.js
```

[![Read .env file  with NodeJs 20](https://i.gyazo.com/69fc0f7279ba4946b51f4e686be0a0ff.gif align="left")](https://gyazo.com/69fc0f7279ba4946b51f4e686be0a0ff)

### [Testing](https://nodejs.org/api/test.html) with `node:test`

The [`node:test`](https://nodejs.org/api/test.html) library in Node.js 20 simplifies the setup and reduces dependencies needed for projects.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715608905636/130893ce-ed05-481e-81d3-f73ef45ecd58.png align="center")

```sh
node --test
```

[![Node runner with NodeJs 20](https://i.gyazo.com/ba01f3bbcce55a1da1118eedabac5dec.gif align="left")](https://gyazo.com/ba01f3bbcce55a1da1118eedabac5dec)

### Task runner with `node --run`

The `node --run` command introduced in [Node.js 22](https://nodejs.org/api/cli.html#--run) provides a built-in mechanism for a task runner, complementing but not replacing existing package managers like npm, yarn, or pnpm.

> ##### **Intentional limitations**
> 
> `node --run` is not meant [t](https://nodejs.org/api/cli.html#intentional-limitations)o match the behaviors of `npm run` or of the `run` commands of other package managers. The Node.js implementation is intentionally more limited, in order to focus on top performance for the most common use cases.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715609990099/6c4adba2-fc2f-4bed-8926-11c76bcc3bfc.png align="center")

```sh
node --run start
```

[![Task runner with NodeJs 22](https://i.gyazo.com/9f95d9e7399bab3bb9422c051f89defc.gif align="left")](https://gyazo.com/9f95d9e7399bab3bb9422c051f89defc)

### Permission model

Node.js 22 enhances application security with an [experimental permission model](https://nodejs.org/api/permissions.html#process-based-permissions) (`--experimental-permission)`, offering controls similar to those seen in Deno.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715613303039/de892595-2067-4b37-91ca-8509429e16de.png align="center")

```sh
node --experimental-permission index.js
```

[![experimental-permission with NodeJs 22](https://i.gyazo.com/908b473c571103b7aecba6725c0025cb.gif align="left")](https://gyazo.com/908b473c571103b7aecba6725c0025cb)

### Import ESM modules from CJS

The ability to [import ESM modules from CommonJS](https://nodejs.org/api/cli.html#--experimental-require-module) scripts under the `--experimental-require-module` flag in Node.js 22 simplifies module management and encourages the adoption of ESM.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715613249227/c640fe69-a894-40be-8585-bc610bd0ff45.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715613210133/cd3b77e1-aa0d-4935-9d0c-560f917f507a.png align="center")

```sh
node --experimental-require-module index.cjs
```

[![Import ESM with NodeJs 22](https://i.gyazo.com/52a555700892cd7c246debb7d6d1324c.gif align="left")](https://gyazo.com/52a555700892cd7c246debb7d6d1324c)

## **Conclusion**

These features mark just the beginning of what’s possible with the latest updates in Node.js from versions 18 to 22. To dive deeper and see these features in action, check out the [**modern-nodejs-2024**](https://github.com/jellydn/modern-nodejs-2024) repository for hands-on examples.

For a more visual explanation and additional insights, watch my video on [YouTube](https://www.youtube.com/watch?v=HeuLPpc3x04)[.](https://www.youtube.com/watch?v=HeuLPpc3x04)

%[https://www.youtube.com/watch?v=HeuLPpc3x04] 

Cheers, and happy coding with the new Node.js features!