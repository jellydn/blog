import type { NextApiRequest, NextApiResponse } from 'next';

import type { YouTubeVideo } from 'lib/types';
import type { YouTubeApiItem } from 'lib/youtube';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<YouTubeVideo[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    const maxResults = 6;
    const uploadsPlaylistId = `UU${CHANNEL_ID.replace(/^UC/, '')}`;
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('key', YOUTUBE_API_KEY);
    url.searchParams.set('playlistId', uploadsPlaylistId);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', maxResults.toString());

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }
        const data = await response.json();

        const videos: YouTubeVideo[] = data.items.map(
            (item: YouTubeApiItem) => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl:
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
                publishedAt: item.snippet.publishedAt,
            }),
        );

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=3600',
        );
        res.status(200).json(videos);
    } catch {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
}
