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
description: "Migrate a WordPress site with UpdraftPlus backup to Google Drive and EasyEngine restore"
_template: post
---

## What

Move a WordPress site to a new server by backing up with UpdraftPlus and restoring on a fresh install.

## Why

Manual mysqldump + rsync works but misses plugin settings and uploads paths. UpdraftPlus packages the database, themes, plugins, and uploads into one archive on Google Drive — you install WordPress on the new host with EasyEngine, connect the same Drive account, and restore in place.

## How

1. **Backup** with UpdraftPlus plugin to Google Drive
2. **Create new server** (e.g., Linode with $100 credit)
3. **Install WordPress** with EasyEngine:
   ```sh
   ee site create yourwebsite.com --type=wp --ssl=le
   ```
4. **Install UpdraftPlus** on new site, connect Google Drive, then restore
