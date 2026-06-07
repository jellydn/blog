import type { HashnodePostSummary } from './hashnode';

const getTimestamp = (date?: string) => {
    const timestamp = Date.parse(date ?? '');
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

/** Merge feed (complete index) with GraphQL (richer fields when available). */
export function mergeHashnodePostSummaries(
    feed: HashnodePostSummary[],
    graphql: HashnodePostSummary[],
): HashnodePostSummary[] {
    const bySlug = new Map<string, HashnodePostSummary>();

    for (const post of feed) {
        if (post.slug) {
            bySlug.set(post.slug, post);
        }
    }

    for (const post of graphql) {
        if (!post.slug) continue;
        const existing = bySlug.get(post.slug);
        bySlug.set(post.slug, {
            ...existing,
            ...post,
            title: post.title || existing?.title,
            brief: post.brief || existing?.brief,
            publishedAt: post.publishedAt || existing?.publishedAt,
            coverImage: post.coverImage?.url
                ? post.coverImage
                : existing?.coverImage,
            tags: post.tags?.length ? post.tags : existing?.tags,
        });
    }

    return [...bySlug.values()].sort(
        (a, b) => getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
    );
}
