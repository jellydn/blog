import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Agentic Commerce Protocol (ACP) Discovery
 *
 * Returns ACP discovery metadata at /.well-known/acp.json
 * per the Agentic Commerce Protocol specification.
 *
 * This allows agents to discover commerce API capabilities without
 * creating a checkout session first.
 *
 * Note: This blog currently does not implement payment processing.
 * This endpoint serves as a discovery placeholder for future ACP integration.
 *
 * @see https://agenticcommerce.dev
 * @see https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md
 */

interface ACPProtocol {
    name: 'acp';
    version: string;
    spec_url: string;
}

interface ACPTransport {
    type: 'http' | 'websocket';
    protocols: string[];
}

interface ACPService {
    id: string;
    name: string;
    description: string;
    type: string;
    pricing_model: 'fixed' | 'variable' | 'subscription' | 'usage';
    currency: string[];
    payment_methods: string[];
    enabled: boolean;
}

interface ACPCapabilities {
    services: ACPService[];
    payment_flows: string[];
    authentication: string[];
    receipts: boolean;
    refunds: boolean;
    webhooks: boolean;
}

interface ACPMetadata {
    protocol: ACPProtocol;
    server: {
        name: string;
        version: string;
        api_base_url: string;
    };
    transports: ACPTransport[];
    capabilities: ACPCapabilities;
    endpoints: {
        discovery: string;
        quote: string;
        checkout: string;
        receipt: string;
        webhook: string;
    };
    documentation: string;
    support: string;
    // Extensions
    'x-acp-enabled': boolean;
    'x-acp-status': 'disabled' | 'enabled' | 'test';
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ACPMetadata | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const acpMetadata: ACPMetadata = {
        protocol: {
            name: 'acp',
            version: '0.1.0',
            spec_url:
                'https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.discovery.md',
        },
        server: {
            name: 'productsway-blog',
            version: '0.1.0',
            api_base_url: `${baseUrl}/acp`,
        },
        transports: [
            {
                type: 'http',
                protocols: ['https'],
            },
        ],
        capabilities: {
            // Services hidden until ACP is enabled
            services: [],
            payment_flows: [],
            authentication: [],
            receipts: false,
            refunds: false,
            webhooks: false,
        },
        // Only discovery endpoint visible - others hidden until enabled
        endpoints: {
            discovery: `${baseUrl}/.well-known/acp.json`,
            quote: '',
            checkout: '',
            receipt: '',
            webhook: '',
        },
        documentation: `${baseUrl}/docs/acp`,
        support: 'dung@productsway.com',

        // Extensions indicating current status
        'x-acp-enabled': false,
        'x-acp-status': 'disabled',
    };

    sendDiscoveryResponse(res, acpMetadata, {
        contentType: 'application/json',
    });
}
