---
date: 02/04/2021 10:33 AM +0800
tag:
  - MongoDb
  - CLI
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 9 - Delete all databases on mongo db on local'
description: 'Simple CLI command for delete all mongodb databases'
---

```sh
    mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'
```
