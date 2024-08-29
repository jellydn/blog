---
author: Dung Huynh
date: "07/14/2023 9:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 41 - How to deploy old legacy documentation with MkDocs"
description: >-
  The motivation behind this is that sometimes, the homepage only displays the
  latest version of a document. For instance, typeorm.com only shows the latest
  version (e.g., TypeORM v0.3), making it hard to find previous versions.
tag:
  - typeorm
  - markdown
---

The process starts with cloning the GitHub repository that contains the documentation you want to deploy. For example, to clone the markdown docs from the typeorm/typeorm repository, we use the `npx degit` command.

```sh
npx degit typeorm/typeorm#0.2.38
```

Next, we install `mkdocs` using `pip`, which is a Python package installer.

We then set up a theme for our document page by creating a `mkdocs.yml` file with some basic configuration including the site's name and URL, and the desired theme.

```yaml
site_name: TypeORM v0.2.38
site_url: https://typeorm-legacy.productsway.com/
theme: readthedocs
```

Following this, we use the `mkdocs build` command to create a static site, and then `npx vercel site` to deploy the site on Vercel. Vercel returns a live URL for our documentation.

This process enables us to effectively host and display older versions of documents, making it easier for users to find and reference previous versions of the information.

Demo: TypeORM v0.2.38 [https://typeorm-02-38.onrender.com/](https://typeorm-02-38.onrender.com/)\
Usage:
[https://github.com/jellydn/mkdocs-legacy-deployment](https://github.com/jellydn/mkdocs-legacy-deployment)
