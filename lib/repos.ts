import type reposData from '../data/repos.json';

export type RepoCategory = (typeof reposData)[number];
export type Repo = RepoCategory['repos'][number];

export function getTopProjects(repos: typeof reposData, limit = 6): Repo[] {
    const allRepos = repos.flatMap((category) => category.repos ?? []);
    return allRepos
        .filter((repo) => repo.stars > 0)
        .sort((a, b) => b.stars - a.stars)
        .slice(0, limit);
}

export function getVscodeExtensions(
    repos: typeof reposData,
    excludeNames: string[] = [],
): Repo[] {
    const category = repos.find((c) => c.category === 'VSCode Extensions');
    return (
        category?.repos?.filter((repo) => !excludeNames.includes(repo.name)) ??
        []
    );
}

export function getNeovimPlugins(
    repos: typeof reposData,
    excludeNames: string[] = [],
): Repo[] {
    const category = repos.find((c) => c.category === 'Neovim Plugins');
    return (
        category?.repos?.filter((repo) => !excludeNames.includes(repo.name)) ??
        []
    );
}

export function getCliTuiTools(
    repos: typeof reposData,
    excludeNames: string[] = [],
): Repo[] {
    const category = repos.find((c) => c.category === 'CLI Tools');
    return (category?.repos ?? [])
        .filter((repo) => !excludeNames.includes(repo.name))
        .sort((a, b) => b.stars - a.stars);
}
