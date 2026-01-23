import matter from 'gray-matter';
import unique from 'just-unique';
import { NextSeo } from 'next-seo';

import type { BlogPost } from 'components/BlogList';
import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
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

type BlogPageProps = {
    title: string;
    description: string;
    items: (BlogPost | VideoPost)[];
};

const BlogPage = ({ title, description, items }: BlogPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            <NextSeo
                title={title}
                description={description}
                canonical="https://productsway.com/notes"
                openGraph={{
                    type: 'website',
                    url: 'https://productsway.com/notes',
                    title,
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

            <div data-theme="minimal">
                {/* Page Header */}
                <section className="py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-5xl font-bold mb-4">Notes</h1>
                        <p className="text-xl text-base-content/70">
                            Thoughts, tutorials, TILs, and videos
                        </p>
                    </div>
                </section>

                {/* Simple List */}
                <section className="py-16 bg-base-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <NotesList items={items} />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default BlogPage;

export async function getStaticProps() {
    const config = await import('../../data/config.json');

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
    })(require.context('../../posts', true, /\.md$/));

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
    })(require.context('../../videos', true, /\.md$/));

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

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items: allItems,
        },
    };
}
