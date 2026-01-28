import { client } from '../tina/__generated__/client';

import type { TinaPost, TinaVideo, TinaEdge } from 'lib/types';

export type { TinaEdge };

export async function fetchLatestPosts(limit = 6): Promise<TinaPost[]> {
    try {
        const response = await client.queries.postsConnection({
            first: limit,
            sort: 'date',
        });

        return response.data.postsConnection.edges.map((edge) => {
            const node = edge.node;
            return {
                _sys: { filename: node?._sys.filename ?? '' },
                title: node?.title ?? '',
                description: node?.description ?? '',
                date: node?.date ?? '',
                tag: node?.tag,
                hero_image: node?.hero_image,
            };
        });
    } catch {
        return [];
    }
}

export async function fetchLatestVideos(limit = 6): Promise<TinaVideo[]> {
    try {
        const response = await client.queries.videosConnection({
            first: limit,
            sort: 'date',
        });

        return response.data.videosConnection.edges.map((edge) => {
            const node = edge.node;
            return {
                _sys: { filename: node?._sys.filename ?? '' },
                title: node?.title ?? '',
                description: node?.description ?? '',
                date: node?.date ?? '',
                youtube_id: node?.youtube_id ?? '',
                tag: node?.tag,
                hero_image: node?.hero_image,
            };
        });
    } catch {
        return [];
    }
}
