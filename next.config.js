// next.config.js
module.exports = {
    reactStrictMode: true,
    experimental: {},
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gyazo.com',
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
