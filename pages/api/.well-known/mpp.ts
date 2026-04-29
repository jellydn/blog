import {
    ensureGet,
    handleOptions,
    sendDiscoveryResponse,
} from 'lib/api-helpers';
import { SITE_URL } from 'lib/constants';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Machine Payment Protocol (MPP) Discovery
 *
 * Returns MPP payment protocol metadata at /.well-known/mpp
 * for agent-native HTTP payments.
 *
 * Note: This blog currently does not implement MPP payment processing.
 * This endpoint serves as discovery for future MPP integration.
 *
 * @see https://mpp.dev
 * @see https://paymentauth.org/draft-payment-discovery-00.txt
 */

interface MPPPaymentInfo {
    intent: 'charge' | 'session';
    method: 'tempo' | 'stripe' | 'lightning' | 'card';
    amount: number;
    currency: string;
    description?: string;
}

interface MPPPathItem {
    path: string;
    methods: string[];
    'x-payment-info'?: MPPPaymentInfo;
}

interface MPPPaths {
    [key: string]: MPPPathItem;
}

interface MPPConfiguration {
    openapi: string;
    info: {
        title: string;
        version: string;
        description: string;
        contact: {
            name: string;
            email: string;
        };
    };
    servers: Array<{ url: string }>;
    paths: MPPPaths;
    'x-mpp-enabled': boolean;
    'x-mpp-status': 'disabled' | 'enabled' | 'test';
    'x-mpp-version': string;
    'x-mpp-spec': string;
    components?: {
        schemas: {
            PaymentRequest: {
                type: 'object';
                properties: {
                    intent: { type: 'string'; enum: string[] };
                    method: { type: 'string'; enum: string[] };
                    amount: { type: 'number' };
                    currency: { type: 'string' };
                };
            };
        };
    };
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MPPConfiguration | { error: string }>,
): void {
    if (handleOptions(req, res)) return;
    if (!ensureGet(req, res)) return;

    const baseUrl = SITE_URL;

    const mppConfig: MPPConfiguration = {
        openapi: '3.0.3',
        info: {
            title: 'Productsway Blog API',
            version: '0.1.0',
            description:
                'Blog and content API with optional MPP payment support',
            contact: {
                name: 'Dung Huynh Duc',
                email: 'dung@productsway.com',
            },
        },
        servers: [{ url: baseUrl }],
        // Paths disabled until MPP is implemented
        paths: {},

        // MPP extensions
        'x-mpp-enabled': false,
        'x-mpp-status': 'disabled',
        'x-mpp-version': '0.1.0',
        'x-mpp-spec': 'https://mpp.dev/spec',

        components: {
            schemas: {
                PaymentRequest: {
                    type: 'object',
                    properties: {
                        intent: { type: 'string', enum: ['charge', 'session'] },
                        method: {
                            type: 'string',
                            enum: ['tempo', 'stripe', 'lightning', 'card'],
                        },
                        amount: { type: 'number' },
                        currency: { type: 'string' },
                    },
                },
            },
        },
    };

    sendDiscoveryResponse(res, mppConfig, {
        contentType: 'application/json',
    });
}
