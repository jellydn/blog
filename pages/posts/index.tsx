import Layout from 'components/Layout';
import { generateNextSeo } from 'next-seo/pages';

type PostsPageProps = {
    title: string;
    description: string;
};

const BLOG_URL = 'https://blog.productsway.com';

const PostsPage = ({ title, description }: PostsPageProps) => {
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

                <section className="py-8 bg-base-100">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <iframe
                            src={BLOG_URL}
                            className="w-full border-0 rounded-lg"
                            style={{
                                height: 'calc(100vh - 250px)',
                                minHeight: '600px',
                            }}
                            title="Blog Posts"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default PostsPage;

export async function getStaticProps() {
    const config = await import('../../data/config.json');

    return {
        props: {
            title: config.default.title,
            description: config.default.description,
        },
        revalidate: 300,
    };
}
