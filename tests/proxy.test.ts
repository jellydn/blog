import { createHash } from 'node:crypto';
import { ThemeProvider } from 'lib/useTheme';
import { NextRequest } from 'next/server';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
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

    it('allows the trusted theme bootstrap on static pages by hash', () => {
        const response = proxy(new NextRequest('https://productsway.com/'));
        const policy = response.headers.get('Content-Security-Policy');
        const markup = renderToStaticMarkup(
            createElement(ThemeProvider, null, createElement('main')),
        );
        const script = markup.match(/<script[^>]*>(.*?)<\/script>/)?.[1];
        const hash = createHash('sha256')
            .update(script ?? '')
            .digest('base64');

        expect(script).toBeTruthy();
        expect(policy).toContain(`'sha256-${hash}'`);
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
