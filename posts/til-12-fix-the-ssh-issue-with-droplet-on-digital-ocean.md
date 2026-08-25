---
date: "03/28/2021 10:36 PM +0800"
tag:
  - SSH
  - Digital Ocean
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 12 - Fix the SSH issue with droplet on Digital Ocean "
description: "Recover DigitalOcean SSH access by installing a new public key from the console"
_template: post
---

## What

Fix "Permission denied (publickey)" on a DigitalOcean droplet by installing a new public key from the DigitalOcean recovery console.

## Why

Fresh droplets use key-only SSH to prevent remote password attacks. If you lose your private key, use DigitalOcean's browser console to add a replacement key without exposing root password login over SSH.

## How

Open the droplet's recovery console, then install your replacement public key:

```sh
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "ssh-ed25519 YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Keep password authentication disabled and prohibit root password login in `/etc/ssh/sshd_config`:

```sh
PermitRootLogin prohibit-password
PasswordAuthentication no
```

Validate the configuration before restarting SSH, then test the new key in a second terminal before closing the console:

```sh
sudo sshd -t
sudo service ssh restart
```
