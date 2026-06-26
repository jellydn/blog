import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'components'),
            lib: path.resolve(__dirname, 'lib'),
            data: path.resolve(__dirname, 'data'),
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.tsx'],
        include: ['tests/**/*.test.{ts,tsx}'],
        globals: true,
    },
});
