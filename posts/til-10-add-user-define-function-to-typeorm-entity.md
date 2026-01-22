---
date: "02/05/2021 11:56 AM +0800"
tag:
  - TypeORM
  - Database
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 10 - Add User Define Function to TypeORM entity"
description: Use database UDFs with TypeORM QueryBuilder
_template: post
---

## What

Select from a user-defined function (UDF) in TypeORM QueryBuilder.

## Why

TypeORM doesn't natively support database functions in selects. This workaround maps UDF results to entity fields.

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
