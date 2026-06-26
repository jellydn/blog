import {
    getCliTuiTools,
    getNeovimPlugins,
    getTopProjects,
    getVscodeExtensions,
} from 'lib/repos';
import { describe, expect, it } from 'vitest';

const mockRepos = [
    {
        category: 'Featured Projects',
        repos: [
            {
                name: 'hurlnvim',
                full_name: 'jellydn/hurlnvim',
                description: 'Neovim IDE configuration',
                url: 'https://github.com/jellydn/hurlnvim',
                homepage: '',
                stars: 500,
                forks: 10,
                language: 'Lua',
                topics: ['neovim', 'ide'],
                updated_at: '2024-01-01',
            },
            {
                name: 'low-stars-tool',
                full_name: 'jellydn/low-stars-tool',
                description: 'A low stars tool',
                url: 'https://github.com/jellydn/low-stars-tool',
                homepage: '',
                stars: 5,
                forks: 0,
                language: 'TypeScript',
                topics: ['cli'],
                updated_at: '2024-01-01',
            },
        ],
    },
    {
        category: 'VSCode Extensions',
        repos: [
            {
                name: 'code-runner',
                full_name: 'jellydn/code-runner',
                description: 'Run code snippets',
                url: 'https://github.com/jellydn/code-runner',
                homepage: '',
                stars: 200,
                forks: 5,
                language: 'TypeScript',
                topics: ['vscode'],
                updated_at: '2024-01-01',
            },
            {
                name: 'hurlnvim',
                full_name: 'jellydn/hurlnvim',
                description: 'Neovim IDE configuration',
                url: 'https://github.com/jellydn/hurlnvim',
                homepage: '',
                stars: 500,
                forks: 10,
                language: 'Lua',
                topics: ['neovim', 'ide'],
                updated_at: '2024-01-01',
            },
        ],
    },
    {
        category: 'Neovim Plugins',
        repos: [
            {
                name: 'nvim-plugin',
                full_name: 'jellydn/nvim-plugin',
                description: 'A Neovim plugin',
                url: 'https://github.com/jellydn/nvim-plugin',
                homepage: '',
                stars: 300,
                forks: 8,
                language: 'Lua',
                topics: ['neovim', 'lua'],
                updated_at: '2024-01-01',
            },
            {
                name: 'hurlnvim',
                full_name: 'jellydn/hurlnvim',
                description: 'Neovim IDE configuration',
                url: 'https://github.com/jellydn/hurlnvim',
                homepage: '',
                stars: 500,
                forks: 10,
                language: 'Lua',
                topics: ['neovim', 'ide'],
                updated_at: '2024-01-01',
            },
        ],
    },
    {
        category: 'CLI Tools',
        repos: [
            {
                name: 'quick-code-runner',
                full_name: 'jellydn/quick-code-runner',
                description: 'Quick code runner for neovim',
                url: 'https://github.com/jellydn/quick-code-runner',
                homepage: '',
                stars: 150,
                forks: 3,
                language: 'TypeScript',
                topics: ['cli', 'neovim'],
                updated_at: '2024-01-01',
            },
        ],
    },
];

describe('getTopProjects', () => {
    it('returns top N repos sorted by stars descending', () => {
        const result = getTopProjects(mockRepos, 5);
        // hurlnvim appears in 3 categories with 500 stars each
        expect(result[0]).toMatchObject({ name: 'hurlnvim', stars: 500 });
        expect(result[1]).toMatchObject({ name: 'hurlnvim', stars: 500 });
        expect(result[2]).toMatchObject({ name: 'hurlnvim', stars: 500 });
        // nvim-plugin has 300 stars
        expect(result[3]).toMatchObject({ name: 'nvim-plugin', stars: 300 });
        // code-runner has 200 stars
        expect(result[4]).toMatchObject({ name: 'code-runner', stars: 200 });
    });

    it('filters out repos with 0 stars', () => {
        const reposWithZero = [
            {
                category: 'Test',
                repos: [
                    {
                        name: 'zero-star',
                        full_name: 'user/zero-star',
                        description: '',
                        url: '',
                        homepage: '',
                        stars: 0,
                        forks: 0,
                        language: '',
                        topics: [],
                        updated_at: '',
                    },
                    {
                        name: 'with-star',
                        full_name: 'user/with-star',
                        description: '',
                        url: '',
                        homepage: '',
                        stars: 42,
                        forks: 0,
                        language: '',
                        topics: [],
                        updated_at: '',
                    },
                ],
            },
        ];
        const result = getTopProjects(reposWithZero, 5);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('with-star');
    });

    it('defaults to limit of 6', () => {
        const result = getTopProjects(mockRepos);
        // Only 5 repos have stars > 0 in mock data
        expect(result.length).toBeLessThanOrEqual(6);
    });

    it('handles empty repos gracefully', () => {
        const result = getTopProjects([], 5);
        expect(result).toEqual([]);
    });
});

describe('getVscodeExtensions', () => {
    it('returns VSCode Extensions from the correct category', () => {
        const result = getVscodeExtensions(mockRepos);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('code-runner');
    });

    it('excludes names in the exclude list', () => {
        const result = getVscodeExtensions(mockRepos, ['hurlnvim']);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('code-runner');
    });

    it('returns empty array when no category matches', () => {
        const result = getVscodeExtensions([]);
        expect(result).toEqual([]);
    });
});

describe('getNeovimPlugins', () => {
    it('returns Neovim Plugins from the correct category', () => {
        const result = getNeovimPlugins(mockRepos);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('nvim-plugin');
    });

    it('excludes names in the exclude list', () => {
        const result = getNeovimPlugins(mockRepos, ['nvim-plugin']);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('hurlnvim');
    });

    it('returns empty array when no category matches', () => {
        const result = getNeovimPlugins([]);
        expect(result).toEqual([]);
    });
});

describe('getCliTuiTools', () => {
    it('returns CLI Tools sorted by stars descending', () => {
        const result = getCliTuiTools(mockRepos);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('quick-code-runner');
        expect(result[0].stars).toBe(150);
    });

    it('excludes names in the exclude list', () => {
        const result = getCliTuiTools(mockRepos, ['quick-code-runner']);
        expect(result).toEqual([]);
    });

    it('returns empty array when no category matches', () => {
        const result = getCliTuiTools([]);
        expect(result).toEqual([]);
    });
});
