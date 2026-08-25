---
date: "10/23/2021 1:06 AM +0800"
tag:
  - go
  - sqlx
  - enum type
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 22 - Enum Type with PostgreSQL and sqlx"
description: "Implement Scan and Value for PostgreSQL enum arrays in Go with lib/pq"
_template: post
---

## What

Implement custom `Scan` and `Value` methods so sqlx can read and write PostgreSQL enum arrays in Go.

## Why

PostgreSQL returns enum arrays in its array text format, which includes quoting and escaping rules. Delegate that format to `lib/pq` instead of splitting on commas, then convert between `[]string` and your enum type.

## How

```go
import (
    "database/sql/driver"

    "github.com/lib/pq"
)

type ProjectSector string
type ProjectSectors []ProjectSector

func (ps *ProjectSectors) Scan(val interface{}) error {
    var values pq.StringArray
    if err := values.Scan(val); err != nil {
        return err
    }

    *ps = make(ProjectSectors, len(values))
    for i, value := range values {
        (*ps)[i] = ProjectSector(value)
    }
    return nil
}

func (ps ProjectSectors) Value() (driver.Value, error) {
    if ps == nil {
        return nil, nil
    }

    values := make(pq.StringArray, len(ps))
    for i, value := range ps {
        values[i] = string(value)
    }
    return values.Value()
}
```
