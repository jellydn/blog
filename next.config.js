// next.config.js
module.exports = {
    experimental: {
        concurrentFeatures: false,
        serverComponents: false,
    },
    images: {
        domains: ['gyazo.com'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
};
