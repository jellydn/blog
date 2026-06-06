/** Avoid 429 on blog.productsway.com sitemap/RSS (Vercel edge). */
export const BROWSER_USER_AGENT =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export const defaultBlogFetchHeaders = (): HeadersInit => ({
    'User-Agent': BROWSER_USER_AGENT,
});

export const hashnodeGraphqlHeaders = (): HeadersInit => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': BROWSER_USER_AGENT,
    Origin: 'https://hashnode.com',
    Referer: 'https://gql.hashnode.com/',
});
