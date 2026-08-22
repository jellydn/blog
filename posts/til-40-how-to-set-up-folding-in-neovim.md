---
date: "04/11/2023 9:08 PM +0800"
tag:
  - neovim
  - nvim
  - folding
  - ufo
  - preview
author: Dung Huynh
hero_image: /static/til.jpeg
title: "TIL #40 - How to Set Up Folding in Neovim"
description: "Set up Treesitter-based code folding in Neovim with nvim-ufo and fold-preview.nvim"
_template: post
---

## What

Configure fast, Treesitter-aware code folding in Neovim with nvim-ufo and a fold preview popup.

## Why

Built-in Neovim folding uses slow syntax-based providers and gives no preview of folded content. nvim-ufo uses Treesitter for accurate fold boundaries, and fold-preview.nvim shows the hidden lines in a popup before you expand.

## How

**1. Set options:**

```lua
vim.o.foldcolumn = "1"
vim.o.foldlevel = 99
vim.o.foldenable = true
vim.o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]
```

**2. Install plugins (with lazy.nvim):**

```lua
{
  "kevinhwang91/nvim-ufo",
  dependencies = { "kevinhwang91/promise-async" },
  opts = {
    provider_selector = function() return { "treesitter", "indent" } end
  },
  init = function()
    vim.keymap.set("n", "zR", require("ufo").openAllFolds)
    vim.keymap.set("n", "zM", require("ufo").closeAllFolds)
  end
},
{ "anuvyklack/fold-preview.nvim", dependencies = "anuvyklack/keymap-amend.nvim" }
```

Press `h` on closed fold to preview, press again to open.
