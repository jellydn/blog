import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Layout from 'components/Layout';
import { fetchHashnodePostBySlug, fetchHashnodePosts } from 'lib/hashnode';
import type { HashnodePostDetail } from 'lib/hashnode';
import { formatDate } from 'lib/utils/date';

type PostPageProps = {
    siteTitle: string;
    siteDescription?: string;
    post: HashnodePostDetail;
};

export default function PostPage({
    siteTitle,
    siteDescription,
    post,
}: PostPageProps) {
    useEffect(() => {
        import('prismjs').then((Prism) => {
            Prism.highlightAll();
        });
    }, []);

    const canonicalUrl = `https://productsway.com/posts/${post.slug}`;
    const ogImage =
        post.coverImage?.url ?? 'https://productsway.com/og-image.png';

    const markdownBody = post.content?.markdown ?? '';
    const htmlBody = post.content?.html ?? '';
    const tagNames =
        post.tags
            ?.map((tag) => tag.name)
            .filter((tag): tag is string => Boolean(tag)) ?? [];

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${post.title} | ${siteTitle}`}
                description={post.brief ?? siteDescription}
                canonical={canonicalUrl}
                openGraph={{
                    type: 'article',
                    url: canonicalUrl,
                    title: post.title,
                    description: post.brief ?? siteDescription,
                    images: [
                        {
                            url: ogImage,
                            alt: post.title ?? siteTitle,
                        },
                    ],
                    article: {
                        publishedTime: post.publishedAt,
                        authors: [post.author?.name ?? 'Dung Huynh Duc'],
                        tags:
                            post.tags?.map((tag) => tag.name).filter(Boolean) ??
                            [],
                    },
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />

            <div className="min-h-screen">
                <nav className="border-b border-base-300">
                    <div className="container mx-auto px-4 py-4 max-w-4xl">
                        <Link
                            href="/posts"
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                suppressHydrationWarning
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Posts
                        </Link>
                    </div>
                </nav>

                <header className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        {tagNames.map((tag) => (
                            <span key={tag} className="badge badge-primary">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {post.title}
                    </h1>
                    <p className="text-base-content/60">
                        {formatDate(post.publishedAt ?? '')}
                        {post.author?.name && ` · ${post.author.name}`}
                    </p>
                </header>

                {post.coverImage?.url && (
                    <div className="container mx-auto px-4 max-w-4xl mb-8">
                        <div className="relative overflow-hidden rounded-xl border border-base-300 aspect-video">
                            <Image
                                src={post.coverImage.url}
                                alt={post.title ?? 'Post cover'}
                                fill
                                sizes="(min-width: 768px) 768px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                <article className="container mx-auto px-4 pb-16 max-w-4xl">
                    <div
                        className="prose prose-slate dark:prose-invert max-w-none"
                        suppressHydrationWarning
                    >
                        {markdownBody ? (
                            <ReactMarkdown remarkPlugins={[gfm]}>
                                {markdownBody}
                            </ReactMarkdown>
                        ) : (
                            <div
                                // Hashnode content already sanitized; keep KISS fallback.
                                dangerouslySetInnerHTML={{ __html: htmlBody }}
                            />
                        )}
                    </div>
                </article>
            </div>
        </Layout>
    );
}

type StaticPropsContext = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: StaticPropsContext) {
    const { slug } = params;
    const config = await import('../../data/config.json');
    const post = await fetchHashnodePostBySlug(slug);

    if (!post) {
        return { notFound: true, revalidate: 60 };
    }

    return {
        props: {
            siteTitle: config.default.title,
            siteDescription: config.default.description,
            post,
        },
        revalidate: 300,
    };
}

export async function getStaticPaths() {
    const posts = await fetchHashnodePosts(50);
    const paths = posts
        .filter((post) => post.slug)
        .map((post) => ({
            params: { slug: post.slug as string },
        }));

    return {
        paths,
        fallback: 'blocking',
    };
}
