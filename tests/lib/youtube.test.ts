import { describe, expect, it } from 'vitest';
import {
    getUploadsPlaylistId,
    hasYoutubeEnv,
    mapSnippetToVideo,
} from '../../lib/youtube';

describe('getUploadsPlaylistId', () => {
    it('converts UC channel ID to UU playlist ID', () => {
        expect(getUploadsPlaylistId('UCabc123')).toBe('UUabc123');
    });

    it('handles channel IDs without UC prefix', () => {
        expect(getUploadsPlaylistId('abc123')).toBe('UUabc123');
    });

    it('handles empty string', () => {
        expect(getUploadsPlaylistId('')).toBe('UU');
    });

    it('handles long channel IDs', () => {
        const channelId = 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
        expect(getUploadsPlaylistId(channelId)).toBe(
            'UU_x5XG1OV2P6uZZ5FSM9Ttw',
        );
    });
});

describe('mapSnippetToVideo', () => {
    it('maps a YouTube API item to a YouTubeVideo', () => {
        const item = {
            snippet: {
                title: 'Test Video',
                description: 'A test video description',
                thumbnails: {
                    medium: { url: 'https://example.com/medium.jpg' },
                    default: { url: 'https://example.com/default.jpg' },
                },
                publishedAt: '2024-03-15T10:00:00Z',
                resourceId: { videoId: 'abc123' },
            },
        };

        const result = mapSnippetToVideo(item);

        expect(result).toEqual({
            id: 'abc123',
            title: 'Test Video',
            description: 'A test video description',
            thumbnailUrl: 'https://example.com/medium.jpg',
            publishedAt: '2024-03-15T10:00:00Z',
        });
    });

    it('falls back to default thumbnail when medium is missing', () => {
        const item = {
            snippet: {
                title: 'Test',
                description: 'Desc',
                thumbnails: {
                    default: { url: 'https://example.com/default.jpg' },
                },
                publishedAt: '2024-01-01T00:00:00Z',
                resourceId: { videoId: 'xyz' },
            },
        };

        const result = mapSnippetToVideo(item);
        expect(result.thumbnailUrl).toBe('https://example.com/default.jpg');
    });

    it('uses empty string when no thumbnails are available', () => {
        const item = {
            snippet: {
                title: 'Test',
                description: 'Desc',
                thumbnails: {},
                publishedAt: '2024-01-01T00:00:00Z',
                resourceId: { videoId: 'xyz' },
            },
        };

        const result = mapSnippetToVideo(item);
        expect(result.thumbnailUrl).toBe('');
    });
});

describe('hasYoutubeEnv', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('returns true when both env vars are set', () => {
        process.env.YOUTUBE_API_KEY = 'test-key';
        process.env.CHANNEL_ID = 'test-channel';
        expect(hasYoutubeEnv()).toBe(true);
    });

    it('returns false when YOUTUBE_API_KEY is missing', () => {
        process.env.YOUTUBE_API_KEY = '';
        process.env.CHANNEL_ID = 'test-channel';
        expect(hasYoutubeEnv()).toBe(false);
    });

    it('returns false when CHANNEL_ID is missing', () => {
        process.env.YOUTUBE_API_KEY = 'test-key';
        process.env.CHANNEL_ID = '';
        expect(hasYoutubeEnv()).toBe(false);
    });

    it('returns false when both env vars are missing', () => {
        process.env.YOUTUBE_API_KEY = '';
        process.env.CHANNEL_ID = '';
        expect(hasYoutubeEnv()).toBe(false);
    });
});
