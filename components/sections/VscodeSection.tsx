import { Button } from 'components/Button';
import { ExtensionCard } from 'components/cards/ExtensionCard';
import type { Repo } from 'lib/repos';

type VscodeSectionProps = {
    extensions: Repo[];
};

export function VscodeSection({ extensions }: VscodeSectionProps) {
    if (extensions.length === 0) return null;

    return (
        <section className="py-20 bg-base-200/50 border-t border-base-300">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">
                            VS Code Extensions
                        </h2>
                        <p className="text-xl text-base-content/70">
                            Tools I&apos;ve built to improve developer
                            experience
                        </p>
                    </div>
                    <Button
                        href="https://marketplace.visualstudio.com/publishers/jellydn"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="View all my VS Code extensions"
                    >
                        View All Extensions
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {extensions.map((ext) => (
                        <ExtensionCard key={ext.name} {...ext} />
                    ))}
                </div>
            </div>
        </section>
    );
}
