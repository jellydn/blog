import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Layout from 'components/Layout';

type TagPageProps = {
    tag: string;
    siteTitle: string;
};

export default function TagPage({ tag, siteTitle }: TagPageProps) {
    const router = useRouter();

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${tag} | Blog | ${siteTitle}`}
                description={`Blog posts tagged with "${tag}"`}
            />
            <div data-theme="corporate">
                {/* Header */}
                <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/50">
                    <div className="container mx-auto px-4 max-w-6xl text-center">
                        <Link
                            href="/notes"
                            className="btn btn-outline btn-primary btn-sm mb-4"
                            aria-label="Back to all notes"
                        >
                            ← Back to Notes
                        </Link>
                        <h1 className="text-5xl font-bold mb-4">
                            Posts tagged with "{tag}"
                        </h1>
                        <p className="text-xl text-base-content/70">
                            Browse all blog posts related to {tag}
                        </p>
                    </div>
                </section>

                {/* Coming Soon */}
                <section className="py-20 bg-base-100">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body items-center text-center py-12">
                                <svg
                                    className="w-16 h-16 text-primary mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19.5 13c0 1.7-1 3-2.5 3-5.5V5c0-1.7-1-3-2.5-3-5.5c0-.375 0-.375.625-1.5 1.75M3.5 6.25V5.5c0 1.7-1 3-2.5 3-5.5c0-.375 0-.375.625-1.5 1.75"
                                    />
                                </svg>
                                <h2 className="text-2xl font-bold mb-2">
                                    Tag filtering coming soon
                                </h2>
                                <p className="text-base-content/70 mb-6">
                                    This feature is under development. In the meantime, you can browse{' '}
                                    <Link href="/notes" className="link link-primary">
                                        all notes
                                    </Link>
                                    .
                                </p>
                                <Link
                                    href="/notes"
                                    className="btn btn-primary"
                                    aria-label="Back to all notes"
                                >
                                    View All Notes
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    // get all unique tags from blog posts
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
    const siteConfig = await import('../../../data/config.json');

    return {
        props: {
            tag: params.tag,
            siteTitle: siteConfig.default.title,
        },
    };
}
