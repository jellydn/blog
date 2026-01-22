'use client';

import { useEffect, useState } from 'react';

type TinaPost = {
    _sys: {
        filename: string;
    };
    title: string;
    description: string;
    date: string;
    tag?: string[];
    hero_image?: string;
};

type BlogPost = {
    slug: string;
    frontmatter: {
        title: string;
        description: string;
        date: string;
        tag?: string[];
        hero_image?: string;
    };
};

type NotesSectionProps = {
    fallbackPosts: BlogPost[];
};

function reformatDate(fullDate: string): string {
    const date = new Date(fullDate);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function isTil(slug: string): boolean {
    return slug.startsWith('til-');
}

function getCategory(slug: string): string {
    if (isTil(slug)) return 'TIL';
    return 'Guide';
}

export function NotesSection({ fallbackPosts }: NotesSectionProps) {
    const [posts, setPosts] = useState<TinaPost[] | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/notes');
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch {
                // Fallback to static posts
            }
        }

        fetchPosts();
    }, []);

    // Convert Tina posts to BlogPost format
    const displayPosts = posts && posts.length > 0
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
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">Latest Notes</h2>
                        <p className="text-xl text-base-content/70">
                            {posts && posts.length > 0
                                ? 'Fresh from the notebook'
                                : 'Guides, TILs, and tutorials'}
                        </p>
                    </div>
                    <a href="/notes" className="btn btn-primary">
                        View All Notes
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayPosts.slice(0, 6).map((post) => (
                        <a
                            key={post.slug}
                            href={`/notes/${post.slug}`}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
                        >
                            {post.frontmatter.hero_image && (
                                <figure className="aspect-video">
                                    <img
                                        src={post.frontmatter.hero_image}
                                        alt={post.frontmatter.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </figure>
                            )}
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="badge badge-ghost text-xs">
                                        {getCategory(post.slug)}
                                    </span>
                                    {post.frontmatter.tag?.slice(0, 2).map((tag: string) => (
                                        <span key={tag} className="badge badge-outline text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="card-title text-lg line-clamp-2">
                                    {post.frontmatter.title}
                                </h3>
                                <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                                    {post.frontmatter.description}
                                </p>
                                <p className="text-sm text-base-content/60">
                                    {reformatDate(post.frontmatter.date)}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
