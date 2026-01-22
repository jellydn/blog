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
description: Fix vim-test in monorepos
_template: post
---

## What

Fix "Not a test file" error in vim-test for monorepos.

## Why

vim-test can't find project root in large codebases. Needs `test#project_root` configured.

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
