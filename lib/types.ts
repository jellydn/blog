export type TinaPost = {
    _sys: {
        filename: string;
    };
    title: string;
    description: string;
    date: string;
    author?: string;
    tag?: string[];
    hero_image?: string | null;
};

export type TinaVideo = {
    _sys: {
        filename: string;
    };
    title: string;
    description: string;
    date: string;
    youtube_id: string;
    tag?: string[];
    hero_image?: string | null;
};

export type BlogPost = {
    slug: string;
    frontmatter: {
        title: string;
        description: string;
        date: string;
        author?: string;
        tag?: string[];
        hero_image?: string | null;
    };
};

export type VideoFrontmatter = {
    title: string;
    description: string;
    date: string;
    hero_image?: string | null;
    youtube_id: string;
    tag?: string[];
    author?: string;
};

export type VideoPost = {
    slug: string;
    frontmatter: VideoFrontmatter;
};

export type BlogPostSummary = {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    hero_image: string | null;
};

export type YouTubeVideo = {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
};
