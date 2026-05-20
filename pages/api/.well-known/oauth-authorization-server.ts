import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
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
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    // OAuth 2.0 Authorization Server Metadata
    // Currently, APIs are public - this is a placeholder for future OAuth integration
    const metadata: OAuthAuthorizationServer = {
        issuer: baseUrl,

        // OAuth endpoints not implemented - APIs are public
        // When OAuth is added, uncomment and implement:
        // authorization_endpoint: `${baseUrl}/oauth/authorize`,
        // token_endpoint: `${baseUrl}/oauth/token`,
        // jwks_uri: `${baseUrl}/.well-known/jwks.json`,

        // Only advertise implicit grant (token response type) since we have
        // no authorization/token endpoints. Other grants require those.
        response_types_supported: ['token'],
        grant_types_supported: ['implicit'],
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

    sendDiscoveryResponse(res, metadata, {
        contentType: 'application/json',
    });
}
