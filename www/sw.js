/* Medu service worker — offline app shell.
   Cache-first for the (fully self-contained) assets so the installed PWA
   works with no network. Bump CACHE when any listed file changes. */
var CACHE = 'medu-v1';
var ASSETS = [
  './',
  'index.html',
  'medu.css',
  'manifest.webmanifest',
  'js/alphabet.js',
  'js/app.js',
  'js/keypad.js',
  'js/learn.js',
  'js/train.js',
  'data/gardiner_data_en.js',
  'data/licoes.js',
  'fonts/Fredoka.ttf',
  'fonts/Nunito.ttf',
  'fonts/Nunito-Italic.ttf',
  'fonts/NotoSansEgyptianHieroglyphs-Regular.ttf',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
  'photos/dendera.jpg',
  'photos/estela.jpg',
  'photos/estela1.jpeg',
  'photos/karnak.JPG'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        return res;
      }).catch(function () { return caches.match('index.html'); });
    })
  );
});
