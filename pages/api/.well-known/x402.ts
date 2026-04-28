import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * x402 Payment Protocol Discovery
 *
 * Returns x402 payment protocol metadata at /.well-known/x402
 * for agent-native HTTP payments.
 *
 * Note: This blog currently does not implement x402 payment processing.
 * This endpoint serves as discovery for future payment integration.
 *
 * @see https://x402.org
 * @see https://github.com/coinbase/x402
 * @see https://docs.x402.org
 */

interface x402Resource {
    path: string;
    methods: string[];
    price?: {
        amount: string;
        currency: string;
    };
    description: string;
}

interface x402Configuration {
    version: string;
    spec_url: string;
    enabled: boolean;
    facilitator?: {
        url: string;
        version: string;
    };
    wallet_address?: string;
    network_id?: number;
    accepted_tokens?: string[];
    resources: x402Resource[];
    middleware?: {
        nextjs: boolean;
        express: boolean;
        hono: boolean;
    };
    // Extensions
    'x-x402-status': 'disabled' | 'enabled' | 'test';
    'x-x402-enabled-resources': string[];
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<x402Configuration | { error: string }>,
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const x402Config: x402Configuration = {
        version: '0.1.0',
        spec_url: 'https://x402.org/spec',
        enabled: false,

        // Facilitator configuration (when enabled)
        // facilitator: {
        //     url: 'https://facilitator.example.com',
        //     version: '1.0.0',
        // },

        // Wallet address for receiving payments
        // wallet_address: '0x...',

        // Network ID (e.g., 8453 for Base)
        // network_id: 8453,

        // Accepted tokens (e.g., USDC)
        accepted_tokens: ['USDC', 'ETH'],

        resources: [
            {
                path: '/api/premium-posts',
                methods: ['GET'],
                price: {
                    amount: '0.10',
                    currency: 'USDC',
                },
                description: 'Access to premium blog posts',
            },
            {
                path: '/api/consulting-booking',
                methods: ['POST'],
                price: {
                    amount: '50.00',
                    currency: 'USDC',
                },
                description: 'Book a consulting session',
            },
            {
                path: '/api/content-download',
                methods: ['GET'],
                price: {
                    amount: '5.00',
                    currency: 'USDC',
                },
                description: 'Download premium content packages',
            },
        ],

        middleware: {
            nextjs: false,
            express: false,
            hono: false,
        },

        // Extensions indicating current status
        'x-x402-status': 'disabled',
        'x-x402-enabled-resources': [],
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
    );

    // x402 uses 402 status for payment required - but this is discovery
    res.status(200).json(x402Config);
}
