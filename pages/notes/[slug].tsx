import Giscus from '@giscus/react';
import { globSync } from 'glob';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Prism from 'prismjs';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import Link from 'next/link';

import { Badge } from 'components/Badge';
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
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function isTil(slug: string): boolean {
    return slug.startsWith('til-');
}

export default function BlogTemplate({
    frontmatter,
    siteDescription,
    markdownBody,
    siteTitle,
    slug,
}: BlogTemplateProps) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const canonicalUrl = `https://productsway.com/notes/${slug}`;
    const ogImage =
        frontmatter.hero_image ?? 'https://productsway.com/og-image.png';
    const til = isTil(slug);

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

            <div data-theme="corporate" className="min-h-screen">
                {/* Navigation */}
                <nav className="border-b border-base-300">
                    <div className="container mx-auto px-4 py-4 max-w-4xl">
                        <Link
                            href="/notes"
                            className="inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary transition-colors"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </nav>

                {/* Article Header */}
                <header className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="flex items-center gap-3 mb-4">
                        {til && <Badge variant="til">TIL</Badge>}
                        {frontmatter.tag?.map((tag: string) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        {frontmatter.title}
                    </h1>
                    <p className="text-base-content/60">
                        {reformatDate(frontmatter.date)}
                        {frontmatter.author && ` · ${frontmatter.author}`}
                    </p>
                </header>

                {/* Article Content */}
                <article className="container mx-auto px-4 pb-16 max-w-4xl">
                    <div className="prose prose-slate max-w-none">
                        <ReactMarkdown remarkPlugins={[gfm]}>
                            {markdownBody}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* Comments */}
                <div className="border-t border-base-300">
                    <div className="container mx-auto px-4 py-12 max-w-4xl">
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
    const blogs = globSync('posts/**/*.md');

    const blogSlugs = blogs.map((file: string) =>
        file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
    );

    const paths = blogSlugs.map((slug: string) => ({
        params: { slug },
    }));

    return {
        paths,
        fallback: false,
    };
}
