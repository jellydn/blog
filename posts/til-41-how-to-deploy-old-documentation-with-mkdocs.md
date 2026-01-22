---
author: Dung Huynh
date: "07/14/2023 9:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 41 - How to deploy old legacy documentation with MkDocs"
description: Host legacy documentation versions with MkDocs
tag:
  - typeorm
  - markdown
---

## What

Deploy older versions of documentation (e.g., TypeORM v0.2) when official site only shows latest.

## Why

Some projects only host latest docs. Older versions may still be in use.

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
