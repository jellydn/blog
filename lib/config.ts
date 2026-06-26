import configData from '../data/config.json';

/** Shape of data/config.json */
export interface SiteConfig {
    title: string;
    description: string;
    repositoryUrl: string;
}

/**
 * Returns the site configuration (title, description, repository URL).
 * Replaces repetitive `await import('...config.json')` + `.default` patterns
 * across all pages with a single typed import.
 */
export function getSiteConfig(): SiteConfig {
    return configData;
}
