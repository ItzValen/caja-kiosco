// Guarda la app en el teléfono para que abra sin internet.
// Subí VERSION cada vez que cambies algún archivo, así el teléfono baja la nueva.
const VERSION = 'caja-kiosco-v1';
const FONTS = VERSION + '-fuentes';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    // La página: primero intenta la versión nueva; sin internet usa la guardada.
    if (req.mode === 'navigate') {
      e.respondWith(
        fetch(req)
          .then(res => { const copia = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copia)); return res; })
          .catch(() => caches.match('./index.html'))
      );
      return;
    }
    e.respondWith(caches.match(req).then(m => m || fetch(req)));
    return;
  }

  // Tipografías de Google: se guardan la primera vez que se abren con internet.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONTS).then(c => c.match(req).then(m => {
        const red = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => m);
        return m || red;
      }))
    );
  }
});
