import { ArrowLeftIcon } from 'components/Icons';
import Layout from 'components/Layout';
import { NotesList } from 'components/NotesList';
import { getSiteConfig } from 'lib/config';
import { combine, fromMarkdown, getUniqueTags } from 'lib/content';
import { generateNextSeo, pageSeo } from 'lib/seo';
import type { BlogPost, VideoPost } from 'lib/types';
import Link from 'next/link';

type TagPageProps = {
    tag: string;
    title: string;
    description: string;
    items: (BlogPost | VideoPost)[];
};

export default function TagPage({ tag, title, items }: TagPageProps) {
    return (
        <Layout siteTitle={title}>
            {generateNextSeo(
                pageSeo({
                    title: `${tag} | Notes | ${title}`,
                    description: `Blog posts tagged with "${tag}"`,
                    path: `/notes/tag/${tag}`,
                }),
            )}
            <div>
                <nav className="bg-base-200">
                    <div className="container mx-auto px-4 py-4 max-w-5xl">
                        <Link
                            href="/notes"
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
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
    const allTags = getUniqueTags(['posts', 'videos']);

    const paths = allTags.map((tag) => ({
        params: { tag },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
    const config = getSiteConfig();

    const postsSource = fromMarkdown<BlogPost>(
        // @ts-expect-error require.context is a webpack-only build-time function
        require.context('../../../posts', true, /\.md$/),
    );

    const videosSource = fromMarkdown<VideoPost>(
        // @ts-expect-error require.context is a webpack-only build-time function
        require.context('../../../videos', true, /\.md$/),
    );

    const combined = combine(postsSource, videosSource);
    const allItems = combined.getAll() as (BlogPost | VideoPost)[];

    const taggedItems = allItems.filter((item) =>
        item.frontmatter.tag?.some(
            (t: string) => t.toLowerCase() === params.tag,
        ),
    );

    return {
        props: {
            tag: params.tag,
            title: config.title,
            description: config.description,
            items: taggedItems,
        },
    };
}
