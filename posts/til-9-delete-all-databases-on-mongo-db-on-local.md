---
date: 02/04/2021 10:33 AM +0800
author: Dung Huynh
hero_image: ''
title: "#TIL 9 - Delete all databases on mongo db on local"
description: ''

---
    mongo --quiet --eval 'db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})'