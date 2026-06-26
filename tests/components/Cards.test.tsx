import { render, screen } from '@testing-library/react';
import { CliToolCard } from 'components/cards/CliToolCard';
import { ExtensionCard } from 'components/cards/ExtensionCard';
import { NvimPluginCard } from 'components/cards/NvimPluginCard';
import { describe, expect, it } from 'vitest';

const testUrl = 'https://github.com/jellydn/test-repo';

describe('ExtensionCard', () => {
    it('renders the extension name, description, and link', () => {
        render(
            <ExtensionCard
                name="Test Extension"
                description="An amazing VS Code extension"
                url={testUrl}
                stars={150}
            />,
        );

        expect(screen.getByText('Test Extension')).toBeInTheDocument();
        expect(
            screen.getByText('An amazing VS Code extension'),
        ).toBeInTheDocument();
        expect(screen.getByText('150')).toBeInTheDocument();
        const vscodeBadges = screen.getAllByText('VS Code');
        expect(vscodeBadges.length).toBeGreaterThanOrEqual(1);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', testUrl);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
    });

    it('renders formatted star count for high numbers', () => {
        render(
            <ExtensionCard
                name="Popular Extension"
                description="Very popular"
                url={testUrl}
                stars={2500}
            />,
        );

        expect(screen.getByText('2.5k')).toBeInTheDocument();
    });
});

describe('NvimPluginCard', () => {
    const defaultProps = {
        name: 'test-nvim',
        description: 'A Neovim plugin for testing',
        url: testUrl,
        stars: 300,
        topics: ['neovim', 'lua', 'plugin'],
    };

    it('renders the plugin name, description, and stars', () => {
        render(<NvimPluginCard {...defaultProps} />);

        expect(screen.getByText('test-nvim')).toBeInTheDocument();
        expect(
            screen.getByText('A Neovim plugin for testing'),
        ).toBeInTheDocument();
        expect(screen.getByText('300')).toBeInTheDocument();
        expect(screen.getByText('Lua')).toBeInTheDocument();
    });

    it('displays up to 2 topics with the correct tags', () => {
        render(<NvimPluginCard {...defaultProps} />);

        expect(screen.getByText('neovim')).toBeInTheDocument();
        expect(screen.getByText('lua')).toBeInTheDocument();
        // Third topic should not be rendered (slice(0, 2))
        expect(screen.queryByText('plugin')).not.toBeInTheDocument();
    });

    it('renders the link with correct attributes', () => {
        render(<NvimPluginCard {...defaultProps} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', testUrl);
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders star icon via title', () => {
        render(<NvimPluginCard {...defaultProps} />);

        expect(screen.getByTitle('Stars')).toBeInTheDocument();
        expect(screen.getByTitle('Neovim plugin')).toBeInTheDocument();
    });
});

describe('CliToolCard', () => {
    const defaultProps = {
        name: 'test-cli',
        description: 'A CLI tool for testing',
        url: testUrl,
        stars: 100,
        language: 'Rust',
        topics: ['cli', 'tui', 'productivity'],
    };

    it('renders the tool name, description, and language', () => {
        render(<CliToolCard {...defaultProps} />);

        expect(screen.getByText('test-cli')).toBeInTheDocument();
        expect(screen.getByText('A CLI tool for testing')).toBeInTheDocument();
        expect(screen.getByText('Rust')).toBeInTheDocument();
        expect(screen.getByText('CLI/TUI')).toBeInTheDocument();
    });

    it('renders the star count', () => {
        render(<CliToolCard {...defaultProps} />);

        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('displays up to 2 topics', () => {
        render(<CliToolCard {...defaultProps} />);

        expect(screen.getByText('cli')).toBeInTheDocument();
        expect(screen.getByText('tui')).toBeInTheDocument();
        // Third topic should not appear
        expect(screen.queryByText('productivity')).not.toBeInTheDocument();
    });

    it('does not render language badge when language is empty', () => {
        render(<CliToolCard {...defaultProps} language="" />);

        // CLI/TUI badge should still exist
        expect(screen.getByText('CLI/TUI')).toBeInTheDocument();
        // No language element with empty string
        const badges = screen.getAllByText('CLI/TUI');
        expect(badges).toHaveLength(1);
    });

    it('renders the link with correct external attributes', () => {
        render(<CliToolCard {...defaultProps} />);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', testUrl);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
    });
});
