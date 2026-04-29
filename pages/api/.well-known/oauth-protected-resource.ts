import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728)
 *
 * Returns OAuth Protected Resource metadata at /.well-known/oauth-protected-resource
 * per RFC 9728. This helps agents discover how to obtain access tokens for protected APIs.
 *
 * Note: This blog currently has public APIs with no authentication required.
 * This endpoint documents that state and provides metadata for future protected resources.
 *
 * @see https://www.rfc-editor.org/rfc/rfc9728
 */

interface OAuthProtectedResource {
    resource: string;
    authorization_servers?: string[];
    bearer_methods_supported?: string[];
    scopes_supported?: string[];
    resource_documentation?: string;
    resource_signature?: string;
    resource_policy_uri?: string;
    resource_tos_uri?: string;
    jwks_uri?: string;
    // Extensions
    'x-resource-status': 'public' | 'protected' | 'mixed';
    'x-public-endpoints': string[];
    'x-protected-endpoints': string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<OAuthProtectedResource | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    // OAuth Protected Resource Metadata
    // Currently all resources are public - this documents that state
    const metadata: OAuthProtectedResource = {
        resource: baseUrl,

        // Authorization servers that can issue tokens for this resource
        // Currently empty as no auth is required
        authorization_servers: [],

        bearer_methods_supported: ['header', 'body', 'query'],

        scopes_supported: [
            'api:read',
            'api:write',
            'posts:read',
            'posts:write',
            'videos:read',
            'notes:read',
            'notes:write',
        ],

        resource_documentation: `${baseUrl}/docs/api`,
        resource_policy_uri: `${baseUrl}/privacy`,
        resource_tos_uri: `${baseUrl}/terms`,
        // jwks_uri: `${baseUrl}/.well-known/jwks.json`,

        // Custom extensions documenting current API status
        'x-resource-status': 'public',
        'x-public-endpoints': [
            `${baseUrl}/api/posts`,
            `${baseUrl}/api/youtube-videos`,
            `${baseUrl}/.well-known/api-catalog`,
            `${baseUrl}/.well-known/agent-skills/index.json`,
            `${baseUrl}/.well-known/mcp/server-card.json`,
            `${baseUrl}/.well-known/openid-configuration`,
            `${baseUrl}/.well-known/oauth-authorization-server`,
            `${baseUrl}/posts`,
            `${baseUrl}/videos`,
            `${baseUrl}/notes`,
        ],
        'x-protected-endpoints': [],
    };

    sendDiscoveryResponse(res, metadata, {
        contentType: 'application/json',
    });
}
