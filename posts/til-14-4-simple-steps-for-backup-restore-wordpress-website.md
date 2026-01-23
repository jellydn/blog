---
date: "09/01/2021 11:31 PM +0800"
tag:
  - Wordpress
  - Backup
  - Restore
  - Migrate
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 14 - 4 simple steps for backup/restore WordPress website"
description: Migrate WordPress with UpdraftPlus and EasyEngine
_template: post
---

## What

Migrate WordPress site to a new server using backup plugin.

## Why

Easy migration without manual file/database exports. Works across hosts.

## How

1. **Backup** with UpdraftPlus plugin to Google Drive
2. **Create new server** (e.g., Linode with $100 credit)
3. **Install WordPress** with EasyEngine:
   ```sh
   ee site create yourwebsite.com --type=wp --ssl=le
   ```
4. **Install UpdraftPlus** on new site, connect Google Drive, then restore
