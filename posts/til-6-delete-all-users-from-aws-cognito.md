---
date: "09/01/2020 6:10 PM +0800"
tag:
  - AWS
  - AWS Cognito
  - CLI
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 6 - Delete all users from AWS Cognito"
description: Bulk delete Cognito users via AWS CLI
_template: post
---

## What

Delete all users from an AWS Cognito user pool using CLI.

## Why

Useful for clearing test data during development or testing.

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
