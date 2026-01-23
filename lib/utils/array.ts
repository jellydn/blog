export function dedupeBySlug<T extends { slug: string }>(items: T[]): T[] {
    const seen = new Set<string>();
    return items.filter((item) => {
        if (seen.has(item.slug)) return false;
        seen.add(item.slug);
        return true;
    });
}

export function sortByDate<T extends { frontmatter: { date: string } }>(
    items: T[],
): T[] {
    return items.sort(
        (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime(),
    );
}
