import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import type { VideoPost } from 'components/VideoList';
import { loadMarkdownEntries } from 'lib/markdown';
import { dedupeBySlug, sortByDate } from 'lib/utils/array';
import { generateNextSeo } from 'next-seo/pages';

type VideosPageProps = {
    title: string;
    description: string;
    items: VideoPost[];
};

const VideosPage = ({ title, description, items }: VideosPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            {generateNextSeo({
                title,
                description,
                canonical: 'https://productsway.com/videos',
                openGraph: {
                    type: 'website',
                    url: 'https://productsway.com/videos',
                    title,
                    description,
                    images: [
                        {
                            url: 'https://productsway.com/og-image.png',
                            alt: title,
                        },
                    ],
                },
                twitter: {
                    cardType: 'summary_large_image',
                },
            })}

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
    const config = await import('../../data/config.json');

    const videos = loadMarkdownEntries(
        // @ts-expect-error require.context is a webpack function
        require.context('../../videos', true, /\.md$/),
    );

    const items = sortByDate(dedupeBySlug(videos as VideoPost[]));

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items,
        },
    };
}
