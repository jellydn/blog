import { defineConfig } from 'tinacms';
import { postFields, videoFields } from './templates';

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'master';
const tinaClientId = process.env.NEXT_TINACMS_CLIENT_ID;
const tinaToken = process.env.NEXT_TINACMS_TOKEN;

export default defineConfig({
    branch,
    clientId: tinaClientId, // Get this from tina.io
    token: tinaToken, // Get this from tina.io
    client: { skip: false },
    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },
    media: {
        tina: {
            mediaRoot: '',
            publicFolder: 'public',
        },
    },
    schema: {
        collections: [
            {
                format: 'md',
                label: 'Videos',
                name: 'videos',
                path: 'videos',
                match: {
                    include: '**/*',
                },
                fields: [
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body of Document',
                        description: 'This is the markdown body',
                        isBody: true,
                    },
                    ...videoFields(),
                ],
            },
            {
                format: 'md',
                label: 'Posts',
                name: 'posts',
                path: 'posts',
                match: {
                    include: '**/*',
                },
                fields: [
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body of Document',
                        description: 'This is the markdown body',
                        isBody: true,
                    },
                    ...postFields(),
                ],
            },
        ],
    },
});
