import { ensureGet, handleOptions, setCorsHeaders } from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * MCP Resources Endpoint
 *
 * Returns available MCP resources for the Model Context Protocol.
 * Resources represent data that the server can provide.
 *
 * @see https://modelcontextprotocol.io
 */

interface MCPResource {
    uri: string;
    name: string;
    description: string;
    mimeType: string;
    size?: number;
    schema?: string;
}

interface MCPResourcesResponse {
    resources: MCPResource[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MCPResourcesResponse | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const resources: MCPResourcesResponse = {
        resources: [
            {
                uri: `${baseUrl}/api/posts`,
                name: 'Blog Posts',
                description:
                    'Recent blog posts from Hashnode and local markdown files',
                mimeType: 'application/json',
                schema: `${baseUrl}/schemas/blog-post.json`,
            },
            {
                uri: `${baseUrl}/api/youtube-videos`,
                name: 'YouTube Videos',
                description: 'Recent YouTube videos from the channel',
                mimeType: 'application/json',
                schema: `${baseUrl}/schemas/youtube-video.json`,
            },
            {
                uri: `${baseUrl}/data/repos.json`,
                name: 'GitHub Repositories',
                description:
                    'GitHub repository data with stars, descriptions, and categories',
                mimeType: 'application/json',
            },
            {
                uri: `${baseUrl}/posts`,
                name: 'Blog Posts Page',
                description: 'HTML page listing all blog posts',
                mimeType: 'text/html',
            },
            {
                uri: `${baseUrl}/videos`,
                name: 'Videos Page',
                description: 'HTML page listing all videos',
                mimeType: 'text/html',
            },
            {
                uri: `${baseUrl}/notes`,
                name: 'Notes Page',
                description: 'HTML page listing all notes and snippets',
                mimeType: 'text/html',
            },
            {
                uri: `${baseUrl}/.well-known/api-catalog`,
                name: 'API Catalog',
                description: 'RFC 9727 compliant API catalog with linkset',
                mimeType: 'application/linkset+json',
            },
            {
                uri: `${baseUrl}/.well-known/agent-skills/index.json`,
                name: 'Agent Skills Index',
                description:
                    'Agent Skills Discovery RFC compliant skills index',
                mimeType: 'application/json',
            },
            {
                uri: `${baseUrl}/.well-known/mcp/server-card.json`,
                name: 'MCP Server Card',
                description:
                    'Model Context Protocol server card with capabilities',
                mimeType: 'application/json',
            },
        ],
    };

    setCorsHeaders(res);
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=900',
    );

    // Add Link header for API discovery
    res.setHeader(
        'Link',
        `</api/mcp/tools>; rel="related", </.well-known/mcp/server-card.json>; rel="describedby"`,
    );

    res.status(200).json(resources);
}
