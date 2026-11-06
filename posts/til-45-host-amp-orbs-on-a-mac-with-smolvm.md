---
author: Dung Huynh
date: "11/06/2026 4:00 PM +0800"
hero_image: /static/til.jpeg
title: "#TIL 45 - Host Amp orbs on a Mac with smolvm"
description: Amp self-hosted orbs can run on an Apple Silicon Mac through smolvm. wrap and the published wrapvm image cannot be the provider there.
tag:
  - amp
  - macos
  - smolvm
  - devops
---

Today I learned that [Amp self-hosted orbs](https://ampcode.com/news/self-hosted-orbs) can run on my Mac, and that the program which actually fits is [smolvm](https://github.com/smol-machines/smolvm). [wrap](https://github.com/tobi/wrap) and the published [wrapvm](https://github.com/tobi/wrapvm) image do not.

Amp's side of the contract is small. You run `amp orb provider ./dispatch.sh` on a machine you control. It opens an outbound HTTPS connection to ampcode.com. Amp sends three jobs. Your script does the work:

| Job      | What the script must do                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `spawn`  | Start the machine named `ORB_ID`, or resume it. Then run `amp orb bootstrap` inside it as the image user, with `ORB_TOKEN` set. |
| `pause`  | Stop the machine and keep its disk. A platform that can also save RAM keeps the processes.                                      |
| `delete` | Remove the machine and its disk. Amp sends this when the thread is deleted, not when it is archived.                            |

A spawn has to finish within five minutes. Pull the image once before the provider starts.

## The VPS is the wrong host

I looked at this on the Dokku box first: Ubuntu 24.04, 4 CPUs, 7.8 GB RAM, about 2.3 GB free, and 7.0 GB free on a 72 GB disk. The official orb image is 1.7 GB compressed.

Docker can `stop` a container and keep its files. It cannot save RAM, so a waking orb loses its processes. Archived threads stay on disk until someone deletes them. One desktop container plus a snapshot would fill that disk and compete with the apps already running there.

After removing two unused image tags and one scratch directory, free space was 9.8 GB. Still the wrong place for this.

## wrap and wrapvm, as shipped

`wrap` v0.9 ships a Linux x86_64 binary. The release note says the macOS build waits on a microsandbox fix. The CLI also binds one VM to the project directory you started it from, and it has no pause or resume command you can call with an orb id.

`wrapvm` is a desktop image plus a short script. The script creates one smolvm machine per directory, with 4 CPUs, 8 GB of RAM, and that directory mounted in. GitHub Actions builds the image on `ubuntu-latest`, so `ghcr.io/tobi/wrapvm:desktop` is amd64.

This Mac is arm64, with 12 CPUs and 32 GB of RAM. smolvm on macOS runs arm64 guests. That published desktop image will not boot here. wrap has an arm64 base Containerfile, and that file does not include the desktop.

## What does fit

smolvm is the runtime wrapvm already calls, and it installs on macOS:

```sh
brew install smol-machines/tap/smolvm
```

`machine pause` writes RAM, disks, and execution state, then stops the VM. `machine resume` brings the same machine back with its processes. `machine stop` keeps the disk and drops the processes. `machine delete --force` removes it.

That maps onto the three jobs:

```sh
# spawn: resume a paused orb, or start one that already exists
smolvm machine resume --name "$ORB_ID" \
  || smolvm machine start --name "$ORB_ID"

# first time: create it, then boot Amp inside it
# smolvm machine create --name "$ORB_ID" --image "$ORB_IMAGE"
# smolvm machine exec --name "$ORB_ID" -u user -- amp orb bootstrap

# pause
smolvm machine pause --name "$ORB_ID"

# delete
smolvm machine delete --name "$ORB_ID" --force
```

Boot Amp's own arm64 image. It already has the Amp CLI, plus the tools for portals, Terminal, and Desktop:

```text
us-central1-docker.pkg.dev/amp-prod-0/amp-orb/amp-orb-arm64:latest
```

The provider stays on the Mac:

```sh
export AMP_ORB_PROVIDER_TOKEN="aop_live_…"
amp orb provider "$HOME/.config/amp/orb-dispatch.sh"
```

Create the token once with `amp orb provider create itman-mac`, or from **Settings → Orbs** on ampcode.com. Run one provider per token.

## Limits I would keep

The Mac has to stay awake. The provider only receives jobs while that process is running.

Each paused orb keeps its disk and its saved RAM until the thread is deleted. On a 32 GB machine I would cap dispatch at one or two orbs, around 4 GB each, instead of wrapvm's default of 8 GB.

A checkpoint file is the stand-in for `ORB_SNAPSHOT_ID` when Amp asks for a project snapshot. Pause alone keeps one orb. It does not give the next thread a prepared copy.

## Key takeaway

On this Mac, the provider is `amp orb provider` plus a dispatch script that calls smolvm. The guest image is Amp's arm64 orb image. wrap's CLI and the published wrapvm desktop image are a different shape, and a different CPU, from what Amp will send.
