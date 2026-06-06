import { fetchProductswayBlogBundle } from 'lib/productswayBlog';
import type { BlogPost, TinaPost } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TinaPost[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { homepage: blogs } = await fetchProductswayBlogBundle();
        const sortedPosts: TinaPost[] = blogs
            .map((post: BlogPost) => ({
                _sys: { filename: post.slug },
                title: post.frontmatter.title,
                description: post.frontmatter.description,
                date: post.frontmatter.date,
                tag: post.frontmatter.tag ?? [],
                hero_image: post.frontmatter.hero_image,
            }))
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
