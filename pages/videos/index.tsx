import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import type { VideoPost } from 'components/VideoList';
import { getSiteConfig } from 'lib/config';
import { fromMarkdown } from 'lib/content';
import { generateNextSeo, pageSeo } from 'lib/seo';

type VideosPageProps = {
    title: string;
    description: string;
    items: VideoPost[];
};

const VideosPage = ({ title, description, items }: VideosPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            {generateNextSeo(pageSeo({ title, description, path: '/videos' }))}

            <div>
                <section className="py-12 md:py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Videos
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            Tutorials on Neovim, React, AI, CLI, Blockchain, Web
                            Development, and more
                        </p>
                    </div>
                </section>

                <section className="py-16 bg-base-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <NotesList items={items} />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default VideosPage;

export async function getStaticProps() {
    const config = getSiteConfig();

    const source = fromMarkdown<VideoPost>(
        // @ts-expect-error require.context is a webpack function
        require.context('../../videos', true, /\.md$/),
    );

    const items = source.getAll();

    return {
        props: {
            title: config.title,
            description: config.description,
            items,
        },
    };
}
