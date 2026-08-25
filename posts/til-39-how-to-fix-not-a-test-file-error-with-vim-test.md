---
date: "03/13/2023 9:56 PM +0800"
tag:
  - lazyvim
  - nvim
  - vim-test
  - ide
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 39 - How to fix "Not a test file" error with vim-test'
description: "Fix vim-test Not a test file error in monorepos by setting test#project_root dynamically"
_template: post
---

## What

Fix the vim-test "Not a test file" error when running tests from nested directories in a monorepo.

## Why

vim-test looks for a project root marker (like `package.json`) starting from the current file's directory. In monorepos the nearest `package.json` may be several levels up — walking the path and setting `g:test#project_root` before running tells vim-test where Jest lives.

## How

Create user command that finds project root by locating `package.json`:

```lua
local function setProjectRoot()
  local path = vim.fn.expand("%:p:h")
  for _ = 1, 5 do
    if vim.fn.filereadable(path .. "/package.json") == 1 then
      vim.g["test#project_root"] = path
      return
    end
    path = vim.fn.fnamemodify(path, ":h")
  end
end

vim.api.nvim_create_user_command("TestWithJest", function()
  setProjectRoot()
  vim.g["test#javascript#runner"] = "jest"
  vim.g["test#javascript#jest#executable"] = "npx jest"
  vim.cmd("TestNearest")
end, {})
```

Use `:TestWithJest` when in test files.
