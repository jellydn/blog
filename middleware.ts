import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Agent-Ready Middleware
 *
 * Implements:
 * - RFC 8288 Link headers for agent discovery
 * - Markdown content negotiation (text/markdown Accept header)
 */

// Well-known resource links for agent discovery (RFC 8288)
const WELL_KNOWN_LINKS = [
    '</.well-known/api-catalog>; rel="api-catalog"; title="API Catalog"',
    '</.well-known/agent-skills/index.json>; rel="service-meta"; title="Agent Skills Index"',
    '</.well-known/mcp/server-card.json>; rel="service-meta"; title="MCP Server Card"',
    '</.well-known/openid-configuration>; rel="openid-configuration"; title="OpenID Connect Discovery"',
    '</.well-known/oauth-authorization-server>; rel="oauth-authorization-server"; title="OAuth 2.0 Authorization Server"',
    '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; title="OAuth 2.0 Protected Resource"',
    '</.well-known/acp.json>; rel="service-meta"; title="Agentic Commerce Protocol"',
    '</.well-known/ucp>; rel="service-meta"; title="Universal Commerce Protocol"',
    '</.well-known/x402>; rel="service-meta"; title="x402 Payment Protocol"',
    '</.well-known/mpp>; rel="service-meta"; title="Machine Payment Protocol"',
    '</api/posts>; rel="service-desc"; title="Blog Posts API"',
    '</api/youtube-videos>; rel="service-desc"; title="YouTube Videos API"',
    '</api/mcp/tools>; rel="service-desc"; title="MCP Tools"',
    '</api/mcp/resources>; rel="service-desc"; title="MCP Resources"',
    '</posts>; rel="collection"; title="Blog Posts"',
    '</videos>; rel="collection"; title="Videos"',
    '</notes>; rel="collection"; title="Notes"',
];

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    // Add Link headers to homepage and API endpoints (RFC 8288)
    if (
        pathname === '/' ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/.well-known/')
    ) {
        response.headers.set('Link', WELL_KNOWN_LINKS.join(', '));
        // Vary header for content negotiation (markdown support)
        // Append to existing Vary values if present
        const existingVary = response.headers.get('Vary') || '';
        const varyValue = existingVary ? `${existingVary}, Accept` : 'Accept';
        response.headers.set('Vary', varyValue);
    }

    // Content negotiation: Check for markdown request
    const acceptHeader = request.headers.get('accept') || '';
    const wantsMarkdown = acceptHeader.includes('text/markdown');

    if (
        wantsMarkdown &&
        !pathname.startsWith('/api/') &&
        !pathname.startsWith('/.well-known/')
    ) {
        // Set Vary header for content negotiation
        const existingVary = response.headers.get('Vary') || '';
        const varyValue = existingVary ? `${existingVary}, Accept` : 'Accept';
        response.headers.set('Vary', varyValue);
        response.headers.set('X-Markdown-Available', 'true');
    }

    return response;
}

export const config = {
    matcher: [
        '/',
        '/api/:path*',
        '/.well-known/:path*',
        '/posts/:path*',
        '/videos/:path*',
        '/notes/:path*',
    ],
};
