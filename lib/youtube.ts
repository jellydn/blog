// YouTube Data API utility
// Set YOUTUBE_API_KEY in environment variables

export type YouTubeVideo = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
};

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID || 'UC5zpZbIHT3S2J9_6-SdG4vg';

export async function fetchLatestYouTubeVideos(maxResults = 6): Promise<YouTubeVideo[]> {
    if (!YOUTUBE_API_KEY) {
        console.warn('YOUTUBE_API_KEY not set, returning empty videos');
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

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            publishedAt: item.snippet.publishedAt,
        }));
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
        return [];
    }
}

// Fallback mock data for development without API key
export function getMockYouTubeVideos(): YouTubeVideo[] {
    return [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Sample Video Title',
            description: 'This is a sample video description for development.',
            thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            publishedAt: new Date().toISOString(),
        },
    ];
}
