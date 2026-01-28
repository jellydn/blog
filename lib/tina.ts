import { client } from '../tina/__generated__/client';
import type { TinaPost, TinaVideo } from './types';

type Edge<T> = { node?: T };

export type { Edge };

export async function fetchLatestPosts(limit = 6): Promise<TinaPost[]> {
    try {
        const { data } = await client.queries.postsConnection({
            first: limit,
            sort: 'date',
        });

        return data.postsConnection.edges.map((edge) => {
            const node = edge.node;
            return {
                _sys: { filename: node?._sys.filename ?? '' },
                title: node?.title ?? '',
                description: node?.description ?? '',
                date: node?.date ?? '',
                tag: node?.tag,
                hero_image: node?.hero_image,
            } as TinaPost;
        });
    } catch {
        return [];
    }
}

export async function fetchLatestVideos(limit = 6): Promise<TinaVideo[]> {
    try {
        const { data } = await client.queries.videosConnection({
            first: limit,
            sort: 'date',
        });

        return data.videosConnection.edges.map((edge) => {
            const node = edge.node;
            return {
                _sys: { filename: node?._sys.filename ?? '' },
                title: node?.title ?? '',
                description: node?.description ?? '',
                date: node?.date ?? '',
                youtube_id: node?.youtube_id ?? '',
                tag: node?.tag,
                hero_image: node?.hero_image,
            } as TinaVideo;
        });
    } catch {
        return [];
    }
}
