---
date: "09/01/2020 6:10 PM +0800"
tag:
  - AWS
  - AWS Cognito
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 6 - Delete all users from AWS Cognito"
description: "Bulk-delete every user in an AWS Cognito user pool with the CLI and jq"
_template: post
---

## What

Delete every user in an AWS Cognito user pool using the AWS CLI.

## Why

Cognito has no "delete all users" button. After integration tests you need a clean pool — `list-users` returns paginated results, and piping usernames into `admin-delete-user` clears them without clicking through the console.

## How

```sh
aws cognito-idp list-users --user-pool-id POOL_ID \
  | jq -r '.Users | .[] | .Username' \
  | while read uname; do
      aws cognito-idp admin-delete-user \
        --user-pool-id POOL_ID \
        --username "$uname"
    done
```
