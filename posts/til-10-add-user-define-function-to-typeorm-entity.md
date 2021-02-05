---
date: 02/05/2021 11:56 AM +0800
author: Dung Huynh
hero_image: ''
title: "#TIL 10 - Add User Define Function to TypeORM entity"
description: ''

---
This is a workaround that I found from the TypeORM [issue](https://github.com/typeorm/typeorm/issues/1822#issuecomment-573492291). Simply, the solution would implement as below

1. Add custom field to the class entity

     // add to User.ts entity
     @Column('int', { select: false })  
     public qty: number;

 2. Add to the query builder

    // need to mapping with the convention: table + _ + UDF column (`user_qty`) 
    .addSelect('dbo.udfFindTotalQty(user.id)', 'user_qty')
        ...
        .printSql()
        .getManyAndCount();