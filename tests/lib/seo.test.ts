import { describe, expect, it } from 'vitest';
import { articleSeo, pageSeo } from '../../lib/seo';

describe('pageSeo', () => {
    const baseOptions = {
        title: 'Test Page',
        description: 'A test page description',
        path: '/test',
    };

    it('generates SEO config with required fields', () => {
        const result = pageSeo(baseOptions);
        expect(result.title).toBe('Test Page');
        expect(result.description).toBe('A test page description');
        expect(result.canonical).toBe('https://productsway.com/test');
    });

    it('sets OpenGraph type to website', () => {
        const result = pageSeo(baseOptions);
        expect(result.openGraph.type).toBe('website');
        expect(result.openGraph.url).toBe('https://productsway.com/test');
    });

    it('uses custom canonical URL when provided', () => {
        const result = pageSeo({
            ...baseOptions,
            canonical: 'https://custom.com/page',
        });
        expect(result.canonical).toBe('https://custom.com/page');
        expect(result.openGraph.url).toBe('https://custom.com/page');
    });

    it('uses custom image when provided', () => {
        const result = pageSeo({
            ...baseOptions,
            image: 'https://example.com/custom-og.png',
        });
        expect(result.openGraph.images).toEqual([
            { url: 'https://example.com/custom-og.png', alt: 'Test Page' },
        ]);
    });

    it('sets twitter card type to summary_large_image', () => {
        const result = pageSeo(baseOptions);
        expect(result.twitter.cardType).toBe('summary_large_image');
    });

    it('works without description', () => {
        const result = pageSeo({ title: 'Minimal', path: '/' });
        expect(result.title).toBe('Minimal');
        expect(result.canonical).toBe('https://productsway.com/');
    });
});

describe('articleSeo', () => {
    const baseOptions = {
        title: 'Test Article',
        description: 'An article description',
        path: '/notes/test-article',
        publishedTime: '2024-03-15T10:00:00Z',
    };

    it('generates SEO config with required fields', () => {
        const result = articleSeo(baseOptions);
        expect(result.title).toBe('Test Article');
        expect(result.canonical).toBe(
            'https://productsway.com/notes/test-article',
        );
    });

    it('sets OpenGraph type to article', () => {
        const result = articleSeo(baseOptions);
        expect(result.openGraph.type).toBe('article');
    });

    it('includes article metadata (publishedTime, authors, tags)', () => {
        const result = articleSeo({
            ...baseOptions,
            author: 'Jane Doe',
            tags: ['react', 'typescript'],
        });
        expect(result.openGraph.article).toEqual({
            publishedTime: '2024-03-15T10:00:00Z',
            authors: ['Jane Doe'],
            tags: ['react', 'typescript'],
        });
    });

    it('uses default author when not provided', () => {
        const result = articleSeo(baseOptions);
        expect(result.openGraph.article.authors).toEqual(['Dung Huynh Duc']);
    });

    it('allows custom twitter card type', () => {
        const result = articleSeo({
            ...baseOptions,
            twitterCardType: 'player',
        });
        expect(result.twitter.cardType).toBe('player');
    });

    it('uses custom image when provided', () => {
        const result = articleSeo({
            ...baseOptions,
            image: 'https://example.com/article-og.png',
        });
        expect(result.openGraph.images).toEqual([
            {
                url: 'https://example.com/article-og.png',
                alt: 'Test Article',
            },
        ]);
    });
});
