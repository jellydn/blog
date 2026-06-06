import { isBlogArticleSlug } from './blogArticleFilter';
import { BROWSER_USER_AGENT, defaultBlogFetchHeaders } from './fetchHeaders';
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

            return {
                slug: cleanSlug,
                title: title.trim(),
                brief: brief.trim(),
                publishedAt: pubDate
                    ? new Date(pubDate).toISOString()
                    : undefined,
                coverImage: cover ? { url: cover } : undefined,
                tags,
            };
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

/** RSS (recent) then sitemap (full index) when GraphQL is unavailable. */
export async function fetchHashnodePostsViaFeed(): Promise<
    HashnodePostSummary[]
> {
    const rssPosts: HashnodePostSummary[] = [];
    let sitemapPosts: HashnodePostSummary[] = [];
    const fetchOpts = {
        headers: defaultBlogFetchHeaders(),
        signal: AbortSignal.timeout(15000),
    };

    try {
        const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`, fetchOpts);
        if (sitemapRes.ok) {
            sitemapPosts = parseSitemap(await sitemapRes.text());
        }
    } catch {
        /* try RSS */
    }

    try {
        const rssRes = await fetch(`${BASE_URL}/rss.xml`, fetchOpts);
        if (rssRes.ok) {
            rssPosts.push(...parseRSSItems(await rssRes.text()));
        }
    } catch {
        /* merge what we have */
    }

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

    if (merged.length > 5) {
        return merged;
    }

    const fromProfile = await fetchHashnodePostsViaProfileRSC();
    if (fromProfile.length > merged.length) {
        return fromProfile;
    }

    return merged;
}

async function fetchHashnodePostsViaProfileRSC(): Promise<
    HashnodePostSummary[]
> {
    try {
        const res = await fetch('https://hashnode.com/@dunghd', {
            headers: { 'User-Agent': BROWSER_USER_AGENT },
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) return [];
        const html = await res.text();
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
            .filter((p) => p.slug && p.title)
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
