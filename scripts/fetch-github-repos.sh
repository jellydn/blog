#!/bin/bash
set -e

USERNAME="${1:-jellydn}"
OUTPUT_FILE="data/repos.json"

repos_response=$(curl -s -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100")

if ! echo "$repos_response" | jq -e . > /dev/null 2>&1; then
    echo "Error: Failed to fetch repositories"
    echo "$repos_response"
    exit 1
fi

# Transform and categorize repos
echo "$repos_response" | jq --arg username "$USERNAME" '
    def categorize:
        . as $repo |
        ([($repo.topics // []) , [$repo.name, ($repo.description // "")]] | flatten | map(ascii_downcase) | join(" ")) as $tags |
        if $tags | test("nextjs|react|vue|svelte|astro|remix|blog|web|frontend") then "web"
        elif $tags | test("ai|claude|llm|gpt|mcp|agent|openai|anthropic|ollama") then "ai"
        elif $tags | test("blockchain|evm|solidity|web3|crypto|nft|defi|smart-contract|eth|bitcoin") then "blockchain"
        elif $tags | test("cli|command|terminal|shell|script") then "cli"
        elif $tags | test("neovim|nvim|vim|lua") then "neovim"
        else "misc" end;

    [.[] | {
        name: .name,
        full_name: .full_name,
        description: .description,
        url: .html_url,
        homepage: .homepage,
        stars: .stargazers_count,
        forks: .forks_count,
        language: .language,
        topics: .topics,
        category: categorize,
        updated_at: .updated_at
    }] | group_by(.category) | map({
        category: .[0].category,
        repos: (sort_by(-.stars) | map(del(.category)))
    }) | sort_by(.category)
' > "$OUTPUT_FILE"

echo "Fetched and categorized $(jq '[.[] | .repos] | flatten | length' "$OUTPUT_FILE") repositories to $OUTPUT_FILE"
jq -r '.[] | "\(.category): \(.repos | length) repos"' "$OUTPUT_FILE"
