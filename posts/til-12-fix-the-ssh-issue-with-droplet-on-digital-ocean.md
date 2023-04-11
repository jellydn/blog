---
date: '03/28/2021 10:36 PM +0800'
tag:
    - SSH
    - Digital Ocean
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 12 - Fix the SSH issue with droplet on Digital Ocean '
description: 'This issue is really annoying. Hopefully, this will help someone like me.'
_template: post
---

I have sent an email to Digital Ocean for support but not much help for me. Luckly, I found out the way after reading a comment from [the community question.](https://www.digitalocean.com/community/questions/error-permission-denied-publickey-when-i-try-to-ssh)

(Ubuntu 18.04):

```sh
    sudo nano /etc/ssh/sshd_config
    PermitRootLogin prohibit-password to PermitRootLogin yes
    PasswordAuthentication no to PasswordAuthentication yes
```

then, restart ssh service:

```
    sudo service ssh restart
```
