import { ensureGet, handleOptions, setCorsHeaders } from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API Catalog Endpoint (RFC 9727)
 *
 * Returns application/linkset+json with a "linkset" array containing
 * API endpoint descriptions using standard link relations.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9727
 * @see https://www.rfc-editor.org/rfc/rfc9264
 */

interface LinksetItem {
    anchor: string;
    'service-desc'?: Array<{ href: string; type?: string; title?: string }>;
    'service-doc'?: Array<{ href: string; type?: string; title?: string }>;
    status?: Array<{ href: string; title?: string }>;
    'api-catalog'?: Array<{ href: string; title?: string }>;
}

interface ApiCatalog {
    linkset: LinksetItem[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiCatalog | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const catalog: ApiCatalog = {
        linkset: [
            {
                anchor: `${baseUrl}/api/posts`,
                'service-desc': [
                    {
                        href: `${baseUrl}/.well-known/api-catalog`,
                        type: 'application/linkset+json',
                        title: 'API Catalog',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/posts`,
                        type: 'text/html',
                        title: 'Blog Posts Documentation',
                    },
                ],
                status: [
                    {
                        href: `${baseUrl}/api/posts`,
                        title: 'Posts API Health Check',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/api/youtube-videos`,
                'service-desc': [
                    {
                        href: `${baseUrl}/.well-known/api-catalog`,
                        type: 'application/linkset+json',
                        title: 'API Catalog',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/videos`,
                        type: 'text/html',
                        title: 'YouTube Videos Documentation',
                    },
                ],
                status: [
                    {
                        href: `${baseUrl}/api/youtube-videos`,
                        title: 'YouTube Videos API Health Check',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/.well-known/agent-skills/index.json`,
                'service-desc': [
                    {
                        href: 'https://github.com/cloudflare/agent-skills-discovery-rfc',
                        type: 'text/html',
                        title: 'Agent Skills Discovery RFC',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/agent-skills/index.json`,
                        type: 'application/json',
                        title: 'Agent Skills Index',
                    },
                ],
            },
            {
                anchor: `${baseUrl}/.well-known/mcp/server-card.json`,
                'service-desc': [
                    {
                        href: 'https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127',
                        type: 'text/html',
                        title: 'MCP Server Card Specification',
                    },
                ],
                'service-doc': [
                    {
                        href: `${baseUrl}/.well-known/mcp/server-card.json`,
                        type: 'application/json',
                        title: 'MCP Server Card',
                    },
                ],
            },
        ],
    };

    setCorsHeaders(res);
    res.setHeader(
        'Content-Type',
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    );
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).send(JSON.stringify(catalog));
}
