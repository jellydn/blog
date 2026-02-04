import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'jellydn';

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    language: string | null;
    topics: string[];
    updated_at: string;
}

interface RepoCategory {
    category: string;
    repos: Array<{
        name: string;
        full_name: string;
        description: string;
        url: string;
        homepage: string;
        stars: number;
        forks: number;
        language: string;
        topics: string[];
        updated_at: string;
    }>;
}

// Category definitions based on topics and keywords
const CATEGORIES: Record<string, { topics: string[]; keywords: string[] }> = {
    neovim: {
        topics: ['neovim', 'neovim-plugin', 'nvim', 'nvim-config'],
        keywords: ['nvim', 'neovim', '.nvim'],
    },
    vscode: {
        topics: ['vscode-extension'],
        keywords: ['vscode-', 'vs-code'],
    },
    ai: {
        topics: ['ai', 'claude', 'gpt', 'copilot', 'agent', 'mcp'],
        keywords: ['ai-', 'ai-', 'claude', 'gpt', 'agent'],
    },
    cli: {
        topics: ['cli', 'command-line'],
        keywords: ['-cli', 'cli-', 'command-line'],
    },
    web: {
        topics: ['nextjs', 'react', 'svelte', 'vue', 'vite', 'astro'],
        keywords: ['next-', 'react-', 'vue-', 'svelte-'],
    },
};

async function fetchRepos(page = 1, perPage = 100): Promise<GitHubRepo[]> {
    const url = `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&direction=desc&page=${page}&per_page=${perPage}`;

    const response = await fetch(url, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'fetch-repos-script',
        },
    });

    if (!response.ok) {
        throw new Error(
            `GitHub API error: ${response.status} ${response.statusText}`,
        );
    }

    return response.json() as Promise<GitHubRepo[]>;
}

function categorizeRepo(repo: GitHubRepo): string {
    const topics = repo.topics || [];
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();

    // Check neovim first
    if (
        topics.some((t) => CATEGORIES.neovim.topics.includes(t)) ||
        CATEGORIES.neovim.keywords.some((k) => name.includes(k))
    ) {
        return 'neovim';
    }

    // Check vscode
    if (
        topics.some((t) => CATEGORIES.vscode.topics.includes(t)) ||
        CATEGORIES.vscode.keywords.some((k) => name.includes(k))
    ) {
        return 'vscode';
    }

    // Check ai
    if (
        topics.some((t) => CATEGORIES.ai.topics.includes(t)) ||
        CATEGORIES.ai.keywords.some((k) => name.includes(k) || desc.includes(k))
    ) {
        return 'ai';
    }

    // Check cli
    if (
        topics.some((t) => CATEGORIES.cli.topics.includes(t)) ||
        CATEGORIES.cli.keywords.some((k) => name.includes(k))
    ) {
        return 'cli';
    }

    // Check web
    if (
        topics.some((t) => CATEGORIES.web.topics.includes(t)) ||
        CATEGORIES.web.keywords.some((k) => name.includes(k))
    ) {
        return 'web';
    }

    return 'misc';
}

function transformRepo(repo: GitHubRepo) {
    return {
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || '',
        url: repo.html_url,
        homepage: repo.homepage || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || '',
        topics: repo.topics || [],
        updated_at: repo.updated_at,
    };
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
    const allRepos: GitHubRepo[] = [];
    let page = 1;
    let hasMore = true;

    console.log('Fetching repos from GitHub...\n');

    while (hasMore) {
        const repos = await fetchRepos(page);
        if (repos.length === 0) {
            hasMore = false;
        } else {
            allRepos.push(...repos);
            console.log(`Page ${page}: fetched ${repos.length} repos`);
            page++;
            // Rate limiting - be nice to GitHub
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }

    console.log(`\nTotal repos fetched: ${allRepos.length}\n`);
    return allRepos;
}

async function main() {
    try {
        console.log('=== GitHub Repos Fetcher ===\n');

        const allRepos = await fetchAllRepos();

        // Filter out forked repos
        const originalRepos = allRepos.filter((repo) => !repo.fork);
        console.log(
            `Filtered out ${allRepos.length - originalRepos.length} forked repos\n`,
        );

        // Categorize repos
        const categories: Record<string, ReturnType<typeof transformRepo>[]> = {
            ai: [],
            cli: [],
            misc: [],
            neovim: [],
            vscode: [],
            web: [],
        };

        for (const repo of originalRepos) {
            const category = categorizeRepo(repo);
            const transformed = transformRepo(repo);
            categories[category].push(transformed);
        }

        // Sort each category by stars (descending)
        for (const cat of Object.values(categories)) {
            cat.sort((a, b) => b.stars - a.stars);
        }

        // Build output structure
        const output: RepoCategory[] = [];

        const categoryDisplayNames: Record<string, string> = {
            ai: 'AI & Agents',
            cli: 'CLI Tools',
            misc: 'Miscellaneous',
            neovim: 'Neovim Plugins',
            vscode: 'VSCode Extensions',
            web: 'Web & Frontend',
        };

        for (const [key, repos] of Object.entries(categories)) {
            if (repos.length > 0) {
                output.push({
                    category: categoryDisplayNames[key],
                    repos,
                });
                console.log(
                    `${categoryDisplayNames[key]}: ${repos.length} repos (top: ${repos[0]?.name} with ${repos[0]?.stars} stars)`,
                );
            }
        }

        // Write to file
        const outputPath = join(process.cwd(), 'data', 'repos.json');
        await writeFile(outputPath, JSON.stringify(output, null, 4));
        console.log(`\n✓ Saved to ${outputPath}`);
        console.log(`\n=== Summary ===`);
        let total = 0;
        for (const cat of output) {
            total += cat.repos.length;
            console.log(`  ${cat.category}: ${cat.repos.length} repos`);
        }
        console.log(`  Total: ${total} repos`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
