// next.config.js
const path = require('node:path');

module.exports = {
    reactStrictMode: true,
    turbopack: {
        rules: {
            '*.md': {
                loaders: ['raw-loader'],
                as: '*.js',
            },
        },
    },
    outputFileTracingRoot: path.join(__dirname),
    experimental: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gyazo.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.hashnode.com',
            },
            {
                protocol: 'https',
                hostname: 'hashnode.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' https://gc.zgo.at https://dunghd.goatcounter.com https://cloud.umami.is",
                            "style-src 'self' 'unsafe-inline'",
                            "img-src 'self' https://gyazo.com https://cdn.hashnode.com https://hashnode.com https://i.ytimg.com data:",
                            'frame-src https://www.youtube.com',
                            "connect-src 'self' https://dunghd.goatcounter.com https://cloud.umami.is",
                            "font-src 'self'",
                            "form-action 'self'",
                            "base-uri 'self'",
                            "frame-ancestors 'none'",
                            "object-src 'none'",
                            'upgrade-insecure-requests',
                        ].join('; '),
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/.well-known/webfinger',
                destination: '/.well-known/webfinger.json',
                permanent: true,
            },
        ];
    },
};
