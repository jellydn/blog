import Layout from 'components/Layout';
import { AboutSection } from 'components/sections/AboutSection';
import { CliTuiSection } from 'components/sections/CliTuiSection';
import { ContactSection } from 'components/sections/ContactSection';
import { HeroSection } from 'components/sections/HeroSection';
import { NeovimSection } from 'components/sections/NeovimSection';
import { ProjectsSection } from 'components/sections/ProjectsSection';
import { VscodeSection } from 'components/sections/VscodeSection';
import { REVALIDATE_DAILY } from 'lib/constants';
import {
    getCliTuiTools,
    getNeovimPlugins,
    getTopProjects,
    getVscodeExtensions,
} from 'lib/repos';
import type { BlogPost, BlogPostSummary, VideoPost } from 'lib/types';
import {
    dedupeBySlug,
    extractSlug,
    parseMarkdown,
    sortByDate,
} from 'lib/utils/array';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { generateNextSeo } from 'next-seo/pages';
import blogPostsData from '../data/blog-posts.json';
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
    const additionalNames = [
        ...featuredNames,
        ...vscodeExtensions.map((repo) => repo.name),
        ...neovimPlugins.map((repo) => repo.name),
    ];
    const cliTuiTools = getCliTuiTools(repos, additionalNames).slice(0, 6);

    return (
        <Layout siteTitle={title} siteDescription={description}>
            <Head>
                {/* Prefetch API data before React hydrates for faster perceived load */}
                <Script id="prefetch-api-data" strategy="beforeInteractive">
                    {PREFETCH_SCRIPT}
                </Script>
            </Head>
            {generateNextSeo({
                title,
                description,
                canonical: 'https://productsway.com',
                openGraph: {
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
                },
                twitter: {
                    cardType: 'summary_large_image',
                },
            })}

            <div>
                <HeroSection />
                <AboutSection />
                <ProjectsSection projects={topProjects} />
                <VscodeSection extensions={vscodeExtensions} />
                <NeovimSection plugins={neovimPlugins} />
                <CliTuiSection tools={cliTuiTools} />

                <YoutubeSection fallbackVideos={allVideos} />

                <BlogPostsSection
                    fallbackPosts={allBlogs}
                    initialHasRemotePosts={initialHasRemotePosts}
                />

                <ContactSection />
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
    const videos = loadMarkdown(require.context('../videos', true, /\.md$/));

    // Blog posts come from data/blog-posts.json, kept fresh by CI
    // (see .github/workflows/fetch-blog-posts.yml)
    const allBlogs: BlogPost[] = (blogPostsData as BlogPostSummary[])
        .slice(0, 6)
        .map((p) => ({
            slug: p.slug,
            frontmatter: {
                title: p.title,
                description: p.description,
                date: p.date,
                tag: p.tags ?? [],
                hero_image: p.hero_image,
            },
        }));

    return {
        props: {
            allBlogs,
            allVideos: sortByDate(dedupeBySlug(videos as VideoPost[])).slice(
                0,
                6,
            ),
            title: siteConfig.default.title,
            description: siteConfig.default.description,
            repos: reposData,
            youtubeApiKey: !!process.env.YOUTUBE_API_KEY,
            initialHasRemotePosts: allBlogs.length > 0,
        },
        revalidate: REVALIDATE_DAILY,
    };
}
