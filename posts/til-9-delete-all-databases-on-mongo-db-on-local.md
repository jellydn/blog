---
date: "02/04/2021 10:33 AM +0800"
tag:
  - MongoDb
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 9 - Delete all databases on mongo db on local"
description: "Drop local MongoDB application databases while preserving system databases"
_template: post
---

## What

Drop every application database on your local MongoDB instance while preserving the `admin`, `config`, and `local` system databases.

## Why

Switching between projects leaves test databases behind. Filter the protected system databases out of `getDBNames()`, then call `dropDatabase()` on each remaining sibling database. Run this only against a disposable local instance.

## How

```sh
mongo --quiet --eval 'db.getMongo().getDBNames().filter(function(i){return ["admin","config","local"].indexOf(i) === -1}).forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
```

**For MongoDB 5+ (mongosh):**

```sh
mongosh --quiet --eval 'db.getMongo().getDBNames().filter(i=>!["admin","config","local"].includes(i)).forEach(i=>db.getSiblingDB(i).dropDatabase())'
```
