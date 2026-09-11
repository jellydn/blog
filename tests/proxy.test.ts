import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { proxy } from '../proxy';

describe('security headers', () => {
    it('keeps frames restricted under a nonce-based script policy', () => {
        const response = proxy(
            new NextRequest('https://productsway.com/resume.pdf'),
        );
        const policy = response.headers.get('Content-Security-Policy');

        expect(policy).toMatch(/script-src 'self' 'nonce-[^']+'/);
        expect(policy).not.toMatch(/script-src[^;]*'unsafe-inline'/);
        expect(policy).toContain('frame-src https://www.youtube.com');
        expect(policy).toContain("frame-ancestors 'none'");
    });

    it('uses only supported Permissions-Policy features', () => {
        const response = proxy(
            new NextRequest('https://productsway.com/resume.pdf'),
        );

        expect(response.headers.get('Permissions-Policy')).toBe(
            'camera=(), microphone=(), geolocation=()',
        );
    });
});
