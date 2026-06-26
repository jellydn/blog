import { describe, expect, it } from 'vitest';
import { dedupeBySlug, extractSlug, sortByDate } from '../../lib/utils/array';

describe('dedupeBySlug', () => {
    it('removes duplicate items by slug, keeping the first occurrence', () => {
        const items = [
            { slug: 'a', title: 'First A' },
            { slug: 'b', title: 'B' },
            { slug: 'a', title: 'Second A' },
        ];
        const result = dedupeBySlug(items);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('First A');
    });

    it('returns empty array for empty input', () => {
        expect(dedupeBySlug([])).toEqual([]);
    });

    it('returns same array if no duplicates', () => {
        const items = [{ slug: 'a' }, { slug: 'b' }, { slug: 'c' }];
        expect(dedupeBySlug(items)).toHaveLength(3);
    });

    it('handles a single item', () => {
        expect(dedupeBySlug([{ slug: 'a' }])).toHaveLength(1);
    });
});

describe('sortByDate', () => {
    it('sorts items by frontmatter date descending (newest first)', () => {
        const items = [
            { slug: 'old', frontmatter: { date: '2023-01-01' } },
            { slug: 'mid', frontmatter: { date: '2024-06-15' } },
            { slug: 'new', frontmatter: { date: '2025-12-31' } },
        ];
        const result = sortByDate(items);
        expect(result[0].slug).toBe('new');
        expect(result[1].slug).toBe('mid');
        expect(result[2].slug).toBe('old');
    });

    it('returns empty array for empty input', () => {
        expect(sortByDate([])).toEqual([]);
    });

    it('handles a single item', () => {
        const items = [{ slug: 'only', frontmatter: { date: '2024-01-01' } }];
        const result = sortByDate(items);
        expect(result).toHaveLength(1);
        expect(result[0].slug).toBe('only');
    });

    it('keeps both items when dates are identical', () => {
        const items = [
            { slug: 'a', frontmatter: { date: '2024-01-01' } },
            { slug: 'b', frontmatter: { date: '2024-01-01' } },
        ];
        const result = sortByDate(items);
        expect(result).toHaveLength(2);
    });
});

describe('extractSlug', () => {
    it('extracts slug from a file path with extension', () => {
        expect(extractSlug('posts/my-post.md')).toBe('my-post');
    });

    it('extracts slug from a nested path', () => {
        expect(extractSlug('content/2024/tech/react-guide.md')).toBe(
            'react-guide',
        );
    });

    it('handles paths that are just filenames', () => {
        expect(extractSlug('til-42-how-to.md')).toBe('til-42-how-to');
    });

    it('handles files with multiple dots', () => {
        expect(extractSlug('my.component.test.tsx')).toBe('my.component.test');
    });

    it('returns empty string for empty input', () => {
        expect(extractSlug('')).toBe('');
    });
});
