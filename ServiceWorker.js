const CACHE_NAME = 'simple_memo_app_pwa-v2';
const version = 'v8';
// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './new.html',
  './show.html',
  './edit.html',
  './style.css',
  './vue.js',
  './sw_register.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(version)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('update', (event) => {
  event.waitUntil(
    caches
      .open(version)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('message', function(event) {
  event.waitUntil(
    caches
      .open(version)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener("activate", function (event) {
  event.waitUntil(
    (function () {
      caches.keys().then(function (oldCacheKeys) {
        oldCacheKeys
          .filter(function (key) {
            return key !== version;
          })
          .map(function (key) {
            return caches.delete(key);
          });
      });
      clients.claim();
    })()
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch', event.request.url);

  event.respondWith(
    // リクエストに一致するデータがキャッシュにあるかどうか
    caches.match(event.request).then(function(cacheResponse) {
      // キャッシュがあればそれを返す、なければリクエストを投げる
      return cacheResponse || fetch(event.request).then(function(response) {
        return caches.open(version).then(function(cache) {
          // レスポンスをクローンしてキャッシュに入れる
          cache.put(event.request, response.clone());
          // オリジナルのレスポンスはそのまま返す
          return response;
        });  
      });
    })
  );
});

