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

Neovim supports several built-in fold methods, including manual, indent, expression, marker, and syntax folding. nvim-ufo adds convenient Treesitter and indent providers, while fold-preview.nvim shows hidden lines in a popup before you expand a fold.

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
