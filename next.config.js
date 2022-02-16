// next.config.js
module.exports = {
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
