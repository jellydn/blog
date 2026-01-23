import Link from 'next/link';

import { Badge, getCategory, getCategoryLabel } from 'components/Badge';
import type { BlogPost } from 'components/BlogList';
import type { VideoPost } from 'components/VideoList';
import { formatDate } from 'lib/utils/date';

type NotesListProps = {
    items: (BlogPost | VideoPost)[];
    currentTag?: string;
};

function isVideoPost(post: BlogPost | VideoPost): post is VideoPost {
    return 'youtube_id' in post.frontmatter;
}

export function NotesList({ items, currentTag }: NotesListProps) {
    return (
        <ul className="space-y-4">
            {items.map((post) => {
                const isVideo = isVideoPost(post);
                const isTil = !isVideo && post.slug.startsWith('til-');

                return (
                    <li key={post.slug}>
                        <a
                            href={
                                isVideo
                                    ? `/video/${post.slug}`
                                    : `/notes/${post.slug}`
                            }
                            className="flex items-center gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors group"
                        >
                            <span className="text-sm text-base-content/60 whitespace-nowrap min-w-[100px]">
                                {formatDate(post.frontmatter.date)}
                            </span>
                            <div className="flex-1">
                                <span
                                    className={`font-semibold group-hover:text-primary transition-colors ${
                                        isTil ? 'text-base-content/80' : ''
                                    }`}
                                >
                                    {post.frontmatter.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={getCategory(post.slug)}>
                                    {getCategoryLabel(getCategory(post.slug))}
                                </Badge>
                                {post.frontmatter.tag
                                    ?.slice(0, 2)
                                    ?.map((t: string) => (
                                        <Link
                                            key={t}
                                            href={`/notes/tag/${t.toLowerCase()}`}
                                            className={
                                                currentTag &&
                                                t.toLowerCase() === currentTag
                                                    ? 'badge badge-primary'
                                                    : 'badge'
                                            }
                                            aria-label={`View posts tagged with ${t}`}
                                        >
                                            {t}
                                        </Link>
                                    ))}
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}
