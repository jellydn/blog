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
description: "How to setup folding on Neovim, including support preview the fold"
_template: post
---

In this post, I will guide you through the process of setting up folding in Neovim using Nvim UFO (kevinhwang91/nvim-ufo) and fold-preview.nvim plugins. Follow the steps below:

Step 1: Setup options

    -- UFO folding
    vim.o.foldcolumn = "1" -- '0' is not bad
    vim.o.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
    vim.o.foldlevelstart = 99
    vim.o.foldenable = true
    vim.o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]

Step 2: Install folding plugins

    return {
      -- UFO folding
      {
        "kevinhwang91/nvim-ufo",
        dependencies = {
          "kevinhwang91/promise-async",
          {
            "luukvbaal/statuscol.nvim",
            config = function()
              local builtin = require("statuscol.builtin")
              require("statuscol").setup({
                relculright = true,
                segments = {
                  { text = { builtin.foldfunc }, click = "v:lua.ScFa" },
                  { text = { "%s" }, click = "v:lua.ScSa" },
                  { text = { builtin.lnumfunc, " " }, click = "v:lua.ScLa" },
                },
              })
            end,
          },
        },
        event = "BufReadPost",
        opts = {
          provider_selector = function()
            return { "treesitter", "indent" }
          end,
        },

        init = function()
          vim.keymap.set("n", "zR", function()
            require("ufo").openAllFolds()
          end)
          vim.keymap.set("n", "zM", function()
            require("ufo").closeAllFolds()
          end)
        end,
      },
      -- Folding preview, by default h and l keys are used.
      -- On first press of h key, when cursor is on a closed fold, the preview will be shown.
      -- On second press the preview will be closed and fold will be opened.
      -- When preview is opened, the l key will close it and open fold. In all other cases these keys will work as usual.
      { "anuvyklack/fold-preview.nvim", dependencies = "anuvyklack/keymap-amend.nvim", config = true },
    }

That's it! Now you have folding enabled in Neovim using the Nvim UFO and fold-preview.nvim plugins. Enjoy your enhanced code navigation and organization!

More detail about my config on [feat: add ufo folding and support preview · jellydn/lazy-nvim-ide@426f235](https://github.com/jellydn/lazy-nvim-ide/commit/426f235702636a673cfa2075e978f5ebe7331830)
