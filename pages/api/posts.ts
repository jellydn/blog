import type { TinaPost } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TinaPost[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const publicationHost =
        process.env.HASHNODE_PUBLICATION_HOST ?? 'blog.productsway.com';

    const query = `
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

    try {
        const response = await fetch('https://gql.hashnode.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query,
                variables: {
                    host: publicationHost,
                    first: 6,
                },
            }),
        });

        if (!response.ok) {
            res.status(200).json([]);
            return;
        }

        const data = (await response.json()) as {
            data?: {
                publication?: {
                    posts?: {
                        edges?: Array<{
                            node?: {
                                title?: string;
                                brief?: string;
                                slug?: string;
                                publishedAt?: string;
                                coverImage?: { url?: string };
                                tags?: Array<{ name?: string }>;
                            };
                        }>;
                    };
                };
            };
            errors?: Array<{ message?: string }>;
        };

        if (data.errors && data.errors.length > 0) {
            console.error(
                'Hashnode API errors:',
                data.errors.map((error) => error.message).filter(Boolean),
            );
        }

        const edges = data.data?.publication?.posts?.edges ?? [];
        const posts: TinaPost[] = edges
            .map((edge) => ({
                _sys: { filename: edge.node?.slug ?? '' },
                title: edge.node?.title ?? '',
                description: edge.node?.brief ?? '',
                date: edge.node?.publishedAt ?? '',
                tag:
                    edge.node?.tags
                        ?.map((tag) => tag.name)
                        .filter((tag): tag is string => Boolean(tag)) ?? [],
                hero_image: edge.node?.coverImage?.url,
            }))
            .filter((post) => post._sys.filename);

        const getTimestamp = (date: string) => {
            const timestamp = Date.parse(date);
            return Number.isNaN(timestamp) ? 0 : timestamp;
        };

        const sortedPosts = posts.sort(
            (a, b) => getTimestamp(b.date) - getTimestamp(a.date),
        );

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=300, stale-while-revalidate=900',
        );
        res.status(200).json(sortedPosts);
    } catch {
        res.status(200).json([]);
    }
}
