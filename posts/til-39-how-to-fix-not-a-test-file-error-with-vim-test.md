---
date: 03/13/2023 9:56 PM +0800
tag:
- lazyvim
- nvim
- vim-test
- ide
author: Dung Huynh
hero_image: ''
title: '#TIL 39 - How to fix "Not a test file" error with vim-test'
description: 'Vim-test plugin has not supported on large project or monorepo yet.
  A lot of issues on Github. e.g: "Not a test file" error when running any of the
  test command.'

---
Hi all,

At the time I'm wring this TIL, there are 26 open issues with [https://github.com/vim-test/vim-test/issues?q=is:issue+is:open+Not+a+test+file](https://github.com/vim-test/vim-test/issues?q=is:issue+is:open+Not+a+test+file "https://github.com/vim-test/vim-test/issues?q=is:issue+is:open+Not+a+test+file") 

You should find below"working directory" on readme as the solution. Either you use "autochdir" or "cd" to the test directory.

> ### Working directory
>
> Test.vim relies on you being `cd`-ed into the project root. However, sometimes you may want to execute tests from a different directory than Vim's current working directory. You might have a bigger project or monorepo with many subprojects, or you might be using [`autochdir`](http://vimdoc.sourceforge.net/htmldoc/options.html#'autochdir'). In any case, you can tell test.vim to use a different working directory for running tests:

I have used user commands before so I could write my own to resolve this issue on my NVim.

    local create_cmd = vim.api.nvim_create_user_command
    
    local function setProjectRootByCurrentBuffer()
      -- get path by test file
      local path = vim.fn.expand("%:p:h")
      -- find up to 5 levels to find package.json
      for i = 1, 5 do
        local package_json = path .. "/package.json"
        if vim.fn.filereadable(package_json) == 1 then
          break
        end
        path = vim.fn.fnamemodify(path, ":h")
      end
    
      -- set project root
      vim.g["test#project_root"] = path
    end
    
    -- TODO: find vitest or jest on devDependencies or dependencies package.json and set test#javascript#runner
    
    -- Usage: :TestWithJest when in test file or :TestWithVitest when in test file
    -- vim-test plugin has not supported on large project or monorepo yet. A lot of issues on github
    -- e.g: "Not a test file" error when running any of the test command
    create_cmd("TestWithJest", function()
      setProjectRootByCurrentBuffer()
      vim.g["test#javascript#runner"] = "jest"
    
      -- set npx jest to run test
      vim.g["test#javascript#jest#executable"] = "npx jest"
      vim.g["test#javascript#jest#options"] = "--detectOpenHandles --updateSnapshot"
    
      vim.cmd("TestNearest")
    end, {})
    
    create_cmd("TestWithVitest", function()
      setProjectRootByCurrentBuffer()
      vim.g["test#javascript#runner"] = "vitest"
    
      -- set npx vitest to run test
      vim.g["test#javascript#vitest#executable"] = "npx vitest"
      vim.g["test#javascript#vitest#options"] = "--update"
    
      vim.cmd("TestNearest")
    end, {})

With those user commands, I could run it once if I've got any "Not a test file" error. More detail about my config on [https://github.com/jellydn/lazy-nvim-ide/blob/main/lua/plugins/test.lua](https://github.com/jellydn/lazy-nvim-ide/blob/main/lua/plugins/test.lua "https://github.com/jellydn/lazy-nvim-ide/blob/main/lua/plugins/test.lua")