import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const isLocal = mode === 'development';

  return {
    // LOCAL:  base = '/spairparts/' so Vite dev server proxies correctly
    // LIVE:   base = '/'  so dist/index.html loads assets from root
    base: isLocal ? '/spairparts/' : '/',
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
  };
});
