import matter from 'gray-matter';
import { NextSeo } from 'next-seo';

import type { BlogPost } from 'components/BlogList';
import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import { dedupeBySlug, sortByDate } from 'lib/utils/array';

type BlogFrontmatter = {
    title: string;
    description?: string;
    date: string;
    tag?: string[];
};

type BlogPageProps = {
    title: string;
    description: string;
    items: BlogPost[];
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
    })(require.context('../../posts', true, /\.md$/));

    const allItems = sortByDate(
        dedupeBySlug(posts as BlogPost[]),
    ) as BlogPost[];

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items: allItems,
        },
    };
}
