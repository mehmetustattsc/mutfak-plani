'use strict';
/* =========================================================
   MUTFAK PLANI — Service Worker (PWA)
   Uygulama dosyalarını önbelleğe alır; çevrimdışı çalışmayı
   ve "telefona kur" özelliğini sağlar.
   Yeni sürüm yayınlanınca CACHE_VERSION artırılmalıdır.
   ========================================================= */
const CACHE_VERSION = 'mutfak-plani-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './data.js',
  './prices-data.js',
  './i18n-de.js',
  './i18n-en.js',
  './base.css',
  './style.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((c) => c.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* dış istekler (fontlar vb.) dokunulmaz */

  /* Önbellekte varsa hemen yanıtla, arka planda güncelle (stale-while-revalidate) */
  e.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const fetching = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      if (cached) return cached;
      const fresh = await fetching;
      if (fresh) return fresh;
      /* Çevrimdışı ve önbellekte yoksa HTML için index'e düş */
      if (req.mode === 'navigate') {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      return new Response('Çevrimdışı', { status: 503 });
    })
  );
});
