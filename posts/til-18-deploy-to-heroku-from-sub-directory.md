---
date: 09/26/2021 1:05 PM +0800
tag:
    - heroku
    - devops
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 18 - Deploy to heroku from sub directory'
description: 2 simple steps for deployment to heroku
---

Step 1: Add Heroku git repository

    # e.g: Add nft-app-api repo
    heroku git:remote -a nft-app-api

Step: Deploy from sub folder with git substree

    # e.g: server is the sub directory
    git subtree push --prefix server heroku master
