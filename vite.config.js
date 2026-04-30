import { defineConfig } from 'vite';

export default defineConfig({
  base: '/spairparts/',
  root: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/spairparts',
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
  },
});
