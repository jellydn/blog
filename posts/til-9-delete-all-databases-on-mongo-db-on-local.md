---
date: "02/04/2021 10:33 AM +0800"
tag:
  - MongoDb
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 9 - Delete all databases on mongo db on local"
description: Drop all MongoDB databases
_template: post
---

## What

Delete all local MongoDB databases in one command.

## Why

Quick cleanup for local development environments.

## How

```sh
mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
```

**For MongoDB 5+ (mongosh):**
```sh
mongosh --quiet --eval 'db.getMongo().getDBNames().forEach(i=>db.getSiblingDB(i).dropDatabase())'
```
