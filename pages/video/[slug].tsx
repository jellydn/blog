import { globSync } from 'glob';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Layout from 'components/Layout';
import { formatDate } from 'lib/utils/date';

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
    siteDescription?: string;
    siteTitle: string;
    slug: string;
};

export default function VideoTemplate({
    frontmatter,
    siteTitle,
    slug,
}: VideoTemplateProps) {
    const canonicalUrl = `https://productsway.com/video/${slug}`;
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${frontmatter.youtube_id}`;
    const youtubeWatchUrl = `https://www.youtube.com/watch?v=${frontmatter.youtube_id}`;

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${frontmatter.title} | ${siteTitle}`}
                description={frontmatter.description}
                canonical={canonicalUrl}
                openGraph={{
                    type: 'article',
                    url: canonicalUrl,
                    title: frontmatter.title,
                    description: frontmatter.description,
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

            <div className="min-h-screen">
                {/* Navigation */}
                <nav className="border-b border-base-300">
                    <div className="container mx-auto px-4 py-4 max-w-5xl">
                        <Link
                            href="/videos"
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Videos
                        </Link>
                    </div>
                </nav>

                {/* Video Header */}
                <header className="container mx-auto px-4 pt-8 pb-4 max-w-5xl">
                    <div className="flex items-center gap-3 mb-4">
                        {frontmatter.tag?.map((tag: string) => (
                            <Link
                                key={tag}
                                href={`/notes/tag/${tag.toLowerCase()}`}
                                className="badge badge-primary hover:opacity-80"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {frontmatter.title}
                    </h1>
                    <p className="text-base-content/60">
                        {formatDate(frontmatter.date)}
                        {frontmatter.author && ` · ${frontmatter.author}`}
                    </p>
                </header>

                {/* Video Embed */}
                <div className="container mx-auto px-4 max-w-5xl mb-8">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src={youtubeEmbedUrl}
                            title={frontmatter.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="container mx-auto px-4 max-w-5xl mb-12">
                    <div className="flex flex-wrap gap-4">
                        <a
                            href={youtubeWatchUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary gap-2"
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
                        <a
                            href="https://www.youtube.com/c/ITManVietman"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline gap-2"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            Subscribe Channel
                        </a>
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
