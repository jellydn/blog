import React from 'react'

const Projects = () => (
  <section className="py-20 bg-gray-800 pattern">
    <div className="max-w-5xl px-6 mx-auto text-center">
      <h2 className="text-2xl font-semibold text-white">Projects</h2>
      <div className="flex items-center justify-center mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="https://placeimg.com/300/200/any"
                alt=""
              />
            </div>
            <a
              href="https://rrandom.productsway.com/"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  What&apos;s this fuss about true randomness?
                </p>
                <span className="block mt-2 text-gray-500">
                  https://rrandom.productsway.com/
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <a
          className="flex items-center text-white hover:underline hover:text-gray-200"
          href="https://github.com/jellydn"
        >
          <span>View More On Github</span>
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
  )

export default Projects
