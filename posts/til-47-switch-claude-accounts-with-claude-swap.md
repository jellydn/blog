---
author: Dung Huynh
date: "11/27/2026 11:28 AM +0800"
hero_image: /static/til.jpeg
title: "#TIL 47 - Switch Claude accounts with claude-swap"
description: claude-swap backs up and restores Claude Code logins without logout. Manual switching between accounts I own is the lower-risk use; cswap auto sits in a policy gray zone after the 12 Nov 2026 Usage Policy.
tag:
  - claude
  - claude-code
  - cli
  - macos
---

Today I learned about [claude-swap](https://github.com/realiti4/claude-swap), a MIT-licensed CLI that keeps several Claude Code logins on one machine. It does what it says: `cswap add` stores a login, `cswap switch` restores another, and `cswap list` shows usage. The auto-rotation part is the one I would not turn on casually.

Checked on 27 Nov 2026: v1.2.0 was released on 21 Nov, with 4,990 stars, 540 forks, and 75 contributors. It needs Python 3.12+ and Claude Code.

```sh
uv tool install claude-swap
# or: pipx install claude-swap
```

## Manual switching is the useful part

Log in with the first account in Claude Code, then run:

```sh
cswap add
```

Log in with the next account and run `cswap add` again. Do not run `/logout` first: the current Claude Code may revoke the refresh token of the account being left.

```sh
cswap list              # plan, 5h/7d usage, reset times, per-model rows
cswap switch            # next account
cswap switch 2          # slot 2
cswap switch me@example.com
```

On Linux and Windows, Claude Code reads the new credential from the file on the next message. On macOS, the Keychain cache takes about 30 seconds. Restart Claude Code only if I need the switch immediately.

`cswap run 2` launches Claude Code as account 2 in that terminal only. Other terminals and the VS Code extension stay on the default account, so two accounts can work in parallel.

## Checked on my Mac

I ran only read-only commands: `cswap --version`, `cswap status`, `cswap list`, `cswap config`, and `cswap auto --once --dry-run`. I did not run `cswap switch` or enable auto-switching.

My install was v1.1.0 and offered the v1.2.0 upgrade. The active account had no credentials and showed `no credentials` with `last seen 100% used`. The dry run reported:

```text
no switch: active-usage-unknown (1/3 before failover)
```

That is the safe behaviour I wanted: auto-switch held instead of failing over to an account it could not verify.

## What I checked in the source

This is not just a wrapper that copies tokens into plain text everywhere:

- On macOS, it uses the login Keychain through `security -i`, so the secret does not appear in process arguments.
- On Linux and Windows, it writes credential files with mode `0600` inside a `0700` directory.
- It takes Claude Code's own credential locks while swapping, so a switch cannot interleave with a token refresh.
- The outbound hosts in `src/` are `api.anthropic.com`, `platform.claude.com`, and `pypi.org` for a daily version check. I found no analytics endpoint.

The backup directory still holds refresh tokens. `cswap export` is plaintext JSON, and `--full` includes the whole `~/.claude.json`. Keep that directory out of cloud sync and treat an export like a password. cswap also patches Claude Code internals, so a Claude Code update can break switching until the next cswap release.

## The policy line got narrower on 12 November

Anthropic's [Usage Policy](https://www.anthropic.com/legal/aup), effective 12 Nov 2026, says users must not:

> "Coordinate malicious activity across multiple accounts, or create multiple accounts, to avoid detection, circumvent product guardrails, or generate identical or similar inputs that otherwise violate our Usage Policy."

It also prohibits:

> "Intentionally bypass or interfere with capabilities, restrictions, or guardrails established within our products ... without prior authorization from Anthropic."

The [Consumer Terms](https://assets.claude.com/43c13f51a6d9755341433f79cf63c966ed9200ea.pdf) separately say:

> "You may not share your Account login information, Anthropic API key, or Account credentials with anyone else."

My reading: switching manually between two accounts I legitimately own is equivalent to logging out and back in, and I could not find a rule in those documents that forbids it. That is not a legal answer. Sharing a login with someone else is clearly out.

`cswap auto` is different in kind. Its whole purpose is to move off an account before a 5-hour or 7-day limit hits. That is close to the new "bypass ... restrictions" wording, even though the maintainer frames it as ordinary account management. Two users have asked about bans in the issue tracker; I found no reported ban and no security advisory. Absence of a report is not permission.

## The auto feature exists, but I am leaving it off

For completeness, these are the commands from the README:

```sh
cswap auto                           # foreground loop, polls every 60s
cswap auto --threshold 80            # switch earlier
cswap auto --weekly-threshold 97     # let the weekly window run higher
cswap auto --model Fable             # include Fable's weekly limit
cswap auto --dry-run                 # log decisions, switch nothing
cswap auto --once                    # one check, for cron or scripts
```

The default threshold is 90%, with a five-minute cooldown. Strategies include `best`, `weekly-first`, `consume-first`, and `priority-consume-first`. Persistent settings live behind `cswap config set autoswitch.*`:

```sh
cswap config set autoswitch.threshold 80
cswap config set autoswitch.weeklyThreshold 97
cswap config set autoswitch.strategy weekly-first
```

If I ever accept that risk, I would start with `--dry-run` and read the current policy again before enabling it.

## Safer options

- Zero-risk baseline: plain `claude logout` and `claude login`.
- Supported by Claude Code: one config folder per account with `CLAUDE_CONFIG_DIR` plus shell aliases. No token copying.
- [doxaras/claude-rotate](https://github.com/doxaras/claude-rotate) is a more capable rotating proxy, but the Usage Policy has explicit language about proxies and consumer subscriptions. Read that before using it too.

## Key takeaway

claude-swap is a real, well-built tool. I would use it for manual switching between work and personal accounts that I own, keep `cswap auto` off unless I accept the policy risk, and never point it at a login shared with someone else.
