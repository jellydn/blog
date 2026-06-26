import { Button } from 'components/Button';
import { RepoStars } from 'components/RepoStars';
import type { Repo } from 'lib/repos';

type CliToolCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    topics: string[];
};

function CliToolCard({
    name,
    description,
    url,
    stars,
    language,
    topics,
}: CliToolCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
            <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-xl font-semibold">{name}</h3>
                    <div className="badge badge-primary gap-1">
                        <RepoStars stars={stars} />
                    </div>
                </div>
                <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {language && (
                        <span className="badge badge-ghost text-xs">
                            {language}
                        </span>
                    )}
                    <span className="badge badge-outline text-xs">CLI/TUI</span>
                    {topics.slice(0, 2).map((topic) => (
                        <span
                            key={topic}
                            className="badge badge-outline text-xs"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}

type CliTuiSectionProps = {
    tools: Repo[];
};

export function CliTuiSection({ tools }: CliTuiSectionProps) {
    if (tools.length === 0) return null;

    return (
        <section className="py-20 bg-base-200/50 border-t border-base-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">
                            CLI &amp; TUI DX Tools
                        </h2>
                        <p className="text-xl text-base-content/70">
                            Terminal-first tools to speed up day-to-day
                            developer workflows
                        </p>
                    </div>
                    <Button
                        href="https://github.com/jellydn?tab=repositories&q=cli"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View all my CLI and TUI tools"
                    >
                        View CLI Repos
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                        <CliToolCard
                            key={tool.name}
                            name={tool.name}
                            description={tool.description}
                            url={tool.url}
                            stars={tool.stars}
                            language={tool.language}
                            topics={tool.topics}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
