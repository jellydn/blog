import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../tina/__generated__/client';
import { Edge } from '../../lib/tina';
import type { TinaPost } from 'lib/types';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TinaPost[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await client.queries.postsConnection({
            first: 100,
            sort: 'date',
        });

        const posts: TinaPost[] = response.data.postsConnection.edges
            .map(
                (
                    edge: Edge<{
                        _sys: { filename: string };
                        title?: string;
                        description?: string;
                        date?: string;
                        tag?: string[];
                        hero_image?: string;
                    }>,
                ) => ({
                    _sys: { filename: edge.node?._sys.filename ?? '' },
                    title: edge.node?.title ?? '',
                    description: edge.node?.description ?? '',
                    date: edge.node?.date ?? '',
                    tag: edge.node?.tag,
                    hero_image: edge.node?.hero_image,
                }),
            )
            .reverse();

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=3600',
        );
        res.status(200).json(posts);
    } catch {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
}
