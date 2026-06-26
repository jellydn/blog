import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { BlogPostSummary } from '../lib/types';

/**
 * Crawl blog.productsway.com to fetch all blog posts with full metadata.
 *
 * Strategy:
 *  1. Fetch sitemap.xml to discover all post URLs (works even though the
 *     Hashnode GraphQL API is retired for free tier).
 *  2. Scrape each post page's <meta> tags (Open Graph, article:, twitter:)
 *     to extract title, description, cover image, published date, and tags.
 *  3. Save to data/blog-posts.json sorted by date (descending).
 *
 * Usage:  bun scripts/fetch-blog-posts.ts
 */

const BLOG_BASE_URL = 'https://blog.productsway.com';
const SITEMAP_URL = `${BLOG_BASE_URL}/sitemap.xml`;
const USER_AGENT = 'ProductswayBlog/1.0';
const RATE_LIMIT_MS = 300; // be nice to the server
const MAX_RETRIES = 2;

/** Extract a meta tag content value from an HTML string. */
function extractMeta(html: string, key: string, attr: string): string | null {
    // attr is either "property" (og:, article:) or "name" (description, twitter:)
    // Match regardless of attribute order (property/name before OR after content)
    const re = new RegExp(
        `<meta[^>]*${attr}=["']${escapeRegex(key)}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${escapeRegex(key)}["']`,
        'i',
    );
    const match = html.match(re);
    return (match?.[1] ?? match?.[2] ?? '').trim() || null;
}

/** Escape special regex characters in a string. */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Decode common HTML entities found in meta tag content. */
function decodeHtmlEntities(str: string): string {
    return str
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
            String.fromCharCode(parseInt(hex, 16)),
        )
        .replace(/&#([0-9]+);/g, (_, dec) =>
            String.fromCharCode(parseInt(dec, 10)),
        )
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '–')
        .replace(/&mdash;/g, '—')
        .replace(/&ldquo;/g, '“')
        .replace(/&rdquo;/g, '”')
        .replace(/&lsquo;/g, '‘')
        .replace(/&rsquo;/g, '’');
}

/** Fetch a URL with retries and timeout. */
async function fetchWithRetry(
    url: string,
    retries = MAX_RETRIES,
): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const res = await fetch(url, {
                headers: { 'User-Agent': USER_AGENT },
                signal: AbortSignal.timeout(15000),
            });
            if (res.ok) return res;
            if (res.status === 404) return res; // don't retry 404s
            if (attempt < retries) {
                await sleep(RATE_LIMIT_MS * (attempt + 1));
                continue;
            }
            return res;
        } catch {
            if (attempt < retries) {
                await sleep(RATE_LIMIT_MS * (attempt + 1));
                continue;
            }
            throw new Error(
                `Failed to fetch ${url} after ${retries + 1} attempts`,
            );
        }
    }

    // The loop always returns or throws, but TypeScript needs a return statement
    throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
}

/** Extract post URLs from sitemap.xml, filtering out non-article pages. */
async function extractPostUrlsFromSitemap(): Promise<string[]> {
    const res = await fetchWithRetry(SITEMAP_URL);
    if (!res.ok) {
        throw new Error(`Failed to fetch sitemap: ${res.status}`);
    }

    const xml = await res.text();

    // Parse all <loc> URLs
    const urls: string[] = [];
    const locRe = /<loc>([^<]+)<\/loc>/g;
    for (const m of xml.matchAll(locRe)) {
        urls.push(m[1].trim());
    }

    // Filter to actual blog post URLs (exclude homepage, tags, archive, page, series, etc.)
    const postUrls = urls.filter((url) => {
        if (url === BLOG_BASE_URL || url === `${BLOG_BASE_URL}/`) return false;
        const path = url.replace(`${BLOG_BASE_URL}/`, '').replace(/\/$/, '');
        if (!path) return false;
        const excludePatterns = [
            'tag/',
            'archive',
            'page/',
            'series/',
            'recommendations',
            '@', // author pages
        ];
        return !excludePatterns.some((p) => path.includes(p));
    });

    return postUrls;
}

