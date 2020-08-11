import * as React from 'react'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '../../components/Layout'

const glob = require('glob')

export default function BlogTemplate({
  frontmatter,
  markdownBody,
  siteTitle,
}: {
  frontmatter: Record<string, any>
  markdownBody: string
  siteTitle: string
}) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate)
    return date.toDateString().slice(4)
  }

  /*
   ** Odd fix to get build to run
   ** It seems like on first go the props
   ** are undefined — could be a Next bug?
   */

  if (!frontmatter) return <></>

  return (
    <Layout siteTitle={siteTitle}>
      <main className="container mt-10 mx-auto text-cente">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {frontmatter.title}
            </h2>
            <h3>{reformatDate(frontmatter.date)}</h3>
          </div>

          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              alt={`blog_hero_${frontmatter.title}`}
              className="object-cover lg:rounded justify-center"
            />
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <ReactMarkdown source={markdownBody} />
          </div>

          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    {frontmatter.author}
                  </p>
                  <p className="font-semibold text-gray-600 text-xs">Editor</p>
                </div>
              </div>
              <button
                type="button"
                className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded"
              >
                Follow
                <i className="bx bx-user-plus ml-2" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params
  const content = await import(`../../posts/${slug}.md`)
  const config = await import(`../../data/config.json`)
  const data = matter(content.default)

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}

export async function getStaticPaths() {
  // get all .md files in the posts dir
  const blogs = glob.sync('posts/**/*.md')

  // remove path and extension to leave filename only
  const blogSlugs = blogs.map((file) =>
    file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim()
  )

  // create paths with `slug` param
  const paths = blogSlugs.map((slug) => `/blog/${slug}`)
  return {
    paths,
    fallback: false,
  }
}
