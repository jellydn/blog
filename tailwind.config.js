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
        themes: [
            {
                minimal: {
                    primary: '#000000',
                    'primary-content': '#ffffff',
                    secondary: '#ffffff',
                    'secondary-content': '#000000',
                    accent: '#1a1a1a',
                    'accent-content': '#ffffff',
                    neutral: '#1f2937',
                    'neutral-content': '#ffffff',
                    'base-100': '#ffffff',
                    'base-200': '#f9fafb',
                    'base-300': '#f3f4f6',
                    'base-content': '#111827',
                    info: '#000000',
                    'info-content': '#ffffff',
                    success: '#1a1a1a',
                    'success-content': '#ffffff',
                    warning: '#6b7280',
                    'warning-content': '#ffffff',
                    error: '#000000',
                    'error-content': '#ffffff',
                    '--rounded-box': '0.25rem',
                    '--rounded-btn': '0.125rem',
                    '--rounded-badge': '0.25rem',
                    '--btn-focus-scale': '0.97',
                },
            },
            'winter',
        ],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
