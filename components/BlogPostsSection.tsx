'use client';

import { getCategory, getCategoryLabel } from 'components/Badge';
import type { BlogPost, TinaPost } from 'lib/types';
import { formatDate } from 'lib/utils/date';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

type BlogPostsSectionProps = {
    fallbackPosts: BlogPost[];
    allPostsUrl?: string;
    initialHasRemotePosts?: boolean;
};

const sortByDateDesc = (items: TinaPost[]) => {
    const getTimestamp = (date?: string) => {
        const timestamp = Date.parse(date ?? '');
        return Number.isNaN(timestamp) ? 0 : timestamp;
    };

    return [...items].sort(
        (a, b) => getTimestamp(b.date) - getTimestamp(a.date),
    );
};

export function BlogPostsSection({
    fallbackPosts,
    allPostsUrl,
    initialHasRemotePosts = false,
}: BlogPostsSectionProps) {
    const [hasRemotePosts, setHasRemotePosts] = useState(initialHasRemotePosts);

    const fallbackTinaPosts = useMemo<TinaPost[]>(
        () =>
            sortByDateDesc(
                fallbackPosts.map((post) => ({
                    _sys: { filename: post.slug },
                    title: post.frontmatter.title,
                    description: post.frontmatter.description,
                    date: post.frontmatter.date,
                    tag: post.frontmatter.tag,
                    hero_image: post.frontmatter.hero_image,
                })),
            ),
        [fallbackPosts],
    );

    const fetcher = async (url: string) => {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to load posts');
        }
        return (await res.json()) as TinaPost[];
    };

    const { data: posts } = useSWR<TinaPost[]>('/api/posts', fetcher, {
        fallbackData: fallbackTinaPosts,
        refreshInterval: 5 * 60 * 1000,
        dedupingInterval: 60 * 1000,
        revalidateOnFocus: true,
        onSuccess: (data) => setHasRemotePosts(data.length > 0),
    });

    const resolvedPosts = posts && posts.length > 0 ? posts : fallbackTinaPosts;

    const sortedPosts = useMemo(
        () => sortByDateDesc(resolvedPosts ?? []),
        [resolvedPosts],
    );

    const postBasePath = hasRemotePosts ? '/posts' : '/notes';
    const resolvedAllPostsUrl =
        allPostsUrl ?? (hasRemotePosts ? '/posts' : '/notes');

    const displayPosts = sortedPosts.map((post) => ({
        slug: post._sys.filename,
        frontmatter: {
            title: post.title,
            description: post.description,
            date: post.date,
            tag: post.tag,
            hero_image: post.hero_image,
        },
    }));

    return (
        <section className="py-20 bg-base-200/50">
            <div className="container px-4 mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="mb-2 text-4xl font-bold">
                            Latest Blog Posts
                        </h2>
                        <p
                            className="text-xl text-base-content/70"
                            suppressHydrationWarning
                        >
                            {hasRemotePosts
                                ? "Fresh from ITMan's Blog"
                                : 'Guides, TILs, and tutorials'}
                        </p>
                    </div>
                    <a
                        href={resolvedAllPostsUrl}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noreferrer"
                    >
                        View All Posts
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayPosts.slice(0, 6).map((post: BlogPost) => (
                        <a
                            key={post.slug}
                            href={`${postBasePath}/${post.slug}`}
                            className="shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 card bg-base-100 group"
                        >
                            {post.frontmatter.hero_image && (
                                <figure className="relative aspect-video">
                                    <Image
                                        src={post.frontmatter.hero_image}
                                        alt={post.frontmatter.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </figure>
                            )}
                            <div className="card-body">
                                <div className="flex gap-2 items-center mb-2">
                                    <span className="text-xs badge badge-ghost">
                                        {getCategoryLabel(
                                            getCategory(post.slug),
                                        )}
                                    </span>
                                    {post.frontmatter.tag
                                        ?.slice(0, 2)
                                        .map((tag: string) => (
                                            <span
                                                key={tag}
                                                className="text-xs badge badge-outline"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                                <h3 className="text-lg card-title line-clamp-2">
                                    {post.frontmatter.title}
                                </h3>
                                <p className="mb-4 text-sm text-base-content/70 line-clamp-2">
                                    {post.frontmatter.description}
                                </p>
                                <p className="text-sm text-base-content/60">
                                    {formatDate(post.frontmatter.date)}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
