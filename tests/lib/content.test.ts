import { vi } from 'vitest';

// ── Shared mock state ──────────────────────────────────
let mockReadFileContent = '';
let mockMatterData: Record<string, unknown> = {};

// Top-level mocks (hoisted by Vitest before imports)
vi.mock('glob', () => ({
    globSync: vi.fn(),
}));
vi.mock('node:fs', () => ({
    default: { readFileSync: vi.fn(() => mockReadFileContent) },
    readFileSync: vi.fn(() => mockReadFileContent),
}));
vi.mock('gray-matter', () => ({
    default: vi.fn(() => ({
        data: mockMatterData,
        content: '',
        isEmpty: false,
    })),
}));

import { globSync } from 'glob';
import { beforeEach, describe, expect, it } from 'vitest';
import type { ContentEntry } from '../../lib/content';
import {
    combine,
    fromArray,
    fromMarkdown,
    getMarkdownSlugs,
    getUniqueTags,
    take,
} from '../../lib/content';

type TestEntry = ContentEntry & {
    frontmatter: { title: string; date: string };
};

const entryA: TestEntry = {
    slug: 'post-a',
    frontmatter: { title: 'Post A', date: '2024-01-15' },
};

const entryB: TestEntry = {
    slug: 'post-b',
    frontmatter: { title: 'Post B', date: '2025-06-01' },
};

const entryC: TestEntry = {
    slug: 'post-c',
    frontmatter: { title: 'Post C', date: '2023-03-10' },
};

describe('fromArray', () => {
    it('returns all items sorted by date descending', () => {
        const source = fromArray([entryA, entryB, entryC]);
        const result = source.getAll();
        expect(result).toHaveLength(3);
        expect(result[0].slug).toBe('post-b');
        expect(result[1].slug).toBe('post-a');
        expect(result[2].slug).toBe('post-c');
    });

    it('deduplicates by slug (last wins)', () => {
        const dupB = {
            ...entryB,
            frontmatter: { ...entryB.frontmatter, title: 'Post B Updated' },
        };
        const source = fromArray([entryA, entryB, dupB]);
        const result = source.getAll();
        expect(result).toHaveLength(2);
        expect(result.find((e) => e.slug === 'post-b')?.frontmatter.title).toBe(
            'Post B Updated',
        );
    });

    it('returns a fresh copy on each getAll call', () => {
        const source = fromArray([entryB, entryA]);
        const first = source.getAll();
        const second = source.getAll();
        expect(first).toEqual(second);
        expect(first).not.toBe(second);
    });

    it('returns empty array for empty input', () => {
        const source = fromArray([]);
        expect(source.getAll()).toEqual([]);
    });

    it('getBySlug finds an entry by slug', () => {
        const source = fromArray([entryA, entryB]);
        expect(source.getBySlug('post-a')).toEqual(entryA);
    });

    it('getBySlug returns undefined for missing slug', () => {
        const source = fromArray([entryA]);
        expect(source.getBySlug('nonexistent')).toBeUndefined();
    });
});

describe('take', () => {
    it('returns the first N entries', () => {
        const source = fromArray([entryA, entryB, entryC]);
        const limited = take(source, 2);
        const result = limited.getAll();
        expect(result).toHaveLength(2);
        expect(result[0].slug).toBe('post-b');
        expect(result[1].slug).toBe('post-a');
    });

    it('getBySlug still searches the full original set', () => {
        const source = fromArray([entryA, entryB, entryC]);
        const limited = take(source, 1);
        expect(limited.getBySlug('post-c')).toEqual(entryC);
    });

    it('returns all items when count exceeds total', () => {
        const source = fromArray([entryA, entryB]);
        const limited = take(source, 100);
        expect(limited.getAll()).toHaveLength(2);
    });

    it('returns empty when count is 0', () => {
        const source = fromArray([entryA]);
        const limited = take(source, 0);
        expect(limited.getAll()).toEqual([]);
    });
});

describe('combine', () => {
    it('merges two sources with deduplication and date sorting', () => {
        const source1 = fromArray([entryA, entryB]);
        const source2 = fromArray([entryC]);
        const merged = combine(source1, source2);
        const result = merged.getAll();
        expect(result).toHaveLength(3);
        expect(result[0].slug).toBe('post-b');
        expect(result[1].slug).toBe('post-a');
        expect(result[2].slug).toBe('post-c');
    });

    it('deduplicates across sources (last source wins)', () => {
        const source1 = fromArray([entryA, entryB]);
        const dupB = {
            ...entryB,
            frontmatter: { ...entryB.frontmatter, title: 'Updated B' },
        };
        const source2 = fromArray([dupB]);
        const merged = combine(source1, source2);
        const result = merged.getAll();
        expect(result).toHaveLength(2);
        expect(result.find((e) => e.slug === 'post-b')?.frontmatter.title).toBe(
            'Updated B',
        );
    });

    it('handles empty sources', () => {
        const merged = combine(fromArray([]), fromArray([entryA]));
        expect(merged.getAll()).toHaveLength(1);
    });

    it('handles all empty sources', () => {
        const merged = combine(fromArray([]), fromArray([]));
        expect(merged.getAll()).toEqual([]);
    });

    it('getBySlug works on combined source', () => {
        const source1 = fromArray([entryA]);
        const source2 = fromArray([entryB]);
        const merged = combine(source1, source2);
        expect(merged.getBySlug('post-a')).toEqual(entryA);
        expect(merged.getBySlug('post-b')).toEqual(entryB);
    });
});

