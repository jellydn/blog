import { NextSeo } from 'next-seo'
import Image from 'next/image'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import Prism from 'prismjs'

import { useEffect } from 'react'

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
  function reformatDate(fullDate: string | number | Date) {
    const date = new Date(fullDate)
    return date.toDateString()
  }

  // highlight text color
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Layout siteTitle={siteTitle}>
      <NextSeo
        title={`${siteTitle} | ${frontmatter.title}`}
        description={siteDescription}
      />
      <article
        className="px-4 py-24 mx-auto max-w-7xl"
        itemID="#"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              alt={`blog_hero_${frontmatter.title}`}
              className="object-cover w-full h-64 bg-center rounded-lg"
            />
          )}
          <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
            Development
          </p>
          <h1
            className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
            itemProp="headline"
            title="Rise of Tailwind - A Utility First CSS Framework"
          >
            {frontmatter.title}
          </h1>
          <a
            className="flex items-center text-gray-700"
            href="https://github.com/jellydn"
          >
            <div className="avatar">
              <Image src="/avatar.jpg" width="48" height="48" />
            </div>
            <div className="ml-2">
              <p className="text-sm font-semibold text-gray-800">
                {frontmatter.author}
              </p>
              <p className="text-sm text-gray-500">
                {reformatDate(frontmatter.date)}
              </p>
            </div>
          </a>
          <div className="flex items-center mb-6 space-x-2">
            {/* Twitter button */}
            <a
              href="https://twitter.com/jellydn?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-show-count="false"
            >
              Follow @jellydn
            </a>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"
            />
            {/* Github button */}
            <a
              className="github-button"
              href="https://github.com/jellydn"
              data-color-scheme="no-preference: light; light: light; dark: dark;"
              data-size="large"
              data-show-count="true"
              aria-label="Follow @jellydn on GitHub"
            >
              Follow @jellydn
            </a>
            <script async defer src="https://buttons.github.io/buttons.js" />
          </div>
        </div>
        <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
          <ReactMarkdown remarkPlugins={[gfm]}>{markdownBody}</ReactMarkdown>
        </div>
      </article>
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
  const blogSlugs = blogs.map((file: string) =>
    file.split('/')[1].replace(/ /g, '-').slice(0, -3).trim()
  )

  // create paths with `slug` param
  const paths = blogSlugs.map((slug: string) => `/blog/${slug}`)
  return {
    paths,
    fallback: false,
  }
}
