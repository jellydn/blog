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
    async redirects() {
        return [
            {
                source: '/.well-known/webfinger',
                destination: '/.well-known/webfinger.json',
                permanent: true,
            },
        ];
    },

    async rewrites() {
        return [
            // RFC 9727: API Catalog
            {
                source: '/.well-known/api-catalog',
                destination: '/api/.well-known/api-catalog',
            },
            // Agent Skills Discovery
            {
                source: '/.well-known/agent-skills/index.json',
                destination: '/api/.well-known/agent-skills/index.json',
            },
            // MCP Server Card
            {
                source: '/.well-known/mcp/server-card.json',
                destination: '/api/.well-known/mcp/server-card.json',
            },
            // OAuth/OIDC Discovery
            {
                source: '/.well-known/openid-configuration',
                destination: '/api/.well-known/openid-configuration',
            },
            // OAuth 2.0 Authorization Server
            {
                source: '/.well-known/oauth-authorization-server',
                destination: '/api/.well-known/oauth-authorization-server',
            },
            // OAuth 2.0 Protected Resource (RFC 9728)
            {
                source: '/.well-known/oauth-protected-resource',
                destination: '/api/.well-known/oauth-protected-resource',
            },
            // Universal Commerce Protocol (UCP)
            {
                source: '/.well-known/ucp',
                destination: '/api/.well-known/ucp',
            },
            // Agentic Commerce Protocol (ACP)
            {
                source: '/.well-known/acp.json',
                destination: '/api/.well-known/acp.json',
            },
            // x402 Payment Protocol
            {
                source: '/.well-known/x402',
                destination: '/api/.well-known/x402',
            },
            // MPP (Machine Payment Protocol)
            {
                source: '/.well-known/mpp',
                destination: '/api/.well-known/mpp',
            },
        ];
    },
};
