import { readFileSync } from 'node:fs';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { extractSlug, parseMarkdown, sortByDate } from 'lib/utils/array';

type RequireContext = {
    keys(): string[];
    (key: string): { default: string };
};

export interface ContentEntry {
    slug: string;
    frontmatter: Record<string, unknown>;
}

export interface ContentTarget<T extends ContentEntry> {
    /** Get all entries, deduplicated and sorted by date descending */
    getAll(): T[];
    /** Get a single entry by slug */
    getBySlug(slug: string): T | undefined;
}

// ─── getStaticPaths helpers ─────────────────────────────

/**
 * Get all slugs for .md files matching a glob pattern.
 * Used in getStaticPaths for detail pages.
 *
 * @example
 * getMarkdownSlugs('posts/**\/*.md')  // ['til-44-docker', 'tech-15-react', ...]
 */
export function getMarkdownSlugs(globPattern: string): string[] {
    return globSync(globPattern).map(extractSlug);
}

/**
 * Collect all unique, lowercased tag names from .md frontmatter
 * across one or more directories. Reads each file to extract tags.
 * Used in getStaticPaths for tag pages.
 */
export function getUniqueTags(dirs: string[]): string[] {
    const tags = new Set<string>();
    for (const dir of dirs) {
        for (const file of globSync(`${dir}/*.md`)) {
            const { data } = matter(readFileSync(file, 'utf-8'));
            if (data.tag) {
                for (const tag of data.tag as string[]) {
                    tags.add(tag.toLowerCase());
                }
            }
        }
    }
    return Array.from(tags);
}

// ─── Content source factories ────────────────────────────

/**
 * Create a content source from webpack `require.context` (markdown files).
 * The require.context call must remain in the calling page module for webpack
 * to detect it at compile time.
 */
export function fromMarkdown<T extends ContentEntry = ContentEntry>(
    context: RequireContext,
    transform?: (entry: ContentEntry) => T,
): ContentTarget<T> {
    const entries = context.keys().map((key: string) => {
        const slug = extractSlug(key);
        const entry = parseMarkdown(context(key).default, slug);
        return transform ? transform(entry) : (entry as unknown as T);
    });

    return fromArray(entries);
}

/**
 * Create a content source from an existing array of entries.
 */
export function fromArray<T extends ContentEntry>(
    items: T[],
): ContentTarget<T> {
    // Deduplicate by slug (last wins)
    const map = new Map<string, T>();
    for (const item of items) {
        map.set(item.slug, item);
    }
    const deduped = Array.from(map.values());

    // Sort by date descending (stable sort, newest first)
    // biome-ignore lint/suspicious/noExplicitAny: sortByDate requires { date: string }, ContentEntry has Record<string,unknown>
    const sorted = sortByDate(deduped as any[]) as T[];

    return {
        getAll: () => [...sorted],
        getBySlug: (slug: string) => sorted.find((e) => e.slug === slug),
    };
}

/**
 * Merge multiple content sources into one, with deduplication and date sorting.
 * Useful for combining notes and videos (e.g., on tag pages).
 */
export function combine<T extends ContentEntry>(
    ...sources: ContentTarget<T>[]
): ContentTarget<T> {
    const all: T[] = [];
    for (const source of sources) {
        all.push(...source.getAll());
    }
    return fromArray(all);
}

/**
 * Limit the number of entries returned by a source.
 */
export function take<T extends ContentEntry>(
    source: ContentTarget<T>,
    count: number,
): ContentTarget<T> {
    const original = source.getAll();
    const sliced = original.slice(0, count);
    return {
        getAll: () => [...sliced],
        getBySlug: (slug: string) => original.find((e) => e.slug === slug),
    };
}
