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

/**
 * Validates and returns required YouTube environment variables.
 * Throws if either is missing — use for server-side / API calls.
 */
export function requireYoutubeEnv(): { apiKey: string; channelId: string } {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.CHANNEL_ID;
    if (!apiKey) throw new Error('YOUTUBE_API_KEY is required');
    if (!channelId) throw new Error('CHANNEL_ID is required');
    return { apiKey, channelId };
}

/**
 * Checks if YouTube environment variables are configured.
 * Use this for client-friendly checks that return a boolean instead of throwing.
 */
export function hasYoutubeEnv(): boolean {
    return !!(process.env.YOUTUBE_API_KEY && process.env.CHANNEL_ID);
}

/**
 * Construct the uploads playlist ID from a YouTube channel ID.
 * Channel IDs start with "UC", the uploads playlist is "UU" + the rest.
 */
export function getUploadsPlaylistId(channelId: string): string {
    return `UU${channelId.replace(/^UC/, '')}`;
}

/**
 * Map a YouTube API playlistItems/search item to our YouTubeVideo type.
 */
export function mapSnippetToVideo(item: YouTubeApiItem): YouTubeVideo {
    return {
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
            item.snippet.thumbnails.medium?.url ||
            item.snippet.thumbnails.default?.url ||
            '',
        publishedAt: item.snippet.publishedAt,
    };
}

/**
 * Fetch recent videos from the channel's uploads playlist
 * using the YouTube playlistItems endpoint.
 */
export async function fetchUploadsPlaylistVideos(
    maxResults = 6,
): Promise<YouTubeVideo[]> {
    const { apiKey, channelId } = requireYoutubeEnv();
    const playlistId = getUploadsPlaylistId(channelId);

    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', String(maxResults));

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
    }
    const data = await response.json();
    return data.items.map(mapSnippetToVideo);
}
