---
date: '09/01/2021 11:31 PM +0800'
tag:
    - Wordpress
    - Backup
    - Restore
    - Migrate
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 14 - 4 simple steps for backup/restore WordPress website'
description: Use Updraftplus wordpress plugin and EasyEngine
_template: post
---

**Step 1:**

Backup website to Google Driver with [https://updraftplus.com](https://updraftplus.com 'https://updraftplus.com')

**Step 2:**

Sign up a **100$ free** on [https://linode.com/syntax](https://linode.com/syntax 'https://linode.com/syntax'), credit to [https://syntax.fm/show/380/potluck-moist-code-memoization-ready-for-full-time-deadlines-design-ethics-react-components-video-hosting-local-fonts-more](https://syntax.fm/show/380/potluck-moist-code-memoization-ready-for-full-time-deadlines-design-ethics-react-components-video-hosting-local-fonts-more 'https://syntax.fm/show/380/potluck-moist-code-memoization-ready-for-full-time-deadlines-design-ethics-react-components-video-hosting-local-fonts-more')

**Step 3:**

Create a new node and use [https://easyengine.io/handbook/internal/ssl/](https://easyengine.io/handbook/internal/ssl/ 'https://easyengine.io/handbook/internal/ssl/') to quickly create a new website

    ee site create yourwebsite.com --type=wp --ssl=le

**Step 4:**

Login in and install Updraftplus on the new website. Then connect with Google Driver and rescan remote storage. Finally, press **Restore** and follow the step on UI.
