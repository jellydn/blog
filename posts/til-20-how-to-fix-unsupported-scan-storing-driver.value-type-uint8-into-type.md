---
date: '10/20/2021 12:01 PM +0800'
tag:
    - go
    - sqlx
author: Dung Huynh
hero_image: /static/til.jpeg
title: >-
    #TIL 20 - How to fix unsupported Scan, storing driver.Value type []uint8 into
    type
description: This is common issue with sqlx and how to use custom Scan to fix this error
_template: post
---

# What

Recently, I have run into this issue with mapping database fields with a struct.

> unsupported Scan, storing driver.Value type \[\]uint8 into type YOUR_STRUCT
>
> ---

# How

At first, I would suggest checking the document about it [https://jmoiron.github.io/sqlx/#advancedScanning](https://jmoiron.github.io/sqlx/#advancedScanning 'https://jmoiron.github.io/sqlx/#advancedScanning')

then write your custom scan as below. Thanks for a comment on the open Github issue on sqlx repository. I could manage to make it work.

    package models

    import (
    	"encoding/json"
    )

    type Accreditor struct {
    	ID   int32  `json:"id" db:"id"`
    	Name string `json:"name" db:"name"`
    }

    type Registries []Registry
    type AccreditorRegistries struct {
    	Registries Registries `json:"registries" db:"registries,omitempty"`
    	Accreditor
    }

    // advance scan for custom type, refer https://github.com/jmoiron/sqlx/issues/578#issuecomment-562401476
    func parseJSONToModel(src interface{}, dest interface{}) error {
    	var data []byte

    	if b, ok := src.([]byte); ok {
    		data = b
    	} else if s, ok := src.(string); ok {
    		data = []byte(s)
    	} else if src == nil {
    		return nil
    	}

    	return json.Unmarshal(data, dest)
    }

    func (r *Registries) Scan(src interface{}) error {
    	return parseJSONToModel(src, r)
    }
