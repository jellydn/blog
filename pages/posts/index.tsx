import Layout from 'components/Layout';
import { fetchProductswayBlogBundle } from 'lib/productswayBlog';
import { formatDate } from 'lib/utils/date';
import Image from 'next/image';
import { generateNextSeo } from 'next-seo/pages';

const BLOG_URL = 'https://blog.productsway.com';

type LocalPost = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    hero_image: string | null;
};

type PostsPageProps = {
    title: string;
    description: string;
    items: LocalPost[];
};

const PostsPage = ({ title, description, items }: PostsPageProps) => {
    return (
        <Layout siteTitle={title} siteDescription={description}>
            {generateNextSeo({
                title: 'Posts',
                description: 'Articles from ITMan blog.productsway.com',
                canonical: 'https://productsway.com/posts',
                openGraph: {
                    type: 'website',
                    url: 'https://productsway.com/posts',
                    title: 'Posts',
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
                            Posts
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70">
                            Articles from{' '}
                            <a
                                href="https://blog.productsway.com"
                                target="_blank"
                                rel="noreferrer"
                                className="link link-hover"
                            >
                                blog.productsway.com
                            </a>
                        </p>
                    </div>
                </section>

                <section className="py-16 bg-base-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        {items.length === 0 ? (
                            <p className="text-base-content/60">
                                No posts yet. Check back soon.
                            </p>
                        ) : (
                            <div className="grid gap-8 md:grid-cols-2">
                                {items.map((post) => (
                                    <article
                                        key={post.slug}
                                        className="card bg-base-200/50 border border-base-300"
                                    >
                                        {post.hero_image && (
                                            <figure className="relative aspect-video">
                                                <Image
                                                    src={post.hero_image}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(min-width: 768px) 50vw, 100vw"
                                                    className="object-cover"
                                                />
                                            </figure>
                                        )}
                                        <div className="card-body">
                                            <p className="text-sm text-base-content/60">
                                                {formatDate(post.date)}
                                            </p>
                                            <h2 className="card-title text-2xl">
                                                <a
                                                    href={`${BLOG_URL}/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    {post.title}
                                                </a>
                                            </h2>
                                            {post.description && (
                                                <p className="text-base-content/70 line-clamp-3">
                                                    {post.description}
                                                </p>
                                            )}
                                            {post.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags
                                                        .slice(0, 3)
                                                        .map((tag) => (
                                                            <span
                                                                key={tag}
                                                                className="badge badge-outline text-xs"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                </div>
                                            )}
                                            <div className="mt-2">
                                                <a
                                                    href={`${BLOG_URL}/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary btn-sm"
                                                >
                                                    Read on blog.productsway.com
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
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PostsPage;

export async function getStaticProps() {
    const config = await import('../../data/config.json');
    const { all: items } = await fetchProductswayBlogBundle();

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
            items,
        },
        revalidate: 300,
    };
}
