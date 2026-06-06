import { isBlogArticleSlug } from './blogArticleFilter';
import { defaultBlogFetchHeaders } from './fetchHeaders';
import type { HashnodePostSummary } from './hashnode';

const BASE_URL = 'https://blog.productsway.com';

function parseRSSItems(xml: string): HashnodePostSummary[] {
    return (xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [])
        .map((item: string) => {
            const slug =
                item.match(
                    /<link>https:\/\/blog\.productsway\.com\/([^<]+)<\/link>/,
                )?.[1] ??
                item.match(
                    /<guid[^>]*>https:\/\/blog\.productsway\.com\/([^<]+)<\/guid>/,
                )?.[1] ??
                '';
            const title =
                item.match(/<title><!\[CDATA\[([^\]]+)\]\]><\/title>/)?.[1] ??
                item.match(/<title>([^<]+)<\/title>/)?.[1] ??
                '';
            const brief =
                item.match(
                    /<description><!\[CDATA\[([^\]]+)\]\]><\/description>/,
                )?.[1] ??
                item.match(/<description>([^<]+)<\/description>/)?.[1] ??
                '';
            const pubDate =
                item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1] ?? '';
            const cover =
                item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ??
                item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ??
                undefined;
            const tags = (
                item.match(/<category[^>]*>([\s\S]*?)<\/category>/g) ?? []
            )
                .map((block: string) => {
                    const cdata =
                        block.match(
                            /<category[^>]*><!\[CDATA\[([^\]]+)\]\]><\/category>/,
                        )?.[1] ??
                        block.match(
                            /<category[^>]*>([^<]+)<\/category>/,
                        )?.[1] ??
                        '';
                    return cdata.trim();
                })
                .filter(Boolean)
                .map((name: string) => ({ name }));

            const cleanSlug = slug.replace(/\/$/, '');
            if (!cleanSlug || !title.trim()) {
                return null;
            }

            const summary: HashnodePostSummary = {
                slug: cleanSlug,
                title: title.trim(),
                brief: brief.trim(),
                publishedAt: pubDate
                    ? new Date(pubDate).toISOString()
                    : undefined,
                coverImage: cover ? { url: cover } : undefined,
                tags,
            };
            return summary;
        })
        .filter((p): p is HashnodePostSummary => p !== null);
}

function isPostSlug(slug: string): boolean {
    return isBlogArticleSlug(slug);
}

function parseSitemap(xml: string): HashnodePostSummary[] {
    const posts: HashnodePostSummary[] = [];
    const locRe = /<loc>https:\/\/blog\.productsway\.com\/([^<]+)<\/loc>/g;

    for (const match of xml.matchAll(locRe)) {
        const slug = (match[1] ?? '').replace(/\/$/, '');
        if (!isPostSlug(slug)) continue;

        const entryStart = xml.indexOf(match[0]);
        const entrySlice = xml.slice(entryStart, entryStart + 800);
        const lastmod =
            entrySlice.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? undefined;

        posts.push({
            slug,
            title: slug
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c: string) => c.toUpperCase()),
            brief: '',
            publishedAt: lastmod,
        });
    }

    return posts;
}

