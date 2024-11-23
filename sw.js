const cacheName = 'pigeonholed-v1.1';
const staticAssets = [
    './',
    './index.html',
    './src/styles.css',
    './src/Game.js',
    './src/data.js',

    './src/icons/favicon-96x96.png',
    './src/icons/favicon.svg',
    './src/icons/favicon.ico',
    './src/icons/apple-touch-icon.png',
    './src/maskable_icon_x192.png',

    './src/art/pigeon.svg',

    './src/sounds/coins.mp3',
    './src/sounds/correct.mp3',
    './src/sounds/fired.mp3',
    './src/sounds/letterHandling.mp3',
    './src/sounds/mistake.mp3',

    './src/fonts/PressStart2P-Regular.woff',
    './src/fonts/PressStart2P-Regular.woff2',
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}
