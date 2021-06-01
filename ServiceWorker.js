const CACHE_NAME = 'simple_memo_app_pwa';
// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './new.html',
  './show.html',
  './edit.html',
  './style.css',
  './vue.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./ServiceWorker.js').then(registration => {
      console.log('ServiceWorker registration successful.');
    }).catch(err => {
      console.log('ServiceWorker registration failed.');
    });
  });
}