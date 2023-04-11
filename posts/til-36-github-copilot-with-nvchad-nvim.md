---
date: '01/03/2023 11:41 PM +0800'
tag:
    - nvim
    - github copilot
author: Dung Huynh
hero_image: /static/til.jpeg
title: '#TIL 36 - Github Copilot with NvChad/Nvim'
description: How to setup Github Copilot
_template: post
---

GitHub Copilot is a powerful tool that can help you write code more efficiently by suggesting entire functions and code snippets in real-time as you work. If you use Neovim or Vim as your code editor, you can install the **`[github/copilot.vim: Neovim plugin for GitHub Copilot](https://github.com/github/copilot.vim)`** plugin to integrate GitHub Copilot into your workflow. Here's a step-by-step guide on how to set up GitHub Copilot with Neovim or Vim:

1. Install the plugin: The first step is to install the **`copilot.vim`** plugin. You can do this using a plugin manager like vim-plug or packer.nvim. Alternatively, you can install the plugin manually by cloning the repository and adding it to your Neovim or Vim configuration.
2. Add configuration: Next, you will need to add a configuration option to your Neovim or Vim configuration file. Add the following line to your **`init.lua`** or **`.vimrc`** file:

```lua
    vim.g.copilot_assume_mapped = true
```

This option tells GitHub Copilot to assume that all the commands are already mapped to keys in your editor's configuration. This is useful if you want to use your own key bindings for the plugin.

3. Add key bindings: You can also customize the key bindings for the plugin by adding a mapping to your Neovim or Vim configuration file. Add the following block to your **`init.lua`** or **`.vimrc`** file:

```lua
    M.copilot = {
        i = {
        ["<C-j>"] = { "<Plug>(copilot-next)", "copilot next", opts = { nowait = true } },
        ["<C-k>"] = { "<Plug>(copilot-previous)", "copilot previous", opts = { nowait = true } },
        ["<C-l>"] = { "<Plug>(copilot-suggest)", "copilot suggest", opts = { nowait = true } },
        },
    }
```

This will map the **`copilot-next`**, **`copilot-previous`**, and **`copilot-suggest`** commands to the **`Control`** + **`j`**, **`Control`** + **`k`**, and **`Control`** + **`l`** keys respectively. You can customize these key bindings to your liking by changing the key combinations in the mapping.

4. Run the setup command: Finally, you can run the **`:Copilot setup`** command in Neovim or Vim to finish the setup process. This command will create the necessary directories and files for the plugin to work properly.

That's it! You have successfully set up GitHub Copilot with Neovim or Vim. You can now start using the plugin to get code suggestions as you write, and collaborate more efficiently with your team.
