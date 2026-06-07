# Autoresearch ideas backlog

- ~~Cache bundle in getStaticProps~~ — separate ISR pages; bundle used in benchmark + available for future shared cache.
- ~~RSS/sitemap fallback~~ — sitemap needs browser User-Agent (429 on `ProductswayBlog/1.0`).
- Hashnode `posts` filter for draft/unlisted if API returns extras.
- If Vercel still shows **5** (not 6): RSS from datacenter may return fewer than 20 `<item>`s — log `feed_rss_item_count` on Vercel build via env `AUTORESEARCH_SIMULATE_VERCEL` or temporary build log.
