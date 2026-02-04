import Layout from 'components/Layout';
import type { HashnodePostSummary } from 'lib/hashnode';
import { fetchHashnodePosts } from 'lib/hashnode';
import { formatDate } from 'lib/utils/date';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useMemo, useState } from 'react';

type PostsPageProps = {
    title: string;
    description: string;
    items: HashnodePostSummary[];
};

const PAGE_SIZE = 12;

const PostsPage = ({ title, description, items }: PostsPageProps) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pageItems = useMemo(
        () =>
            items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
        [currentPage, items],
    );

    return (
        <Layout siteTitle={title} siteDescription={description}>
            <NextSeo
                title="Posts"
                description="Articles from ITMan blog.productsway.com"
                canonical="https://productsway.com/posts"
                openGraph={{
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
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />

            <div>
                <section className="py-12 md:py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Posts
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            Articles from ITMan{' '}
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
                            <>
                                <div className="grid gap-8 md:grid-cols-2">
                                    {pageItems.map((post) => {
                                        const tagNames =
                                            post.tags
                                                ?.map((tag) => tag.name)
                                                .filter((tag): tag is string =>
                                                    Boolean(tag),
                                                ) ?? [];

                                        return (
                                            <article
                                                key={post.slug}
                                                className="card bg-base-200/50 border border-base-300"
                                            >
                                                {post.coverImage?.url && (
                                                    <figure className="relative aspect-video">
                                                        <Image
                                                            src={
                                                                post.coverImage
                                                                    .url
                                                            }
                                                            alt={
                                                                post.title ??
                                                                'Post'
                                                            }
                                                            fill
                                                            sizes="(min-width: 768px) 50vw, 100vw"
                                                            className="object-cover"
                                                        />
                                                    </figure>
                                                )}
                                                <div className="card-body">
                                                    <p className="text-sm text-base-content/60">
                                                        {formatDate(
                                                            post.publishedAt ??
                                                                '',
                                                        )}
                                                    </p>
                                                    <h2 className="card-title text-2xl">
                                                        <Link
                                                            href={`/posts/${post.slug}`}
                                                            className="hover:text-primary transition-colors"
                                                        >
                                                            {post.title}
                                                        </Link>
                                                    </h2>
                                                    {post.brief && (
                                                        <p className="text-base-content/70 line-clamp-3">
                                                            {post.brief}
                                                        </p>
                                                    )}
                                                    {tagNames.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {tagNames
                                                                .slice(0, 3)
                                                                .map((tag) => (
                                                                    <span
                                                                        key={
                                                                            tag
                                                                        }
                                                                        className="badge badge-outline text-xs"
                                                                    >
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-between mt-10">
                                        <button
                                            type="button"
                                            className="btn btn-outline"
                                            onClick={() =>
                                                setPage(
                                                    Math.max(
                                                        1,
                                                        currentPage - 1,
                                                    ),
                                                )
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        <span className="text-sm text-base-content/70">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            type="button"
                                            className="btn btn-outline"
                                            onClick={() =>
                                                setPage(
                                                    Math.min(
                                                        totalPages,
                                                        currentPage + 1,
                                                    ),
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PostsPage;

export async function getStaticProps() {
    const config = await import('../../data/config.json');
    const items = await fetchHashnodePosts(50);

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items,
        },
        revalidate: 300,
    };
}
