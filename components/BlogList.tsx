import Image from 'next/image';
import Link from 'next/link';

import { reformatDate } from 'lib/utils/date';
import type { BlogPost } from 'lib/types';

const BlogList = ({ allBlogs }: { allBlogs: BlogPost[] }) => {
    return (
        <section className="py-24 px-4 mx-auto max-w-7xl">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-base-content">
                Latest Posts
            </h2>
            <p className="mb-20 text-lg text-base-content/60">
                An experimental blog for coder
            </p>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {allBlogs.map((post) => (
                    <div key={post.slug} id={post.slug}>
                        {post.frontmatter.hero_image && (
                            <Link href={`/blog/${post.slug}`}>
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
                        <h2 className="mb-2 text-lg font-semibold text-base-content">
                            <Link
                                href={`/blog/${post.slug}`}
                                className="text-base-content hover:text-current"
                            >
                                {post.frontmatter.title}
                            </Link>
                        </h2>
                        <p className="mb-3 text-sm font-normal text-base-content/60">
                            {post.frontmatter.description}
                        </p>
                        <p className="mb-3 text-sm font-normal text-base-content/60">
                            {reformatDate(post.frontmatter.date)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogList;
