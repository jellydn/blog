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

export default function VideoTemplate({
    frontmatter,
    siteDescription,
    markdownBody,
    siteTitle,
}: {
    frontmatter: Record<string, any>;
    markdownBody: string;
    siteDescription?: string;
    siteTitle: string;
}) {
    function reformatDate(fullDate: string | number | Date) {
        const date = new Date(fullDate);
        return date.toDateString();
    }

    // highlight text color
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <Layout siteTitle={siteTitle}>
            <NextSeo
                title={`${siteTitle} | ${frontmatter.title}`}
                description={siteDescription}
            />
            <article className="py-12 px-6 mx-auto w-full max-w-5xl">
                <div data-theme="dark" className="mb-12">
                    {frontmatter.hero_image && (
                        <div className="avatar">
                            <Image
                                width="1000"
                                height="200"
                                src={frontmatter.hero_image}
                                alt={`video_hero_${frontmatter.title}`}
                                className="mb-8 w-24 h-24 rounded-btn"
                            />
                        </div>
                    )}

                    {frontmatter.tag.map((tag: string) => (
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
                    <div>
                        <ReactMarkdown remarkPlugins={[gfm]}>
                            {markdownBody}
                        </ReactMarkdown>
                    </div>
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

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params;
    const content = await import(`../../videos/${slug}.md`);
    const config = await import(`../../data/config.json`);
    const data = matter(content.default);

    return {
        props: {
            siteTitle: config.title,
            siteDescription: config.description,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    };
}

export async function getStaticPaths() {
    // get all .md files in the videos dir
    const videos = globSync('videos/**/*.md');

    // remove path and extension to leave filename only
    const videoSlugs = videos.map((file: string) =>
        file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
    );

    // create paths with `slug` param
    const paths = videoSlugs.map((slug: string) => `/video/${slug}`);
    return {
        paths,
        fallback: false,
    };
}
