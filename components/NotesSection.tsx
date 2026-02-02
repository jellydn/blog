'use client';

import { useEffect, useState } from 'react';

import { getCategory, getCategoryLabel } from 'components/Badge';
import type { BlogPost, TinaPost } from 'lib/types';
import { formatDate } from 'lib/utils/date';

type NotesSectionProps = {
    fallbackPosts: BlogPost[];
    allPostsUrl?: string;
};

// Extend window type for prefetched data
declare global {
    interface Window {
        __PREFETCHED_NOTES__?: TinaPost[];
    }
}

export function NotesSection({
    fallbackPosts,
    allPostsUrl = 'https://blog.productsway.com',
}: NotesSectionProps) {
    const [posts, setPosts] = useState<TinaPost[] | null>(null);

    useEffect(() => {
        if (window.__PREFETCHED_NOTES__) {
            setPosts(window.__PREFETCHED_NOTES__);
            return;
        }

        async function fetchPosts() {
            try {
                const res = await fetch('/api/notes');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch {
                // Silent fail, use fallback
            }
        }

        fetchPosts();
    }, []);

    const displayPosts =
        posts && posts.length > 0
            ? posts.map((post) => ({
                  slug: post._sys.filename,
                  frontmatter: {
                      title: post.title,
                      description: post.description,
                      date: post.date,
                      tag: post.tag,
                      hero_image: post.hero_image,
                  },
              }))
            : fallbackPosts;

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
                            {posts && posts.length > 0
                                ? 'Fresh from ITMan\'s Blog'
                                : 'Guides, TILs, and tutorials'}
                        </p>
                    </div>
                    <a
                        href={allPostsUrl}
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
                            href={`/notes/${post.slug}`}
                            className="shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 card bg-base-100 group"
                        >
                            {post.frontmatter.hero_image && (
                                <figure className="aspect-video">
                                    <img
                                        src={post.frontmatter.hero_image}
                                        alt={post.frontmatter.title}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
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
