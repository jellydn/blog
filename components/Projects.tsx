const Projects = () => (
  <section className="py-20 bg-gray-800 pattern">
    <div className="max-w-5xl px-6 mx-auto text-center">
      <h2 className="text-2xl font-semibold text-white">Side Projects</h2>
      <div className="flex items-center justify-center mt-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/rrandom.png"
                alt="RRandom"
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
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/wip.jpeg"
                alt="Eth Revert Reason"
              />
            </div>
            <a
              href="https://github.com/jellydn/eth-revert-reason"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  Decode revert reason from failed transaction
                </p>
                <span className="block mt-2 text-gray-500">
                  https://github.com/jellydn/eth-revert-reason
                </span>
              </div>
            </a>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/wip.jpeg"
                alt="Eth Revert Reason"
              />
            </div>
            <a
              href="https://github.com/jellydn/vs-code-preset"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  Easy to quickly enable/disable VS Code extensions base on your
                  preset
                </p>
                <span className="block mt-2 text-gray-500">
                  https://github.com/jellydn/vs-code-preset
                </span>
              </div>
            </a>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/use-wait-for-transaction-hash.png"
                alt="React hook - use-for-wait-transaction-hash"
              />
            </div>
            <a
              href="https://github.com/jellydn/use-wait-for-transaction-hash"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  Simple hook for getting transaction status from the ETH/BSC
                  network.
                </p>
                <span className="block mt-2 text-gray-500">
                  https://github.com/jellydn/use-wait-for-transaction-hash
                </span>
              </div>
            </a>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/next-app-starter.png"
                alt="Next App Starter"
              />
            </div>
            <a
              href="https://github.com/jellydn/next-app-starter"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  Another awesome starter for your app base on nextjs + tailwind
                  + react-query + react-hook-form + next-auth + prisma
                </p>
                <span className="block mt-2 text-gray-500">
                  https://next-app-starter.vercel.app/
                </span>
              </div>
            </a>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-center h-56 overflow-hidden bg-white border-b-8 border-teal-400 rounded-md">
              <img
                className="object-cover h-56"
                src="/static/svelte-kit-test.png"
                alt="Svelte-kit app with tailwindcss"
              />
            </div>
            <a
              href="https://github.com/jellydn/svelte-kit-test"
              className="block mt-5 overflow-hidden transition duration-500 ease-in-out transform bg-gray-700 rounded-md hover:-translate-y-1 hover:scale-110"
            >
              <div className="px-3 py-2 text-sm text-center">
                <p className="text-gray-300">
                  Svelte-kit app with tailwind css
                </p>
                <span className="block mt-2 text-gray-500">
                  https://svelte-kit-test.web.app
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
