import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'node:path';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mui: ['@mui/material', '@mui/icons-material'],
          vendor: ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
