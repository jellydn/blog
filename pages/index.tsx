import matter from 'gray-matter';
import unique from 'just-unique';
import { NextSeo } from 'next-seo';

import BlogList from 'components/BlogList';
import Layout from 'components/Layout';
import VideoList from 'components/VideoList';

import type { BlogPost } from 'components/BlogList';
import type { VideoPost } from 'components/VideoList';

type IndexProps = {
    title: string;
    description: string;
    allBlogs: BlogPost[];
    allVideos: VideoPost[];
};

const Index = ({ title, description, allBlogs, allVideos }: IndexProps) => (
    <Layout siteTitle={title} siteDescription={description}>
        <NextSeo
            title={title}
            description={description}
            canonical="https://productsway.com"
            openGraph={{
                type: 'website',
                url: 'https://productsway.com',
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
        <section>
            <VideoList allVideos={allVideos} />
            <BlogList allBlogs={allBlogs} />
        </section>
    </Layout>
);

export default Index;

export async function getStaticProps() {
    const siteConfig = await import(`../data/config.json`);
    // get posts & context from folder
    const posts = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const data = keys.map((key: string, index: number) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.');
            const value = values[index];
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default);
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            };
        });
        return data;
        // @ts-expect-error this is special function from webpack, refer https://stackoverflow.com/questions/54059179/what-is-require-context
    })(require.context('../posts', true, /\.md$/));

    // get videos & context from folder
    const videos = ((context) => {
        const keys = context.keys();
        const values = keys.map(context);

        const data = keys.map((key: string, index: number) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.');
            const value = values[index];
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default);
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            };
        });
        return data;
        // @ts-expect-error this is special function from webpack, refer https://stackoverflow.com/questions/54059179/what-is-require-context
    })(require.context('../videos', true, /\.md$/));

    return {
        props: {
            allBlogs: unique(posts.map((post: BlogPost) => post.slug)).map(
                (slug) => posts.find((post: BlogPost) => post.slug === slug),
            ) as BlogPost[],
            allVideos: unique(videos.map((post: VideoPost) => post.slug)).map(
                (slug) => videos.find((post: VideoPost) => post.slug === slug),
            ) as VideoPost[],
            title: siteConfig.default.title,
            description: siteConfig.default.description,
        },
    };
}
