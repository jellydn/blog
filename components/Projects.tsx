import Image from 'next/image';

const Projects = () => (
    <section className="py-20 bg-gray-800 pattern">
        <div className="px-6 mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-semibold text-white">Side Projects</h2>
            <div className="flex justify-center items-center mt-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="https://gyazo.com/1fe5ed77da50835e77e1eae5d5c4ad04.gif"
                                alt="Opinionated Dapp Starter Template"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/dapp-starter"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Opinionated Dapp Starter Template
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/dapp-starter
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="https://gyazo.com/c6f068b6fe3e94bfe80d042639784faf.gif"
                                alt="Dapp Example with ERC20 Token and Simple Greeter Contract. Built with Hardhat + EthersJs + React + TypeScript."
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/react-dapp"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Dapp Example with ERC20 Token and Simple
                                    Greeter Contract. Built with Hardhat +
                                    EthersJs + React + TypeScript.
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/react-dapp
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="https://gyazo.com/d6361cc2a18ca3140f2aa9b09fc385ca.gif"
                                alt="How to do your first ICO smart contract"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/dapp-token-ico"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    How to do your first ICO smart contract
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/dapp-token-ico
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/new-web-app.png"
                                alt="Frontend app generator, built on top vitejs"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/new-web-app"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Frontend app generator, built on top vitejs
                                    (React + Typescript + React-Query +
                                    TailwindCSS + ESlint + Prettier + Storybook)
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/new-web-app
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/next-validations.png"
                                alt="Svelte-kit app with tailwindcss"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/next-validations"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    NextJS API Validations, support Yup,
                                    Fastest-Validator, Joi, and more.
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://next-validations.productsway.com/
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="https://gyazo.com/af250bab0d07f931c596ebc8c955ae2e.gif"
                                alt="Svelte-kit app with tailwindcss"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/next-swagger-doc"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    NextJS Swagger Doc - This package reads your
                                    JSDoc-annotated source code on NextJS API
                                    route and generates an OpenAPI (Swagger)
                                    specification.
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://next-swagger-doc.productsway.com/
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/rrandom.png"
                                alt="RRandom"
                            />
                        </div>
                        <a
                            href="https://rrandom.productsway.com/"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                        >
                            <div className="py-2 px-3 text-sm text-center">
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
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/wip.jpeg"
                                alt="Eth Revert Reason"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/eth-revert-reason"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
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
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/wip.jpeg"
                                alt="Eth Revert Reason"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/vs-code-preset"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Easy to quickly enable/disable VS Code
                                    extensions base on your preset
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/vs-code-preset
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/use-wait-for-transaction-hash.png"
                                alt="React hook - use-for-wait-transaction-hash"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/use-wait-for-transaction-hash"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Simple hook for getting transaction status
                                    from the ETH/BSC network.
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://github.com/jellydn/use-wait-for-transaction-hash
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/next-app-starter.png"
                                alt="Next App Starter"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/next-app-starter"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
                                <p className="text-gray-300">
                                    Another awesome starter for your app base on
                                    nextjs + tailwind + react-query +
                                    react-hook-form + next-auth + prisma
                                </p>
                                <span className="block mt-2 text-gray-500">
                                    https://next-app-starter.vercel.app/
                                </span>
                            </div>
                        </a>
                    </div>
                    <div className="w-full max-w-xs">
                        <div className="flex overflow-hidden justify-center items-center h-56 bg-white rounded-md border-b-8 border-teal-400">
                            <Image
                                width="300"
                                height="200"
                                className="object-cover h-56"
                                src="/static/svelte-kit-test.png"
                                alt="Svelte-kit app with tailwindcss"
                            />
                        </div>
                        <a
                            target="_blank"
                            href="https://github.com/jellydn/svelte-kit-test"
                            className="block overflow-hidden mt-5 bg-gray-700 rounded-md transition duration-500 ease-in-out transform hover:scale-110 hover:-translate-y-1"
                            rel="noreferrer"
                        >
                            <div className="py-2 px-3 text-sm text-center">
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
            <div className="flex justify-center items-center mt-12">
                <a
                    className="flex items-center link link-accent"
                    href="https://github.com/jellydn"
                >
                    <span>View More On Github</span>
                    <svg
                        className="ml-1 w-5 h-5"
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
);

export default Projects;
