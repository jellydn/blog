export function AboutSection() {
    const years = new Date().getFullYear() - 2011;

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl mb-4">About Me</h2>
                        <p className="text-lg leading-relaxed">
                            With over {years} years of experience as a
                            full-stack developer, I&apos;ve had the opportunity
                            to spearhead project teams at tech startups in
                            Vietnam, Thailand, Japan, and Singapore.
                            Additionally, I have worked as a freelance engineer
                            for various companies based in Asia Pacific, Europe,
                            and North America.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            Currently, I serve as a Senior Full Stack Software
                            Engineer at ACX, where I focus on developing
                            blockchain-based carbon exchange platforms and
                            innovative solutions using TypeScript, Node.js, and
                            React.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
