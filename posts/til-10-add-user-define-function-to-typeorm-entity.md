---
date: "02/05/2021 11:56 AM +0800"
tag:
  - TypeORM
  - Database
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 10 - Add User Define Function to TypeORM entity"
description: ""
_template: post
---

This is a workaround that I found from the [TypeORM](https://typeorm.io/#/) [issue](https://github.com/typeorm/typeorm/issues/1822#issuecomment-573492291). Simply, the solution would implement as below

Step 1: Add custom field to the class entity

```typescript
        // add to User.ts entity
        @Column('int', { insert: false, readonly: true })
        public qty: number;
```

Step 2: query the custom field with query builder

```typescript
        // need to mapping with the convention: table + _ + UDF column (user_qty)
        .addSelect('dbo.udfFindTotalQty(user.id)', 'user_qty')
        ...
        .printSql()
        .getManyAndCount();
```
