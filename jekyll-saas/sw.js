/**
 * NOVA Service Worker
 * A clean, robust service worker for caching offline pages, CSS, JS,
 * and standard web font files without aggressive state locking.
 */

const CACHE_NAME = 'nova-v1-cache';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/theme.js',
  '/assets/js/navigation.js',
  '/assets/js/pricing.js',
  '/assets/js/faq.js',
  '/assets/js/announcement.js',
  '/assets/icons/favicon.svg'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened service worker cache system');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup older caches)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Cleaning up obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Cache-First with Network fallback)
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Serve from cache, fetch update in background asynchronously
          fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse));
              }
            }).catch(() => {/* Ignore background update failures offline */});
          return cachedResponse;
        }

        return fetch(event.request).then(response => {
          // Cache dynamically fetched static assets
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          const url = new URL(event.request.url);
          const isStaticAsset = url.pathname.startsWith('/assets/') || url.pathname.endsWith('.webmanifest');

          if (isStaticAsset) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        });
      })
  );
});
