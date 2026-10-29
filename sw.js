// Guarda la app en el teléfono para que abra sin internet.
// Subí VERSION cada vez que cambies algún archivo, así el teléfono baja la nueva.
const VERSION = 'caja-kiosco-v4';
// Librería de Firebase (la nube). Va con número de versión fijo, así que se guarda una vez y listo.
const SDK = 'caja-kiosco-firebase-10.12.2';
const SDK_ARCHIVOS = ['app', 'auth', 'firestore'].map(m => `https://www.gstatic.com/firebasejs/10.12.2/firebase-${m}.js`);
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './fonts/bricolage-grotesque.woff2',
  './fonts/figtree.woff2',
  './fonts/ibm-plex-mono-500.woff2',
  './fonts/ibm-plex-mono-600.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([
    caches.open(VERSION).then(c => c.addAll(ARCHIVOS)),
    caches.open(SDK).then(c => c.addAll(SDK_ARCHIVOS)).catch(() => {}),
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => ![VERSION, SDK].includes(k)).map(k => caches.delete(k))))
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

  if (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) {
    e.respondWith(caches.open(SDK).then(c => c.match(req).then(m => m || fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
    return;
  }
});