describe('fromMarkdown', () => {
    it('creates content target from a mock webpack context', () => {
        type MockContext = {
            keys(): string[];
            (key: string): { default: string };
        };
        const contextFn = (key: string) => {
            const contents: Record<string, { default: string }> = {
                'posts/first.md': {
                    default: '---\ntitle: First\n---\nContent 1',
                },
                'posts/second.md': {
                    default:
                        '---\ntitle: Second\ndate: 2025-01-01\n---\nContent 2',
                },
            };
            return contents[key];
        };
        const mockContext = Object.assign(contextFn, {
            keys: () => ['posts/first.md', 'posts/second.md'],
        }) as MockContext;

        const source = fromMarkdown(mockContext);
        const result = source.getAll();
        expect(result).toHaveLength(2);
        expect(result[0].slug).toBe('first');
        expect(result[1].slug).toBe('second');
    });

    it('applies an optional transform function', () => {
        type MockContext = {
            keys(): string[];
            (key: string): { default: string };
        };
        const contextFn = () => ({
            default: '---\ntitle: Original\n---\nBody',
        });
        const mockContext = Object.assign(contextFn, {
            keys: () => ['posts/post.md'],
        }) as MockContext;

        const source = fromMarkdown(mockContext, (entry) => ({
            ...entry,
            frontmatter: { ...entry.frontmatter, transformed: true },
        }));
        const result = source.getAll();

        expect(result).toHaveLength(1);
        expect(result[0].slug).toBe('post');
        expect(
            (result[0].frontmatter as { transformed: boolean }).transformed,
        ).toBe(true);
    });

    it('handles empty context', () => {
        const mockContext = {
            keys: () => [],
            // biome-ignore lint/suspicious/noExplicitAny: type-safe callable mock
        } as any;

        const source = fromMarkdown(mockContext);
        expect(source.getAll()).toEqual([]);
    });
});

describe('getMarkdownSlugs', () => {
    beforeEach(() => {
        vi.mocked(globSync).mockReset();
    });

    it('returns slugs from glob pattern', () => {
        vi.mocked(globSync).mockReturnValue([
            'posts/first.md',
            'posts/second.md',
        ]);

        const result = getMarkdownSlugs('posts/**/*.md');
        expect(result).toEqual(['first', 'second']);
    });

    it('returns empty array for no matches', () => {
        vi.mocked(globSync).mockReturnValue([]);

        const result = getMarkdownSlugs('nonexistent/**/*.md');
        expect(result).toEqual([]);
    });

    it('extracts slug from nested paths', () => {
        vi.mocked(globSync).mockReturnValue([
            '2024/tech/deep-dive.md',
            '2024/til/tip-42.md',
        ]);

        const result = getMarkdownSlugs('posts/**/*.md');
        expect(result).toEqual(['deep-dive', 'tip-42']);
    });
});

describe('getUniqueTags', () => {
    beforeEach(() => {
        vi.mocked(globSync).mockReset();
        mockReadFileContent = '';
        mockMatterData = {};
    });

    it('collects unique lowercased tags from markdown files', () => {
        vi.mocked(globSync).mockReturnValue(['posts/post.md']);
        mockReadFileContent = '---\ntag:\n  - React\n  - TypeScript\n---';
        mockMatterData = { tag: ['React', 'TypeScript'] };

        const result = getUniqueTags(['posts']);
        expect(result).toEqual(['react', 'typescript']);
    });

    it('skips files without tags', () => {
        vi.mocked(globSync).mockReturnValue(['posts/untagged.md']);
        mockReadFileContent = '---\ntitle: No tags\n---';
        mockMatterData = { title: 'No tags' };

        const result = getUniqueTags(['posts']);
        expect(result).toEqual([]);
    });

    it('aggregates tags from multiple directories', () => {
        vi.mocked(globSync).mockImplementation((pattern: string) => {
            if (pattern.startsWith('posts')) return ['posts/p1.md'];
            if (pattern.startsWith('videos')) return ['videos/v1.md'];
            return [];
        });
        mockReadFileContent = '---\ntag:\n  - React\n---';
        mockMatterData = { tag: ['React'] };

        const result = getUniqueTags(['posts', 'videos']);
        expect(result).toEqual(['react']);
    });

    it('handles directories with no matching files', () => {
        vi.mocked(globSync).mockReturnValue([]);

        const result = getUniqueTags(['empty-dir']);
        expect(result).toEqual([]);
    });
});
