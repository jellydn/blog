import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
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

interface X402Resource {
    path: string;
    methods: string[];
    price?: {
        amount: string;
        currency: string;
    };
    description: string;
}

interface X402Configuration {
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
    resources: X402Resource[];
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
    res: NextApiResponse<X402Configuration | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const x402Config: X402Configuration = {
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

        // Resources disabled until payment processing is implemented
        resources: [],

        middleware: {
            nextjs: false,
            express: false,
            hono: false,
        },

        // Extensions indicating current status
        'x-x402-status': 'disabled',
        'x-x402-enabled-resources': [],
    };

    sendDiscoveryResponse(res, x402Config, {
        contentType: 'application/json',
    });
}
