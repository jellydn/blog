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
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const baseUrl = 'https://productsway.com';

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
            services: [
                {
                    id: 'content-premium',
                    name: 'Premium Content Access',
                    description:
                        'Access to premium articles and exclusive content',
                    type: 'digital-goods',
                    pricing_model: 'subscription',
                    currency: ['USD'],
                    payment_methods: ['card', 'crypto'],
                    enabled: false,
                },
                {
                    id: 'consulting',
                    name: 'Development Consulting',
                    description: 'One-on-one software development consulting',
                    type: 'service',
                    pricing_model: 'variable',
                    currency: ['USD'],
                    payment_methods: ['card', 'wire', 'crypto'],
                    enabled: false,
                },
            ],
            payment_flows: ['immediate', 'escrow'],
            authentication: ['api-key', 'oauth2'],
            receipts: false,
            refunds: false,
            webhooks: false,
        },
        endpoints: {
            discovery: `${baseUrl}/.well-known/acp.json`,
            quote: `${baseUrl}/acp/quote`,
            checkout: `${baseUrl}/acp/checkout`,
            receipt: `${baseUrl}/acp/receipt`,
            webhook: `${baseUrl}/acp/webhook`,
        },
        documentation: `${baseUrl}/docs/acp`,
        support: 'dung@productsway.com',

        // Extensions indicating current status
        'x-acp-enabled': false,
        'x-acp-status': 'disabled',
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
    );
    res.status(200).json(acpMetadata);
}
