import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * MCP Server Card (SEP-1649)
 *
 * Returns an MCP Server Card at /.well-known/mcp/server-card.json
 * for agent discovery of Model Context Protocol capabilities.
 *
 * The schema is being standardized at:
 * @see https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127
 */

interface MCPServerInfo {
    name: string;
    version: string;
    description?: string;
    vendor?: string;
    contact?: string;
}

interface MCPTransport {
    type: 'http' | 'websocket' | 'sse';
    url: string;
    headers?: Record<string, string>;
}

interface MCPCapabilities {
    tools?: boolean;
    resources?: boolean;
    prompts?: boolean;
    logging?: boolean;
}

interface MCPServerCard {
    $schema: string;
    serverInfo: MCPServerInfo;
    transport: MCPTransport;
    capabilities: MCPCapabilities;
    endpoints?: {
        tools?: string;
        resources?: string;
        prompts?: string;
    };
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MCPServerCard | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const serverCard: MCPServerCard = {
        $schema: 'https://modelcontextprotocol.io/schemas/server-card.json',
        serverInfo: {
            name: 'productsway-blog',
            version: '0.1.0',
            description:
                'Blog and content API for productsway.com with posts, videos, and notes',
            vendor: 'productsway',
            contact: 'dung@productsway.com',
        },
        transport: {
            type: 'http',
            url: `${baseUrl}/api/mcp`,
            headers: {
                Accept: 'application/json',
            },
        },
        capabilities: {
            tools: true,
            resources: true,
            prompts: false,
            logging: false,
        },
        endpoints: {
            tools: `${baseUrl}/api/mcp/tools`,
            resources: `${baseUrl}/api/mcp/resources`,
        },
    };

    sendDiscoveryResponse(res, serverCard, {
        contentType: 'application/json',
    });
}
