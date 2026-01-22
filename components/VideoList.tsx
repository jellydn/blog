import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const YoutubeVideo = dynamic(() => import('./YoutubeVideo'), {
    loading: () => <div>Loading...</div>,
    ssr: false,
});

type VideoFrontmatter = {
    title: string;
    description: string;
    date: string;
    hero_image?: string;
    youtube_id: string;
    tag?: string[];
    author?: string;
};

type VideoPost = {
    slug: string;
    frontmatter: VideoFrontmatter;
};

function reformatDate(fullDate: string): string {
    const date = new Date(fullDate);
    return date.toDateString().slice(4);
}

const VideoList = ({ allVideos }: { allVideos: VideoPost[] }) => {
    return (
        <section className="py-24 px-4 mx-auto max-w-7xl">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
                Latest Videos
            </h2>
            <p className="mb-20 text-lg text-gray-500">
                My latest videos on web development and blockchain.
            </p>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2">
                {allVideos.map((post) => (
                    <div key={post.slug}>
                        {post.frontmatter.hero_image && (
                            <Link href={`/video/${post.slug}`}>
                                <Image
                                    width="50"
                                    height="30"
                                    src={post.frontmatter.hero_image}
                                    className="object-cover mb-5 w-full h-56 bg-center rounded"
                                    alt={post.frontmatter.title}
                                    loading="lazy"
                                />
                            </Link>
                        )}
                        <h2 className="mb-2 text-lg font-semibold text-gray-900">
                            <Link
                                href={`/video/${post.slug}`}
                                className="text-gray-900 hover:text-purple-700"
                            >
                                {post.frontmatter.title}
                            </Link>
                        </h2>
                        <YoutubeVideo
                            videoId={post.frontmatter.youtube_id}
                            title={post.frontmatter.title}
                        />
                        <p className="mb-3 text-sm font-normal text-gray-500">
                            {post.frontmatter.description}
                        </p>
                        <p className="mb-3 text-sm font-normal text-gray-500">
                            {reformatDate(post.frontmatter.date)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideoList;
export type { VideoPost, VideoFrontmatter };
