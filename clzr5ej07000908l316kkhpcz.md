---
title: "Simplifying Tmux"
seoTitle: "Simplifying Tmux"
seoDescription: "Simple Guide to Tmux Setup and Personalization using .tmux"
datePublished: Mon Aug 12 2024 15:28:10 GMT+0000 (Coordinated Universal Time)
cuid: clzr5ej07000908l316kkhpcz
slug: simplifying-tmux
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723473188202/08a428b6-9beb-47f0-a207-5a113e3d5628.png
tags: tmux

---

## Introduction

At first, I found `tmux` difficult to use and set up, even though it offers a fantastic [wiki for getting started](https://github.com/tmux/tmux/wiki/Getting-Started). I wished there was an open-source tool like [Oh My Zsh](https://ohmyz.sh/) for tmux. Then, aha, I discovered [`.tmux`](https://github.com/gpakosz/.tmux)—a game-changer that makes tmux much more approachable and easy to customize.

In this post, I'll guide you through my workflow for setting up `.tmux` on Mac OSX.

## Install .tmux

Getting started with `.tmux` is straightforward. Follow these simple steps:

```bash
brew instal tmux
```

Then, clone the `.tmux` repository and customize it locally:

```sh
$ cd ~
$ git clone https://github.com/gpakosz/.tmux.git
$ ln -s -f .tmux/.tmux.conf
$ cp .tmux/.tmux.conf.local .
```

## Color Theme

If you are fine with the default color, you can skip this step.

![Default theme](https://cloud.githubusercontent.com/assets/553208/19740585/85596a5a-9bbf-11e6-8aa1-7c8d9829c008.gif align="left")

However, if you want to personalize your setup, you can use a custom theme. I recommend checking out [Kanagawa.nvim](https://github.com/rebelot/kanagawa.nvim) for some excellent color palettes. Once you find a scheme you like, update the colors in `~/.tmux.conf.local`:

```bash
# custom theme: Kanagawa, refer https://github.com/rebelot/kanagawa.nvim#color-palette
tmux_conf_theme_colour_1="#16161D"    # dark gray
tmux_conf_theme_colour_2="#2A2A37"    # gray
tmux_conf_theme_colour_3="#727169"    # light gray
tmux_conf_theme_colour_4="#7fb4ca"    # light blue
tmux_conf_theme_colour_5="#e6c384"    # yellow
tmux_conf_theme_colour_6="#16161D"    # dark gray
tmux_conf_theme_colour_7="#dcd7ba"    # white
tmux_conf_theme_colour_8="#16161D"    # dark gray
tmux_conf_theme_colour_9="#e6c384"    # yellow
tmux_conf_theme_colour_10="#D27E99"   # pink
tmux_conf_theme_colour_11="#98bb6c"   # green
tmux_conf_theme_colour_12="#727169"   # light gray
tmux_conf_theme_colour_13="#dcd7ba"   # white
tmux_conf_theme_colour_14="#16161D"   # dark gray
tmux_conf_theme_colour_15="#16161D"   # dark gray
tmux_conf_theme_colour_16="#C34043"   # red
tmux_conf_theme_colour_17="#dcd7ba"   # white
```

[![Tmux with Kanagawa theme](https://i.gyazo.com/445e9608bd7808912e0279f4cb67bacf.png align="left")](https://gyazo.com/445e9608bd7808912e0279f4cb67bacf)

## Essential Plugins

To improve your Tmux experience, consider installing these plugins:

* [https://github.com/christoomey/vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator) - Seamless navigation between Neovim/Vim and Tmux panes.
    
* [https://github.com/tmux-plugins/tmux-resurrect](https://github.com/tmux-plugins/tmux-resurrect) - Save and restore your Tmux session
    

You can enable plugins by searching for `tpm` in your configuration file, then uncommenting or adding new plugins:

```bash
# /!\ the tpm bindings differ slightly from upstream:
#   - installing plugins: <prefix> + I
#   - uninstalling plugins: <prefix> + Alt + u
#   - updating plugins: <prefix> + u

# /!\ do not add set -g @plugin 'tmux-plugins/tpm'
# /!\ do not add run '~/.tmux/plugins/tpm/tpm'

# to enable a plugin, use the 'set -g @plugin' syntax:
# visit https://github.com/tmux-plugins for available plugins
#set -g @plugin 'tmux-plugins/tmux-copycat'
#set -g @plugin 'tmux-plugins/tmux-cpu'
set -g @plugin 'tmux-plugins/tmux-resurrect'
#set -g @plugin 'tmux-plugins/tmux-continuum'
#set -g @continuum-restore 'on'

# Navigator
# Smart pane switching with awareness of Vim splits.
# See: https://github.com/christoomey/vim-tmux-navigator
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
    | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|l?n?vim?x?|fzf|lazygit)(diff)?$'"
bind-key -n 'C-h' if-shell "$is_vim" 'send-keys C-h'  'select-pane -L'
bind-key -n 'C-j' if-shell "$is_vim" 'send-keys C-j'  'select-pane -D'
bind-key -n 'C-k' if-shell "$is_vim" 'send-keys C-k'  'select-pane -U'
bind-key -n 'C-l' if-shell "$is_vim" 'send-keys C-l'  'select-pane -R'
tmux_version='$(tmux -V | sed -En "s/^tmux ([0-9]+(.[0-9]+)?).*/\1/p")'
if-shell -b '[ "$(echo "$tmux_version < 3.0" | bc)" = 1 ]' \
    "bind-key -n 'C-\\' if-shell \"$is_vim\" 'send-keys C-\\'  'select-pane -l'"
if-shell -b '[ "$(echo "$tmux_version >= 3.0" | bc)" = 1 ]' \
    "bind-key -n 'C-\\' if-shell \"$is_vim\" 'send-keys C-\\\\'  'select-pane -l'"

bind-key -T copy-mode-vi 'C-h' select-pane -L
bind-key -T copy-mode-vi 'C-j' select-pane -D
bind-key -T copy-mode-vi 'C-k' select-pane -U
bind-key -T copy-mode-vi 'C-l' select-pane -R
bind-key -T copy-mode-vi 'C-\' select-pane -l
```

For more details, you can check out [my dotfile](https://github.com/jellydn/dotfiles/tree/master/tmux).

Give it a try and boost your productivity! 🚀

#ProductivityHacks #TechLife #Tmux