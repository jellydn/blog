#!/bin/bash

# Generate sitemap.xml for the notes
# This script scans posts and videos directories and generates sitemap.xml

set -e

BASE_URL="https://productsway.com"
OUTPUT_FILE="public/sitemap.xml"
POSTS_DIR="posts"
VIDEOS_DIR="videos"

# Get current date for lastmod
LASTMOD=$(date +%Y-%m-%d)

# Start XML
cat > "$OUTPUT_FILE" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

# Add homepage
cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${LASTMOD}</lastmod>
  </url>
EOF

# Add notes page
cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>${BASE_URL}/notes</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${LASTMOD}</lastmod>
  </url>
EOF

# Add notes
if [ -d "$POSTS_DIR" ]; then
    for file in "$POSTS_DIR"/*.md; do
        if [ -f "$file" ]; then
            # Extract slug from filename
            slug=$(basename "$file" .md)
            # Get file modification date
            file_date=$(date -r "$file" +%Y-%m-%d 2>/dev/null || echo "$LASTMOD")
            # Convert spaces to hyphens in URL
            slug_url=$(echo "$slug" | sed 's/ /-/g')

            cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>${BASE_URL}/notes/${slug_url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${file_date}</lastmod>
  </url>
EOF
        fi
    done
fi

# Add video pages
if [ -d "$VIDEOS_DIR" ]; then
    for file in "$VIDEOS_DIR"/*.md; do
        if [ -f "$file" ]; then
            # Extract slug from filename
            slug=$(basename "$file" .md)
            # Get file modification date
            file_date=$(date -r "$file" +%Y-%m-%d 2>/dev/null || echo "$LASTMOD")
            # Convert spaces to hyphens in URL
            slug_url=$(echo "$slug" | sed 's/ /-/g')

            cat >> "$OUTPUT_FILE" << EOF
  <url>
    <loc>${BASE_URL}/video/${slug_url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${file_date}</lastmod>
  </url>
EOF
        fi
    done
fi

# Close XML
cat >> "$OUTPUT_FILE" << 'EOF'
</urlset>
EOF

echo "✅ Sitemap generated at $OUTPUT_FILE"
echo "📊 Total URLs: $(grep -c '<loc>' "$OUTPUT_FILE")"
