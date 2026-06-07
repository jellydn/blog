import { isBlogArticleSlug } from './blogArticleFilter';
import { HOMEPAGE_BLOG_POST_LIMIT } from './blogConstants';
import { enrichArticleSummariesFromPages } from './blogPageMeta';
import {
    fetchAllHashnodePosts,
    type HashnodePostSummary,
    isHashnodeGraphqlAvailable,
    mapHashnodeSummaryToBlogPost,
} from './hashnode';
import {
    type FeedFetchOptions,
    fetchHashnodePostsViaFeedWithStats,
} from './hashnodeFeedFallback';
import { mergeHashnodePostSummaries } from './mergePostSummaries';
import type { BlogPost } from './types';

export type ProductswayBlogListItem = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    hero_image: string | null;
};

let publicationLoadInFlight: ReturnType<typeof loadArticleListItems> | null =
    null;

let publicationLoadInvocationCount = 0;

const getPublishedTimestamp = (date?: string) => {
    const timestamp = Date.parse(date ?? '');
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

const toListItem = (post: BlogPost): ProductswayBlogListItem => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tag ?? [],
    hero_image: post.frontmatter.hero_image,
});

async function loadPublicationSummaries(
    feedOptions: FeedFetchOptions = {},
): Promise<{
    summaries: HashnodePostSummary[];
    graphqlCount: number;
    graphqlAvailable: boolean;
    feedFetchMs: number;
    graphqlFetchMs: number;
    feedRetries: number;
    sitemapUrlCount: number;
    rssItemCount: number;
    feedSource: string;
}> {
    const feedStart = Date.now();
    const [feedResult, graphqlAvailable] = await Promise.all([
        fetchHashnodePostsViaFeedWithStats(feedOptions),
        isHashnodeGraphqlAvailable(),
    ]);
    const fromFeed = feedResult.posts;
    const feedRetries = feedResult.feedRetries;
    const sitemapUrlCount = feedResult.sitemapUrlCount;
    const rssItemCount = feedResult.rssItemCount;
    const feedSource = feedResult.feedSource;
    const feedFetchMs = Date.now() - feedStart;

    let fromGraphql: HashnodePostSummary[] = [];
    let graphqlFetchMs = 0;

    if (graphqlAvailable) {
        const gqlStart = Date.now();
        fromGraphql = await fetchAllHashnodePosts();
        graphqlFetchMs = Date.now() - gqlStart;
    }

    if (fromGraphql.length === 0) {
        return {
            summaries: fromFeed,
            graphqlCount: 0,
            graphqlAvailable,
            feedFetchMs,
            graphqlFetchMs,
            feedRetries,
            sitemapUrlCount,
            rssItemCount,
            feedSource,
        };
    }

    return {
        summaries: mergeHashnodePostSummaries(fromFeed, fromGraphql),
        graphqlCount: fromGraphql.length,
        graphqlAvailable,
        feedFetchMs,
        graphqlFetchMs,
        feedRetries,
        sitemapUrlCount,
        rssItemCount,
        feedSource,
    };
}

async function loadArticleListItems(
    feedOptions: FeedFetchOptions = {},
): Promise<{
    items: ProductswayBlogListItem[];
    graphqlCount: number;
    graphqlAvailable: boolean;
    pageEnrichFetches: number;
    feedFetchMs: number;
    graphqlFetchMs: number;
    pageEnrichMs: number;
    publicationLoadInvocations: number;
    feedRetries: number;
    pageEnrichRetries: number;
    sitemapUrlCount: number;
    rssItemCount: number;
    feedSource: string;
}> {
    publicationLoadInvocationCount += 1;
    const {
        summaries: raw,
        graphqlCount,
        graphqlAvailable,
        feedFetchMs,
        graphqlFetchMs,
        feedRetries,
        sitemapUrlCount,
        rssItemCount,
        feedSource,
    } = await loadPublicationSummaries(feedOptions);
    const articles = raw.filter((s) => isBlogArticleSlug(s.slug ?? ''));
    const enrichStart = Date.now();
    const {
        posts: enriched,
        pageFetches,
        pageEnrichRetries,
    } = await enrichArticleSummariesFromPages(articles);
    const pageEnrichMs = Date.now() - enrichStart;
    const sortedEnriched = [...enriched].sort(
        (a, b) =>
            getPublishedTimestamp(b.publishedAt) -
            getPublishedTimestamp(a.publishedAt),
    );
    return {
        items: sortedEnriched.map((s) =>
            toListItem(mapHashnodeSummaryToBlogPost(s)),
        ),
        graphqlCount,
        graphqlAvailable,
        pageEnrichFetches: pageFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
        publicationLoadInvocations: publicationLoadInvocationCount,
        feedRetries,
        pageEnrichRetries,
        sitemapUrlCount,
        rssItemCount,
        feedSource,
    };
}

let sharedFeedOptions: FeedFetchOptions = {};

async function loadArticleListItemsShared(
    feedOptions?: FeedFetchOptions,
): Promise<Awaited<ReturnType<typeof loadArticleListItems>>> {
    const opts = feedOptions ?? sharedFeedOptions;
    if (publicationLoadInFlight) {
        return publicationLoadInFlight;
    }
    publicationLoadInFlight = loadArticleListItems(opts).finally(() => {
        publicationLoadInFlight = null;
    });
    return publicationLoadInFlight;
}

/** Benchmark: simulate Vercel when sitemap returns 429. */
export function setProductswayBlogFeedOptions(options: FeedFetchOptions): void {
    sharedFeedOptions = options;
}

const listItemsToHomepageBlogs = (
    items: ProductswayBlogListItem[],
): BlogPost[] =>
    items.slice(0, HOMEPAGE_BLOG_POST_LIMIT).map((item) => ({
        slug: item.slug,
        frontmatter: {
            title: item.title,
            description: item.description,
            date: item.date,
            tag: item.tags,
            hero_image: item.hero_image,
        },
    }));

/** All article posts from blog.productsway.com. */
export async function fetchProductswayBlogPosts(): Promise<
    ProductswayBlogListItem[]
> {
    const { items } = await loadArticleListItemsShared();
    return items;
}

/** Latest N posts for the homepage (one publication load). */
export async function fetchProductswayBlogPostsForHomepage(): Promise<
    BlogPost[]
> {
    const { items } = await loadArticleListItemsShared();
    return listItemsToHomepageBlogs(items);
}

/** Full list + homepage slice from a single publication fetch. */
export async function fetchProductswayBlogBundle(): Promise<{
    all: ProductswayBlogListItem[];
    homepage: BlogPost[];
    graphqlPostCount: number;
    graphqlAvailable: boolean;
    pageEnrichFetches: number;
    feedFetchMs: number;
    graphqlFetchMs: number;
    pageEnrichMs: number;
    publicationLoadInvocations: number;
    feedRetries: number;
    pageEnrichRetries: number;
    sitemapUrlCount: number;
    rssItemCount: number;
    feedSource: string;
}> {
    const {
        items: all,
        graphqlCount,
        graphqlAvailable,
        pageEnrichFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
        publicationLoadInvocations,
        feedRetries,
        pageEnrichRetries,
        sitemapUrlCount,
        rssItemCount,
        feedSource,
    } = await loadArticleListItemsShared();
    return {
        all,
        homepage: listItemsToHomepageBlogs(all),
        graphqlPostCount: graphqlCount,
        graphqlAvailable,
        pageEnrichFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
        publicationLoadInvocations,
        feedRetries,
        pageEnrichRetries,
        sitemapUrlCount,
        rssItemCount,
        feedSource,
    };
}
