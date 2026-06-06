import { isBlogArticleSlug } from './blogArticleFilter';
import { HOMEPAGE_BLOG_POST_LIMIT } from './blogConstants';
import { enrichArticleSummariesFromPages } from './blogPageMeta';
import {
    fetchAllHashnodePosts,
    type HashnodePostSummary,
    isHashnodeGraphqlAvailable,
    mapHashnodeSummaryToBlogPost,
} from './hashnode';
import { fetchHashnodePostsViaFeed } from './hashnodeFeedFallback';
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

const toListItem = (post: BlogPost): ProductswayBlogListItem => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    tags: post.frontmatter.tag ?? [],
    hero_image: post.frontmatter.hero_image,
});

async function loadPublicationSummaries(): Promise<{
    summaries: HashnodePostSummary[];
    graphqlCount: number;
    feedFetchMs: number;
    graphqlFetchMs: number;
}> {
    const feedStart = Date.now();
    const fromFeed = await fetchHashnodePostsViaFeed();
    const feedFetchMs = Date.now() - feedStart;

    let fromGraphql: HashnodePostSummary[] = [];
    let graphqlFetchMs = 0;

    if (await isHashnodeGraphqlAvailable()) {
        const gqlStart = Date.now();
        fromGraphql = await fetchAllHashnodePosts();
        graphqlFetchMs = Date.now() - gqlStart;
    }

    if (fromGraphql.length === 0) {
        return {
            summaries: fromFeed,
            graphqlCount: 0,
            feedFetchMs,
            graphqlFetchMs,
        };
    }

    return {
        summaries: mergeHashnodePostSummaries(fromFeed, fromGraphql),
        graphqlCount: fromGraphql.length,
        feedFetchMs,
        graphqlFetchMs,
    };
}

async function loadArticleListItems(): Promise<{
    items: ProductswayBlogListItem[];
    graphqlCount: number;
    pageEnrichFetches: number;
    feedFetchMs: number;
    graphqlFetchMs: number;
    pageEnrichMs: number;
}> {
    const {
        summaries: raw,
        graphqlCount,
        feedFetchMs,
        graphqlFetchMs,
    } = await loadPublicationSummaries();
    const articles = raw.filter((s) => isBlogArticleSlug(s.slug ?? ''));
    const enrichStart = Date.now();
    const { posts: enriched, pageFetches } =
        await enrichArticleSummariesFromPages(articles);
    const pageEnrichMs = Date.now() - enrichStart;
    return {
        items: enriched.map((s) => toListItem(mapHashnodeSummaryToBlogPost(s))),
        graphqlCount,
        pageEnrichFetches: pageFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
    };
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
    const { items } = await loadArticleListItems();
    return items;
}

/** Latest N posts for the homepage (one publication load). */
export async function fetchProductswayBlogPostsForHomepage(): Promise<
    BlogPost[]
> {
    const { items } = await loadArticleListItems();
    return listItemsToHomepageBlogs(items);
}

/** Full list + homepage slice from a single publication fetch. */
export async function fetchProductswayBlogBundle(): Promise<{
    all: ProductswayBlogListItem[];
    homepage: BlogPost[];
    graphqlPostCount: number;
    pageEnrichFetches: number;
    feedFetchMs: number;
    graphqlFetchMs: number;
    pageEnrichMs: number;
}> {
    const {
        items: all,
        graphqlCount,
        pageEnrichFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
    } = await loadArticleListItems();
    return {
        all,
        homepage: listItemsToHomepageBlogs(all),
        graphqlPostCount: graphqlCount,
        pageEnrichFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
    };
}
