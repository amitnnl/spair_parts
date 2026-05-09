const CACHE_NAME = 'partspro-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.js',
  '/manifest.json',
  '/assets/app-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
