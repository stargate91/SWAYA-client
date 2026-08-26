/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@site': fileURLToPath(new URL('./src/site', import.meta.url))
    }
  },
  optimizeDeps: {
    entries: ['index.html']
  },
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      ignored: ['**/bin/**', '**/data/**', new RegExp('[/\\\\]data[/\\\\]')]
    }
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules')) {
            if (
              normalizedId.includes('react-dom') ||
              normalizedId.includes('react-router') ||
              normalizedId.includes('/react/') ||
              normalizedId.includes('scheduler')
            ) {
              return 'vendor-react';
            }
            if (normalizedId.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
          if (normalizedId.includes('src/site/data/doc')) {
            return 'site-docs-data';
          }
          if (
            normalizedId.includes('src/site/data/compare') ||
            normalizedId.includes('src/site/schema/compare')
          ) {
            return 'site-compare-data';
          }
          const siteLocaleMatch = normalizedId.match(/src\/site\/locales\/([^/]+)/);
          if (siteLocaleMatch) {
            return `site-locale-${siteLocaleMatch[1]}`;
          }
          if (normalizedId.includes('src/app/locales')) {
            return 'app-locales';
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.{test,spec}.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});