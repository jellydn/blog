import { ArrowLeftIcon, YouTubeIcon } from 'components/Icons';
import Layout from 'components/Layout';
import matter from 'gray-matter';
import { getSiteConfig } from 'lib/config';
import { getMarkdownSlugs } from 'lib/content';
import { articleSeo, generateNextSeo } from 'lib/seo';
import { formatDate } from 'lib/utils/date';
import Link from 'next/link';

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
    const youtubeEmbedUrl = `https://www.youtube.com/embed/${frontmatter.youtube_id}`;
    const youtubeWatchUrl = `https://www.youtube.com/watch?v=${frontmatter.youtube_id}`;

    return (
        <Layout siteTitle={siteTitle}>
            {generateNextSeo(
                articleSeo({
                    title: `${frontmatter.title} | ${siteTitle}`,
                    description: frontmatter.description,
                    path: `/video/${slug}`,
                    publishedTime: frontmatter.date,
                    author: frontmatter.author,
                    tags: frontmatter.tag,
                    image: `https://i.ytimg.com/vi/${frontmatter.youtube_id}/maxresdefault.jpg`,
                    twitterCardType: 'player',
                }),
            )}

            <div className="min-h-screen">
                {/* Navigation */}
                <nav className="border-b border-base-300">
                    <div className="container mx-auto px-4 py-4 max-w-5xl">
                        <Link
                            href="/videos"
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
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
                            <YouTubeIcon className="w-5 h-5" />
                            Watch on YouTube
                        </a>
                        <a
                            href="https://www.youtube.com/c/ITManVietman"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline gap-2"
                        >
                            <YouTubeIcon className="w-5 h-5" />
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
    const config = getSiteConfig();
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.title,
            siteDescription: config.description,
            frontmatter: data.data,
            slug,
        },
    };
}

export async function getStaticPaths() {
    const slugs = getMarkdownSlugs('videos/**/*.md');

    const paths = slugs.map((slug: string) => ({
        params: { slug },
    }));

    return {
        paths,
        fallback: false,
    };
}
