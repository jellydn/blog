import { CheckCircleIcon, StarIcon } from 'components/Icons';

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
                        <CheckCircleIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-base-content group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                </div>
                <span className="flex items-center gap-1 text-xs text-base-content/60 shrink-0">
                    <StarIcon className="w-3.5 h-3.5 text-yellow-500" />
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
