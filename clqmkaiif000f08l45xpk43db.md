---
title: "How to use Copilot Chat with Neovim!"
seoTitle: "How to use Copilot Chat with Neovim!"
seoDescription: "Integrating Copilot Chat with Neovim"
datePublished: Tue Dec 26 2023 16:28:45 GMT+0000 (Coordinated Universal Time)
cuid: clqmkaiif000f08l45xpk43db
slug: how-to-use-copilot-chat-with-neovim
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/hGV2TfOh0ns/upload/80e813597ae1cce5f089140144a56eb0.png
tags: neovim, copilot, copilot-chat

---

### Intro

If you're a Neovim/Vim user who has been eagerly anticipating Copilot Chat, your wait might be over. There's been significant buzz about it in the community, as evidenced by the numerous comments in this discussion: [copilot.vim support for copilot chat? · community · Discussion #50939](https://github.com/orgs/community/discussions/50939)

### Context

A few weeks ago, a new and somewhat unpolished plugin surfaced. It's not an official release from the GitHub team, but rather a community-driven initiative. It caught my attention, and I decided to explore it. Written in Python, integrating this plugin into my Neovim configuration involved copying a few files and running UpdateRemotePlugins, followed by a Neovim restart.

%[https://www.youtube.com/watch?v=By_CCai62JE&t=7s] 

### Demo & Usage

For this demonstration, I'll be integrating the plugin using my fork with lazy.nvim:

```bash
{
    "CopilotC-Nvim/CopilotChat.nvim",
    opts = {},
    build = function()
      vim.cmd("UpdateRemotePlugins") -- You need to restart to make it works
    end,
    event = "VeryLazy",
    keys = {
      { "<leader>cce", "<cmd>CopilotChatExplain<cr>", desc = "CopilotChat - Explain code" },
      { "<leader>cct", "<cmd>CopilotChatTests<cr>", desc = "CopilotChat - Generate tests" },
    },
  }
```

To use it, simply yank code into the unnamed register and run `CopilotChat` to open a new buffer for an interactive chat session.

[![Demo](https://i.gyazo.com/10fbd1543380d15551791c1a6dcbcd46.gif align="left")](https://gyazo.com/10fbd1543380d15551791c1a6dcbcd46)

### Roadmap and Future Enhancements

This plugin is still in its early stages, but it shows immense promise. A noteworthy development on the horizon is the addition of sub-commands, a feature requested by me on [Feature Request: support sub-commands in CopilotChat.nvim · Issue #5 · gptlang/CopilotChat.nvim](https://github.com/gptlang/CopilotChat.nvim/issues/5). The author has acknowledged this request and plans to implement it soon, which is expected to significantly enhance the plugin's functionality and user experience.

Your feedback and trials are essential to its evolution, so I encourage you to give it a try and contribute to its ongoing development.