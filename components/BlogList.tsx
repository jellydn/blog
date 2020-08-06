const BlogList = ({ allBlogs }: { allBlogs: any }) => {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl px-6 mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Latest Posts</h2>
        <div className="flex flex-col items-center justify-center mt-6">
          {allBlogs.length > 0 &&
            allBlogs.map((post) => (
              <a
                className="max-w-2xl w-full block bg-white shadow-md rounded-md border-t-4 border-indigo-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                key={post.slug}
                href={`/blog/${post.slug}`}
              >
                <div className="flex items-center justify-between px-4 py-2">
                  <h3 className="text-lg font-medium text-gray-700">
                    {post.frontmatter.title}
                  </h3>
                  <span className="block text-gray-600 font-light text-sm">
                    {reformatDate(post.frontmatter.date)}
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList
