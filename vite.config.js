import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

// NOTE - The following configuration is for setting up path aliases in Vite. 
// This allows you to use shorthand paths when importing modules in your project,
//  making your code cleaner and easier to maintain.

import path from 'path';
const __dirname = path.resolve() 
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources'),
            '@components': path.resolve(__dirname, './resources/js/components'),
            '@pages': path.resolve(__dirname, './resources/js/pages'),
            '@stores': path.resolve(__dirname, './resources/js/stores'),
            '@plugins': path.resolve(__dirname, './resources/js/plugins'),
            '@auth': path.resolve(__dirname, './resources/js/auth'),
        },
    },
    plugins: [
        laravel({ input: ['resources/js/app.js'], refresh: true }),
        vue({
            template: { transformAssetUrls: { base: null, includeAbsolute: false } },
        }),
    ],
});