---
date: "02/05/2021 11:56 AM +0800"
tag:
  - TypeORM
  - Database
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 10 - Add User Define Function to TypeORM entity"
description: "Select from a SQL user-defined function in TypeORM QueryBuilder with addSelect"
_template: post
---

## What

Map a SQL user-defined function (UDF) result to a TypeORM entity field using `addSelect`.

## Why

TypeORM has no first-class UDF support — it only knows about table columns. Adding a virtual `@Column` with `insert: false` and aliasing the UDF as `tableName_columnName` in QueryBuilder lets you read computed values as entity properties.

## How

**1. Add virtual column to entity:**

```typescript
@Column('int', { insert: false, readonly: true })
public qty: number;
```

**2. Select UDF in QueryBuilder:**

```typescript
repository
  .createQueryBuilder("user")
  .addSelect("dbo.udfFindTotalQty(user.id)", "user_qty")
  .getManyAndCount();
```

Note: Alias follows `tableName_columnName` convention (e.g., `user_qty`).
