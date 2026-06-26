export { generateNextSeo } from 'next-seo/pages';

const SITE_URL = 'https://productsway.com';
const OG_IMAGE = 'https://productsway.com/og-image.png';
const DEFAULT_AUTHOR = 'Dung Huynh Duc';

export type PageSeoOptions = {
    title: string;
    description?: string;
    path: string;
};

export type ArticleSeoOptions = PageSeoOptions & {
    publishedTime?: string;
    author?: string;
    tags?: string[];
    image?: string;
    twitterCardType?: 'summary_large_image' | 'player';
};

/**
 * SEO config for a standard page (e.g., listing pages like /notes, /videos, /).
 * Generates canonical URL, OpenGraph website tags, and twitter summary card.
 */
export function pageSeo({ title, description, path }: PageSeoOptions) {
    const url = `${SITE_URL}${path}`;
    return {
        title,
        description,
        canonical: url,
        openGraph: {
            type: 'website' as const,
            url,
            title,
            description,
            images: [{ url: OG_IMAGE, alt: title }],
        },
        twitter: {
            cardType: 'summary_large_image' as const,
        },
    };
}

/**
 * SEO config for an article or video detail page.
 * Generates canonical URL, OpenGraph article tags, and optional twitter card type.
 */
export function articleSeo({
    title,
    description,
    path,
    publishedTime,
    author = DEFAULT_AUTHOR,
    tags,
    image = OG_IMAGE,
    twitterCardType = 'summary_large_image',
}: ArticleSeoOptions) {
    const url = `${SITE_URL}${path}`;
    return {
        title,
        description,
        canonical: url,
        openGraph: {
            type: 'article' as const,
            url,
            title,
            description,
            images: [{ url: image, alt: title }],
            article: {
                publishedTime,
                authors: [author],
                tags,
            },
        },
        twitter: {
            cardType: twitterCardType,
        },
    };
}
