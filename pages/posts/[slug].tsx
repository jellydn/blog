import Layout from 'components/Layout';
import { generateNextSeo } from 'next-seo/pages';

const BLOG_URL = 'https://blog.productsway.com';

type PostPageProps = {
    siteTitle: string;
    siteDescription?: string;
    slug: string;
};

export default function PostPage({
    siteTitle,
    siteDescription,
    slug,
}: PostPageProps) {
    const postUrl = `${BLOG_URL}/${slug}`;

    return (
        <Layout siteTitle={siteTitle}>
            {generateNextSeo({
                title: `${slug} | ${siteTitle}`,
                description: siteDescription,
                canonical: postUrl,
                openGraph: {
                    type: 'article',
                    url: postUrl,
                    description: siteDescription,
                },
            })}

            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center p-8 max-w-lg">
                    <h1 className="text-2xl font-bold mb-4">
                        View on blog.productsway.com
                    </h1>
                    <p className="text-base-content/70 mb-6">
                        This post is hosted on our main blog platform.
                    </p>
                    <a
                        href={postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Open Post
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </a>
                    <div className="mt-4">
                        <a href="/posts" className="link link-hover text-sm">
                            ← Back to all posts
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

type StaticPropsContext = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: StaticPropsContext) {
    const { slug } = params;
    const config = await import('../../data/config.json');

    return {
        props: {
            siteTitle: config.default.title,
            siteDescription: config.default.description,
            slug,
        },
        revalidate: 300,
    };
}

export async function getStaticPaths() {
    const { globSync } = await import('glob');
    const fs = await import('node:fs');
    const path = await import('node:path');

    const postsDir = path.join(process.cwd(), 'posts');
    const files = globSync('**/*.md', { cwd: postsDir });

    const paths = files
        .filter((file: string) =>
            fs.statSync(path.join(postsDir, file)).isFile(),
        )
        .map((file: string) => ({
            params: { slug: file.replace(/\.[^/.]+$/, '') },
        }));

    return {
        paths,
        fallback: 'blocking',
    };
}
