import type { BlogPostSummary, TinaPost } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import blogPostsData from '../../data/blog-posts.json';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TinaPost[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const posts: TinaPost[] = (blogPostsData as BlogPostSummary[]).map((p) => ({
        _sys: { filename: p.slug },
        title: p.title,
        description: p.description,
        date: p.date,
        tag: p.tags,
        hero_image: p.hero_image,
    }));

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=900',
    );
    res.status(200).json(posts);
}
