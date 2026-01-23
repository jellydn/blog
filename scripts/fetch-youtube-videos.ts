type VideoCategory =
    | 'tech'
    | 'tip'
    | 'talk'
    | 'ai'
    | 'blockchain'
    | 'neovim'
    | 'cli'
    | 'web'
    | 'react';

interface CategoryPattern {
    keywords: string[];
    category: VideoCategory;
    displayName: string;
}

const PLAYLIST_IDS: Partial<Record<VideoCategory, string>> = {
    neovim: 'PLOdXIcVPTyB-r-F1Kl2bD1xP7JLPSvFWr', // Learn Vim/Neovim with ITMan
    react: 'PLOdXIcVPTyB_xoFW_YQPp6tYig6gy-d8K', // ReactJS Series
    ai: 'PLOdXIcVPTyB-KSDL29A8zB-V9vLK5Qs76', // What's new in AI
    blockchain: 'PLOdXIcVPTyB-jyB4UmrwncHDK0mgl-Ex-', // Blockchain
    cli: 'PLOdXIcVPTyB9DkJv_jj2zVveFDDplVTT_', // Awesome CLI
    web: 'PLOdXIcVPTyB-15vbI_XamA7XFRU35fZ5_', // Web Development
    tech: 'PLOdXIcVPTyB8MYDBTNB1EKXm9NNFm6its', // 5 Minutes Tech Series
    tip: 'PLOdXIcVPTyB9xgtP2j6wqi9-bak1nprC3', // 5 Minutes Tip Series
    talk: 'PLOdXIcVPTyB_P1LwhDLYUmY6GizOkoSAW', // Chat with IT MAN
};

const CATEGORY_KEYWORDS: CategoryPattern[] = [
    {
        keywords: [
            'Neovim',
            'NeoVim',
            'Neovim ',
            ' nvim',
            '#nvim',
            '#Neovim',
            'vim',
        ],
        category: 'neovim',
        displayName: 'Neovim',
    },
    {
        keywords: ['React', 'Next.js', 'Nextjs', 'nextjs', '#react', '#React'],
        category: 'react',
        displayName: 'React',
    },
    {
        keywords: [
            'CLI',
            'cli ',
            'Command Line',
            'terminal',
            'Terminal',
            'shell',
        ],
        category: 'cli',
        displayName: 'CLI',
    },
    {
        keywords: [
            'Web3',
            'DApp',
            'Blockchain:',
            '[Blockchain]',
            '#blockchain',
            '#Blockchain',
            'crypto',
            'Crypto',
            'NFT',
            'Smart Contract',
        ],
        category: 'blockchain',
        displayName: 'Blockchain',
    },
    {
        keywords: [
            'AI:',
            '[AI]',
            '#ai',
            '#AI',
            'AI ',
            'Artificial',
            'Zed AI',
            'Local AI',
            'Llama',
            'GPT',
            'Copilot',
        ],
        category: 'ai',
        displayName: 'AI',
    },
    // General format categories (check these last)
    {
        keywords: ['Tech #', 'Tech:', '[Tech]', '#tech', 'TECH:'],
        category: 'tech',
        displayName: 'Tech',
    },
    {
        keywords: ['Tip #', 'Tip:', '[Tip]', '#tip', 'TIP:', 'Tips:', '[Tips]'],
        category: 'tip',
        displayName: 'Tip',
    },
    {
        keywords: ['Talk #', 'Talk:', '[Talk]', 'Chat', 'Talk & Chat'],
        category: 'talk',
        displayName: 'Talk and Chat with IT Man',
    },
    {
        keywords: ['Web:', '[Web]', '#web', 'Web ', 'HTML', 'CSS'],
        category: 'web',
        displayName: 'Web',
    },
];

const DEFAULT_CATEGORY: VideoCategory = 'talk';
const VIDEOS_PER_CATEGORY = 5;
const SORT_BY: 'views' | 'date' = 'views';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;
const LIST_PLAYLISTS = process.env.LIST_PLAYLISTS === 'true';

interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
    viewCount: number;
}

interface VideoWithTags extends YouTubeVideo {
    tags: string[];
}

interface CategorizedVideos {
    category: VideoCategory;
    displayName: string;
    videos: YouTubeVideo[];
}

