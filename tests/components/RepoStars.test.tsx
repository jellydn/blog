import { render, screen } from '@testing-library/react';
import { RepoStars } from 'components/RepoStars';
import { describe, expect, it } from 'vitest';

describe('RepoStars', () => {
    it('renders the exact number for < 1000 stars', () => {
        render(<RepoStars stars={42} />);
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders 999 as-is (below 1k threshold)', () => {
        render(<RepoStars stars={999} />);
        expect(screen.getByText('999')).toBeInTheDocument();
    });

    it('formats 1000 as 1k', () => {
        render(<RepoStars stars={1000} />);
        expect(screen.getByText('1k')).toBeInTheDocument();
    });

    it('formats 1500 as 1.5k', () => {
        render(<RepoStars stars={1500} />);
        expect(screen.getByText('1.5k')).toBeInTheDocument();
    });

    it('formats 10000 as 10k', () => {
        render(<RepoStars stars={10000} />);
        expect(screen.getByText('10k')).toBeInTheDocument();
    });

    it('renders star icon with accessible label', () => {
        render(<RepoStars stars={42} />);
        const svg = screen.getByTitle('Star');
        expect(svg).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<RepoStars stars={42} className="ml-2" />);
        const span = container.firstChild as HTMLElement;
        expect(span.className).toContain('ml-2');
    });
});
