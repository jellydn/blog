import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

import { Button } from 'components/Button';
import Layout from 'components/Layout';
import { RepoStars } from 'components/RepoStars';
import type { BlogPost, VideoPost } from 'lib/types';
import { dedupeBySlug } from 'lib/utils/array';
import dynamic from 'next/dynamic';
import reposData from '../data/repos.json';

const YoutubeSection = dynamic(() =>
    import('components/YoutubeSection').then((mod) => mod.YoutubeSection),
);
const NotesSection = dynamic(() =>
    import('components/NotesSection').then((mod) => mod.NotesSection),
);

// Prefetch script that runs before React hydrates
const PREFETCH_SCRIPT = `
(function() {
    try {
        Promise.all([
            fetch('/api/notes').then(function(r) { return r.ok ? r.json() : null; }),
            fetch('/api/youtube-videos').then(function(r) { return r.ok ? r.json() : null; })
        ]).then(function(results) {
            if (results[0]) window.__PREFETCHED_NOTES__ = results[0];
            if (results[1]) window.__PREFETCHED_VIDEOS__ = results[1];
        });
    } catch(e) {}
})();
`;

type IndexProps = {
    title: string;
    description: string;
    allBlogs: BlogPost[];
    allVideos: VideoPost[];
    repos: typeof reposData;
};

const socialLinks = [
    {
        name: 'Hire Me',
        url: 'https://www.upwork.com/freelancers/~01b1a6f7c757b5ec48',
        ariaLabel: 'Hire me on Upwork',
        primary: true,
    },
    {
        name: 'Email',
        url: 'mailto:dung@productsway.com',
        ariaLabel: 'Send me an email',
    },
    {
        name: 'GitHub',
        url: 'https://github.com/jellydn',
        ariaLabel: 'View my GitHub profile',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/jellydn',
        ariaLabel: 'View my Twitter profile',
    },
];

function getTopProjects(repos: typeof reposData, limit = 6) {
    const allRepos = repos.flatMap((category) => category.repos);
    return allRepos
        .filter((repo) => repo.stars > 0)
        .sort((a, b) => b.stars - a.stars)
        .slice(0, limit);
}

const Index = ({
    title,
    description,
    allBlogs,
    allVideos,
    repos,
}: IndexProps) => {
    const topProjects = getTopProjects(repos, 6);

    return (
        <Layout siteTitle={title} siteDescription={description}>
            <Head>
                {/* Prefetch API data before React hydrates for faster perceived load */}
                <script
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Inline script for performance, no user input
                    dangerouslySetInnerHTML={{ __html: PREFETCH_SCRIPT }}
                />
            </Head>
            <NextSeo
                title={title}
                description={description}
                canonical="https://productsway.com"
                openGraph={{
                    type: 'website',
                    url: 'https://productsway.com',
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
                <section className="hero min-h-[60vh] bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="hero-content text-center">
                        <div className="max-w-3xl">
                            <div className="avatar mb-6">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                                    <img
                                        src="/avatar.jpg"
                                        alt="Dung Huynh Duc"
                                    />
                                </div>
                            </div>
                            <h1 className="text-5xl font-bold">
                                Hi, I&apos;m{' '}
                                <span className="text-primary">
                                    Dung Huynh Duc
                                </span>
                            </h1>
                            <p className="py-6 text-xl text-base-content/70">
                                Senior Full Stack Software Engineer at ACX.
                                Building blockchain-based carbon exchange
                                platforms with TypeScript, Node.js, and React.
                            </p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                {socialLinks.map((social) => (
                                    <Button
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.ariaLabel}
                                    >
                                        {social.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-base-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="card bg-base-200 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-3xl mb-4">
                                    About Me
                                </h2>
                                <p className="text-lg leading-relaxed">
                                    With over 14 years of experience as a
                                    full-stack developer, I&apos;ve had the
                                    opportunity to spearhead project teams at
                                    tech startups in Vietnam, Thailand, Japan,
                                    and Singapore. Additionally, I have worked
                                    as a freelance engineer for various
                                    companies based in Asia Pacific, Europe, and
                                    North America.
                                </p>
                                <p className="text-lg leading-relaxed mt-4">
                                    Currently, I serve as a Senior Full Stack
                                    Software Engineer at ACX, where I focus on
                                    developing blockchain-based carbon exchange
                                    platforms and innovative solutions using
                                    TypeScript, Node.js, and React.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-base-200/50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">
                                    Featured Projects
                                </h2>
                                <p className="text-xl text-base-content/70">
                                    Open source projects and tools I&apos;ve
                                    created
                                </p>
                            </div>
                            <Button
                                href="https://github.com/jellydn?tab=repositories"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="View all my repositories on GitHub"
                            >
                                View All Projects
                            </Button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {topProjects.map((project) => (
                                <a
                                    key={project.name}
                                    href={project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                                >
                                    <div className="card-body">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="card-title text-xl font-semibold">
                                                {project.name}
                                            </h3>
                                            <div className="badge badge-primary gap-1">
                                                <RepoStars
                                                    stars={project.stars}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.language && (
                                                <span className="badge badge-ghost text-xs">
                                                    {project.language}
                                                </span>
                                            )}
                                            {project.topics
                                                ?.slice(0, 2)
                                                .map((topic) => (
                                                    <span
                                                        key={topic}
                                                        className="badge badge-outline text-xs"
                                                    >
                                                        {topic}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <YoutubeSection fallbackVideos={allVideos} />

                <NotesSection fallbackPosts={allBlogs} />

                <section className="py-20 bg-base-200 border-t border-base-300">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h2 className="text-4xl font-bold mb-4 text-base-content">
                            Let&apos;s Connect
                        </h2>
                        <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
                            Interested in collaborating or have a question?
                            Reach out through any of these platforms.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    variant={
                                        (social as { primary?: boolean })
                                            .primary
                                            ? 'primary'
                                            : 'outline'
                                    }
                                    aria-label={social.ariaLabel}
                                >
                                    {social.name}
                                </Button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Index;

export async function getStaticProps() {
    const siteConfig = await import('../data/config.json');

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
                frontmatter: document.data,
                slug,
            };
        });
        return data;
        // @ts-expect-error require.context is a webpack function
    })(require.context('../posts', true, /\.md$/));

    const videos = ((context) => {
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
                frontmatter: document.data,
                slug,
            };
        });
        return data;
        // @ts-expect-error require.context is a webpack function
    })(require.context('../videos', true, /\.md$/));

    return {
        props: {
            allBlogs: dedupeBySlug(posts as BlogPost[]).slice(0, 6),
            allVideos: dedupeBySlug(videos as VideoPost[]).slice(0, 6),
            title: siteConfig.default.title,
            description: siteConfig.default.description,
            repos: reposData,
            youtubeApiKey: !!process.env.YOUTUBE_API_KEY,
        },
    };
}
