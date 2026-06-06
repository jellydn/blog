# Autoresearch: blog.productsway.com post listings

## Objective

Ensure **productsway.com** shows Hashnode posts from **blog.productsway.com**:

- **Homepage** (`/`): latest **6** posts in the blog section.
- **`/posts`**: **all** publication posts (not capped at RSS ~5).

## Metrics

- **Primary**: `total_posts_count` (unitless, **higher** is better) — number of posts returned for the full listing fetch (target ≥ 6, ideally full publication size).
- **Secondary**: `homepage_posts_count` — should be exactly 6 when ≥6 posts exist; `uses_shared_fetcher` — 1 if pages use `lib/hashnode` not duplicate RSS parsers.

## How to Run

`./autoresearch.sh` — outputs `METRIC name=number` lines.

## Files in Scope

- `lib/hashnode.ts` — GraphQL fetch, pagination for all posts.
- `lib/productswayBlog.ts` — shared mapping for homepage + `/posts` (new).
- `pages/index.tsx` — `getStaticProps` blog source.
- `pages/posts/index.tsx` — remove inline RSS/RSC fetch; use shared module.
- `pages/api/posts.ts` — align limit with homepage if needed.
- `components/BlogPostsSection.tsx` — display cap (6) only at UI layer.
- `scripts/autoresearch-blog-posts.ts` — benchmark script.
- `autoresearch.sh`, `autoresearch.md`, `autoresearch.ideas.md`.

## Off Limits

- Local `posts/*.md` TIL content (not mixed into blog.productsway.com listing).
- YouTube/repos sections on homepage.
- TinaCMS schema unless required for build.

## Constraints

- Do not hard-code fake slugs or mock API responses in production paths to pass the benchmark.
- Homepage UI may still show at most 6 cards; full list lives on `/posts`.
- Prefer Hashnode GraphQL (`gql.hashnode.com`) over RSS when RSS returns fewer items.

## What's Been Tried

- **keep #1**: Shared `lib/productswayBlog` + GraphQL pagination + feed/RSC fallback. Stuck at **5** until UA fix.
- **keep #2**: `lib/fetchHeaders` Chrome UA + sitemap-first feed fallback → **33** posts, homepage **6**.
- **keep #3**: `isBlogArticleSlug` filter (drop series/archive/recommendations) → **29** articles, homepage **6** real posts (`homepage_non_article_slots=0`). `/api/posts` uses shared fetcher.
- **keep #4**: `fetchProductswayBlogBundle` (single load for benchmark/pages); `hashnodeGraphqlHeaders` on all gql fetches. `articles_with_description=20` (RSS-enriched). GraphQL still 0 in agent env.
- **keep #5**: `lib/blogPageMeta` og:description enrichment for sitemap-only articles → `articles_with_description` **29** (all articles), `total_posts_count` unchanged.
- **keep #6**: Full page meta (og:title, og:image) + `fetchProductswayBlogBundle` on index/posts/api → `articles_with_real_title` **27**.
- **keep #7**: RSS `<category>` CDATA parsing → `articles_with_tags` **20** (RSS items); counts unchanged.
- **keep #8**: JSON-LD `keywords` + `datePublished` on page enrich → `articles_with_tags` **29**; fetch when tags/date missing.
- **keep #9**: Parallel feed+GraphQL merge (`mergeHashnodePostSummaries`); `MAX_ENRICH=29`; `graphql_posts_fetched` metric (0 locally).
- **keep #10**: GraphQL JSON probe cache — skip cursor/offset pagination when gql returns HTML; `listing_fetch_ms` ~2115.
- **keep #11**: Skip HTML enrich for slug-title-only when RSS has desc/cover/tags/date → `page_enrich_fetches` **9** (was ~11).
- **keep #12**: Feed-first + conditional GraphQL; page enrich batches of 5; `feed_fetch_ms` / `page_enrich_ms` phase metrics.
- **keep #13**: Parallel sitemap + RSS fetch in `fetchHashnodePostsViaFeed` → lower `feed_fetch_ms` (~87ms).
- **keep #14**: Page enrich concurrency **9** (one wave for 9 fetches); `graphql_available` metric for prod.
- **keep #15**: Overlap feed + gql probe; `graphqlAvailable` on bundle; cover quality metrics (29/6).
- **keep #16**: In-flight dedup for concurrent `fetchProductswayBlogBundle` → `publication_load_invocations=1` under parallel callers.
- **keep #17**: Retry sitemap/RSS on 429/502/503/504; `feed_fetch_retries` metric (prod resilience).
