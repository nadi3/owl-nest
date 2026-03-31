import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://owl-nest.ch',
      dynamicRoutes: [
        '/',
        '/tools',
        '/tools/wheel',
        '/tools/anonymizer',
        '/tools/visualizer',
        '/useless',
        '/portfolio',
        '/credits',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
