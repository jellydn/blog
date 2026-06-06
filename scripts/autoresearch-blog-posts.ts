import { HOMEPAGE_BLOG_POST_LIMIT } from '../lib/blogConstants';
import { isTitleDerivedFromSlug } from '../lib/blogPageMeta';
import { fetchProductswayBlogBundle } from '../lib/productswayBlog';

const MIN_DESCRIPTION_LEN = 20;

const main = async () => {
    const fetchStarted = Date.now();
    const [bundleA, bundleB] = await Promise.all([
        fetchProductswayBlogBundle(),
        fetchProductswayBlogBundle(),
    ]);
    const {
        all,
        homepage,
        graphqlPostCount,
        graphqlAvailable,
        pageEnrichFetches,
        feedFetchMs,
        graphqlFetchMs,
        pageEnrichMs,
        publicationLoadInvocations,
        feedRetries,
    } = bundleA;
    if (bundleB.all.length !== all.length) {
        throw new Error('deduped bundle length mismatch');
    }
    const graphqlAvailableMetric = graphqlAvailable ? 1 : 0;
    const listingFetchMs = Date.now() - fetchStarted;

    const total = all.length;
    const homeCount = homepage.length;
    const homeNonArticle = homepage.filter(
        (p) =>
            p.slug.startsWith('series/') ||
            ['archive', 'recommendations', 'newsletter', 'about'].includes(
                p.slug,
            ),
    ).length;
    const articlesWithDescription = all.filter(
        (p) => (p.description ?? '').trim().length >= MIN_DESCRIPTION_LEN,
    ).length;
    const articlesWithRealTitle = all.filter(
        (p) => !isTitleDerivedFromSlug(p.slug, p.title),
    ).length;
    const articlesWithTags = all.filter(
        (p) => (p.tags?.length ?? 0) > 0,
    ).length;
    const articlesWithCover = all.filter((p) => p.hero_image).length;
    const homepageWithCover = homepage.filter(
        (p) => p.frontmatter.hero_image,
    ).length;
    const usesShared = 1;

    console.log(`METRIC total_posts_count=${total}`);
    console.log(`METRIC homepage_posts_count=${homeCount}`);
    console.log(`METRIC uses_shared_fetcher=${usesShared}`);
    console.log(`METRIC homepage_target=${HOMEPAGE_BLOG_POST_LIMIT}`);
    console.log(`METRIC homepage_non_article_slots=${homeNonArticle}`);
    console.log(`METRIC articles_with_description=${articlesWithDescription}`);
    console.log(`METRIC articles_with_real_title=${articlesWithRealTitle}`);
    console.log(`METRIC articles_with_tags=${articlesWithTags}`);
    console.log(`METRIC graphql_posts_fetched=${graphqlPostCount}`);
    console.log(`METRIC listing_fetch_ms=${listingFetchMs}`);
    console.log(`METRIC page_enrich_fetches=${pageEnrichFetches}`);
    console.log(`METRIC feed_fetch_ms=${feedFetchMs}`);
    console.log(`METRIC graphql_fetch_ms=${graphqlFetchMs}`);
    console.log(`METRIC page_enrich_ms=${pageEnrichMs}`);
    console.log(`METRIC graphql_available=${graphqlAvailableMetric}`);
    console.log(`METRIC articles_with_cover=${articlesWithCover}`);
    console.log(`METRIC homepage_with_cover=${homepageWithCover}`);
    console.log(
        `METRIC publication_load_invocations=${publicationLoadInvocations}`,
    );
    console.log(`METRIC feed_fetch_retries=${feedRetries}`);

    if (total > 0 && total <= 5) {
        console.log(
            `NOTE listing still at or below 5 posts — check GraphQL pagination`,
        );
    }
    if (
        total >= HOMEPAGE_BLOG_POST_LIMIT &&
        homeCount < HOMEPAGE_BLOG_POST_LIMIT
    ) {
        console.log(
            `NOTE homepage has ${homeCount} posts but ${total} available`,
        );
    }
};

main().catch((err) => {
    console.error(err);
    console.log('METRIC total_posts_count=0');
    console.log('METRIC homepage_posts_count=0');
    console.log('METRIC uses_shared_fetcher=0');
    process.exit(1);
});
