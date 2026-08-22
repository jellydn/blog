---
date: "10/21/2021 9:30 PM +0800"
tag:
  - PostgreSQL.
  - db
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 21 - How to fix PostgreSQL duplicate key violates (out of sync)"
description: "Fix PostgreSQL duplicate key violates unique constraint by resetting an out-of-sync serial sequence"
_template: post
---

## What

Fix "duplicate key value violates unique constraint" when a PostgreSQL serial sequence falls behind the actual max ID.

## Why

Bulk imports or manual `INSERT` with explicit IDs advance table rows without bumping the sequence. The next auto-generated ID collides with an existing row — `SETVAL` resets the sequence to `MAX(id) + 1` so new inserts get fresh keys.

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
