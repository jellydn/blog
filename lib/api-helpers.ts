import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API Helpers for Discovery Endpoints
 *
 * Shared utilities for consistent API route handling across
 * well-known endpoints, MCP routes, and discovery APIs.
 */

/**
 * Derive the base URL from request headers.
 * Supports x-forwarded-proto for proxy environments (Vercel, etc.)
 * Falls back to https if no forwarded protocol is present.
 */
export function getBaseUrlFromRequest(req: NextApiRequest): string {
    const protocol =
        (req.headers['x-forwarded-proto'] as string) ||
        (req.headers['x-forwarded-protocol'] as string) ||
        'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    return `${protocol}://${host}`;
}

/**
 * Ensure the request method is GET. Returns 405 if not.
 * Also sets the Allow header per HTTP spec.
 */
export function ensureGet(req: NextApiRequest, res: NextApiResponse): boolean {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        res.status(405).json({ error: 'Method not allowed' });
        return false;
    }
    return true;
}

/**
 * Set CORS headers for public discovery endpoints.
 * Allows cross-origin access from browser-based agents.
 */
export function setCorsHeaders(res: NextApiResponse): void {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
    );
}

interface DiscoveryResponseOptions {
    contentType: string;
    cacheControl?: string;
}

/**
 * Send a discovery response with proper headers and JSON serialization.
 * Uses res.send() instead of res.json() to preserve custom content types.
 */
export function sendDiscoveryResponse<T>(
    res: NextApiResponse,
    body: T,
    options: DiscoveryResponseOptions,
): void {
    setCorsHeaders(res);
    res.setHeader('Content-Type', options.contentType);
    res.setHeader(
        'Cache-Control',
        options.cacheControl ||
            'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).send(JSON.stringify(body));
}

/**
 * Handle OPTIONS preflight requests for CORS.
 * Returns true if request was handled (caller should return).
 */
export function handleOptions(
    req: NextApiRequest,
    res: NextApiResponse,
): boolean {
    if (req.method === 'OPTIONS') {
        setCorsHeaders(res);
        res.status(204).end();
        return true;
    }
    return false;
}
