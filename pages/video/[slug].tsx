import Giscus from '@giscus/react';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Prism from 'prismjs';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Image from 'next/image';
import Link from 'next/link';

import Layout from 'components/Layout';
import { reformatDateLong } from 'lib/utils/date';

type VideoFrontmatter = {
    title: string;
    description?: string;
    date: string;
    author?: string;
    tag?: string[];
    hero_image?: string;
    youtube_id: string;
};

type VideoTemplateProps = {
    frontmatter: VideoFrontmatter;
    markdownBody: string;
    siteDescription?: string;
    siteTitle: string;
    slug: string;
};

export default function VideoTemplate({
    frontmatter,
    siteDescription,
    markdownBody,
    siteTitle,
    slug,
}: VideoTemplateProps) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const canonicalUrl = `https://productsway.com/video/${slug}`;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${frontmatter.youtube_id}`;

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${frontmatter.title} | ${siteTitle}`}
                description={frontmatter.description ?? siteDescription}
                canonical={canonicalUrl}
                openGraph={{
                    type: 'article',
                    url: canonicalUrl,
                    title: frontmatter.title,
                    description: frontmatter.description ?? siteDescription,
                    images: [
                        {
                            url: `https://i.ytimg.com/vi/${frontmatter.youtube_id}/maxresdefault.jpg`,
                            alt: frontmatter.title,
                        },
                    ],
                    article: {
                        publishedTime: frontmatter.date,
                        authors: [frontmatter.author ?? 'Dung Huynh Duc'],
                        tags: frontmatter.tag ?? [],
                    },
                }}
                twitter={{
                    cardType: 'player',
                }}
            />

            <div data-theme="corporate">
                <div className="bg-base-200 border-b border-base-300">
                    <div className="container mx-auto px-4 py-4">
                        <Link href="/" className="btn btn-ghost btn-sm gap-2">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </div>
                </div>

                <div className="bg-base-200">
                    <div className="container mx-auto px-4 py-8 max-w-6xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {frontmatter.tag?.map((tag: string) => (
                                <Link
                                    key={tag}
                                    href={`/notes/tag/${tag}`}
                                    className="badge badge-primary hover:opacity-80"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            {frontmatter.title}
                        </h1>
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-2 ring-offset-base-200">
                                    <Image
                                        src="/avatar.jpg"
                                        width="48"
                                        height="48"
                                        alt="Dung Huynh Duc"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold">
                                    {frontmatter.author ?? 'Dung Huynh'}
                                </p>
                                <p className="text-sm text-base-content/70">
                                    {reformatDateLong(frontmatter.date)}
                                </p>
                            </div>
                            <a
                                href={`https://www.youtube.com/watch?v=${frontmatter.youtube_id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline btn-primary btn-sm ml-auto"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-base-200 pb-8">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <iframe
                                src={youtubeEmbedUrl}
                                title={frontmatter.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>

                {markdownBody && (
                    <article className="bg-base-100">
                        <div className="container mx-auto px-4 py-12 max-w-4xl">
                            <div className="prose prose-lg max-w-none">
                                <ReactMarkdown remarkPlugins={[gfm]}>
                                    {markdownBody}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </article>
                )}

                <div className="bg-base-200">
                    <div className="container mx-auto px-4 py-8 max-w-6xl">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title">Share this video</h3>
                                <p className="text-base-content/70">
                                    Help spread the word by sharing this video
                                </p>
                                <div className="flex gap-4 mt-4 flex-wrap">
                                    <a
                                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(canonicalUrl)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline btn-primary"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                        Tweet
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const url = `https://www.youtube.com/watch?v=${frontmatter.youtube_id}`;
                                            navigator.clipboard.writeText(url);
                                        }}
                                        className="btn btn-outline"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-base-100">
                    <div className="container mx-auto px-4 py-12 max-w-5xl">
                        <div className="divider">Discussion</div>
                        <Giscus
                            id="comments"
                            repo="jellydn/blog"
                            repoId="MDEwOlJlcG9zaXRvcnkyODM1MjQ3NTE="
                            category="Ideas"
                            categoryId="DIC_kwDOEOY-j84CQqDK"
                            mapping="specific"
                            term={frontmatter.title}
                            reactionsEnabled="1"
                            emitMetadata="0"
                            inputPosition="top"
                            theme="light"
                            lang="en"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="bg-base-200">
                    <div className="container mx-auto px-4 py-12 max-w-6xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold">More videos</h2>
                            <p className="text-base-content/70 mt-2">
                                Check out more content on IT Man Channel
                            </p>
                        </div>
                        <div className="text-center">
                            <a
                                href="https://www.youtube.com/c/ITManVietman"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary btn-lg"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                Subscribe on YouTube
                            </a>
                        </div>
                    </div>
                </div>
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
    const content = await import(`../../videos/${slug}.md`);
    const config = await import('../../data/config.json');
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.default.title,
            siteDescription: config.default.description,
            frontmatter: data.data,
            markdownBody: data.content,
            slug,
        },
    };
}

export async function getStaticPaths() {
    const videos = globSync('videos/**/*.md');

    const videoSlugs = videos.map((file: string) =>
        file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
    );

    const paths = videoSlugs.map((slug: string) => ({
        params: { slug },
    }));
    return {
        paths,
        fallback: false,
    };
}