async function fetchPaginated<T>(
    url: URL,
    extractor: (data: unknown) => T[],
): Promise<T[]> {
    const results: T[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
        if (nextPageToken) {
            url.searchParams.set('pageToken', nextPageToken);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();
        results.push(...extractor(data));
        nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return results;
}

async function fetchChannelPlaylists(): Promise<
    Array<{ id: string; title: string; itemCount: number }>
> {
    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
        throw new Error(
            'YOUTUBE_API_KEY and CHANNEL_ID environment variables are required',
        );
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
    url.searchParams.set('key', YOUTUBE_API_KEY);
    url.searchParams.set('channelId', CHANNEL_ID);
    url.searchParams.set('part', 'snippet,contentDetails');
    url.searchParams.set('maxResults', '50');

    return fetchPaginated(url, (data) =>
        (data as { items: unknown[] }).items.map((item: unknown) => {
            const i = item as {
                id: string;
                snippet: { title: string };
                contentDetails: { itemCount: number };
            };
            return {
                id: i.id,
                title: i.snippet.title,
                itemCount: i.contentDetails.itemCount,
            };
        }),
    );
}

async function fetchViewCounts(
    videoIds: string[],
): Promise<Map<string, number>> {
    if (videoIds.length === 0) return new Map();

    const statsUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
    statsUrl.searchParams.set('key', YOUTUBE_API_KEY);
    statsUrl.searchParams.set('part', 'statistics');
    statsUrl.searchParams.set('id', videoIds.join(','));

    const response = await fetch(statsUrl.toString());
    const statsData = (await response.json()) as {
        items?: Array<{ id: string; statistics: { viewCount: string } }>;
    };

    if (!statsData.items) return new Map();

    return new Map(
        statsData.items.map((item) => [
            item.id,
            Number.parseInt(item.statistics.viewCount, 10),
        ]),
    );
}

function extractVideoData(
    items: unknown[],
    viewCounts: Map<string, number>,
): YouTubeVideo[] {
    return items.map((item) => {
        const snippet = (item as { snippet: unknown }).snippet as {
            resourceId: { videoId: string };
            title: string;
            description: string;
            publishedAt: string;
            thumbnails: {
                medium?: { url: string };
                default?: { url: string };
            };
        };
        const videoId = snippet.resourceId.videoId;

        return {
            id: videoId,
            title: snippet.title,
            description: snippet.description,
            thumbnailUrl:
                snippet.thumbnails.medium?.url ||
                snippet.thumbnails.default?.url ||
                '',
            publishedAt: snippet.publishedAt,
            viewCount: viewCounts.get(videoId) || 0,
        };
    });
}

async function fetchVideosFromPlaylist(
    playlistId: string,
): Promise<YouTubeVideo[]> {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('key', YOUTUBE_API_KEY);
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', '50');

    const allItems: unknown[] = [];
    const videoIds: string[] = [];

    await fetchPaginated(url, (data) => {
        const items = (data as { items: unknown[] }).items;
        allItems.push(...items);
        videoIds.push(
            ...items.map(
                (item) =>
                    (
                        (item as { snippet: unknown }).snippet as {
                            resourceId: { videoId: string };
                        }
                    ).resourceId.videoId,
            ),
        );
        return [];
    });

    const viewCounts = await fetchViewCounts(videoIds);
    return extractVideoData(allItems, viewCounts);
}

async function fetchAllVideosFromChannel(): Promise<YouTubeVideo[]> {
    const playlistId = `UU${CHANNEL_ID?.replace(/^UC/, '')}`;
    console.log('Fetching all videos from channel uploads...\n');

    const videos = await fetchVideosFromPlaylist(playlistId);

    console.log(`\nTotal videos fetched: ${videos.length}\n`);
    return videos;
}

function categorizeVideoByKeywords(video: YouTubeVideo): VideoCategory | null {
    const title = video.title;
    const titleLower = title.toLowerCase();

    for (const { keywords, category } of CATEGORY_KEYWORDS) {
        for (const keyword of keywords) {
            if (
                title.includes(keyword) ||
                titleLower.includes(keyword.toLowerCase())
            ) {
                return category;
            }
        }
    }

    if (title.includes('IT Man') || titleLower.includes('it man')) {
        return DEFAULT_CATEGORY;
    }

    return null;
}

function getDisplayName(category: VideoCategory): string {
    const pattern = CATEGORY_KEYWORDS.find((p) => p.category === category);
    return pattern?.displayName || category;
}

async function fetchCategorizedVideos(): Promise<VideoWithTags[]> {
    const videoMap = new Map<
        string,
        { video: YouTubeVideo; tags: Set<string> }
    >();
    const playlistVideoIds = new Set<string>();

    console.log('=== Fetching from Playlists ===\n');
    for (const [category, playlistId] of Object.entries(PLAYLIST_IDS)) {
        if (!playlistId) continue;

        console.log(`Fetching ${category} playlist: ${playlistId}`);
        const videos = await fetchVideosFromPlaylist(playlistId);
        console.log(`Found ${videos.length} videos\n`);

        const displayName = getDisplayName(category as VideoCategory);

        for (const video of videos) {
            playlistVideoIds.add(video.id);
            const existing = videoMap.get(video.id);
            if (existing) {
                existing.tags.add(displayName);
            } else {
                videoMap.set(video.id, { video, tags: new Set([displayName]) });
            }
        }
    }

    console.log('=== Fetching Uncategorized Videos (Keyword Matching) ===\n');
    const allVideos = await fetchAllVideosFromChannel();

    let categorizedCount = 0;
    let uncategorizedCount = 0;

    for (const video of allVideos) {
        if (playlistVideoIds.has(video.id)) continue;

        const category = categorizeVideoByKeywords(video);
        if (category) {
            const displayName = getDisplayName(category);
            const existing = videoMap.get(video.id);
            if (existing) {
                existing.tags.add(displayName);
            } else {
                videoMap.set(video.id, { video, tags: new Set([displayName]) });
            }
            categorizedCount++;
        } else {
            uncategorizedCount++;
        }
    }

    console.log(
        `Categorized by keywords: ${categorizedCount}, Uncategorized: ${uncategorizedCount}\n`,
    );

    const videosWithTags: VideoWithTags[] = Array.from(videoMap.values()).map(
        ({ video, tags }) => ({
            ...video,
            tags: Array.from(tags).sort(),
        }),
    );

    videosWithTags.sort((a, b) => {
        if (SORT_BY === 'views') {
            return b.viewCount - a.viewCount;
        }
        return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );
    });

    const limited = videosWithTags.slice(0, VIDEOS_PER_CATEGORY * 10);

    console.log(`Total unique videos: ${limited.length}\n`);
    for (const v of limited.slice(0, 20)) {
        console.log(
            `  - ${v.title} (${v.viewCount.toLocaleString()} views) [${v.tags.join(', ')}]`,
        );
    }
    if (limited.length > 20) {
        console.log(`  ... and ${limited.length - 20} more\n`);
    } else {
        console.log('');
    }

    return limited;
}

function cleanTitle(title: string): string {
    // Remove "IT Man" prefix with various formats
    return title
        .replace(/^IT\s*Man\s*-\s*/i, '')
        .replace(/^ITMan\s*-\s*/i, '')
        .trim();
}

function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

function escapeYaml(str: string): string {
    return str.replace(/"/g, '\\"').replace(/'/g, "''").replace(/\n/g, ' ');
}

async function generateVideoPages(videos: VideoWithTags[]): Promise<void> {
    const VIDEO_DIR = './videos';
    const { promises: fs } = await import('node:fs');
    const path = await import('node:path');

    await fs.mkdir(VIDEO_DIR, { recursive: true }).catch(() => {});

    for (const video of videos) {
        const cleanTitleText = cleanTitle(video.title);
        const slug = slugify(cleanTitleText);
        const filename = path.join(VIDEO_DIR, `${slug}.md`);

        const frontmatter = {
            title: cleanTitleText,
            description: video.description.slice(0, 200),
            date: video.publishedAt.split('T')[0],
            youtube_id: video.id,
            tag: video.tags,
            hero_image: video.thumbnailUrl,
        };

        const content = `---
title: "${escapeYaml(frontmatter.title)}"
description: "${escapeYaml(frontmatter.description)}"
date: "${frontmatter.date}"
youtube_id: "${frontmatter.youtube_id}"
tag: ["${frontmatter.tag.join('", "')}"]
hero_image: "${frontmatter.hero_image}"
---

${video.description}
`;

        await fs.writeFile(filename, content);
    }

    console.log(`Generated ${videos.length} video pages in ${VIDEO_DIR}/`);
}

async function main() {
    try {
        console.log('=== YouTube Video Fetcher ===\n');
        console.log(
            `Sort by: ${SORT_BY === 'views' ? 'View Count' : 'Recent'}\n`,
        );

        if (LIST_PLAYLISTS) {
            const playlists = await fetchChannelPlaylists();
            console.log('\n=== Your Playlists ===\n');
            for (const playlist of playlists) {
                console.log(`${playlist.title} (${playlist.itemCount} videos)`);
                console.log(`  ID: ${playlist.id}\n`);
            }
            console.log(
                '\nAdd playlist IDs to PLAYLIST_IDS in fetch-youtube-videos.ts\n',
            );
            return;
        }

        const videos = await fetchCategorizedVideos();
        await generateVideoPages(videos);

        console.log('\n=== Summary ===');
        console.log(`Total videos: ${videos.length}`);

        const tagCounts = new Map<string, number>();
        for (const video of videos) {
            for (const tag of video.tags) {
                tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
            }
        }

        console.log('\nVideos by tag:');
        for (const [tag, count] of Array.from(tagCounts.entries()).sort(
            (a, b) => b[1] - a[1],
        )) {
            console.log(`  ${tag}: ${count}`);
        }
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
