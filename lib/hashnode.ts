import { HASHNODE_POSTS_PAGE_SIZE } from './blogConstants';
import { hashnodeGraphqlHeaders } from './fetchHeaders';
import type { BlogPost, TinaPost } from './types';

export type HashnodePostSummary = {
    title?: string;
    brief?: string;
    slug?: string;
    publishedAt?: string;
    coverImage?: { url?: string };
    tags?: Array<{ name?: string }>;
};

export type HashnodePostDetail = HashnodePostSummary & {
    content?: {
        markdown?: string;
        html?: string;
    };
    author?: {
        name?: string;
    };
    readTimeInMinutes?: number;
};

type HashnodeGraphqlError = {
    message?: string;
};

type HashnodePostsResponse = {
    data?: {
        publication?: {
            posts?: {
                pageInfo?: {
                    hasNextPage?: boolean;
                    endCursor?: string | null;
                };
                edges?: Array<{ node?: HashnodePostSummary }>;
            };
        };
    };
    errors?: HashnodeGraphqlError[];
};

type HashnodePostResponse = {
    data?: {
        publication?: {
            post?: HashnodePostDetail | null;
            redirectedPost?: HashnodePostDetail | null;
        };
    };
    errors?: HashnodeGraphqlError[];
};

const HASHNODE_ENDPOINT = 'https://gql.hashnode.com';

let hashnodeGraphqlJsonAvailable: boolean | null = null;

/** Cached probe: true when gql.hashnode.com returns JSON (not HTML checkpoint). */
export async function isHashnodeGraphqlAvailable(): Promise<boolean> {
    if (hashnodeGraphqlJsonAvailable !== null) {
        return hashnodeGraphqlJsonAvailable;
    }

    try {
        const response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: hashnodeGraphqlHeaders(),
            body: JSON.stringify({
                query: POSTS_QUERY,
                variables: {
                    host: getPublicationHost(),
                    first: 1,
                    after: null,
                },
            }),
        });

        const contentType = response.headers.get('content-type') ?? '';
        hashnodeGraphqlJsonAvailable =
            response.ok && contentType.includes('json');
    } catch {
        hashnodeGraphqlJsonAvailable = false;
    }

    return hashnodeGraphqlJsonAvailable;
}

const POSTS_VIA_PAGE_QUERY = `
    query PublicationPostsViaPage($host: String!, $page: Int!, $pageSize: Int!) {
        publication(host: $host) {
            postsViaPage(page: $page, pageSize: $pageSize) {
                pageInfo {
                    hasNextPage
                    nextPage
                }
                nodes {
                    title
                    brief
                    slug
                    publishedAt
                    coverImage {
                        url
                    }
                    tags {
                        name
                    }
                }
            }
        }
    }
`;

const POSTS_QUERY = `
    query PublicationPosts($host: String!, $first: Int!, $after: String) {
        publication(host: $host) {
            posts(first: $first, after: $after) {
                pageInfo {
                    hasNextPage
                    endCursor
                }
                edges {
                    node {
                        title
                        brief
                        slug
                        publishedAt
                        coverImage {
                            url
                        }
                        tags {
                            name
                        }
                    }
                }
            }
        }
    }
`;

const POST_QUERY = `
    query PublicationPost($host: String!, $slug: String!) {
        publication(host: $host) {
            post(slug: $slug) {
                title
                brief
                slug
                publishedAt
                readTimeInMinutes
                author {
                    name
                }
                coverImage {
                    url
                }
                tags {
                    name
                }
                content {
                    markdown
                    html
                }
            }
            redirectedPost(slug: $slug) {
                title
                brief
                slug
                publishedAt
                readTimeInMinutes
                author {
                    name
                }
                coverImage {
                    url
                }
                tags {
                    name
                }
                content {
                    markdown
                    html
                }
            }
        }
    }
`;

const getPublicationHost = () =>
    process.env.HASHNODE_PUBLICATION_HOST ?? 'blog.productsway.com';

const logErrors = (errors?: HashnodeGraphqlError[]) => {
    if (!errors || errors.length === 0) return;
    console.error(
        'Hashnode API errors:',
        errors.map((error) => error.message).filter(Boolean),
    );
};

const getTimestamp = (date?: string) => {
    const timestamp = Date.parse(date ?? '');
    return Number.isNaN(timestamp) ? 0 : timestamp;
};

