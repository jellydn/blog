import { NextSeo } from 'next-seo'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '../../components/Layout'

const glob = require('glob')

export default function BlogTemplate({
  frontmatter,
  siteDescription,
  markdownBody,
  siteTitle,
}: {
  frontmatter: Record<string, any>
  markdownBody: string
  siteDescription?: string
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
      <NextSeo
        title={`${siteTitle} | ${frontmatter.title}`}
        description={siteDescription}
      />
      <main className="container mx-auto mt-10 text-cente">
        <div className="relative w-full mx-auto mb-4 md:mb-0">
          <div className="px-4 lg:px-0">
            <h2 className="text-4xl font-semibold leading-tight text-gray-800">
              {frontmatter.title}
            </h2>
            <h3>{reformatDate(frontmatter.date)}</h3>
          </div>

          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              alt={`blog_hero_${frontmatter.title}`}
              className="justify-center object-cover lg:rounded"
            />
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="w-full px-4 mt-12 text-lg leading-relaxed text-gray-700 lg:px-0 lg:w-3/4">
            <ReactMarkdown source={markdownBody} />
          </div>

          <div className="w-full max-w-screen-sm m-auto mt-12 lg:w-1/4">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    {frontmatter.author}
                  </p>
                  <p className="text-xs font-semibold text-gray-600">Editor</p>
                </div>
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-full px-2 py-1 text-gray-100 bg-green-700 rounded"
              >
                Follow
                <i className="ml-2 bx bx-user-plus" />
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
      siteDescription: config.description,
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
