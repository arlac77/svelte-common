const CURRENT_ASSET_CACHE = "assets-1";
const RUNTIME_CACHE = "runtime";

const currentCaches = [CURRENT_ASSET_CACHE, RUNTIME_CACHE];

self.addEventListener("install", event =>
  event.waitUntil(
    caches
      .open(CURRENT_ASSET_CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(self.skipWaiting())
  )
);

self.addEventListener("activate", event =>
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
      )
      .then(cachesToDelete =>
        Promise.all(
          cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))
        )
      )
      .then(() => self.clients.claim())
  )
);
