#!/bin/bash
set -e

BASE_URL="https://productsway.com"
OUTPUT_FILE="public/sitemap.xml"
LASTMOD=$(date +%Y-%m-%d)

extract_date() {
    local file="$1"
    local frontmatter_date=$(grep '^date:' "$file" | head -1 | sed 's/date: *["'\'']*\([^"'\'']*\)["'\'']*/\1/' | sed 's/ *$//' | tr -d '"')

    if [[ -n "$frontmatter_date" ]]; then
        echo "$frontmatter_date" | cut -d'T' -f1
    else
        date -r "$file" +%Y-%m-%d 2>/dev/null || echo "$LASTMOD"
    fi
}

add_url() {
    local path="$1"
    local priority="$2"
    local changefreq="${3:-daily}"
    local lastmod="${4:-$LASTMOD}"

    cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>
EOF
}

cat > "$OUTPUT_FILE" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

add_url "/" "1.0"
add_url "/notes" "0.9"
add_url "/videos" "0.9"

for dir_path in "posts:/notes" "videos:/video"; do
    IFS=':' read -r dir url_prefix <<< "$dir_path"
    if [ -d "$dir" ]; then
        for file in "$dir"/*.md; do
            [ -f "$file" ] || continue
            slug=$(basename "$file" .md | sed 's/ /-/g')
            add_url "/${url_prefix}/${slug}" "0.8" "weekly" "$(extract_date "$file")"
        done
    fi
done

cat >> "$OUTPUT_FILE" << 'EOF'
</urlset>
EOF

echo "Sitemap generated at $OUTPUT_FILE"
echo "Total URLs: $(grep -c '<loc>' "$OUTPUT_FILE")"
