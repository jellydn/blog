---
date: 10/21/2021 9:30 PM +0800
tag:
    - PostgreSQL.
    - db
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: 'TIL #21 - How to fix PostgreSQL duplicate key violates (out of sync)'
description: This is quite tricky to get to this issue
---

# Why

For some reason, we could have an issue with the primary key auto-generated.

# How

Check the next primary key value

    SELECT nextval('public.source_id_seq'), MAX(id) FROM "source";

Then adjust the value

     SELECT SETVAL((SELECT PG_GET_SERIAL_SEQUENCE('"source"', 'id')), (SELECT (MAX("id") + 1) FROM "source"), FALSE);
