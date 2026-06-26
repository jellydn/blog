import { render, screen } from '@testing-library/react';
import { AboutSection } from 'components/sections/AboutSection';
import { CliTuiSection } from 'components/sections/CliTuiSection';
import { ContactSection } from 'components/sections/ContactSection';
import { HeroSection } from 'components/sections/HeroSection';
import { NeovimSection } from 'components/sections/NeovimSection';
import { ProjectsSection } from 'components/sections/ProjectsSection';
import { VscodeSection } from 'components/sections/VscodeSection';
import type { Repo } from 'lib/repos';
import { describe, expect, it } from 'vitest';

const makeRepo = (overrides: Partial<Repo> = {}): Repo => ({
    name: 'test-repo',
    full_name: 'user/test-repo',
    description: 'A test repository',
    url: 'https://github.com/user/test-repo',
    homepage: '',
    stars: 100,
    forks: 5,
    language: 'TypeScript',
    topics: ['test', 'demo'],
    updated_at: '2024-06-01',
    ...overrides,
});

const sampleRepos: Repo[] = [
    makeRepo({
        name: 'project-a',
        stars: 500,
        topics: ['react', 'typescript'],
    }),
    makeRepo({ name: 'project-b', stars: 300, topics: ['cli'] }),
];

describe('HeroSection', () => {
    it('renders the hero greeting with name', () => {
        render(<HeroSection />);

        expect(screen.getByText('Dung Huynh Duc')).toBeInTheDocument();
        expect(
            screen.getByText(/Senior Full Stack Software Engineer/),
        ).toBeInTheDocument();
    });

    it('renders all social link buttons', () => {
        render(<HeroSection />);

        expect(screen.getByText('Hire Me')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('GitHub')).toBeInTheDocument();
        expect(screen.getByText('Twitter')).toBeInTheDocument();
        expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    });

    it('renders the avatar image', () => {
        render(<HeroSection />);

        const img = screen.getByAltText('Dung Huynh Duc');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/avatar.jpg');
    });

    it('renders social links with correct aria-labels', () => {
        render(<HeroSection />);

        expect(screen.getByLabelText('Hire me on Upwork')).toBeInTheDocument();
        expect(
            screen.getByLabelText('View my GitHub profile'),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText('View my Twitter profile'),
        ).toBeInTheDocument();
    });
});

describe('AboutSection', () => {
    it('renders the about heading', () => {
        render(<AboutSection />);

        expect(screen.getByText('About Me')).toBeInTheDocument();
    });

    it('renders the experience text with dynamic year calculation', () => {
        render(<AboutSection />);

        const years = new Date().getFullYear() - 2011;
        expect(
            screen.getByText(new RegExp(`${years} years`)),
        ).toBeInTheDocument();
    });

    it('renders the current role description', () => {
        render(<AboutSection />);

        expect(
            screen.getByText(/Senior Full Stack Software Engineer at ACX/),
        ).toBeInTheDocument();
    });
});

describe('ContactSection', () => {
    it('renders the contact heading and blurb', () => {
        render(<ContactSection />);

        expect(screen.getByText("Let's Connect")).toBeInTheDocument();
        expect(
            screen.getByText(/Interested in collaborating/),
        ).toBeInTheDocument();
    });

    it('renders all social link buttons with correct variants', () => {
        render(<ContactSection />);

        expect(screen.getByText('Hire Me')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('GitHub')).toBeInTheDocument();
        expect(screen.getByText('Twitter')).toBeInTheDocument();
        expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    });

    it('renders social links with correct aria-labels', () => {
        render(<ContactSection />);

        expect(screen.getByLabelText('Hire me on Upwork')).toBeInTheDocument();
        expect(screen.getByLabelText('Send me an email')).toBeInTheDocument();
        expect(
            screen.getByLabelText('View my LinkedIn profile'),
        ).toBeInTheDocument();
    });
});

