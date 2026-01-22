/* eslint-disable global-require */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    daisyui: {
        themes: ['corporate', 'winter'],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
