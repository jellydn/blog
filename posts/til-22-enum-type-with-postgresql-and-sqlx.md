---
date: 10/23/2021 1:06 AM +0800
tag:
    - go
    - sqlx
    - enum type
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 22 - Enum Type with PostgreSQL and sqlx'
description: How to define Scan/Value with sqlx in go lang
---

# Why

This is a solution when I need to have a custom scan for enum type

# How

Let's say, we will have ProjectSector as enum on PostgreSQL DB.

    type ProjectSector string

    type SourceEntity struct {

           ...

    	ProjectSectors  ProjectSectors `json:"project_sectors" db:"project_sectors"`

    }

    func parseEnumFormat(str []byte) string {

    	if len(str) == 0 {

    		return ""

    	}

    	// remove {} from enum

    	val := string(str[1 : len(str)-1])

    	return removeAllQuotesFromStr(val)

    }

    // Remove the quotes from the enum

    func removeAllQuotesFromStr(str string) string {

    	if len(str) == 0 {

    		return ""

    	}

    	// remove quotes from enum

    	val := strings.Replace(str, "\"", "", -1)

    	return val

    }

    func (ps *ProjectSector) Scan(val interface{}) error {

    	switch v := val.(type) {

    	case []byte:

    		*ps = ProjectSector(parseEnumFormat(v))

    		return nil

    	default:

    		return fmt.Errorf("UNSUPPORTED TYPE: %T", v)

    	}

    }

Then if you want to work with enum slice

    type ProjectSectors []ProjectSector

    func (ps *ProjectSectors) Scan(val interface{}) (err error) {

    	list := []ProjectSector{}

    	if val == nil {

    		*ps = list

    		return

    	}

    	v := val.([]byte)

    	sectorsArray := strings.Split(parseEnumFormat(v), ",")

    	// make unique

    	keys := make(map[string]bool)

    	for i := 0; i < len(sectorsArray); i++ {

    		if _, value := keys[sectorsArray[i]]; !value {

    			keys[sectorsArray[i]] = true

    			list = append(list, ProjectSector(sectorsArray[i]))

    		}

    	}

    	*ps = list

    	return

    }

    func (ps ProjectSectors) Value() (driver.Value, error) {

    	if ps == nil {

    		return "", nil

    	}

    	// remove [] from enum

    	enumStrArray := make([]string, len(ps))

    	for i, sector := range ps {

    		// add quotes to enum if contain spaces

    		if strings.Contains(string(sector), " ") {

    			enumStrArray[i] = fmt.Sprintf("\"%s\"", sector)

    		} else {

    			enumStrArray[i] = string(sector)

    		}

    	}

    	println(strings.Join(enumStrArray, ","))

    	return fmt.Sprintf(`{%s}`, strings.Join(enumStrArray, ",")), nil

    }
