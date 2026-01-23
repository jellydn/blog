---
date: "03/28/2021 10:36 PM +0800"
tag:
  - SSH
  - Digital Ocean
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 12 - Fix the SSH issue with droplet on Digital Ocean "
description: Enable password authentication for SSH
_template: post
---

## What

Fix "Permission denied (publickey)" SSH error by enabling password authentication.

## Why

New droplets disable password auth. If you lose your SSH key or can't use key-based auth, you're locked out.

## How

Edit `/etc/ssh/sshd_config`:

```sh
PermitRootLogin yes
PasswordAuthentication yes
```

Restart SSH:

```sh
sudo service ssh restart
```
