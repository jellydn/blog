import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Universal Commerce Protocol (UCP) Discovery
 *
 * Returns UCP discovery metadata at /.well-known/ucp
 * per the Universal Commerce Protocol specification.
 *
 * Note: This blog currently does not implement payment processing.
 * This endpoint serves as a discovery placeholder for future UCP integration.
 *
 * @see https://ucp.dev/specification/overview/
 */

interface UCPService {
    id: string;
    type: string;
    name: string;
    description?: string;
    enabled: boolean;
}

interface UCPCapability {
    id: string;
    name: string;
    version: string;
    enabled: boolean;
}

interface UCPEndpoint {
    path: string;
    methods: string[];
    content_types: string[];
}

interface UCPMetadata {
    protocol: {
        name: 'ucp';
        version: string;
        spec_url: string;
    };
    server: {
        name: string;
        version: string;
        base_url: string;
    };
    services: UCPService[];
    capabilities: UCPCapability[];
    endpoints: UCPEndpoint[];
    schemas: {
        discovery: string;
        payment: string;
        receipt: string;
    };
    // Extensions
    'x-ucp-enabled': boolean;
    'x-ucp-status': 'disabled' | 'enabled' | 'test';
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UCPMetadata | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const ucpMetadata: UCPMetadata = {
        protocol: {
            name: 'ucp',
            version: '0.1.0',
            spec_url: 'https://ucp.dev/specification/overview/',
        },
        server: {
            name: 'productsway-blog',
            version: '0.1.0',
            base_url: baseUrl,
        },
        services: [
            {
                id: 'content-access',
                type: 'digital-goods',
                name: 'Content Access',
                description: 'Access to blog posts, notes, and video content',
                enabled: false,
            },
            {
                id: 'consulting',
                type: 'service',
                name: 'Technical Consulting',
                description:
                    'Software development and architecture consulting services',
                enabled: false,
            },
        ],
        capabilities: [
            {
                id: 'payment-intents',
                name: 'Payment Intents',
                version: '0.1.0',
                enabled: false,
            },
            {
                id: 'receipts',
                name: 'Digital Receipts',
                version: '0.1.0',
                enabled: false,
            },
            {
                id: 'refunds',
                name: 'Refunds',
                version: '0.1.0',
                enabled: false,
            },
        ],
        // Endpoints hidden until UCP is enabled
        endpoints: [],
        schemas: {
            discovery: 'https://ucp.dev/schemas/discovery.json',
            payment: 'https://ucp.dev/schemas/payment.json',
            receipt: 'https://ucp.dev/schemas/receipt.json',
        },

        // Extensions indicating current status
        'x-ucp-enabled': false,
        'x-ucp-status': 'disabled',
    };

    sendDiscoveryResponse(res, ucpMetadata, {
        contentType: 'application/json',
    });
}
