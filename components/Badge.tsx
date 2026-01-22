import type { ReactNode } from 'react';

export type Category = 'guide' | 'til' | 'video';

type BadgeVariant = Category | 'ghost';

type BadgeProps = {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
    guide: 'badge-primary',
    til: 'badge-secondary',
    video: 'badge-accent',
    ghost: 'badge-ghost',
};

const categoryLabels: Record<Category, string> = {
    guide: 'Guide',
    til: 'TIL',
    video: 'Video',
};

export function Badge({ children, variant, className = '' }: BadgeProps) {
    return (
        <span
            className={`badge ${variant ? variantStyles[variant] : ''} ${className}`}
        >
            {children}
        </span>
    );
}

export function getCategory(slug: string, isVideo?: boolean): Category {
    if (isVideo) return 'video';
    if (slug.startsWith('til-')) return 'til';
    return 'guide';
}

export function isTil(slug: string): boolean {
    return slug.startsWith('til-');
}

export function getCategoryLabel(category: Category): string {
    return categoryLabels[category];
}
