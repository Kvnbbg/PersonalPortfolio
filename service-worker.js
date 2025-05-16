const CACHE_NAME = 'portfolio-cache-v1';
const OFFLINE_URL = '/offline.html';
const STATIC_ASSETS = [
  '/',                // this registers index.html
  '/index.html',
  '/offline.html',
  '/css/style.css',
  '/js/script.js',
  '/assets/site.webmanifest',
  '/assets/icons/kvnbbg-192x192.png',
  '/assets/icons/kvnbbg-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(oldKey => caches.delete(oldKey))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1) Navigation requests → network-first, fallback offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(res => res)
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // 2) Known static assets → cache-first
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // 3) All other requests → network-first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then(networkRes => {
        // optionally update cache:
        // caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkRes.clone()));
        return networkRes;
      })
      .catch(() => caches.match(event.request))
  );
});
