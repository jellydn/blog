'use client';

import { useEffect, useState } from 'react';

import type { VideoPost, YouTubeVideo } from 'lib/types';
import { reformatDateShort } from 'lib/utils/date';

type YoutubeSectionProps = {
    fallbackVideos: VideoPost[];
};

export function YoutubeSection({ fallbackVideos }: YoutubeSectionProps) {
    const [videos, setVideos] = useState<YouTubeVideo[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await fetch('/api/youtube-videos');
                if (res.ok) {
                    const data = await res.json();
                    setVideos(data);
                }
            } catch (error) {
                console.error('Failed to fetch YouTube videos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">
                                Latest Videos
                            </h2>
                            <p className="text-xl text-base-content/70">
                                Loading...
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {fallbackVideos.slice(0, 6).map((video) => (
                            <div
                                key={video.slug}
                                className="card bg-base-200 shadow-xl"
                            >
                                <div className="card-body">
                                    <p className="text-sm text-base-content/70">
                                        Loading videos...
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Use YouTube API data if available, otherwise fallback
    const displayVideos =
        videos && videos.length > 0
            ? videos.map((v) => ({
                  slug: v.id,
                  frontmatter: {
                      title: v.title,
                      description: v.description,
                      date: v.publishedAt,
                      hero_image: v.thumbnailUrl,
                      youtube_id: v.id,
                  },
              }))
            : fallbackVideos;

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">
                            Latest Videos
                        </h2>
                        <p className="text-xl text-base-content/70">
                            {videos && videos.length > 0
                                ? 'Fresh from IT Man Channel'
                                : 'From IT Man Channel'}
                        </p>
                    </div>
                    <a
                        href="https://www.youtube.com/c/ITManVietnam"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                    >
                        Subscribe on YouTube
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayVideos.map((video) => (
                        <a
                            key={video.slug}
                            href={`https://www.youtube.com/watch?v=${video.frontmatter.youtube_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group"
                        >
                            <figure className="aspect-video relative">
                                <img
                                    src={
                                        video.frontmatter.hero_image ||
                                        `https://i.ytimg.com/vi/${video.frontmatter.youtube_id}/mqdefault.jpg`
                                    }
                                    alt={video.frontmatter.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                    <svg
                                        className="w-12 h-12 text-white opacity-80"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </figure>
                            <div className="card-body">
                                <h3 className="card-title text-lg line-clamp-2">
                                    {video.frontmatter.title}
                                </h3>
                                <p className="text-sm text-base-content/70">
                                    {reformatDateShort(video.frontmatter.date)}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
