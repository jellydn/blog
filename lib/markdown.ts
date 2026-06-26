import { extractSlug, parseMarkdown } from 'lib/utils/array';

type RequireContext = {
    keys(): string[];
    (key: string): { default: string };
};

export type MarkdownEntry = {
    slug: string;
    frontmatter: Record<string, unknown>;
};

/**
 * Load all markdown files from a directory using webpack's require.context.
 * Returns an array of { slug, frontmatter } entries, one per .md file found.
 */
export function loadMarkdownEntries(context: RequireContext): MarkdownEntry[] {
    return context.keys().map((key: string) => {
        const slug = extractSlug(key);
        return parseMarkdown(context(key).default, slug);
    });
}
