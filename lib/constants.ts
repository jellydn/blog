/**
 * Site Constants
 *
 * Centralized configuration values used across the application.
 * Using a single source of truth prevents drift when domains or
 * environment-specific values change.
 */

export const SITE_URL = process.env.SITE_URL || 'https://productsway.com';

export const CACHE_CONTROL = {
    DISCOVERY: 'public, s-maxage=3600, stale-while-revalidate=86400',
    API: 'public, s-maxage=60, stale-while-revalidate=300',
};
