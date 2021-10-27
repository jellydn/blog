import matter from 'gray-matter';
import unique from 'just-unique';

import BlogList from 'components/BlogList';
import Layout from 'components/Layout';
import VideoList from 'components/VideoList';

const Index = ({
    title,
    description,
    allBlogs,
    allVideos,
}: {
    title: string;
    description: string;
    allBlogs: any;
    allVideos: any;
}) => (
    <Layout siteTitle={title} siteDescription={description}>
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

        const data = keys.map((key, index) => {
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

        const data = keys.map((key, index) => {
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
            allBlogs: unique(posts.map((post) => post.slug)).map((slug) =>
                posts.find((post) => post.slug === slug),
            ),
            allVideos: unique(videos.map((post) => post.slug)).map((slug) =>
                videos.find((post) => post.slug === slug),
            ),
            title: siteConfig.default.title,
            description: siteConfig.default.description,
        },
    };
}
