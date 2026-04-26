import { defineConfig } from 'vite';

export default defineConfig({
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
