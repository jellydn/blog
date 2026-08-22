export function AboutSection() {
    const years = new Date().getFullYear() - 2011;

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-3xl mb-4">About Me</h2>
                        <p className="text-lg leading-relaxed">
                            I&apos;ve spent {years} years as a full-stack
                            developer — leading teams at startups in Vietnam,
                            Thailand, Japan, and Singapore, and freelancing for
                            companies across Asia Pacific, Europe, and North
                            America.
                        </p>
                        <p className="text-lg leading-relaxed mt-4">
                            At ACX I build blockchain carbon exchange platforms
                            with TypeScript, Node.js, and React. This blog is
                            where I write down what I learn along the way.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
