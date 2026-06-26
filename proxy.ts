import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function generateNonce(): string {
    return crypto.randomUUID();
}

const cspDirectives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': [
        "'self'",
        `'nonce-%nonce%'`,
        'https://gc.zgo.at',
        'https://dunghd.goatcounter.com',
        'https://cloud.umami.is',
    ],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
        "'self'",
        'https://gyazo.com',
        'https://cdn.hashnode.com',
        'https://hashnode.com',
        'https://i.ytimg.com',
        'data:',
    ],
    'frame-src': ['https://www.youtube.com'],
    'connect-src': [
        "'self'",
        'https://dunghd.goatcounter.com',
        'https://cloud.umami.is',
        'https://gateway.umami.is',
    ],
    'font-src': ["'self'"],
    'form-action': ["'self'"],
    'base-uri': ["'self'"],
    'frame-ancestors': ["'none'"],
    'object-src': ["'none'"],
    'upgrade-insecure-requests': [],
};

function buildCsp(nonce: string): string {
    return Object.entries(cspDirectives)
        .map(([key, values]) => {
            const resolved = values.map((v) => v.replace('%nonce%', nonce));
            return resolved.length > 0 ? `${key} ${resolved.join(' ')}` : key;
        })
        .join('; ');
}

export function proxy(request: NextRequest) {
    const nonce = generateNonce();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    response.headers.set('Content-Security-Policy', buildCsp(nonce));
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    );

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
