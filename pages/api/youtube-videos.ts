// YouTube API route for fetching latest videos
import type { NextApiRequest, NextApiResponse } from 'next';

type YouTubeVideo = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
};

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
        return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const maxResults = 6;
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('key', YOUTUBE_API_KEY);
    url.searchParams.set('channelId', CHANNEL_ID);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('order', 'date');
    url.searchParams.set('maxResults', maxResults.toString());
    url.searchParams.set('type', 'video');

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }
        const data = await response.json();

        const videos: YouTubeVideo[] = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            publishedAt: item.snippet.publishedAt,
        }));

        // Cache for 1 hour
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600');
        res.status(200).json(videos);
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube videos' });
    }
}
