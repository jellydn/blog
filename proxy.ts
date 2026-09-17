import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function generateNonce(): string {
    return crypto.randomUUID();
}

// Static pages cannot receive a request nonce, so pin the trusted next-themes bootstrap by hash.
const THEME_SCRIPT_HASH =
    "'sha256-NY+BIt+ZGRNmG4/d2Z4ec2+FJA2jpviW1ym3egy0Axc='";

const cspDirectives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': [
        "'self'",
        `'nonce-%nonce%'`,
        THEME_SCRIPT_HASH,
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
    'frame-src': ["'self'", 'https://www.youtube.com'],
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

function buildCsp(
    nonce: string,
    overrides: Record<string, string[]> = {},
): string {
    const directives: Record<string, string[]> = {
        ...cspDirectives,
        ...overrides,
    };

    return Object.entries(directives)
        .map(([key, values]) => {
            const resolved = values.map((v) => v.replace('%nonce%', nonce));
            return resolved.length > 0 ? `${key} ${resolved.join(' ')}` : key;
        })
        .join('; ');
}

export function proxy(request: NextRequest) {
    const nonce = generateNonce();
    const allowSameOriginFrame =
        request.nextUrl.pathname === '/files/resume.pdf';
    const contentSecurityPolicy = buildCsp(
        nonce,
        allowSameOriginFrame ? { 'frame-ancestors': ["'self'"] } : {},
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', contentSecurityPolicy);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });

    response.headers.set('Content-Security-Policy', contentSecurityPolicy);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=()',
    );

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
