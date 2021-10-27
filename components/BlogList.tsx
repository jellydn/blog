import Image from 'next/image';
import Link from 'next/link';

const BlogList = ({ allBlogs }: { allBlogs: any }) => {
    function reformatDate(fullDate) {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    }

    return (
        <section className="px-4 py-24 mx-auto max-w-7xl">
            <h2 className="mb-2 text-3xl font-extrabold leading-tight text-gray-900">
                Latest Posts
            </h2>
            <p className="mb-20 text-lg text-gray-500">
                An experimental blog for coder
            </p>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {allBlogs.map((post) => (
                    <div key={post.slug} id={post.slug}>
                        {post.frontmatter.hero_image && (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <a>
                                    <Image
                                        width="50"
                                        height="30"
                                        src={post.frontmatter.hero_image}
                                        className="object-cover w-full h-56 mb-5 bg-center rounded"
                                        alt={post.frontmatter.title}
                                        loading="lazy"
                                    />
                                </a>
                            </Link>
                        )}
                        <h2 className="mb-2 text-lg font-semibold text-gray-900">
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <a className="text-gray-900 hover:text-purple-700">
                                    {post.frontmatter.title}
                                </a>
                            </Link>
                        </h2>
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

export default BlogList;
