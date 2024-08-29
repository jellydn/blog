---
title: "C-Spell setup in Neovim: A comprehensive guide"
seoTitle: "C-Spell setup in Neovim: A comprehensive guide"
seoDescription: "A detailed tutorial for implementing spell check in your Neovim workflow"
datePublished: Tue Jul 16 2024 02:00:48 GMT+0000 (Coordinated Universal Time)
cuid: clynro8ng000509ljh4b4hmik
slug: c-spell-setup-in-neovim-a-comprehensive-guide
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/R4ruOu3fH-s/upload/140311bfe9bc849e890b4afc22bbdc2a.jpeg
tags: neovim, spellcheck, cspell
---

## Introduction

After switching to Neovim as my main IDE two years ago, I immediately noticed the absence of a tool I had relied on in Visual Studio Code: [streetsidesoftware/vscode-spell-checker](https://github.com/streetsidesoftware/vscode-spell-checker). This powerful extension was invaluable for catching typos in my code. Consequently, I wanted to develop a similar tool for my Neovim setup.

### Cspell-tool

[https://github.com/jellydn/cspell-tool](https://github.com/jellydn/cspell-tool)

This side project has helped me streamline the setup of `cspell` in any project. It scans the folder and lists all the unknown words in a text file. Naturally, you would review the results and remove the invalid words. I believe there is a demand for this among other Neovim users, so the README serves not only as documentation for the open-source tool but also as a guide for anyone using the `null-ls.nvim` plugin.

## What is the new setup?

As null-ls has been deprecated, I have migrated my setup to [`nvim-lint`](https://github.com/mfussenegger/nvim-lint)which is an asynchronous linter plugin.

> null-ls is now archived and will no longer receive updates. Please see [this issue](https://github.com/jose-elias-alvarez/null-ls.nvim/issues/1621) for details.

## Initialize Config with cspell-tool

Run the following command in your working project:

```bash
npx cspell-tool@latest
```

[![Image from Gyazo](https://i.gyazo.com/70134fde359025826efb4b0307699443.gif align="left")](https://gyazo.com/70134fde359025826efb4b0307699443)

## Install `cspell` with mason and linting with `nvim-lint`

I'm using `lazy.nvim`, so my configuration looks like this:

```bash
--- plugins/cspell.lua
return {
  --- Install cspell with mason
  {
    "williamboman/mason.nvim",
    opts = {
      ensure_installed = {
        "cspell",
      },
    },
  },
  -- Lint file
  {
    "mfussenegger/nvim-lint",
    event = "VeryLazy",
    opts = {
      linters_by_ft = {
        ["*"] = { "cspell", "codespell" }, -- Install with: pip install codespell
      },
    },
    config = function(_, opts)
      local lint = require("lint")
      lint.linters_by_ft = opts.linters_by_ft

      vim.api.nvim_create_autocmd({ "BufWritePost", "BufReadPost", "InsertLeave" }, {
        callback = function()
          local names = lint._resolve_linter_by_ft(vim.bo.filetype)

          -- Create a copy of the names table to avoid modifying the original.
          names = vim.list_extend({}, names)

          -- Add fallback linters.
          if #names == 0 then
            vim.list_extend(names, lint.linters_by_ft["_"] or {})
          end

          -- Add global linters.
          vim.list_extend(names, lint.linters_by_ft["*"] or {})

          -- Run linters.
          if #names > 0 then
            -- Check if the linter is available, otherwise it will throw an error.
            for _, name in ipairs(names) do
              local cmd = vim.fn.executable(name)
              if cmd == 0 then
                vim.notify("Linter " .. name .. " is not available", vim.log.levels.INFO)
                return
              else
                -- Run the linter
                lint.try_lint(name)
              end
            end
          end
        end,
      })
    end,
  },
}
```

## Code Action

We will create small helpers to detect the project root and initialize the **_cspell.json_** file if it does not exist.

### `utils/path.lua`

```bash
local M = {}

--- Check if the current directory is a git repo
---@return boolean
function M.is_git_repo()
  vim.fn.system("git rev-parse --is-inside-work-tree")
  return vim.v.shell_error == 0
end

--- Get the root directory of the git project
---@return string|nil
function M.get_git_root()
  return vim.fn.systemlist("git rev-parse --show-toplevel")[1]
end

--- Get the root directory of the git project or fallback to the current directory
---@return string|nil
function M.get_root_directory()
  if M.is_git_repo() then
    return M.get_git_root()
  end

  return vim.fn.getcwd()
end

return M
```

### `utils/cspell.lua`

```bash
local Path = require("utils.path")

local M = {}

function M.create_cspell_json_if_not_exist()
  local cspell_json_path = Path.get_root_directory() .. "/cspell.json"

  if vim.fn.filereadable(cspell_json_path) == 0 then
    local file = io.open(cspell_json_path, "w")
    if file then
      local default_content = [[
{
  "$schema": "https://raw.githubusercontent.com/streetsidesoftware/cspell/main/cspell.schema.json",
  "version": "0.2",
  "language": "en",
  "globRoot": ".",
  "dictionaryDefinitions": [
    {
      "name": "cspell-tool",
      "path": "./cspell-tool.txt",
      "addWords": true
    }
  ],
  "dictionaries": [
    "cspell-tool"
  ],
  "ignorePaths": [
    "node_modules",
    "dist",
    "build",
    "/cspell-tool.txt"
  ]
}
]]
      file:write(default_content)
      file:close()
    else
      vim.notify("Could not create cSpell.json", vim.log.levels.WARN, { title = "cSpell" })
    end
  end
end

-- Add unknown word under cursor to dictionary
function M.add_word_to_c_spell_dictionary()
  local word = vim.fn.expand("<cword>")

  -- Show popup to confirm the action
  local confirm = vim.fn.confirm("Add '" .. word .. "' to cSpell dictionary?", "&Yes\n&No", 2)
  if confirm ~= 1 then
    M.add_word_from_diagnostics_to_c_spell_dictionary()
    return
  end

  M.create_cspell_json_if_not_exist()
  local dictionary_path = Path.get_root_directory() .. "/cspell-tool.txt"

  -- Append the word to the dictionary file
  local file = io.open(dictionary_path, "a")
  if file then
    -- Detect new line at the end of the file or not
    local last_char = file:seek("end", -1)
    if last_char ~= nil and last_char ~= "\n" then
      word = "\n" .. word
    end

    file:write(word .. "")
    file:close()
    -- Reload buffer to update the dictionary
    vim.cmd("e!")
  else
    vim.notify("Could not open cSpell dictionary", vim.log.levels.WARN, { title = "cSpell" })
  end
end

-- Add unknown word from cspell diagnostics source to dictionary
function M.add_word_from_diagnostics_to_c_spell_dictionary()
  -- Get diagnostics source and only get from cspell
  local bufnr = vim.api.nvim_get_current_buf()
  local winnr = vim.api.nvim_get_current_win()
  local cursor = vim.api.nvim_win_get_cursor(winnr)
  local diagnostics = vim.lsp.diagnostic.get_line_diagnostics(bufnr, cursor[1] - 1)
  local cspell_diagnostics = {}
  for _, diagnostic in ipairs(diagnostics) do
    if diagnostic.source == "cspell" then
      table.insert(cspell_diagnostics, diagnostic)
    end
  end

  -- Get the first word from the first cspell diagnostic
  -- E.g. "Unknown word ( word )"
  local word = cspell_diagnostics[1].message:match("%((.+)%)")
  if word == nil then
    vim.notify("Could not find unknown word", vim.log.levels.WARN, { title = "cSpell" })
    return
  end

  -- Show popup to confirm the action
  local confirm = vim.fn.confirm("Add '" .. word .. "' to cSpell dictionary?", "&Yes\n&No", 2)
  if confirm ~= 1 then
    return
  end

  M.create_cspell_json_if_not_exist()
  local dictionary_path = Path.get_root_directory() .. "/cspell-tool.txt"

  -- Append the word to the dictionary file
  local file = io.open(dictionary_path, "a")
  if file then
    -- Detect new line at the end of the file or not
    local last_char = file:seek("end", -1)
    if last_char ~= nil and last_char ~= "\n" then
      word = "\n" .. word
    end

    file:write(word .. "")
    file:close()
    -- Reload buffer to update the dictionary
    vim.cmd("e!")
  else
    vim.notify("Could not open cSpell dictionary", vim.log.levels.WARN, { title = "cSpell" })
  end
end

return M
```

Define a keymap to add unknown words to the dictionary:

```bash
vim.keymap.set(
  "n",
  "<leader>us",
  "<cmd>lua require('utils.cspell').add_word_to_c_spell_dictionary()<CR>",
  { noremap = true, silent = true, desc = "Add unknown word to cspell dictionary" }
)
```

## Demo

[![Image from Gyazo](https://i.gyazo.com/f9db11541869b536e95cb1723fd38344.gif align="left")](https://gyazo.com/f9db11541869b536e95cb1723fd38344)

## Conclusion

Hope you enjoy this setup. You can find all the code in my Neovim config: [https://github.com/jellydn/my-nvim-ide](https://github.com/jellydn/my-nvim-ide). Let me know if you have any comments or thoughts on my approach.
