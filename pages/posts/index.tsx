import Layout from 'components/Layout';
import matter from 'gray-matter';
import { formatDate } from 'lib/utils/date';
import Image from 'next/image';
import { generateNextSeo } from 'next-seo/pages';

const BLOG_URL = 'https://blog.productsway.com';

type LocalPost = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    hero_image: string | null;
};

type PostsPageProps = {
    title: string;
    description: string;
    items: LocalPost[];
};

const PostsPage = ({ title, description, items }: PostsPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            {generateNextSeo({
                title: 'Posts',
                description: 'Articles from ITMan blog.productsway.com',
                canonical: 'https://productsway.com/posts',
                openGraph: {
                    type: 'website',
                    url: 'https://productsway.com/posts',
                    title: 'Posts',
                    description,
                    images: [
                        {
                            url: 'https://productsway.com/og-image.png',
                            alt: title,
                        },
                    ],
                },
                twitter: {
                    cardType: 'summary_large_image',
                },
            })}

            <div>
                <section className="py-12 md:py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Posts
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            Articles from{' '}
                            <a
                                href="https://blog.productsway.com"
                                target="_blank"
                                rel="noreferrer"
                                className="link link-hover"
                            >
                                blog.productsway.com
                            </a>
                        </p>
                    </div>
                </section>

                <section className="py-16 bg-base-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {items.length === 0 ? (
                            <p className="text-base-content/60">
                                No posts yet. Check back soon.
                            </p>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2">
                                {items.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="card bg-base-200/50 border border-base-300"
                                    >
                                        {post.hero_image && (
                                            <figure className="relative aspect-video">
                                                <Image
                                                    src={post.hero_image}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(min-width: 768px) 50vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </figure>
                                        )}
                                        <div className="card-body">
                                            <p className="text-sm text-base-content/60">
                                                {formatDate(post.date)}
                                            </p>
                                            <h2 className="card-title text-2xl">
                                                <a
                                                    href={`${BLOG_URL}/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {post.title}
                                                </a>
                                            </h2>
                                            {post.description && (
                                                <p className="text-base-content/70 line-clamp-3">
                                                    {post.description}
                                                </p>
                                            )}
                                            {post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags
                                                        .slice(0, 3)
                                                        .map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="badge badge-outline text-xs"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                            <div className="mt-2">
                                                <a
                                                    href={`${BLOG_URL}/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Read on blog.productsway.com
                                                    <svg
                                                        className="w-4 h-4 ml-1"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PostsPage;

// Fetch posts from blog.productsway.com RSS feed (primary) or hashnode.com profile RSC (fallback)
async function fetchPostsFromHashnode(): Promise<LocalPost[]> {
    // Helper to parse an RSS XML string into items
    function parseRSSItems(xml: string) {
        return (xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []).map(
            (item: string) => {
                const slug =
                    item.match(
                        /<link>https:\/\/blog\.productsway\.com\/([^<]+)<\/link>/,
                    )?.[1] ??
                    item.match(
                        /<guid[^>]*>https:\/\/blog\.productsway\.com\/([^<]+)<\/guid>/,
                    )?.[1] ??
                    '';
                const title =
                    item.match(
                        /<title><!\[CDATA\[([^\]]+)\]\]><\/title>/,
                    )?.[1] ??
                    item.match(/<title>([^<]+)<\/title>/)?.[1] ??
                    '';
                const description =
                    item.match(
                        /<description><!\[CDATA\[([^\]]+)\]\]><\/description>/,
                    )?.[1] ??
                    item.match(/<description>([^<]+)<\/description>/)?.[1] ??
                    '';
                const date =
                    item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1] ?? '';
                const cover =
                    item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ??
                    item.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ??
                    null;
                const tags = (
                    item.match(/<category>([^<]+)<\/category>/g) ?? []
                ).map((t: string) => t.replace(/<\/?category>/g, ''));
                return {
                    slug: slug.replace(/\/$/, ''),
                    title: title.trim(),
                    description: description.trim(),
                    date: new Date(date).toISOString(),
                    tags,
                    cover,
                };
            },
        );
    }

    // Try RSS feed first, with fallback to sitemap.xml for all posts
    const BASE_URL = 'https://blog.productsway.com';
    const FEED_URLS = [`${BASE_URL}/rss.xml`, `${BASE_URL}/sitemap.xml`];
    const allPosts: Array<{
        slug: string;
        title: string;
        description: string;
        date: string;
        tags: string[];
        cover: string | null;
    }> = [];

    try {
        // Try RSS first
        for (const url of FEED_URLS) {
            const res = await fetch(url, {
                headers: { 'User-Agent': 'ProductswayBlog/1.0' },
                signal: AbortSignal.timeout(10000),
            });
            if (!res.ok) continue;

            const xml = await res.text();

            if (url.includes('sitemap')) {
                // Parse sitemap URLs: <url><loc>https://blog.productsway.com/SLUG</loc>...</url>
                const urls =
                    xml.match(/<url><loc>[^<]+<\/loc>[\s\S]*?<\/url>/g) ?? [];
                for (const entry of urls) {
                    const href = entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
                    const slug = href
                        .replace(`${BASE_URL}/`, '')
                        .replace(/\/$/, '');
                    if (
                        slug &&
                        !slug.includes('tag/') &&
                        !slug.includes('archive/') &&
                        !slug.includes('page/')
                    ) {
                        allPosts.push({
                            slug,
                            title: slug
                                .replace(/[-]/g, ' ')
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, (c: string) =>
                                    c.toUpperCase(),
                                ),
                            description: '',
                            date:
                                entry.match(
                                    /<lastmod>([^<]+)<\/lastmod>/,
                                )?.[1] ?? '',
                            tags: [],
                            cover: null,
                        });
                    }
                }
                // Sitemap found all, no need for RSS
                break;
            } else {
                // Parse RSS items
                const items = parseRSSItems(xml);
                for (const item of items) {
                    allPosts.push(item);
                }
            }
        }

        if (allPosts.length > 0) {
            return allPosts
                .filter((p) => p.slug && p.title)
                .map((p) => ({
                    slug: p.slug,
                    title: p.title,
                    description: p.description,
                    date: p.date,
                    tags: p.tags,
                    hero_image: p.cover,
                }))
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime(),
                );
        }
    } catch {
        /* fall through to RSC */
    }

    // Fall back to RSC stream from hashnode.com profile page
    try {
        const res = await fetch('https://hashnode.com/@dunghd', {
            headers: { 'User-Agent': 'ProductswayBlog/1.0' },
            signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) return [];
        const html = await res.text();

        // Concatenate all __next_f.push chunk contents
        const MARKER = '__next_f.push([1,';
        let data = '';
        let pos = 0;
        while (true) {
            const chunkStart = html.indexOf(MARKER, pos);
            if (chunkStart < 0) break;
            const quoteStart = html.indexOf('"', chunkStart + MARKER.length);
            if (quoteStart < 0) break;
            let chunkEnd = -1;
            for (let i = quoteStart + 1; i < html.length; i++) {
                if (html[i] === '\\' && html[i + 1] === '"') {
                    i++;
                    continue;
                }
                if (html[i] === '"') {
                    chunkEnd = i;
                    break;
                }
            }
            if (chunkEnd < 0) break;
            try {
                data += JSON.parse(`"${html.slice(quoteStart + 1, chunkEnd)}"`);
            } catch {
                /* skip malformed */
            }
            pos = chunkEnd + 1;
        }

        if (!data) return [];

        // Find initialPosts — track only array [] depth, not object {} depth
        const ARRAY_MARKER = '"initialPosts":[';
        const arrIdx = data.indexOf(ARRAY_MARKER);
        if (arrIdx < 0) return [];

        const arrStart = arrIdx + ARRAY_MARKER.length;
        let depth = 0;
        let arrEnd = -1;
        for (let i = arrStart; i < data.length; i++) {
            if (data[i] === '[') depth++;
            else if (data[i] === ']') {
                if (depth === 0) {
                    arrEnd = i;
                    break;
                }
                depth--;
            }
        }
        if (arrEnd < 0) return [];

        // Clean RSC formatting: replace $D dates
        const cleaned = data
            .slice(arrStart, arrEnd)
            .replace(/"\$D(\d{4}-\d{2}-\d{2}T[^"]+)"/g, '"$1"');

        let posts: Array<{
            slug: string;
            title: string;
            brief: string;
            publishedAt: string;
            coverImage?: { url: string };
        }> = [];

        try {
            posts = JSON.parse(`[${cleaned}]`);
        } catch {
            // Fallback: extract slugs/titles via regex if JSON fails
            const slugRe = /"slug":"([^"]+)"/g;
            const titleRe = /"title":"([^"]+)"/g;
            const briefRe = /"brief":"([^"]+)"/g;
            const dateRe =
                /(?:"\$D|"publishedAt":")(\d{4}-\d{2}-\d{2}T[^"]+)"/g;
            const coverRe = /"coverImage":\{"url":"([^"]+)"/g;

            const slugs = [...cleaned.matchAll(slugRe)].map((m) => m[1]);
            const titles = [...cleaned.matchAll(titleRe)].map((m) => m[1]);
            const briefs = [...cleaned.matchAll(briefRe)].map((m) => m[1]);
            const dates = [...cleaned.matchAll(dateRe)].map((m) => m[1]);
            const covers = [...cleaned.matchAll(coverRe)].map((m) => m[1]);

            const len = Math.max(slugs.length, titles.length);
            for (let i = 0; i < len; i++) {
                posts.push({
                    slug: slugs[i] ?? '',
                    title: titles[i] ?? '',
                    brief: briefs[i] ?? '',
                    publishedAt: dates[i] ?? '',
                    coverImage: covers[i] ? { url: covers[i] } : undefined,
                });
            }
        }

        return posts
            .filter((p) => p.slug && p.title)
            .map((p) => ({
                slug: p.slug,
                title: p.title,
                description: p.brief ?? '',
                date: p.publishedAt ?? '',
                tags: [],
                hero_image: p.coverImage?.url ?? null,
            }))
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
    } catch {
        return [];
    }
}

export async function getStaticProps() {
    const config = await import('../../data/config.json');

    // Get remote posts from RSS/RSC
    const remotePosts = await fetchPostsFromHashnode();

    // Always include local posts too (merge, dedupe by slug)
    const { globSync } = await import('glob');
    const fs = await import('node:fs');
    const path = await import('node:path');

    const postsDir = path.join(process.cwd(), 'posts');
    const files = globSync('**/*.md', { cwd: postsDir });

    const localPosts = files
        .filter((file) => fs.statSync(path.join(postsDir, file)).isFile())
        .map((file) => {
            const slug = file.replace(/\.[^/.]+$/, '');
            const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
            const doc = matter(content);
            return {
                slug,
                title: doc.data.title ?? slug,
                description: doc.data.description ?? '',
                date: doc.data.date ?? '',
                tags: doc.data.tag ?? [],
                hero_image: doc.data.hero_image ?? null,
            };
        });

    // Merge, deduplicate, sort
    const seen = new Set();
    const items = [...remotePosts, ...localPosts]
        .filter((p) => {
            if (seen.has(p.slug)) return false;
            seen.add(p.slug);
            return true;
        })
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items,
        },
        revalidate: 300,
    };
}
