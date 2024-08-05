---
title: "Master VSCode Like a Pro"
seoTitle: "Mastering VSCode Efficiently"
seoDescription: "Optimize VSCode with essential extensions and themes for a clean, efficient, personalized coding environment to boost productivity and enjoy coding"
datePublished: Tue Jul 09 2024 01:25:28 GMT+0000 (Coordinated Universal Time)
cuid: clydqbu7v00000ame2bpnfx4e
slug: master-vscode-like-a-pro
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1720486261207/d1eec38d-833d-4164-81b5-5df144a89e6c.png
tags: vscode-cjevho8kk00bo1ss2lmqqjr51, vscode-extensions, vscode-tips,  vscode

---

## Introduction

This guide will help you turn Visual Studio Code (VSCode) into a clean, optimized, and visually appealing development environment. We'll look at essential extensions and themes that improve both functionality and appearance. Ready to make your VSCode awesome again? Let’s dive in!

## Why Optimize Your VSCode Setup?

The right VSCode setup can change your coding experience by reducing clutter and improving functionality. Here’s why you should customize your environment:

* **Enhanced Cleanliness:** A simple setup reduces distractions and keeps the focus on your code.
    
* **Optimized Performance:** Improve your workflow with tools that make navigation and editing faster.
    
* **Personalized Experience:** Adjust your editor to fit your needs and preferences, making daily tasks more enjoyable and efficient.
    

## How to Set Up Your VSCode

### 1\. [Apc Customize UI++ Extension](https://github.com/drcika/apc-extension)

This allows extensive customization of VSCode's user interface, enabling you to adjust visual elements to your preference.

* **How to Use:** They provide options to tweak the settings to hide or modify UI components like the status bar, activity bar, and header. Just try and pick something that works great for your eyes.
    

```json
{
  // Apc extension https://github.com/drcika/apc-extension, more examples on https://github.com/drcika/apc-extension/issues/5
  "window.nativeTabs": true,
  // Comment below to show multiple tabs
  "workbench.editor.showTabs": "single",
  "window.titleBarStyle": "native",
  "window.customTitleBarVisibility": "never",
  "apc.electron": {
    "titleBarStyle": "hidden"
  },
  "apc.activityBar": {
    "position": "bottom",
    "hideSettings": true,
    "size": 24
  },
  // Comment below to show status bar
  "workbench.statusBar.visible": false,
  "apc.statusBar": {
    "position": "editor-bottom",
    "height": 24,
    "fontSize": 13
  },
  "apc.header": {
    "height": 35,
    "fontSize": 13
  },
  "apc.stylesheet": {
    // Setup for CSS for Which-Key
    // Let the quick pick take the full window height, so that more bindings are visible.
    ".quick-input-widget > .quick-input-list > .monaco-list": "max-height: 100vh !important;"
  },
  "window.commandCenter": true,
  "workbench.colorCustomizations": {
    "editorCursor.foreground": "#ffc600",
    "tab.activeBorder": "#ffc600"
  },
  "workbench.layoutControl.enabled": false,
}
```

### 2\. [Toggle Excluded Files](https://github.com/eamodio/vscode-toggle-excluded-files)

This extension helps manage your workspace's visibility by letting you quickly hide or show excluded files and folders.

* **Benefits:** Keeps your file explorer tidy by hiding unnecessary files or folders, such as `node_modules` or build directories, enhancing focus and reducing load times.
    

```json
{
  // Toggle excluded files extension, refer for more detail https://github.com/jellydn/vscode-toggle-excluded-files
  "files.exclude": {
    "**/.turbo": true,
    "**/.changes": true,
    "**/.git": true,
    "**/.github": true,
    "**/.grit": true,
    "**/.changeset": true,
    "**/node_modules": true,
    "**/.husky": true,
    "**/dist": true,
    "**/.next": true,
    "**/*.tsbuildinfo": true,
    "**/*.nyc_output": true,
    "**/*.tap": true,
    "**/.astro": true
  },
}
```

### 3\. File Nesting

VS Code has included these features since version 1.67. Below is a useful configuration from Anthony's settings.

![](https://user-images.githubusercontent.com/11247099/157142238-b00deecb-8d56-424f-9b20-ef6a6f5ddf99.png align="left")

* **How to Use:** Incorporate these configurations into your `settings.json` for better file management.
    

### 4\. Icon & Theme

There are many options available, but here are my favorites:

* **Cobalt2:** [https://github.com/wesbos/cobalt2-vscode](https://github.com/wesbos/cobalt2-vscode)
    
* **Catppuccin Icons:** [https://github.com/catppuccin/vscode-icons](https://github.com/catppuccin/vscode-icons)
    
* **Catppuccin Theme:** [https://github.com/catppuccin/vscode](https://github.com/catppuccin/vscode)
    

[![Theme switcher](https://i.gyazo.com/57139ebccf6b73f09e60125749c89584.gif align="left")](https://gyazo.com/57139ebccf6b73f09e60125749c89584)

# Resources

Learn more about customizing VSCode in my detailed guide [VS Code Like a Pro](https://github.com/jellydn/vscode-like-pro) or watch our tutorial on YouTube.

%[https://www.youtube.com/watch?v=yMh0FQ-okog] 

## Conclusion

Optimizing your VSCode setup makes your coding environment personal and boosts your productivity. By adding these extensions and themes, you create a workspace that is efficient, tidy, and uniquely yours. What’s your favorite VSCode trick? Share your setups and tips with the community so we can all learn from each other.