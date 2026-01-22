// YouTube API route for fetching latest videos
import type { NextApiRequest, NextApiResponse } from 'next';

type YouTubeVideo = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
};

interface YouTubePlaylistItem {
    snippet: {
        title: string;
        description: string;
        publishedAt: string;
        thumbnails: {
            medium?: { url: string };
            default?: { url: string };
        };
        resourceId: {
            videoId: string;
        };
    };
}

interface YouTubeApiResponse {
    items: YouTubePlaylistItem[];
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID || 'UC5zpZbIHT3S2J9_6-SdG4vg';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<YouTubeVideo[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!YOUTUBE_API_KEY) {
        return res
            .status(500)
            .json({ error: 'YouTube API key not configured' });
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

        const videos: YouTubeVideo[] = (data as YouTubeApiResponse).items.map(
            (item: YouTubePlaylistItem) => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl:
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
                publishedAt: item.snippet.publishedAt,
            }),
        );

        // Cache for 1 hour
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=3600',
        );
        res.status(200).json(videos);
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube videos' });
    }
}