const getTimestamp = (date?: string) => {
    const timestamp = Date.parse(date ?? '');
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const FEED_FETCH_ATTEMPTS = 3;
const RETRYABLE_FEED_STATUS = new Set([429, 502, 503, 504]);

async function fetchFeedTextWithRetry(
    url: string,
): Promise<{ text: string; retries: number }> {
    let retries = 0;
    for (let attempt = 0; attempt < FEED_FETCH_ATTEMPTS; attempt++) {
        try {
            const res = await fetch(url, {
                headers: defaultBlogFetchHeaders(),
                signal: AbortSignal.timeout(15000),
            });
            if (res.ok) {
                return { text: await res.text(), retries };
            }
            if (
                RETRYABLE_FEED_STATUS.has(res.status) &&
                attempt < FEED_FETCH_ATTEMPTS - 1
            ) {
                retries += 1;
                await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
                continue;
            }
            return { text: '', retries };
        } catch {
            if (attempt < FEED_FETCH_ATTEMPTS - 1) {
                retries += 1;
                await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
                continue;
            }
            return { text: '', retries };
        }
    }
    return { text: '', retries };
}

export type HashnodeFeedFetchResult = {
    posts: HashnodePostSummary[];
    feedRetries: number;
};

/** RSS (recent) then sitemap (full index) when GraphQL is unavailable. */
export async function fetchHashnodePostsViaFeed(): Promise<
    HashnodePostSummary[]
> {
    const { posts } = await fetchHashnodePostsViaFeedWithStats();
    return posts;
}

export async function fetchHashnodePostsViaFeedWithStats(): Promise<HashnodeFeedFetchResult> {
    let feedRetries = 0;

    const [sitemapPosts, rssPosts] = await Promise.all([
        (async () => {
            try {
                const { text, retries } = await fetchFeedTextWithRetry(
                    `${BASE_URL}/sitemap.xml`,
                );
                feedRetries += retries;
                if (!text) return [];
                return parseSitemap(text);
            } catch {
                return [];
            }
        })(),
        (async () => {
            try {
                const { text, retries } = await fetchFeedTextWithRetry(
                    `${BASE_URL}/rss.xml`,
                );
                feedRetries += retries;
                if (!text) return [];
                return parseRSSItems(text);
            } catch {
                return [];
            }
        })(),
    ]);

    const bySlug = new Map<string, HashnodePostSummary>();
    for (const p of sitemapPosts) {
        if (p.slug) bySlug.set(p.slug, p);
    }
    for (const p of rssPosts) {
        if (!p.slug) continue;
        const existing = bySlug.get(p.slug);
        bySlug.set(p.slug, {
            ...existing,
            ...p,
            title: p.title || existing?.title,
            brief: p.brief || existing?.brief,
            publishedAt: p.publishedAt || existing?.publishedAt,
            coverImage: p.coverImage ?? existing?.coverImage,
            tags: p.tags?.length ? p.tags : existing?.tags,
        });
    }

    const merged = [...bySlug.values()].sort(
        (a, b) => getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
    );

    // Sitemap gives the full index; RSS alone is ~5. Prefer merged when sitemap contributed.
    const hasFullIndex = sitemapPosts.length > 0 || merged.length > 5;
    if (hasFullIndex) {
        return { posts: merged, feedRetries };
    }

    const { posts: fromProfile, retries: profileRetries } =
        await fetchHashnodePostsViaProfileRSCWithStats();
    feedRetries += profileRetries;
    if (fromProfile.length > merged.length) {
        return { posts: fromProfile, feedRetries };
    }

    return { posts: merged, feedRetries };
}

async function parseProfileRscHtml(
    html: string,
): Promise<HashnodePostSummary[]> {
    try {
        const MARKER = '__next_f.push([1,';
        let data = '';
        let pos = 0;
        while (true) {
            const chunkStart = html.indexOf(MARKER, pos);
            if (chunkStart < 0) break;
            const quoteStart = html.indexOf('"', chunkStart + MARKER.length);
            if (quoteStart < 0) break;
            let chunkEnd = -1;
            for (let i = quoteStart + 1; i < html.length; i++) {
                if (html[i] === '\\' && html[i + 1] === '"') {
                    i++;
                    continue;
                }
                if (html[i] === '"') {
                    chunkEnd = i;
                    break;
                }
            }
            if (chunkEnd < 0) break;
            try {
                data += JSON.parse(`"${html.slice(quoteStart + 1, chunkEnd)}"`);
            } catch {
                /* skip */
            }
            pos = chunkEnd + 1;
        }

        if (!data) return [];

        const ARRAY_MARKER = '"initialPosts":[';
        const arrIdx = data.indexOf(ARRAY_MARKER);
        if (arrIdx < 0) return [];

        const arrStart = arrIdx + ARRAY_MARKER.length;
        let depth = 0;
        let arrEnd = -1;
        for (let i = arrStart; i < data.length; i++) {
            if (data[i] === '[') depth++;
            else if (data[i] === ']') {
                if (depth === 0) {
                    arrEnd = i;
                    break;
                }
                depth--;
            }
        }
        if (arrEnd < 0) return [];

        const cleaned = data
            .slice(arrStart, arrEnd)
            .replace(/"\$D(\d{4}-\d{2}-\d{2}T[^"]+)"/g, '"$1"');

        type RscPost = {
            slug: string;
            title: string;
            brief: string;
            publishedAt: string;
            coverImage?: { url: string };
        };

        let posts: RscPost[] = [];
        try {
            posts = JSON.parse(`[${cleaned}]`);
        } catch {
            return [];
        }

        return posts
            .filter(
                (p) =>
                    p.slug &&
                    p.title &&
                    isBlogArticleSlug(p.slug.replace(/\/$/, '')),
            )
            .map((p) => ({
                slug: p.slug,
                title: p.title,
                brief: p.brief ?? '',
                publishedAt: p.publishedAt ?? '',
                coverImage: p.coverImage,
            }))
            .sort(
                (a, b) =>
                    getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
            );
    } catch {
        return [];
    }
}

async function fetchHashnodePostsViaProfileRSCWithStats(): Promise<{
    posts: HashnodePostSummary[];
    retries: number;
}> {
    try {
        const { text, retries } = await fetchFeedTextWithRetry(
            'https://hashnode.com/@dunghd',
        );
        if (!text) {
            return { posts: [], retries };
        }
        const posts = await parseProfileRscHtml(text);
        return { posts, retries };
    } catch {
        return { posts: [], retries: 0 };
    }
}
