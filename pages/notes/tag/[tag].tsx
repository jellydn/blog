import matter from 'gray-matter';
import unique from 'just-unique';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import type { BlogPost } from 'components/BlogList';
import type { VideoPost } from 'components/VideoList';

type BlogFrontmatter = {
    title: string;
    description?: string;
    date: string;
    tag?: string[];
};

type VideoFrontmatter = {
    title: string;
    description?: string;
    date: string;
    youtube_id: string;
    tag?: string[];
};

type TagPageProps = {
    tag: string;
    title: string;
    description: string;
    items: (BlogPost | VideoPost)[];
};

export default function TagPage({
    tag,
    title,
    description,
    items,
}: TagPageProps) {
    return (
        <Layout siteTitle={title}>
            <NextSeo
                title={`${tag} | Blog | ${title}`}
                description={`Blog posts tagged with "${tag}"`}
            />
            <div data-theme="corporate">
                {/* Back Link */}
                <nav className="bg-base-200">
                    <div className="container mx-auto px-4 py-4 max-w-5xl">
                        <Link
                            href="/notes"
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
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Notes
                        </Link>
                    </div>
                </nav>

                {/* Page Header */}
                <section className="bg-base-200">
                    <div className="container mx-auto px-4 pb-12 max-w-5xl">
                        <h1 className="text-4xl font-bold">#{tag}</h1>
                        <p className="text-xl text-base-content/70 mt-2">
                            {items.length} post{items.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </section>

                {/* Simple List */}
                <section className="py-12 bg-base-100 min-h-[70vh]">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <NotesList items={items} currentTag={tag} />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const { globSync } = await import('glob');
    const matter = (await import('gray-matter')).default;

    const posts = globSync('posts/**/*.md', { cwd: __dirname });
    const allTags = new Set<string>();

    for (const file of posts) {
        const filePath = file.replace('posts/', '../posts/');
        const content = await import(filePath);
        const { data } = matter(content.default);
        if (data.tag) {
            data.tag.forEach((tag: string) => allTags.add(tag));
        }
    }

    const paths = Array.from(allTags).map((tag) => ({
        params: { tag },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
    const config = await import('../../../data/config.json');

    // get posts from folder
    const posts = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const data = keys.map((key: string, index: number) => {
            const slug = key
                .replace(/^.*[\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.');
            const value = values[index];
            const document = matter(value.default);
            return {
                frontmatter: document.data as BlogFrontmatter,
                slug,
            };
        });
        return data;
        // @ts-expect-error this is special function from webpack
    })(require.context('../../../posts', true, /\.md$/));

    // get videos from folder
    const videos = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const data = keys.map((key: string, index: number) => {
            const slug = key
                .replace(/^.*[\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.');
            const value = values[index];
            const document = matter(value.default);
            return {
                frontmatter: document.data as VideoFrontmatter,
                slug,
            };
        });
        return data;
        // @ts-expect-error this is special function from webpack
    })(require.context('../../../videos', true, /\.md$/));

    // Deduplicate by slug
    const uniquePosts = unique(posts.map((post: BlogPost) => post.slug)).map(
        (slug) => posts.find((post: BlogPost) => post.slug === slug),
    ) as BlogPost[];

    const uniqueVideos = unique(
        videos.map((video: VideoPost) => video.slug),
    ).map((slug) =>
        videos.find((video: VideoPost) => video.slug === slug),
    ) as VideoPost[];

    // Sort all items by date (newest first)
    const allItems = [...uniquePosts, ...uniqueVideos].sort(
        (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime(),
    ) as (BlogPost | VideoPost)[];

    // Filter by tag
    const taggedItems = allItems.filter(
        (item) =>
            item.frontmatter.tag && item.frontmatter.tag.includes(params.tag),
    );

    return {
        props: {
            tag: params.tag,
            title: config.default.title,
            description: config.default.description,
            items: taggedItems,
        },
    };
}
