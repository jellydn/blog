import { ensureGet, handleOptions, setCorsHeaders } from 'lib/api-helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * MCP Tools Endpoint
 *
 * Returns available MCP tools for the Model Context Protocol.
 * Tools represent operations that the server can perform.
 *
 * @see https://modelcontextprotocol.io
 */

interface MCPParameter {
    type: string;
    description?: string;
    enum?: string[];
}

interface MCPTool {
    name: string;
    description: string;
    parameters: {
        type: 'object';
        properties: Record<string, MCPParameter>;
        required?: string[];
    };
    returns?: {
        type: string;
        description: string;
    };
}

interface MCPToolsResponse {
    tools: MCPTool[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MCPToolsResponse | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const tools: MCPToolsResponse = {
        tools: [
            {
                name: 'fetch_blog_posts',
                description: 'Fetch recent blog posts from the site',
                parameters: {
                    type: 'object',
                    properties: {
                        limit: {
                            type: 'number',
                            description:
                                'Maximum number of posts to return (default: 6)',
                        },
                        tag: {
                            type: 'string',
                            description: 'Filter posts by tag',
                        },
                    },
                },
                returns: {
                    type: 'array',
                    description:
                        'Array of blog post objects with title, description, date, slug, and tags',
                },
            },
            {
                name: 'fetch_youtube_videos',
                description: 'Fetch recent YouTube videos from the channel',
                parameters: {
                    type: 'object',
                    properties: {
                        limit: {
                            type: 'number',
                            description:
                                'Maximum number of videos to return (default: 6)',
                        },
                    },
                },
                returns: {
                    type: 'array',
                    description:
                        'Array of video objects with id, title, description, thumbnailUrl, and publishedAt',
                },
            },
            {
                name: 'fetch_github_repos',
                description:
                    'Fetch GitHub repository data with stars and descriptions',
                parameters: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                            description:
                                'Filter by category (e.g., "VSCode Extensions", "Neovim Plugins")',
                        },
                        minStars: {
                            type: 'number',
                            description: 'Minimum star count filter',
                        },
                    },
                },
                returns: {
                    type: 'array',
                    description:
                        'Array of repository objects with name, description, stars, and url',
                },
            },
            {
                name: 'search_notes',
                description: 'Search through notes by tag or keyword',
                parameters: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Search query string',
                        },
                        tag: {
                            type: 'string',
                            description: 'Filter by specific tag',
                        },
                    },
                    required: ['query'],
                },
                returns: {
                    type: 'array',
                    description:
                        'Array of note objects matching the search criteria',
                },
            },
            {
                name: 'get_site_info',
                description:
                    'Get general information about the site and author',
                parameters: {
                    type: 'object',
                    properties: {},
                },
                returns: {
                    type: 'object',
                    description:
                        'Site information including name, description, author, and contact details',
                },
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
        `</api/mcp/resources>; rel="related", </.well-known/mcp/server-card.json>; rel="describedby"`,
    );

    res.status(200).json(tools);
}
