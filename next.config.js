// next.config.js
const path = require('node:path');

module.exports = {
    reactStrictMode: true,
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
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
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
