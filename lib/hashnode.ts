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

const POSTS_QUERY = `
    query PublicationPosts($host: String!, $first: Int!) {
        publication(host: $host) {
            posts(first: $first) {
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

export async function fetchHashnodePosts(
    limit = 50,
): Promise<HashnodePostSummary[]> {
    try {
        const response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: POSTS_QUERY,
                variables: {
                    host: getPublicationHost(),
                    first: limit,
                },
            }),
        });

        if (!response.ok) {
            return [];
        }

        const data = (await response.json()) as HashnodePostsResponse;
        logErrors(data.errors);

        const edges = data.data?.publication?.posts?.edges ?? [];
        const posts = edges
            .map((edge) => edge.node)
            .filter(
                (node): node is HashnodePostSummary =>
                    Boolean(node?.slug) && Boolean(node?.title),
            );

        return posts.sort(
            (a, b) => getTimestamp(b.publishedAt) - getTimestamp(a.publishedAt),
        );
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
            headers: { 'Content-Type': 'application/json' },
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
        hero_image: post.coverImage?.url,
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
    hero_image: post.coverImage?.url,
});
