#!/usr/bin/env bash
# Lint blog prose with addyosmani/clarity diagnostic scripts.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLARITY_SCRIPTS="$ROOT/.agents/skills/clarity/scripts"
STRIP="$CLARITY_SCRIPTS/strip_markdown.py"
STATS="$CLARITY_SCRIPTS/prose_stats.py"

if [[ ! -f "$STRIP" || ! -f "$STATS" ]]; then
    echo "clarity scripts missing at $CLARITY_SCRIPTS" >&2
    exit 1
fi

lint_file() {
    local file="$1"
    echo "=== $file ==="
    python3 "$STRIP" "$file" | python3 "$STATS" -
    echo
}

if [[ $# -gt 0 ]]; then
    for file in "$@"; do
        lint_file "$file"
    done
else
    for file in "$ROOT"/posts/*.md; do
        lint_file "$file"
    done
fi
