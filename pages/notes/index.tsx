import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import { fromMarkdown } from 'lib/content';
import { generateNextSeo, pageSeo } from 'lib/seo';
import type { BlogPost } from 'lib/types';

type BlogPageProps = {
    title: string;
    description: string;
    items: BlogPost[];
};

const BlogPage = ({ title, description, items }: BlogPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            {generateNextSeo(pageSeo({ title, description, path: '/notes' }))}

            <div>
                <section className="py-12 md:py-20 bg-base-200">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Notes
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            Thoughts, tutorials, and TILs
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

export default BlogPage;

export async function getStaticProps() {
    const config = await import('../../data/config.json');

    const source = fromMarkdown<BlogPost>(
        // @ts-expect-error require.context is a webpack function
        require.context('../../posts', true, /\.md$/),
    );

    const allItems = source.getAll();

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items: allItems,
        },
    };
}
