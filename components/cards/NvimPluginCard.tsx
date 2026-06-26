export type NvimPluginCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
    topics: string[];
};

export function NvimPluginCard({
    name,
    description,
    url,
    stars,
    topics,
}: NvimPluginCardProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="group relative bg-base-200/50 rounded-xl p-4 border border-base-300 hover:border-primary/50 transition-all hover:bg-base-200"
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg
                            className="w-5 h-5 text-primary"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <title>Neovim plugin</title>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-base-content/60 shrink-0">
                    <svg
                        className="w-3.5 h-3.5 text-yellow-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <title>Stars</title>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {stars}
                </span>
            </div>
            <p className="text-sm text-base-content/70 line-clamp-2">
                {description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
                <span className="px-2 py-0.5 text-xs rounded-md bg-secondary/20 text-secondary">
                    Lua
                </span>
                {topics.slice(0, 2).map((topic) => (
                    <span
                        key={topic}
                        className="px-2 py-0.5 text-xs rounded-md bg-base-300/50 text-base-content/60"
                    >
                        {topic}
                    </span>
                ))}
            </div>
        </a>
    );
}
