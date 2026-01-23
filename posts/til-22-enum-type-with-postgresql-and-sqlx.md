---
date: "10/23/2021 1:06 AM +0800"
tag:
  - go
  - sqlx
  - enum type
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 22 - Enum Type with PostgreSQL and sqlx"
description: Custom Scan/Value for PostgreSQL enums in Go
_template: post
---

## What

Implement custom `Scan` and `Value` methods for PostgreSQL enum types with sqlx.

## Why

PostgreSQL returns enums as `"{value1,value2}"`. Need parsing to convert to Go types.

## How

```go
type ProjectSector string
type ProjectSectors []ProjectSector

func parseEnumFormat(str []byte) string {
    if len(str) == 0 { return "" }
    return strings.Replace(string(str[1:len(str)-1]), "\"", "", -1)
}

func (ps *ProjectSector) Scan(val interface{}) error {
    if b, ok := val.([]byte); ok {
        *ps = ProjectSector(parseEnumFormat(b))
        return nil
    }
    return fmt.Errorf("unsupported type: %T", val)
}

func (ps *ProjectSectors) Scan(val interface{}) error {
    if val == nil { *ps = []ProjectSector{}; return }
    parts := strings.Split(parseEnumFormat(val.([]byte)), ",")
    for _, p := range parts {
        *ps = append(*ps, ProjectSector(p))
    }
    return nil
}

func (ps ProjectSectors) Value() (driver.Value, error) {
    if ps == nil { return "", nil }
    return fmt.Sprintf(`{%s}`, ps), nil
}
```
