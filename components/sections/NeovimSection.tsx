import { Button } from 'components/Button';
import { NvimPluginCard } from 'components/cards/NvimPluginCard';
import type { Repo } from 'lib/repos';

type NeovimSectionProps = {
    plugins: Repo[];
};

export function NeovimSection({ plugins }: NeovimSectionProps) {
    if (plugins.length === 0) return null;

    return (
        <section className="py-20 bg-base-100 border-t border-base-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">
                            Neovim Plugins
                        </h2>
                        <p className="text-xl text-base-content/70">
                            Lua plugins to supercharge your Neovim workflow
                        </p>
                    </div>
                    <Button
                        href="https://github.com/jellydn?tab=repositories&q=nvim"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View all my Neovim plugins"
                    >
                        View All Plugins
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {plugins.map((plugin) => (
                        <NvimPluginCard
                            key={plugin.name}
                            name={plugin.name}
                            description={plugin.description}
                            url={plugin.url}
                            stars={plugin.stars}
                            topics={plugin.topics}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
