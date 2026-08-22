---
date: "01/03/2023 11:41 PM +0800"
tag:
  - nvim
  - github copilot
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 36 - Github Copilot with NvChad/Nvim"
description: "Install and configure github/copilot.vim in Neovim with custom Ctrl-j/k/l keybindings"
_template: post
---

## What

Install GitHub Copilot in Neovim and map custom keybindings for accepting and cycling suggestions.

## Why

The official `copilot.vim` plugin ships with Tab-based defaults that conflict with snippet expanders in NvChad. Setting `copilot_assume_mapped = true` and binding `<C-j>`/`<C-k>`/`<C-l>` gives you explicit control over suggestion navigation.

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
