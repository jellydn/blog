import { RepoStars } from 'components/RepoStars';

export type CliToolCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string;
    topics: string[];
};

export function CliToolCard({
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
