type RepoStarsProps = {
    stars: number;
    className?: string;
};

function formatStars(count: number): string {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
    }
    return count.toString();
}

import { StarIcon } from 'components/Icons';

export function RepoStars({ stars, className = '' }: RepoStarsProps) {
    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            <StarIcon className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{formatStars(stars)}</span>
        </span>
    );
}
