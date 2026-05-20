import {
    ensureGet,
    getBaseUrlFromRequest,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OpenID Connect Discovery (OIDC)
 *
 * Returns OpenID Connect discovery metadata at /.well-known/openid-configuration
 * per the OpenID Connect Discovery 1.0 specification.
 *
 * Note: This blog currently has public APIs with no authentication required.
 * This endpoint serves as a discovery placeholder for future OAuth/OIDC integration.
 *
 * @see http://openid.net/specs/openid-connect-discovery-1_0.html
 */

interface OpenIDConfiguration {
    issuer: string;
    authorization_endpoint?: string;
    token_endpoint?: string;
    userinfo_endpoint?: string;
    jwks_uri?: string;
    registration_endpoint?: string;
    scopes_supported?: string[];
    response_types_supported?: string[];
    grant_types_supported?: string[];
    subject_types_supported?: string[];
    id_token_signing_alg_values_supported?: string[];
    token_endpoint_auth_methods_supported?: string[];
    claims_supported?: string[];
    code_challenge_methods_supported?: string[];
    request_uri_parameter_supported?: boolean;
    require_request_uri_registration?: boolean;
    op_policy_uri?: string;
    op_tos_uri?: string;
    // Extension: Indicate that APIs are currently public
    'x-api-auth-required': boolean;
    'x-api-public-access': string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<OpenIDConfiguration | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = getBaseUrlFromRequest(req);

    // Currently, this blog has public APIs with no authentication
    // This configuration documents that state and provides discovery for future auth
    const config: OpenIDConfiguration = {
        issuer: baseUrl,
        // OIDC endpoints not implemented - APIs are public
        // When OIDC is added, implement authorization_endpoint, token_endpoint,
        // userinfo_endpoint, and jwks_uri, then restore full grant/response support.

        // Minimal scopes and flows for public API status
        scopes_supported: ['openid'],
        // Only implicit flow since we lack token/authorization endpoints
        response_types_supported: ['id_token'],
        grant_types_supported: ['implicit'],
        subject_types_supported: ['public', 'pairwise'],
        id_token_signing_alg_values_supported: ['RS256', 'ES256', 'HS256'],
        token_endpoint_auth_methods_supported: [
            'client_secret_basic',
            'client_secret_post',
            'private_key_jwt',
        ],
        claims_supported: [
            'sub',
            'iss',
            'aud',
            'exp',
            'iat',
            'name',
            'email',
            'email_verified',
        ],
        code_challenge_methods_supported: ['S256', 'plain'],
        request_uri_parameter_supported: false,
        require_request_uri_registration: false,
        op_policy_uri: `${baseUrl}/privacy`,
        op_tos_uri: `${baseUrl}/terms`,

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

    sendDiscoveryResponse(res, config, {
        contentType: 'application/json',
    });
}
