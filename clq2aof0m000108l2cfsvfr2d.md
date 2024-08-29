---
title: "Simplify Your TypeScript workflow with typecheck.nvim"
seoTitle: "Simplify Your TypeScript workflow with typecheck.nvim"
seoDescription: "typecheck.nvim is a Neovim plugin specifically designed to streamline TypeScript development. It provides real-time type checking, integrating effortlessly"
datePublished: Tue Dec 12 2023 12:04:14 GMT+0000 (Coordinated Universal Time)
cuid: clq2aof0m000108l2cfsvfr2d
slug: simplify-your-typescript-workflow-with-typechecknvim
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/npxXWgQ33ZQ/upload/7024a3e720d6f534c58b980f5694e548.jpeg
tags: neovim, typescript, typecheck
---

## Context

TypeScript development often involves switching between the editor and terminal to run type checks. As someone who regularly works with TypeScript, I've experienced this pain point firsthand. While I explored solutions like [`tsc.nvim`](https://github.com/dmmulroy/tsc.nvim), they didn't quite fit my needs. Drawing on my experience creating [`my-note.nvim`](https://github.com/jellydn/my-note.nvim) and [`hurl.nvim`](https://github.com/jellydn/hurl.nvim), I decided to develop a new tool: `typecheck.nvim`.

**What is** [**typecheck.nvim**](https://github.com/jellydn/typecheck.nvim)**?**

`typecheck.nvim` is a Neovim plugin specifically designed to streamline TypeScript development. It provides real-time type checking, integrating effortlessly with Neovim's quickfix window, which allows for quick navigation and fixing of type errors within your TypeScript projects.

## Features

- Asynchronous type checking: Run TypeScript compiler (`tsc`) checks without blocking the Neovim UI.
- Integration with quickfix or [trouble.nvim](https://github.com/folke/trouble.nvim) window: View and navigate TypeScript errors and warnings directly within Neovim.

## Installation

To integrate `typecheck.nvim` into your workflow, include the following in your plugin manager's configuration:

```bash
return {
  "jellydn/typecheck.nvim",
  dependencies = { "folke/trouble.nvim", dependencies = { "nvim-tree/nvim-web-devicons" } },
  ft = { "javascript", "javascriptreact", "json", "jsonc", "typescript", "typescriptreact" },
  opts = {
    debug = true,
    mode = "trouble", -- "quickfix" | "trouble"
  },
  keys = {
    {
      "<leader>ck",
      "<cmd>Typecheck<cr>",
      desc = "Run Type Check",
    },
  }
}
```

## Demo

Simply run `:Typecheck` to initiate type checking. The quickfix window pops up to display any errors or warnings, streamlining the error-handling process.

[![Demo](https://i.gyazo.com/5009755ceb575afc78d7303983a2f7c0.gif align="left")](https://gyazo.com/5009755ceb575afc78d7303983a2f7c0)

#### Integration with [trouble.nvim](https://github.com/folke/trouble.nvim)

For those who prefer `trouble.nvim like me :)`, `typecheck.nvim` integrates smoothly, offering an alternative way to navigate and resolve TypeScript issues.

[![Show on Trouble](https://i.gyazo.com/fc367f6cc005dd53f696c299e383318a.gif align="left")](https://gyazo.com/fc367f6cc005dd53f696c299e383318a)

## Credits

`typecheck.nvim` was inspired by `dmmulroy/tsc.nvim`, a Neovim plugin that also focuses on asynchronous, project-wide TypeScript type-checking using the TypeScript compiler (`tsc`). Drawing on its core concept, `typecheck.nvim` aims to refine and enhance the TypeScript checking experience within Neovim.

## Conclusion

**Try it out, and let me know what you think!**

If you have any suggestions or want to contribute, don't hesitate to send a PR or open an issue on GitHub.
