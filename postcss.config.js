module.exports = {
    plugins: {
        '@tailwindcss/postcss': {},
        'postcss-flexbugs-fixes': true,
        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
            features: {
                'custom-properties': false,
            },
        },
    },
};
