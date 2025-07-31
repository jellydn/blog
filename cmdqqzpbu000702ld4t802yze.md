---
title: "⚙️ 3 Practical Enhancements for Claude Code to Maximize Productivity"
datePublished: Thu Jul 31 2025 02:00:36 GMT+0000 (Coordinated Universal Time)
cuid: cmdqqzpbu000702ld4t802yze
slug: 3-practical-enhancements-for-claude-code-to-maximize-productivity
tags: claude-code

---

[Claude Code](https://claude.ai/) is a powerful CLI-based developer assistant. But with a few tweaks, you can make it even more efficient and integrated into your daily workflow. Here are three enhancements I use daily to boost my productivity:

### **1️⃣ Create a Shell Alias to Skip Permission Prompts**

If you’re tired of manually confirming every action, add this alias to your shell config:

```bash
alias ccs "$HOME/.claude/local/claude --dangerously-skip-permissions"
```

It’s similar to yolo mode in Cursor, and it’s not as scary as it sounds.

[![Image from Gyazo](https://i.gyazo.com/c05a540cc4eb806b9d8dda173a91a6c5.png align="left")](https://gyazo.com/c05a540cc4eb806b9d8dda173a91a6c5)

### **2️⃣ Add Useful** [**Hooks**](https://docs.anthropic.com/en/docs/claude-code/hooks-guide) **to Claude**

You can use ~/.claude/settings.json to customize Claude’s behavior — such as triggering macOS notifications when Claude needs your input or when it finishes running.

Here’s my configuration:

```json
{
  "env": {
    "CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR": "1"
  },
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e \"display notification \\\"$(jq -r .message)\\\" with title \\\"$(jq -r .title)\\\" sound name \\\"Glass\\\"\""
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'CC Done!' | terminal-notifier -sound default"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "command": "if [[ \"$( jq -r .tool_input.file_path )\" =~ \\.(ts|tsx|js|jsx)$ ]]; then biome check --write \"$( jq -r .tool_input.file_path )\"; fi",
            "type": "command"
          },
          {
            "command": "if [[ \"$( jq -r .tool_input.file_path )\" =~ \\.go$ ]]; then gofmt -w \"$( jq -r .tool_input.file_path )\"; fi",
            "type": "command"
          }
        ],
        "matcher": "Write|Edit|MultiEdit"
      }
    ]
  },
  "permissions": {
    "allow": [
      "Read(**)",
      "Edit(**)",
      "MultiEdit(**)",
      "Write(**)",
      "Glob(**)",
      "Grep(**)",
      "LS(**)",
      "WebSearch(**)",
      "TodoRead()",
      "TodoWrite(**)",
      "Task(**)",
      "Bash(git status*)",
      "Bash(git log*)",
      "Bash(git diff*)",
      "Bash(git show*)",
      "Bash(git blame*)",
      "Bash(git branch*)",
      "Bash(git remote -v*)",
      "Bash(git config --get*)",
      "Bash(gh pr*)",
      "Bash(ls*)",
      "Bash(cat *)",
      "Bash(less *)",
      "Bash(head*)",
      "Bash(tail*)",
      "Bash(grep*)",
      "Bash(find*)",
      "Bash(tree*)",
      "Bash(pwd*)",
      "Bash(wc*)",
      "Bash(diff *)",
      "Bash(sed -n*)",
      "Bash(awk*)",
      "Bash(cut*)",
      "Bash(sort*)",
      "Bash(uniq*)",
      "Bash(basename *)",
      "Bash(dirname *)",
      "Bash(realpath *)",
      "Bash(readlink *)",
      "Bash(curl*)",
      "Bash(jq*)",
      "Bash(yq eval*)",
      "Bash(python*)",
      "Bash(python3*)",
      "Bash(node*)",
      "Bash(npm list*)",
      "Bash(npm run*)",
      "Bash(npx*)",
      "Bash(black --check*)",
      "Bash(black --diff*)",
      "Bash(pylint*)",
      "Bash(flake8*)",
      "Bash(mypy*)",
      "Bash(eslint*)",
      "Bash(pytest*)",
      "Bash(make test*)",
      "Bash(npm test*)",
      "Bash(make -n*)",
      "Bash(man *)",
      "Bash(pydoc*)",
      "Bash(which *)",
      "Bash(type *)",
      "Bash(echo *)",
      "Bash(printf *)",
      "Bash(test *)",
      "Bash(true*)",
      "Bash(false*)",
      "Bash(* | grep*)",
      "Bash(* | jq*)",
      "Bash(* | head*)",
      "Bash(* | tail*)",
      "Bash(* | wc*)",
      "Bash(* | sort*)",
      "Bash(* | uniq*)"
    ],
    "deny": []
  }
}
```

🖼️ Example output on macOS with [terminal-notifier](https://github.com/julienXX/terminal-notifier):

[![Image from Gyazo](https://i.gyazo.com/c6b18507f0d633f70bd01a313a8c761c.png align="center")](https://gyazo.com/c6b18507f0d633f70bd01a313a8c761c)

3️⃣ **Monitor usage in real-time**

Use [`ccm`](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor) to check token usage and cost while you work.

```bash
# Install directly from PyPI with uv (easiest)
uv tool install claude-monitor

# Run from anywhere
claude-monitor  # or cmonitor, ccmonitor for short
```

📊 Here’s what it looks like in my terminal:

[![Image from Gyazo](https://i.gyazo.com/4d668f77b2c175fef69a7fb5f2b2a4c1.png align="left")](https://gyazo.com/4d668f77b2c175fef69a7fb5f2b2a4c1)

Save time, stay in flow. 💡

#Claude #AItools #DeveloperProductivity