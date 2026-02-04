import { fetchHashnodePosts, mapHashnodeSummaryToTinaPost } from 'lib/hashnode';
import type { TinaPost } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TinaPost[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const summaries = await fetchHashnodePosts(6);
        const sortedPosts: TinaPost[] = summaries
            .map((post) => mapHashnodeSummaryToTinaPost(post))
            .filter((post) => post._sys.filename);

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=300, stale-while-revalidate=900',
        );
        res.status(200).json(sortedPosts);
    } catch {
        res.status(200).json([]);
    }
}