/** Scrape a single blog post page for metadata. */
async function scrapePost(url: string): Promise<BlogPostSummary | null> {
    try {
        const res = await fetchWithRetry(url);
        if (!res.ok) return null;

        const html = await res.text();
        const slug = url.replace(`${BLOG_BASE_URL}/`, '').replace(/\/$/, '');

        // Extract metadata from meta tags (prefer og: then twitter: then standard)
        const title =
            extractMeta(html, 'og:title', 'property') ??
            extractMeta(html, 'twitter:title', 'name') ??
            // Fallback: extract from <title> tag
            html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ??
            slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

        const description =
            extractMeta(html, 'og:description', 'property') ??
            extractMeta(html, 'twitter:description', 'name') ??
            extractMeta(html, 'description', 'name') ??
            '';

        const hero_image =
            extractMeta(html, 'og:image', 'property') ??
            extractMeta(html, 'twitter:image', 'name') ??
            null;

        const date =
            extractMeta(html, 'article:published_time', 'property') ??
            extractMeta(html, 'datePublished', 'name') ??
            '';

        // Extract tags from og:article:tag or keywords meta
        const keywords = extractMeta(html, 'keywords', 'name');
        const tags: string[] = [];
        if (keywords) {
            tags.push(
                ...keywords
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
            );
        }
        // Also try og:article:tag (multiple meta tags)
        // Handles both attribute orders: property before OR after content
        const tagRe =
            /<meta[^>]*(?:property=["']article:tag["'][^>]*content=["']([^"']*)["']|content=["']([^"']*)["'][^>]*property=["']article:tag["'])/gi;
        for (const tagMatch of html.matchAll(tagRe)) {
            const tag = (tagMatch[1] ?? tagMatch[2] ?? '').trim();
            if (tag && !tags.includes(tag)) tags.push(tag);
        }

        return {
            slug,
            title: decodeHtmlEntities(title.trim()),
            description: decodeHtmlEntities(description.trim()),
            date,
            tags: tags.map((t) => decodeHtmlEntities(t)),
            hero_image,
        };
    } catch {
        console.warn(`  ⚠ Failed to scrape: ${url}`);
        return null;
    }
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrapePostsConcurrently(
    urls: string[],
    concurrency = 5,
): Promise<BlogPostSummary[]> {
    const results: BlogPostSummary[] = [];
    let completed = 0;

    // Process URLs in batches to avoid overwhelming the server
    for (let i = 0; i < urls.length; i += concurrency) {
        const batch = urls.slice(i, i + concurrency);
        const batchResults = await Promise.all(
            batch.map(async (url) => {
                const post = await scrapePost(url);
                completed++;
                if (post) {
                    console.log(
                        `  [${completed}/${urls.length}] ✓ ${post.title.slice(0, 60)}`,
                    );
                } else {
                    console.log(`  [${completed}/${urls.length}] ✗ ${url}`);
                }
                return post;
            }),
        );
        results.push(
            ...batchResults.filter((p): p is BlogPostSummary => p !== null),
        );

        // Rate limit between batches
        if (i + concurrency < urls.length) {
            await sleep(RATE_LIMIT_MS);
        }
    }

    return results;
}

async function main() {
    try {
        console.log('=== Blog Posts Crawler ===\n');
        console.log(`Fetching sitemap from ${SITEMAP_URL}...\n`);

        const postUrls = await extractPostUrlsFromSitemap();
        console.log(`Found ${postUrls.length} post URLs in sitemap\n`);

        if (postUrls.length === 0) {
            console.error('No post URLs found in sitemap. Aborting.');
            process.exit(1);
        }

        console.log('Scraping post pages for metadata...\n');
        const posts = await scrapePostsConcurrently(postUrls);

        // Sort by date descending
        posts.sort((a, b) => {
            const tsA = Date.parse(a.date) || 0;
            const tsB = Date.parse(b.date) || 0;
            return tsB - tsA;
        });

        // Write to data/blog-posts.json
        const outputPath = join(process.cwd(), 'data', 'blog-posts.json');
        await writeFile(outputPath, JSON.stringify(posts, null, 4));

        console.log(`\n✓ Saved ${posts.length} posts to ${outputPath}`);
        console.log('\n=== Summary ===');
        console.log(`  Total posts: ${posts.length}`);
        console.log(
            `  Posts with cover image: ${posts.filter((p) => p.hero_image).length}`,
        );
        console.log(
            `  Posts with description: ${posts.filter((p) => p.description).length}`,
        );
        console.log(`  Posts with date: ${posts.filter((p) => p.date).length}`);

        if (posts.length > 0) {
            console.log('\n=== Latest 5 ===');
            for (const post of posts.slice(0, 5)) {
                console.log(`  - ${post.title} (${post.date.split('T')[0]})`);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
