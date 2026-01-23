---
date: "01/03/2023 11:41 PM +0800"
tag:
  - nvim
  - github copilot
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 36 - Github Copilot with NvChad/Nvim"
description: Setup GitHub Copilot in Neovim
_template: post
---

## What

Install and configure GitHub Copilot in Neovim with custom keybindings.

## Why

Copilot provides AI-powered code suggestions. Official vim plugin works with Neovim.

## How

**1. Install plugin** (with packer/vim-plug):

```lua
use { "github/copilot.vim" }
```

**2. Add to init.lua:**

```lua
-- Prevent default mappings
vim.g.copilot_assume_mapped = true

-- Custom keybindings
vim.keymap.set("i", "<C-j>", "<Plug>(copilot-next)", { nowait = true })
vim.keymap.set("i", "<C-k>", "<Plug>(copilot-previous)", { nowait = true })
vim.keymap.set("i", "<C-l>", "<Plug>(copilot-suggest)", { nowait = true })
```

**3. Authenticate:**

```vim
:Copilot setup
```
