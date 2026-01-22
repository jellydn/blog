type RepoStarsProps = {
    stars: number;
    className?: string;
};

function formatStars(count: number): string {
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return count.toString();
}

export function RepoStars({ stars, className = '' }: RepoStarsProps) {
    return (
        <span className={`inline-flex items-center gap-1 ${className}`}>
            <svg
                className="w-4 h-4 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">{formatStars(stars)}</span>
        </span>
    );
}
