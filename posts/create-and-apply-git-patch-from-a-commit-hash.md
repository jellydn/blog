---
date: 08/12/2020 2:35 PM +0800
author: Dung Huynh
hero_image: ''
title: Create and apply git patch from a commit hash
description: ''

---
Create a patch from master then apply to work branch

    git checkout master
    git format-patch -1 COMMIT_HASH
    git checkout WORKING_BRANCH
    git am FILE_PATH