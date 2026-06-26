import { Button } from 'components/Button';
import { RepoStars } from 'components/RepoStars';
import type { Repo } from 'lib/repos';

type VscodeSectionProps = {
    extensions: Repo[];
};

function ExtensionCard({ name, description, url, stars }: Repo) {
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
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <title>VS Code</title>
                        <path d="M8 3a3 3 0 00-3 3v2.25a3 3 0 003 3h2.25a3 3 0 003-3V6a3 3 0 00-3-3H8z" />
                        <path d="M8 21h8a3 3 0 003-3V6.75a3 3 0 00-3-3H8a3 3 0 00-3 3V18a3 3 0 003 3z" />
                    </svg>
                    <span className="badge badge-outline text-xs">VS Code</span>
                </div>
            </div>
        </a>
    );
}

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
