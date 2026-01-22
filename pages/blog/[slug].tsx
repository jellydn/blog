import Giscus from '@giscus/react';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Prism from 'prismjs';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Image from 'next/image';

import Layout from 'components/Layout';

type BlogFrontmatter = {
    title: string;
    description?: string;
    date: string;
    author?: string;
    tag?: string[];
    hero_image?: string;
};

type BlogTemplateProps = {
    frontmatter: BlogFrontmatter;
    markdownBody: string;
    siteDescription?: string;
    siteTitle: string;
    slug: string;
};

function reformatDate(fullDate: string | number | Date): string {
    const date = new Date(fullDate);
    return date.toDateString();
}

export default function BlogTemplate({
    frontmatter,
    siteDescription,
    markdownBody,
    siteTitle,
    slug,
}: BlogTemplateProps) {
    // highlight text color
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const canonicalUrl = `https://productsway.com/blog/${slug}`;
    const ogImage =
        frontmatter.hero_image ?? 'https://productsway.com/og-image.png';

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${frontmatter.title} | ${siteTitle}`}
                description={frontmatter.description ?? siteDescription}
                canonical={canonicalUrl}
                openGraph={{
                    type: 'article',
                    url: canonicalUrl,
                    title: frontmatter.title,
                    description: frontmatter.description ?? siteDescription,
                    images: [
                        {
                            url: ogImage,
                            alt: frontmatter.title,
                        },
                    ],
                    article: {
                        publishedTime: frontmatter.date,
                        authors: [frontmatter.author ?? 'Dung Huynh Duc'],
                        tags: frontmatter.tag ?? [],
                    },
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <article className="py-12 px-6 mx-auto w-full max-w-5xl">
                {frontmatter.tag?.map((tag: string) => (
                    <div key={tag} className="badge badge-primary">
                        {tag}
                    </div>
                ))}
                <h1
                    className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
                    itemProp="headline"
                    title={frontmatter.title}
                >
                    {frontmatter.title}
                </h1>

                {frontmatter.hero_image && (
                    <div className="avatar">
                        <Image
                            width="1000"
                            height="200"
                            src={frontmatter.hero_image}
                            alt={`blog_hero_${frontmatter.title}`}
                            className="mb-8 w-24 h-24 rounded-btn"
                        />
                    </div>
                )}
                <div className="mb-2">
                    <a
                        className="flex items-center text-gray-700"
                        href="https://github.com/jellydn"
                    >
                        <div className="avatar">
                            <Image
                                src="/avatar.jpg"
                                width="48"
                                height="48"
                                alt="avatar"
                            />
                        </div>
                        <div className="ml-2">
                            <p className="text-sm font-semibold text-gray-800">
                                {frontmatter.author}
                            </p>
                            <p className="text-sm text-gray-500">
                                {reformatDate(frontmatter.date)}
                            </p>
                        </div>
                    </a>
                </div>
                <div className="text-black prose lg:prose-xl">
                    <ReactMarkdown remarkPlugins={[gfm]}>
                        {markdownBody}
                    </ReactMarkdown>
                    <hr className="mt-4" />
                </div>
                <Giscus
                    id="comments"
                    repo="jellydn/blog"
                    repoId="MDEwOlJlcG9zaXRvcnkyODM1MjQ3NTE="
                    category="Ideas"
                    categoryId="DIC_kwDOEOY-j84CQqDK"
                    mapping="specific"
                    term={frontmatter.title}
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme="light"
                    lang="en"
                    loading="lazy"
                />
            </article>
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
    const content = await import(`../../posts/${slug}.md`);
    const config = await import('../../data/config.json');
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.default.title,
            siteDescription: config.default.description,
            frontmatter: data.data,
            markdownBody: data.content,
            slug,
        },
    };
}

export async function getStaticPaths() {
    // get all .md files in the posts dir
    const blogs = globSync('posts/**/*.md');

    // remove path and extension to leave filename only
    const blogSlugs = blogs.map((file: string) =>
        file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
    );

    // create paths with `slug` param
    const paths = blogSlugs.map((slug: string) => ({
        params: { slug },
    }));
    return {
        paths,
        fallback: false,
    };
}
