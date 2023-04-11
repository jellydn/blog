---
date: '09/01/2020 6:10 PM +0800'
tag:
    - AWS
    - AWS Cognito
    - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 6 - Delete all users from AWS Cognito'
description: Delete all cognito user from AWS CLI
_template: post
---

```sh
    #!/bin/sh
    aws cognito-idp list-users --user-pool-id POOL_ID | jq -r '.Users | .[] | .Username' |
    while read uname; do
      echo "Deleting $uname";
      aws cognito-idp admin-delete-user --user-pool-id POOL_ID --username $uname;
    done
```
