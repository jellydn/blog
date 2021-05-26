/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'

const BlogList = ({ allBlogs }: { allBlogs: any }) => {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
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
          <div id={post.slug}>
            {post.frontmatter.hero_image && (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a>
                  <img
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
  )

  // return (
  //   <section className="py-20 bg-white">
  //     <div className="max-w-5xl px-6 mx-auto text-center">
  //       <h2 className="text-2xl font-semibold text-gray-800">Latest Posts</h2>
  //       <div className="flex flex-col items-center justify-center mt-6">
  //         {allBlogs.length > 0 &&
  //           allBlogs.map((post) => (
  //             <Link key={post.slug} href={`/blog/${post.slug}`}>
  //               <a className="block w-full max-w-2xl transition duration-500 ease-in-out transform bg-white border-t-4 border-indigo-600 rounded-md shadow-md hover:-translate-y-1 hover:scale-110">
  //                 <div className="flex items-center justify-between px-4 py-2">
  //                   <h3 className="text-lg font-medium text-gray-700">
  //                     {post.frontmatter.title}
  //                   </h3>
  //                   <span className="block text-sm font-light text-gray-600">
  //                     {reformatDate(post.frontmatter.date)}
  //                   </span>
  //                 </div>
  //               </a>
  //             </Link>
  //           ))}
  //       </div>
  //     </div>
  //   </section>
  // )
}

export default BlogList
