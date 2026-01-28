import type { YouTubeVideo } from './types';

export type YouTubeApiItem = {
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium?: { url: string };
            default?: { url: string };
        };
        publishedAt: string;
        resourceId: { videoId: string };
    };
};

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

export async function fetchLatestYouTubeVideos(
    maxResults = 6,
): Promise<YouTubeVideo[]> {
    if (!YOUTUBE_API_KEY) {
        return [];
    }

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

        return data.items.map((item: YouTubeApiItem) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl:
                item.snippet.thumbnails.medium?.url ||
                item.snippet.thumbnails.default?.url,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch {
        return [];
    }
}
