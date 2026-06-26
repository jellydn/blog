import { Button } from 'components/Button';
import { CliToolCard } from 'components/cards/CliToolCard';
import type { Repo } from 'lib/repos';

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
