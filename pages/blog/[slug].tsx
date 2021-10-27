import Layout from 'components/Layout';
import glob from 'glob';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Prism from 'prismjs';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { FeedbackPopup } from 'usermatters-react';

export default function BlogTemplate({
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
            <article className="w-full max-w-5xl px-6 py-12 mx-auto">
                <div data-theme="dark" className="mb-12">
                    {frontmatter.hero_image && (
                        <div className="avatar">
                            <Image
                                width="1000"
                                height="200"
                                src={frontmatter.hero_image}
                                alt={`blog_hero_${frontmatter.title}`}
                                className="w-24 h-24 mb-8 rounded-btn"
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
                            <Image src="/avatar.jpg" width="48" height="48" />
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
                <div className="prose text-black lg:prose-xl">
                    <div data-theme="retro">
                        <ReactMarkdown remarkPlugins={[gfm]}>
                            {markdownBody}
                        </ReactMarkdown>
                    </div>
                    <hr className="mt-4" />
                    <div className="mt-2">
                        <FeedbackPopup project="r1AxH4JBSbo">
                            {({ handleClick }) => (
                                <button type="button" onClick={handleClick}>
                                    Feedback
                                </button>
                            )}
                        </FeedbackPopup>
                    </div>
                </div>
            </article>
        </Layout>
    );
}

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params;
    const content = await import(`../../posts/${slug}.md`);
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
    // get all .md files in the posts dir
    const blogs = glob.sync('posts/**/*.md');

    // remove path and extension to leave filename only
    const blogSlugs = blogs.map((file: string) =>
        file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim(),
    );

    // create paths with `slug` param
    const paths = blogSlugs.map((slug: string) => `/blog/${slug}`);
    return {
        paths,
        fallback: false,
    };
}
