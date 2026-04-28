import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414)
 *
 * Returns OAuth 2.0 Authorization Server metadata at
 * /.well-known/oauth-authorization-server per RFC 8414.
 *
 * Note: This blog currently has public APIs with no authentication required.
 * This endpoint serves as a discovery placeholder for future OAuth integration.
 *
 * @see https://www.rfc-editor.org/rfc/rfc8414
 */

interface OAuthAuthorizationServer {
    issuer: string;
    authorization_endpoint?: string;
    token_endpoint?: string;
    jwks_uri?: string;
    registration_endpoint?: string;
    scopes_supported?: string[];
    response_types_supported?: string[];
    response_modes_supported?: string[];
    grant_types_supported?: string[];
    token_endpoint_auth_methods_supported?: string[];
    token_endpoint_auth_signing_alg_values_supported?: string[];
    service_documentation?: string;
    ui_locales_supported?: string[];
    op_policy_uri?: string;
    op_tos_uri?: string;
    revocation_endpoint?: string;
    revocation_endpoint_auth_methods_supported?: string[];
    introspection_endpoint?: string;
    introspection_endpoint_auth_methods_supported?: string[];
    code_challenge_methods_supported?: string[];
    // Extensions
    'x-api-auth-required': boolean;
    'x-api-public-access': string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<OAuthAuthorizationServer | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const baseUrl = 'https://productsway.com';

    // OAuth 2.0 Authorization Server Metadata
    // Currently, APIs are public - this is a placeholder for future OAuth integration
    const metadata: OAuthAuthorizationServer = {
        issuer: baseUrl,

        // Optional endpoints (not currently implemented)
        // authorization_endpoint: `${baseUrl}/oauth/authorize`,
        // token_endpoint: `${baseUrl}/oauth/token`,
        // jwks_uri: `${baseUrl}/.well-known/jwks.json`,
        // registration_endpoint: `${baseUrl}/oauth/register`,
        // revocation_endpoint: `${baseUrl}/oauth/revoke`,
        // introspection_endpoint: `${baseUrl}/oauth/introspect`,

        scopes_supported: [
            'api:read',
            'api:write',
            'posts:read',
            'videos:read',
            'notes:read',
        ],
        response_types_supported: ['code', 'token', 'code token'],
        response_modes_supported: ['query', 'fragment', 'form_post'],
        grant_types_supported: [
            'authorization_code',
            'client_credentials',
            'refresh_token',
        ],
        token_endpoint_auth_methods_supported: [
            'client_secret_basic',
            'client_secret_post',
            'private_key_jwt',
        ],
        token_endpoint_auth_signing_alg_values_supported: ['RS256', 'ES256'],
        service_documentation: `${baseUrl}/docs/api`,
        ui_locales_supported: ['en-US', 'en'],
        op_policy_uri: `${baseUrl}/privacy`,
        op_tos_uri: `${baseUrl}/terms`,
        revocation_endpoint_auth_methods_supported: [
            'client_secret_basic',
            'client_secret_post',
        ],
        introspection_endpoint_auth_methods_supported: [
            'client_secret_basic',
            'client_secret_post',
        ],
        code_challenge_methods_supported: ['S256', 'plain'],

        // Custom extension indicating current API status
        'x-api-auth-required': false,
        'x-api-public-access': [
            '/api/posts',
            '/api/youtube-videos',
            '/.well-known/api-catalog',
            '/.well-known/agent-skills/index.json',
            '/.well-known/mcp/server-card.json',
        ],
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).json(metadata);
}
