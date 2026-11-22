---
author: Dung Huynh
date: "11/22/2026 4:00 PM +0800"
hero_image: /static/til.jpeg
title: "#TIL 46 - Run local LLMs on an M1 Max 32 GB"
description: On a 32 GB M1 Max, the 25 GiB Metal working set is the real budget, and active parameters decide the speed. Results and launch settings for Inkling 2 Mini, Qwen3.8-27B, and LFM2.5-24B-A2B at 128K.
tag:
  - llm
  - macos
  - llama.cpp
  - mlx
---

Today I learned that two numbers decide what runs well on my MacBook Pro (M1 Max, 32 GB, 32-core GPU). The first is the **25 GiB Metal working set**, not the 32 GB of RAM. The second is the number of **active parameters**, not the model size.

I ran three models at the full 128K context. All three passed the 6 lab gates of the [Local AI registry](https://github.com/sybil-solutions/local-ai-registry). Full notes are in [tiny-local-ai discussions](https://github.com/jellydn/tiny-local-ai/discussions/3).

## Results

Same Mac, macOS 26.6.2, AC power. Decode is the median of 6 × 512 tokens at temperature 1.0.

| Model                                                                    | Quant / engine                                 |                        Decode | Prefill (short) | Long-context check |
| ------------------------------------------------------------------------ | ---------------------------------------------- | ----------------------------: | --------------: | ------------------ |
| [Inkling 2 Mini](https://github.com/jellydn/tiny-local-ai/discussions/3) | UD-Q4_K_XL 17.6 GB / Unsloth llama.cpp         |                    20.5 tok/s |     202.6 tok/s | 91,890 tokens      |
| [Qwen3.8-27B](https://github.com/jellydn/tiny-local-ai/discussions/4)    | UD-Q4_K_XL 17.7 GB / Unsloth llama.cpp + MTP 3 | 15.0 tok/s (11.9 without MTP) |       124 tok/s | 106,294 tokens     |
| [LFM2.5-24B-A2B](https://github.com/jellydn/tiny-local-ai/discussions/5) | MLX 6-bit 19.5 GB / mlx-lm                     |                **68.9 tok/s** |  **~970 tok/s** | 91,882 tokens      |

Inkling and LFM both got 6/6 on the same 6 checked prompts (code run against tests, SQL run in SQLite, puzzles with one correct answer). Inkling gives short answers. LFM thinks about 2.8× longer but still finishes first. Qwen thinks at length: one 600-word story prompt took 15,182 tokens.

Registry PRs: [#466](https://github.com/sybil-solutions/local-ai-registry/pull/466), [#470](https://github.com/sybil-solutions/local-ai-registry/pull/470), [#475](https://github.com/sybil-solutions/local-ai-registry/pull/475).

## Lessons

### 1. The Metal working set is the budget

macOS gives the GPU about 25 GiB on a 32 GB Mac. Add up the `buffer size =` lines in the llama.cpp log. For Inkling at 128K:

| Launch                      | Total Metal buffers | Result        |
| --------------------------- | ------------------: | ------------- |
| default (`-ub 512`, f16 KV) |          26,786 MiB | OOM at warmup |
| `-ub 256`, f16 KV           |          25,342 MiB | OOM at warmup |
| `-ub 256`, q8_0 KV          |          23,326 MiB | runs          |

No `sysctl iogpu.wired_limit_mb` change was necessary. This also rules out 8-bit quants: they leave no room for a 128K KV cache.

### 2. Active parameters set the speed

LFM reads about 2 GB per token (about 2.4B active). Inkling reads about 4 GB (3.4B active, looped MoE). Dense Qwen reads about 16.5 GB. That explains most of the 3–4× gap.

### 3. Speculative decoding depends on the architecture

- **Qwen (dense):** the built-in MTP head with 3 drafts gives +26% (11.9 → 15.0 tok/s). All drafted tokens share the same weights, so the verify step is cheap.
- **Inkling (MoE):** the DSpark drafter makes it **slower** (15–17 tok/s against 20.5). Each drafted token routes to its own experts, so verifying k tokens costs about k steps.

Measure with control runs before and after each candidate. A guide written for CUDA can be wrong for Metal.

### 4. Pick the engine that serves 128K

I compared llama.cpp with the [Neywa-Labs/mlx-vlm](https://github.com/Neywa-Labs/mlx-vlm) fork for Inkling and Qwen. llama.cpp wins for both, because only llama.cpp serves 128K. MLX runs out of memory at about 32–52K tokens.

- MLX prefills Inkling about 1.6–1.9× faster under ~40K tokens, but decodes 10–20% slower.
- MLX + DFlash2 for Qwen needs `--draft-block-size 3` on M1. The default gives **2.7 tok/s**.

Use **Unsloth's llama.cpp build** [`b12588-mix-c0c3de8`](https://github.com/unslothai/llama.cpp/releases/tag/b12588-mix-c0c3de8). Mainline llama.cpp gives wrong output for Inkling until [ggml-org/llama.cpp#32704](https://github.com/ggml-org/llama.cpp/pull/32704) merges.

### 5. GPU cores matter for prefill, not decode

On the 32-core GPU, LFM decodes +7% and prefills +27% faster than the 24-core registry result. Decode depends on memory bandwidth, which is the same on both. Prefill depends on compute.

### 6. LookAtMyQuant is made for M5

[LookAtMyQuant](https://github.com/ShinMegamiBoson/lookatmyquant) has an 8.9 GB Inkling file with about 2.4× faster prefill. But decode falls to 8 tok/s at 25K tokens, and it runs out of memory at about 32K. Its drafter and Qwen kernels fail on M1 (threadgroup size limits) or run very slowly (1.3–1.7 tok/s for Qwen).

## Launch settings

Inkling 2 Mini (llama.cpp, 128K):

```sh
llama-b12588-mix-c0c3de8/llama-server \
  -m Inkling-2-Mini-UD-Q4_K_XL.gguf \
  -c 131072 -np 1 -ngl 99 -fa on --fit off \
  -ub 256 -ctk q8_0 -ctv q8_0 --cache-ram 0 \
  --temp 1.0 --top-p 1.0 --top-k 0 --min-p 0.0 \
  --jinja --alias inkling-2-mini --host 127.0.0.1 --port 8080
```

Qwen3.8-27B (llama.cpp + MTP, 128K):

```sh
llama-b12588-mix-c0c3de8/llama-server \
  -m Qwen3.8-27B-UD-Q4_K_XL.gguf \
  --spec-type draft-mtp --spec-draft-n-max 3 \
  -c 131072 -np 1 -ngl 99 -fa on --fit off \
  -ub 256 -ctk q8_0 -ctv q8_0 --cache-ram 0 \
  --temp 1.0 --top-p 0.95 --top-k 20 --min-p 0.0 \
  --jinja --alias qwen3.8-27b --host 127.0.0.1 --port 8080
```

LFM2.5-24B-A2B (mlx-lm, 128K), with the registry launcher `mlx-lm-lfm2.5-serve.py`:

```sh
python3 -m venv .venv
.venv/bin/pip install mlx-lm==0.32.2 mlx==0.32.4
HF_HUB_OFFLINE=1 .venv/bin/python lfm25_mlx_serve.py \
  --model models/LFM2.5-24B-A2B-MLX-6bit-1deec53e \
  --max-tokens 131072 --decode-concurrency 1 \
  --prompt-concurrency 1 --prompt-cache-size 1 \
  --host 127.0.0.1 --port 8080
```

The settings that matter:

- `-ub 256` and `-ctk q8_0 -ctv q8_0`: without them, Inkling does not fit at 128K.
- `--spec-type draft-mtp --spec-draft-n-max 3`: Qwen only. Do not use a drafter with Inkling.
- `--max-tokens 131072`: `mlx_lm.server` stops at 512 tokens by default, which cuts off a thinking model.

## Which one I use

- **LFM2.5-24B-A2B** for daily work: about 3× faster than the others.
- **Inkling 2 Mini** when I want short, direct answers.
- **Qwen3.8-27B** for very long prompts or vision.

## Key takeaway

On a 32 GB M1 Max, first make sure the model fits in the 25 GiB Metal working set. Then choose a model with few active parameters. Test speculative decoding and new engines against control runs, because the fastest option on CUDA or an M5 can be slower on an M1.
