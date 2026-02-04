import { Button } from 'components/Button';
import Layout from 'components/Layout';
import { RepoStars } from 'components/RepoStars';
import { fetchHashnodePosts, mapHashnodeSummaryToBlogPost } from 'lib/hashnode';
import type { BlogPost, VideoPost } from 'lib/types';
import { dedupeBySlug, extractSlug, parseMarkdown } from 'lib/utils/array';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import reposData from '../data/repos.json';

const YoutubeSection = dynamic(() =>
    import('components/YoutubeSection').then((mod) => mod.YoutubeSection),
);
const BlogPostsSection = dynamic(() =>
    import('components/BlogPostsSection').then((mod) => mod.BlogPostsSection),
);

// Prefetch script that runs before React hydrates
const PREFETCH_SCRIPT = `
(function() {
    try {
        fetch('/api/youtube-videos').then(function(r) { return r.ok ? r.json() : null; })
            .then(function(result) {
                if (result) window.__PREFETCHED_VIDEOS__ = result;
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
    initialHasRemotePosts: boolean;
};

type SocialLink = {
    name: string;
    url: string;
    ariaLabel: string;
    primary?: boolean;
};

const socialLinks: SocialLink[] = [
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
    const allRepos = repos.flatMap((category) => category.repos ?? []);
    return allRepos
        .filter((repo) => repo.stars > 0)
        .sort((a, b) => b.stars - a.stars)
        .slice(0, limit);
}

function getVscodeExtensions(
    repos: typeof reposData,
    excludeNames: string[] = [],
) {
    const category = repos.find((c) => c.category === 'VSCode Extensions');
    return (
        category?.repos?.filter((repo) => !excludeNames.includes(repo.name)) ??
        []
    );
}

function getNeovimPlugins(
    repos: typeof reposData,
    excludeNames: string[] = [],
) {
    const category = repos.find((c) => c.category === 'Neovim Plugins');
    return (
        category?.repos?.filter((repo) => !excludeNames.includes(repo.name)) ??
        []
    );
}

type ExtensionCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
};

function ExtensionCard({ name, description, url, stars }: ExtensionCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
            <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-xl font-semibold">{name}</h3>
                    <div className="badge badge-primary gap-1">
                        <RepoStars stars={stars} />
                    </div>
                </div>
                <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                    {description}
                </p>
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <title>VS Code</title>
                        <path d="M8 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H8z" />
                        <path d="M8 21h8a3 3 0 003-3V6.75a3 3 0 00-3-3H8a3 3 0 00-3 3V18a3 3 0 003 3z" />
                    </svg>
                    <span className="badge badge-outline text-xs">VS Code</span>
                </div>
            </div>
        </a>
    );
}

type NvimPluginCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
    topics: string[];
};

function NvimPluginCard({
    name,
    description,
    url,
    stars,
    topics,
}: NvimPluginCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group relative bg-base-200/50 rounded-xl p-4 border border-base-300 hover:border-primary/50 transition-all hover:bg-base-200"
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-primary"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <title>Neovim plugin</title>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-base-content/60 shrink-0">
                    <svg
                        className="w-3.5 h-3.5 text-yellow-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <title>Stars</title>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {stars}
                </span>
            </div>
            <p className="text-sm text-base-content/70 line-clamp-2">
                {description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2 py-0.5 text-xs rounded-md bg-secondary/20 text-secondary">
                    Lua
                </span>
                {topics.slice(0, 2).map((topic) => (
                    <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-md bg-base-300/50 text-base-content/60"
                    >
                        {topic}
                    </span>
                ))}
            </div>
        </a>
    );
}

const Index = ({
    title,
    description,
    allBlogs,
    allVideos,
    repos,
    initialHasRemotePosts,
}: IndexProps) => {
    const topProjects = getTopProjects(repos, 6);
    const featuredNames = topProjects.map((p) => p.name);
    const vscodeExtensions = getVscodeExtensions(repos, featuredNames).slice(
        0,
        6,
    );
    const neovimPlugins = getNeovimPlugins(repos, featuredNames).slice(0, 9);

    return (
        <Layout siteTitle={title} siteDescription={description}>
            <Head>
                {/* Prefetch API data before React hydrates for faster perceived load */}
                <Script id="prefetch-api-data" strategy="beforeInteractive">
                    {PREFETCH_SCRIPT}
                </Script>
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

                {vscodeExtensions.length > 0 && (
                    <section className="py-20 bg-base-200/50 border-t border-base-300">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        VS Code Extensions
                                    </h2>
                                    <p className="text-xl text-base-content/70">
                                        Tools I&apos;ve built to improve
                                        developer experience
                                    </p>
                                </div>
                                <Button
                                    href="https://marketplace.visualstudio.com/publishers/jellydn"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="View all my VS Code extensions"
                                >
                                    View All Extensions
                                </Button>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {vscodeExtensions.map((ext) => (
                                    <ExtensionCard
                                        key={ext.name}
                                        name={ext.name}
                                        description={ext.description}
                                        url={ext.url}
                                        stars={ext.stars}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {neovimPlugins.length > 0 && (
                    <section className="py-20 bg-base-100 border-t border-base-300">
                        <div className="container mx-auto px-4 max-w-6xl">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        Neovim Plugins
                                    </h2>
                                    <p className="text-xl text-base-content/70">
                                        Lua plugins to supercharge your Neovim
                                        workflow
                                    </p>
                                </div>
                                <Button
                                    href="https://github.com/jellydn?tab=repositories&q=nvim"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="View all my Neovim plugins"
                                >
                                    View All Plugins
                                </Button>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {neovimPlugins.map((plugin) => (
                                    <NvimPluginCard
                                        key={plugin.name}
                                        name={plugin.name}
                                        description={plugin.description}
                                        url={plugin.url}
                                        stars={plugin.stars}
                                        topics={plugin.topics}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <YoutubeSection fallbackVideos={allVideos} />

                <BlogPostsSection
                    fallbackPosts={allBlogs}
                    initialHasRemotePosts={initialHasRemotePosts}
                />

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
                                        social.primary ? 'primary' : 'outline'
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

    const loadMarkdown = (context: {
        keys(): string[];
        (key: string): { default: string };
    }) =>
        context.keys().map((key: string) => {
            const slug = extractSlug(key);
            return parseMarkdown(context(key).default, slug);
        });
    // @ts-expect-error require.context is a webpack function
    const posts = loadMarkdown(require.context('../posts', true, /\.md$/));
    // @ts-expect-error require.context is a webpack function
    const videos = loadMarkdown(require.context('../videos', true, /\.md$/));

    const hashnodeSummaries = await fetchHashnodePosts(6);
    const hashnodePosts = hashnodeSummaries.map((post) =>
        mapHashnodeSummaryToBlogPost(post),
    );
    const localPosts = dedupeBySlug(posts as BlogPost[]).slice(0, 6);
    const allBlogs = hashnodePosts.length > 0 ? hashnodePosts : localPosts;

    return {
        props: {
            allBlogs,
            allVideos: dedupeBySlug(videos as VideoPost[]).slice(0, 6),
            title: siteConfig.default.title,
            description: siteConfig.default.description,
            repos: reposData,
            youtubeApiKey: !!process.env.YOUTUBE_API_KEY,
            initialHasRemotePosts: hashnodePosts.length > 0,
        },
        revalidate: 300,
    };
}
