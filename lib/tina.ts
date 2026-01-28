import { client } from '../tina/__generated__/client';

import type { TinaPost, TinaVideo } from 'lib/types';

export interface TinaEdge<T> {
    node?: T;
}

export async function fetchLatestPosts(limit = 6): Promise<TinaPost[]> {
    try {
        const response = await client.queries.postsConnection({
            first: limit,
            sort: 'date',
        });

        return response.data.postsConnection.edges.map(
            (
                edge: TinaEdge<{
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
        );
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

        return response.data.videosConnection.edges.map(
            (
                edge: TinaEdge<{
                    _sys: { filename: string };
                    title?: string;
                    description?: string;
                    date?: string;
                    youtube_id?: string;
                    tag?: string[];
                    hero_image?: string;
                }>,
            ) => ({
                _sys: { filename: edge.node?._sys.filename ?? '' },
                title: edge.node?.title ?? '',
                description: edge.node?.description ?? '',
                date: edge.node?.date ?? '',
                youtube_id: edge.node?.youtube_id ?? '',
                tag: edge.node?.tag,
                hero_image: edge.node?.hero_image,
            }),
        );
    } catch {
        return [];
    }
}
