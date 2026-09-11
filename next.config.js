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
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
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