export const normalizeHashnodeMarkdown = (markdown: string): string =>
    markdown.replace(
        /!\[([^\]]*)\]\(([^)\s]+)\s+align=(["'])(left|center|right)\3\)/gi,
        '![$1]($2)',
    );

async function fetchHashnodePostsPage(
    first: number,
    after?: string | null,
): Promise<{
    posts: HashnodePostSummary[];
    hasNextPage: boolean;
    endCursor: string | null;
}> {
    const response = await fetch(HASHNODE_ENDPOINT, {
        method: 'POST',
        headers: hashnodeGraphqlHeaders(),
        body: JSON.stringify({
            query: POSTS_QUERY,
            variables: {
                host: getPublicationHost(),
                first,
                after: after ?? null,
            },
        }),
    });

    if (!response.ok) {
        return { posts: [], hasNextPage: false, endCursor: null };
    }

    const contentType = response.headers.get('content-type') ?? '';
    const raw = await response.text();
    if (!contentType.includes('json')) {
        return { posts: [], hasNextPage: false, endCursor: null };
    }

    let data: HashnodePostsResponse;
    try {
        data = JSON.parse(raw) as HashnodePostsResponse;
    } catch {
        return { posts: [], hasNextPage: false, endCursor: null };
    }
    logErrors(data.errors);

    const connection = data.data?.publication?.posts;
    const edges = connection?.edges ?? [];
    const posts = edges
        .map((edge) => edge.node)
        .filter(
            (node): node is HashnodePostSummary =>
                Boolean(node?.slug) && Boolean(node?.title),
        );

    return {
        posts,
        hasNextPage: Boolean(connection?.pageInfo?.hasNextPage),
        endCursor: connection?.pageInfo?.endCursor ?? null,
    };
}

export async function fetchHashnodePosts(
    limit = 50,
): Promise<HashnodePostSummary[]> {
    try {
        const page = await fetchHashnodePostsPage(limit);
        return page.posts
            .slice(0, limit)
            .sort(
                (a, b) =>
                    getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
            );
    } catch {
        return [];
    }
}

async function fetchAllHashnodePostsViaOffset(): Promise<
    HashnodePostSummary[]
> {
    const all: HashnodePostSummary[] = [];
    let page = 1;
    const pageSize = HASHNODE_POSTS_PAGE_SIZE;

    for (let guard = 0; guard < 50; guard++) {
        const response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: hashnodeGraphqlHeaders(),
            body: JSON.stringify({
                query: POSTS_VIA_PAGE_QUERY,
                variables: {
                    host: getPublicationHost(),
                    page,
                    pageSize,
                },
            }),
        });

        if (!response.ok) break;

        const contentType = response.headers.get('content-type') ?? '';
        const raw = await response.text();
        if (!contentType.includes('json')) break;

        type OffsetResponse = {
            data?: {
                publication?: {
                    postsViaPage?: {
                        pageInfo?: {
                            hasNextPage?: boolean;
                            nextPage?: number | null;
                        };
                        nodes?: HashnodePostSummary[];
                    };
                };
            };
            errors?: HashnodeGraphqlError[];
        };

        let data: OffsetResponse;
        try {
            data = JSON.parse(raw) as OffsetResponse;
        } catch {
            break;
        }
        logErrors(data.errors);

        const connection = data.data?.publication?.postsViaPage;
        const nodes = connection?.nodes ?? [];
        all.push(
            ...nodes.filter(
                (node): node is HashnodePostSummary =>
                    Boolean(node?.slug) && Boolean(node?.title),
            ),
        );

        if (!connection?.pageInfo?.hasNextPage) {
            break;
        }
        const next = connection.pageInfo.nextPage;
        if (next == null || next <= page) {
            break;
        }
        page = next;
    }

    return all;
}

/** Fetch every post from the configured Hashnode publication (paginated). */
export async function fetchAllHashnodePosts(): Promise<HashnodePostSummary[]> {
    try {
        if (!(await isHashnodeGraphqlAvailable())) {
            return [];
        }

        const all: HashnodePostSummary[] = [];
        let after: string | null = null;
        let guard = 0;

        while (guard < 50) {
            guard++;
            const page = await fetchHashnodePostsPage(
                HASHNODE_POSTS_PAGE_SIZE,
                after,
            );
            all.push(...page.posts);
            if (!page.hasNextPage || !page.endCursor) {
                break;
            }
            after = page.endCursor;
        }

        if (all.length > 0) {
            return all.sort(
                (a, b) =>
                    getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
            );
        }

        const viaOffset = await fetchAllHashnodePostsViaOffset();
        if (viaOffset.length > 0) {
            return viaOffset.sort(
                (a, b) =>
                    getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
            );
        }

        return [];
    } catch {
        return [];
    }
}

export async function fetchHashnodePostBySlug(
    slug: string,
): Promise<HashnodePostDetail | null> {
    try {
        const response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: hashnodeGraphqlHeaders(),
            body: JSON.stringify({
                query: POST_QUERY,
                variables: {
                    host: getPublicationHost(),
                    slug,
                },
            }),
        });

        if (!response.ok) {
            return null;
        }

        const data = (await response.json()) as HashnodePostResponse;
        logErrors(data.errors);
        const publication = data.data?.publication;
        return publication?.post ?? publication?.redirectedPost ?? null;
    } catch {
        return null;
    }
}

export const mapHashnodeSummaryToBlogPost = (
    post: HashnodePostSummary,
): BlogPost => ({
    slug: post.slug ?? '',
    frontmatter: {
        title: post.title ?? '',
        description: post.brief ?? '',
        date: post.publishedAt ?? '',
        tag:
            post.tags
                ?.map((tag) => tag.name)
                .filter((tag): tag is string => Boolean(tag)) ?? [],
        hero_image: post.coverImage?.url ?? null,
    },
});

export const mapHashnodeSummaryToTinaPost = (
    post: HashnodePostSummary,
): TinaPost => ({
    _sys: { filename: post.slug ?? '' },
    title: post.title ?? '',
    description: post.brief ?? '',
    date: post.publishedAt ?? '',
    tag:
        post.tags
            ?.map((tag) => tag.name)
            .filter((tag): tag is string => Boolean(tag)) ?? [],
    hero_image: post.coverImage?.url ?? null,
});
