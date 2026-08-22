---
author: Dung Huynh
date: "07/14/2023 9:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 41 - How to deploy old legacy documentation with MkDocs"
description: "Host legacy documentation versions (e.g. TypeORM v0.2) with MkDocs and deploy to Vercel"
tag:
  - typeorm
  - markdown
---

## What

Deploy an older version of a project's documentation when the official site only shows the latest release.

## Why

Projects like TypeORM retire old docs when they ship a major version, but you may still be on v0.2. Cloning a tagged release with `degit`, building it with MkDocs, and deploying to Vercel gives you a standalone docs site for the version you're actually running.

## How

**1. Clone specific version:**

```sh
npx degit typeorm/typeorm#0.2.38 typeorm-legacy
```

**2. Create mkdocs.yml:**

```yaml
site_name: TypeORM v0.2.38
site_url: https://your-url.com/
theme: readthedocs
```

**3. Build and deploy:**

```sh
pip install mkdocs
mkdocs build
npx vercel deploy
```

Demo: [typeorm-02-38.onrender.com](https://typeorm-02-38.onrender.com/)
