---
date: "10/21/2021 9:30 PM +0800"
tag:
  - PostgreSQL.
  - db
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 21 - How to fix PostgreSQL duplicate key violates (out of sync)"
description: Fix PostgreSQL sequence out of sync
_template: post
---

## What

Fix "duplicate key violates unique constraint" when primary key sequence is out of sync.

## Why

Sequence may be behind actual data due to manual inserts or imports.

## How

Check current state:

```sql
SELECT nextval('public.source_id_seq'), MAX(id) FROM "source";
```

Reset sequence:

```sql
SELECT SETVAL(
  (SELECT PG_GET_SERIAL_SEQUENCE('"source"', 'id')),
  (SELECT (MAX("id") + 1) FROM "source"),
  FALSE
);
```
