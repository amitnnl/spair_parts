import { defineConfig } from 'vite';

export default defineConfig({
  base: '/spairparts/',
  root: './',
  server: {
    proxy: {
      '/spairparts/api': {
        target: 'http://localhost/spairparts',
        rewrite: (path) => path.replace(/^\/spairparts/, ''),
        changeOrigin: true,
      }
    }
  },
  build: {
    outDir: 'dist',
  },
});
