---
date: "10/20/2021 12:01 PM +0800"
tag:
  - go
  - sqlx
author: Dung Huynh
hero_image: /static/til.jpeg
title: >-
  #TIL 20 - How to fix unsupported Scan, storing driver.Value type []uint8 into
  type
description: Custom Scan for JSON columns in Go sqlx
_template: post
---

## What

Fix "unsupported Scan" error when scanning JSON database columns into custom Go types.

## Why

sqlx can't automatically scan JSON/JSONB columns into custom structs. Need custom `Scan` method.

## How

Implement `sql.Scanner` interface:

```go
type Registries []Registry

func (r *Registries) Scan(src interface{}) error {
    var data []byte
    switch v := src.(type) {
    case []byte:
        data = v
    case string:
        data = []byte(v)
    case nil:
        return nil
    }
    return json.Unmarshal(data, r)
}
```
