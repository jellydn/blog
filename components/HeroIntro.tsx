const HeroIntro = () => (
    <>
        <section className="mt-20 bg-base-100">
            <div className="px-6 mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-semibold text-base-content">
                    Hi,{' '}
                    <span className="px-1 text-primary-content bg-primary rounded">
                        I&apos;m Dung Huynh Duc
                    </span>{' '}
                    . Nice to meet you.
                </h2>
            </div>
        </section>

        <section className="py-20 bg-neutral text-neutral-content pattern">
            <div className="px-6 mx-auto max-w-5xl text-center">
                <h2 className="text-2xl font-semibold text-neutral-content">
                    About Me
                </h2>
                <p className="mt-4 text-neutral-content/70">
                    With over a decade of experience under my belt as a
                    full-stack developer, I&apos;ve had the opportunity to
                    spearhead project teams at tech startups in Vietnam,
                    Thailand, Japan and Singapore. Additionally, I have worked
                    as a freelance engineer for various companies based in Asia
                    Pacific, Europe, and North America.
                </p>
                <p className="mt-4 text-neutral-content/70">
                    Presently, I serve the role of a Senior Full Stack Software
                    Engineer at{' '}
                    <a
                        href="https://acx.net"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link link-hover"
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
