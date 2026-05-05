import Document, {
    type DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';

/**
 * WebMCP Script
 *
 * Implements WebMCP to expose site tools to AI agents via the browser.
 * Calls navigator.modelContext.provideContext() with tool definitions.
 *
 * @see https://webmachinelearning.github.io/webmcp/
 * @see https://developer.chrome.com/blog/webmcp-epp
 */
const WEBMCP_SCRIPT = `
(function() {
    // Only run if modelContext API is available
    if (typeof navigator === 'undefined' || !navigator.modelContext) {
        return;
    }

    const baseUrl = window.location.origin;

    // Define tools that expose site functionality to AI agents
    const tools = [
        {
            name: 'fetchBlogPosts',
            description: 'Fetch recent blog posts from the site',
            inputSchema: {
                type: 'object',
                properties: {
                    limit: { type: 'number', description: 'Maximum posts to return' },
                    tag: { type: 'string', description: 'Filter by tag' }
                }
            },
            execute: async (args) => {
                const url = new URL('/api/posts', baseUrl);
                if (args?.limit) url.searchParams.set('limit', args.limit);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch posts: ' + response.status + ' ' + response.statusText);
                }
                return response.json();
            }
        },
        {
            name: 'fetchYouTubeVideos',
            description: 'Fetch recent YouTube videos',
            inputSchema: {
                type: 'object',
                properties: {
                    limit: { type: 'number', description: 'Maximum videos to return' }
                }
            },
            execute: async (args) => {
                const url = new URL('/api/youtube-videos', baseUrl);
                if (args?.limit) url.searchParams.set('limit', args.limit);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch videos: ' + response.status + ' ' + response.statusText);
                }
                return response.json();
            }
        },
        {
            name: 'fetchGitHubRepos',
            description: 'Fetch GitHub repository data',
            inputSchema: {
                type: 'object',
                properties: {
                    category: { type: 'string', description: 'Filter by category' },
                    minStars: { type: 'number', description: 'Minimum star count' }
                }
            },
            execute: async () => {
                const response = await fetch('/data/repos.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch repos: ' + response.status + ' ' + response.statusText);
                }
                return response.json();
            }
        },
        {
            name: 'searchNotes',
            description: 'Search notes by query or tag',
            inputSchema: {
                type: 'object',
                properties: {
                    query: { type: 'string', description: 'Search query' },
                    tag: { type: 'string', description: 'Filter by tag' }
                },
                required: ['query']
            },
            execute: async (args) => {
                // Navigate to notes page with search
                window.location.href = '/notes?search=' + encodeURIComponent(args.query);
                return { success: true, message: 'Navigating to notes search' };
            }
        },
        {
            name: 'getSiteInfo',
            description: 'Get site and author information',
            inputSchema: { type: 'object', properties: {} },
            execute: async () => {
                return {
                    name: 'productsway',
                    description: 'Blog and content by Dung Huynh Duc',
                    author: 'Dung Huynh Duc',
                    contact: 'dung@productsway.com',
                    social: {
                        github: 'https://github.com/jellydn',
                        twitter: 'https://twitter.com/jellydn',
                        linkedin: 'https://linkedin.com/in/dung-huynh-duc'
                    }
                };
            }
        }
    ];

    // Provide context to the model
    try {
        navigator.modelContext.provideContext({
            name: 'productsway-blog',
            description: 'Blog and content site for Dung Huynh Duc with posts, videos, and notes',
            tools: tools
        });
    } catch (e) {
        console.debug('WebMCP not initialized:', e);
    }
})();
`;

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    {/* WebMCP Support - Expose site tools to AI agents */}
                    <script
                        id="webmcp-init"
                        type="text/javascript"
                        dangerouslySetInnerHTML={{ __html: WEBMCP_SCRIPT }}
                    />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
