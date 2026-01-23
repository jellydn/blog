import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

import type { BlogPost } from 'components/BlogList';
import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import type { VideoPost } from 'components/VideoList';
import { dedupeBySlug, sortByDate } from 'lib/utils/array';

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

export default function TagPage({ tag, title, items }: TagPageProps) {
    return (
        <Layout siteTitle={title}>
            <NextSeo
                title={`${tag} | Blog | ${title}`}
                description={`Blog posts tagged with "${tag}"`}
            />
            <div data-theme="minimal">
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

                <section className="bg-base-200">
                    <div className="container mx-auto px-4 pb-12 max-w-5xl">
                        <h1 className="text-4xl font-bold">#{tag}</h1>
                        <p className="text-xl text-base-content/70 mt-2">
                            {items.length} post{items.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </section>

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
    const path = await import('node:path');
    const { globSync } = await import('glob');
    const fs = await import('node:fs');

    const postsDir = path.join(process.cwd(), 'posts');
    const videosDir = path.join(process.cwd(), 'videos');
    const posts = globSync(`${postsDir}/*.md`);
    const videos = globSync(`${videosDir}/*.md`);
    const allTags = new Set<string>();

    for (const file of [...posts, ...videos]) {
        const content = fs.readFileSync(file, 'utf-8');
        const { data } = matter(content);
        if (data.tag) {
            data.tag.forEach((tag: string) => allTags.add(tag.toLowerCase()));
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
        // @ts-expect-error require.context is a webpack function
    })(require.context('../../../posts', true, /\.md$/));

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
        // @ts-expect-error require.context is a webpack function
    })(require.context('../../../videos', true, /\.md$/));

    const allItems = sortByDate([
        ...dedupeBySlug(posts as BlogPost[]),
        ...dedupeBySlug(videos as VideoPost[]),
    ]) as (BlogPost | VideoPost)[];

    const taggedItems = allItems.filter((item) =>
        item.frontmatter.tag?.some(
            (t: string) => t.toLowerCase() === params.tag,
        ),
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
