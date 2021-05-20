---
date: 05/21/2021 1:56 AM +0800
author: Dung Huynh
hero_image: ''
title: '#TIL 13 - How to fix refusing to allow an OAuth App to create or update workflow'
description: The simple solution is Git Credential Manager Core
---

Hi,

It's been a while for me to fix this issue:

```sh
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/jellydn/next-demo-app.git
  ! [remote rejected] main -> main (refusing to allow an OAuth App to create or update workflow `.github/workflows/codechecks.yml` without `workflow` scope)
error: failed to push some refs to 'https://github.com/jellydn/next-demo-app.git'
```

## Solution

Git Credential Manager Core (Secure, cross-platform Git credential storage with authentication to GitHub, Azure Repos, and other popular Git hosting services.)
[https://github.com/microsoft/Git-Credential-Manager-Core](https://github.com/microsoft/Git-Credential-Manager-Core 'https://github.com/microsoft/Git-Credential-Manager-Core')
