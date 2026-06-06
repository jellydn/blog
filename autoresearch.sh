#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if command -v bun >/dev/null 2>&1; then
  bun scripts/autoresearch-blog-posts.ts
elif command -v pnpm >/dev/null 2>&1; then
  pnpm exec bun scripts/autoresearch-blog-posts.ts
else
  echo "METRIC total_posts_count=0"
  echo "METRIC homepage_posts_count=0"
  echo "METRIC uses_shared_fetcher=0"
  exit 1
fi