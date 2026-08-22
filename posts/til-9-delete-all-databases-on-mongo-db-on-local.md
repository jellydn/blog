---
date: "02/04/2021 10:33 AM +0800"
tag:
  - MongoDb
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 9 - Delete all databases on mongo db on local"
description: "Drop every MongoDB database on localhost with one mongo or mongosh eval command"
_template: post
---

## What

Drop every database on your local MongoDB instance in one command.

## Why

Switching between projects leaves test databases behind. Iterating `getDBNames()` and calling `dropDatabase()` on each sibling DB resets your local instance without reinstalling MongoDB.

## How

```sh
mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
```

**For MongoDB 5+ (mongosh):**

```sh
mongosh --quiet --eval 'db.getMongo().getDBNames().forEach(i=>db.getSiblingDB(i).dropDatabase())'
```