describe('ProjectsSection', () => {
    it('renders the section heading', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        expect(screen.getByText('Featured Projects')).toBeInTheDocument();
    });

    it('renders the "View All Projects" button linking to GitHub', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        const link = screen.getByText('View All Projects');
        expect(link.closest('a')).toHaveAttribute(
            'href',
            'https://github.com/jellydn?tab=repositories',
        );
    });

    it('renders project cards for each repo', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        expect(screen.getByText('project-a')).toBeInTheDocument();
        expect(screen.getByText('project-b')).toBeInTheDocument();
    });

    it('displays project descriptions', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        const descriptions = screen.getAllByText('A test repository');
        expect(descriptions.length).toBeGreaterThanOrEqual(1);
    });

    it('renders language and topic badges', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        // Language badge
        const languageBadges = screen.getAllByText('TypeScript');
        expect(languageBadges.length).toBeGreaterThanOrEqual(1);

        // Topic badges (first 2)
        expect(screen.getByText('react')).toBeInTheDocument();
        expect(screen.getByText('cli')).toBeInTheDocument();
    });

    it('renders star counts', () => {
        render(<ProjectsSection projects={sampleRepos} />);

        expect(screen.getByText('500')).toBeInTheDocument();
        expect(screen.getByText('300')).toBeInTheDocument();
    });
});

describe('VscodeSection', () => {
    it('renders the section heading when extensions are provided', () => {
        render(<VscodeSection extensions={sampleRepos} />);

        expect(screen.getByText('VS Code Extensions')).toBeInTheDocument();
    });

    it('renders the "View All Extensions" button', () => {
        render(<VscodeSection extensions={sampleRepos} />);

        const link = screen.getByText('View All Extensions');
        expect(link.closest('a')).toHaveAttribute(
            'href',
            'https://marketplace.visualstudio.com/publishers/jellydn',
        );
    });

    it('renders extension cards for each extension', () => {
        render(<VscodeSection extensions={sampleRepos} />);

        expect(screen.getByText('project-a')).toBeInTheDocument();
        expect(screen.getByText('project-b')).toBeInTheDocument();
    });

    it('renders "VS Code" badge on each card', () => {
        render(<VscodeSection extensions={sampleRepos} />);

        const badges = screen.getAllByText('VS Code');
        expect(badges.length).toBeGreaterThanOrEqual(1);
    });

    it('returns null when extensions array is empty', () => {
        const { container } = render(<VscodeSection extensions={[]} />);

        expect(container.innerHTML).toBe('');
    });
});

describe('NeovimSection', () => {
    it('renders the section heading when plugins are provided', () => {
        render(<NeovimSection plugins={sampleRepos} />);

        expect(screen.getByText('Neovim Plugins')).toBeInTheDocument();
    });

    it('renders the "View All Plugins" button', () => {
        render(<NeovimSection plugins={sampleRepos} />);

        const link = screen.getByText('View All Plugins');
        expect(link.closest('a')).toHaveAttribute(
            'href',
            'https://github.com/jellydn?tab=repositories&q=nvim',
        );
    });

    it('renders plugin cards for each plugin', () => {
        render(<NeovimSection plugins={sampleRepos} />);

        expect(screen.getByText('project-a')).toBeInTheDocument();
        expect(screen.getByText('project-b')).toBeInTheDocument();
    });

    it('displays the Lua badge on each card', () => {
        render(<NeovimSection plugins={sampleRepos} />);

        const luaBadges = screen.getAllByText('Lua');
        expect(luaBadges.length).toBeGreaterThanOrEqual(1);
    });

    it('returns null when plugins array is empty', () => {
        const { container } = render(<NeovimSection plugins={[]} />);

        expect(container.innerHTML).toBe('');
    });
});

describe('CliTuiSection', () => {
    it('renders the section heading when tools are provided', () => {
        render(<CliTuiSection tools={sampleRepos} />);

        expect(screen.getByText('CLI & TUI DX Tools')).toBeInTheDocument();
    });

    it('renders the "View CLI Repos" button', () => {
        render(<CliTuiSection tools={sampleRepos} />);

        const link = screen.getByText('View CLI Repos');
        expect(link.closest('a')).toHaveAttribute(
            'href',
            'https://github.com/jellydn?tab=repositories&q=cli',
        );
    });

    it('renders tool cards for each tool', () => {
        render(<CliTuiSection tools={sampleRepos} />);

        expect(screen.getByText('project-a')).toBeInTheDocument();
        expect(screen.getByText('project-b')).toBeInTheDocument();
    });

    it('renders the CLI/TUI badge on each card', () => {
        render(<CliTuiSection tools={sampleRepos} />);

        const badges = screen.getAllByText('CLI/TUI');
        expect(badges.length).toBeGreaterThanOrEqual(1);
    });

    it('returns null when tools array is empty', () => {
        const { container } = render(<CliTuiSection tools={[]} />);

        expect(container.innerHTML).toBe('');
    });
});
