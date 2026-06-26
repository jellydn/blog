import type { YouTubeVideo } from 'lib/types';

import { fetchUploadsPlaylistVideos, hasYoutubeEnv } from 'lib/youtube';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<YouTubeVideo[] | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!hasYoutubeEnv()) {
        return res.status(500).json({ error: 'YouTube API not configured' });
    }

    try {
        const videos = await fetchUploadsPlaylistVideos(6);

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=3600, stale-while-revalidate=3600',
        );
        res.status(200).json(videos);
    } catch {
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
}
