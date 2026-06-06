import { defaultBlogFetchHeaders } from './fetchHeaders';

const BASE_URL = 'https://blog.productsway.com';
const MIN_DESCRIPTION_LEN = 20;
const MAX_ENRICH_PER_RUN = 29;

function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ');
}

function metaContent(html: string, patterns: RegExp[]): string {
    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match?.[1]) {
            return decodeHtmlEntities(match[1].trim());
        }
    }
    return '';
}

export function slugToDisplayTitle(slug: string): string {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
}

export function isTitleDerivedFromSlug(
    slug: string,
    title: string | undefined,
): boolean {
    if (!title?.trim()) return true;
    return title.trim() === slugToDisplayTitle(slug);
}

export function parseDescriptionFromArticleHtml(html: string): string {
    const text = metaContent(html, [
        /property=["']og:description["']\s+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["']\s+property=["']og:description["']/i,
        /name=["']description["']\s+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["']\s+name=["']description["']/i,
    ]);
    return text.length >= MIN_DESCRIPTION_LEN ? text : '';
}

export function parseTitleFromArticleHtml(html: string): string {
    const text = metaContent(html, [
        /property=["']og:title["']\s+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["']\s+property=["']og:title["']/i,
        /<title>([^<]+)<\/title>/i,
    ]);
    return text.length >= 3 ? text : '';
}

export function parseCoverFromArticleHtml(html: string): string {
    return metaContent(html, [
        /property=["']og:image["']\s+content=["']([^"']+)["']/i,
        /content=["']([^"']+)["']\s+property=["']og:image["']/i,
    ]);
}

type PageMeta = {
    title?: string;
    description?: string;
    image?: string;
    tags?: Array<{ name: string }>;
    publishedAt?: string;
};

function parseJsonLdFromHtml(html: string): Record<string, unknown> | null {
    const raw = html.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
    )?.[1];
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw.trim()) as
            | Record<string, unknown>
            | Record<string, unknown>[];
        if (Array.isArray(parsed)) {
            return (
                (parsed.find(
                    (entry) =>
                        entry['@type'] === 'BlogPosting' ||
                        entry['@type'] === 'Article',
                ) as Record<string, unknown> | undefined) ??
                parsed[0] ??
                null
            );
        }
        return parsed;
    } catch {
        return null;
    }
}

function normalizeTagNames(keywords: unknown): Array<{ name: string }> {
    if (!keywords) return [];
    const list = Array.isArray(keywords)
        ? keywords
        : String(keywords).split(',');
    const seen = new Set<string>();
    const tags: Array<{ name: string }> = [];
    for (const item of list) {
        const name = String(item).trim().replace(/^#/, '');
        if (!name || seen.has(name.toLowerCase())) continue;
        seen.add(name.toLowerCase());
        tags.push({ name });
        if (tags.length >= 6) break;
    }
    return tags;
}

function parsePageMeta(html: string): PageMeta {
    const jsonLd = parseJsonLdFromHtml(html);
    const publishedAt =
        typeof jsonLd?.datePublished === 'string'
            ? jsonLd.datePublished
            : undefined;

    return {
        title: parseTitleFromArticleHtml(html),
        description: parseDescriptionFromArticleHtml(html),
        image: parseCoverFromArticleHtml(html),
        tags: normalizeTagNames(jsonLd?.keywords),
        publishedAt,
    };
}

type EnrichableSummary = {
    slug?: string;
    title?: string;
    brief?: string;
    publishedAt?: string;
    coverImage?: { url?: string };
    tags?: Array<{ name?: string }>;
};

function needsPageEnrich(post: EnrichableSummary): boolean {
    const slug = post.slug ?? '';
    if (!slug) return false;
    const briefShort = (post.brief ?? '').trim().length < MIN_DESCRIPTION_LEN;
    const titleFromSlug = isTitleDerivedFromSlug(slug, post.title);
    const missingCover = !post.coverImage?.url;
    const missingTags = (post.tags?.length ?? 0) === 0;
    const missingDate =
        !post.publishedAt || Number.isNaN(Date.parse(post.publishedAt));
    return (
        briefShort ||
        titleFromSlug ||
        missingCover ||
        missingTags ||
        missingDate
    );
}

/** Fill title, brief, and cover from article HTML meta (one fetch per post). */
export async function enrichArticleSummariesFromPages<
    T extends EnrichableSummary,
>(posts: T[]): Promise<T[]> {
    const toFetch = posts.filter(needsPageEnrich).slice(0, MAX_ENRICH_PER_RUN);
    if (toFetch.length === 0) {
        return posts;
    }

    const metaBySlug = new Map<string, PageMeta>();

    await Promise.all(
        toFetch.map(async (post) => {
            const slug = post.slug ?? '';
            try {
                const res = await fetch(`${BASE_URL}/${slug}`, {
                    headers: defaultBlogFetchHeaders(),
                    signal: AbortSignal.timeout(12000),
                });
                if (!res.ok) return;
                const meta = parsePageMeta(await res.text());
                if (
                    meta.title ||
                    meta.description ||
                    meta.image ||
                    meta.tags?.length ||
                    meta.publishedAt
                ) {
                    metaBySlug.set(slug, meta);
                }
            } catch {
                /* skip */
            }
        }),
    );

    if (metaBySlug.size === 0) {
        return posts;
    }

    return posts.map((post) => {
        const slug = post.slug ?? '';
        const meta = metaBySlug.get(slug);
        if (!meta) return post;

        const title =
            meta.title && isTitleDerivedFromSlug(slug, post.title)
                ? meta.title
                : post.title;
        const brief =
            (post.brief ?? '').trim().length < MIN_DESCRIPTION_LEN &&
            meta.description
                ? meta.description
                : post.brief;
        const coverUrl = post.coverImage?.url ?? meta.image;
        const tags =
            (post.tags?.length ?? 0) > 0
                ? post.tags
                : meta.tags?.length
                  ? meta.tags
                  : post.tags;
        const publishedAt =
            post.publishedAt && !Number.isNaN(Date.parse(post.publishedAt))
                ? post.publishedAt
                : meta.publishedAt || post.publishedAt;

        return {
            ...post,
            title: title || post.title,
            brief: brief || post.brief,
            coverImage: coverUrl ? { url: coverUrl } : post.coverImage,
            tags,
            publishedAt,
        };
    });
}

/** @deprecated Use enrichArticleSummariesFromPages */
export async function enrichMissingBriefs<
    T extends { slug?: string; brief?: string },
>(posts: T[]): Promise<T[]> {
    return enrichArticleSummariesFromPages(
        posts as EnrichableSummary[],
    ) as Promise<T[]>;
}
