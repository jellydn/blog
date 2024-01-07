const HeroIntro = () => (
    <>
        <section className="mt-20 bg-white">
            <div className="px-6 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold text-gray-800">
                    Hi,{' '}
                    <span className="px-1 text-white bg-indigo-600 rounded">
                        I’m Dung Huynh Duc
                    </span>{' '}
                    . Nice to meet you.
                </h2>
            </div>
        </section>

        <section className="py-20 bg-gray-800 pattern">
            <div className="px-6 mx-auto max-w-5xl text-center">
                <h2 className="text-2xl font-semibold text-white">About Me</h2>
                <p className="mt-4 text-gray-400">
                    With over a decade of experience under my belt as a
                    full-stack developer, I&apos;ve had the opportunity to
                    spearhead project teams at tech startups in Vietnam,
                    Thailand, Japan and Singapore. Additionally, I have worked
                    as a freelance engineer for various companies based in Asia
                    Pacific, Europe, and North America.
                </p>
                <p className="mt-4 text-gray-400">
                    Presently, I serve the role of a Senior Full Stack Software
                    Engineer at{' '}
                    <a
                        href="https://acx.net"
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        ACX
                    </a>
                    . I am consistently committed to exploring and acquiring
                    knowledge on emerging and popular technologies.
                </p>
            </div>
        </section>
    </>
);

export default HeroIntro;
