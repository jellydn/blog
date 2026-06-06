/** Slugs that are publication pages, not blog articles. */
const RESERVED_SLUGS = new Set([
    'archive',
    'newsletter',
    'about',
    'recommendations',
]);

/** True for normal article slugs from blog.productsway.com listings. */
export function isBlogArticleSlug(slug: string): boolean {
    if (!slug) return false;
    if (slug.startsWith('series/')) return false;
    if (
        slug.includes('tag/') ||
        slug.includes('archive/') ||
        slug.includes('page/')
    ) {
        return false;
    }
    return !RESERVED_SLUGS.has(slug);
}
