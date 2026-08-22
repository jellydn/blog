---
date: "03/28/2021 10:36 PM +0800"
tag:
  - SSH
  - Digital Ocean
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 12 - Fix the SSH issue with droplet on Digital Ocean "
description: "Fix DigitalOcean droplet Permission denied (publickey) by enabling SSH password auth"
_template: post
---

## What

Fix "Permission denied (publickey)" on a DigitalOcean droplet by enabling password authentication in `sshd_config`.

## Why

Fresh droplets ship with key-only SSH — if you lost your private key or need console access without one, the server rejects every password attempt. Flipping `PasswordAuthentication yes` lets you log in with a password while you add a new key.

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
