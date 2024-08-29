---
author: Dung Huynh
date: "10/16/2023 3:48 PM +0800"
hero_image: /til.jpeg
title: "#TIL 42 - Cherry pick from pull request"
description: >-
  This is simple trick to cherry pick from pull request
tag:
  - github
  - git
  - hub
---

### How to cherry pick from pull request

#### Installation

Use Homebrew to install `hub` on macOS:

```bash
  brew install hub
```

#### Configuration

After installing, configure `hub` to work with GitHub by editing the `~/.config/hub` file.

1. **Create or Edit the Configuration File**:

   ```bash
   vi ~/.config/hub  # You can use any text editor
   ```

2. **Add Your Configuration**:
   ```yaml
   github.com:
     - user: YOUR_USERNAME
       oauth_token: ghp_YOUR_TOKEN
       protocol: https
   ```
3. **Save and Exit** the text editor.

#### Cherry pick from pull request

**Use `hub am` Command**: To apply the changes from a specific GitHub pull request to your local branch, use the following command:

```sh
  hub am -3 GITHUB-URL
```

Here, `-3` is recommended for three-way merging and `GITHUB-URL` is the URL of the pull request or commit you want to apply.

This will download the pull request's patch to a temporary location and then use `git am` to apply it to your local branch.

Hope this provides a concise and informative explanation.
