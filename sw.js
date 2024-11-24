const cacheName = 'pigeonholed-v2';
const staticAssets = [
    './index.html',
    './src/styles.css',
    './src/Game.js',
    './src/data.js',
    './src/icons/favicon-96x96.png',
    './src/icons/favicon.svg',
    './src/icons/favicon.ico',
    './src/icons/apple-touch-icon.png',
    './src/art/pigeon.svg',
    './src/sounds/coins.mp3',
    './src/sounds/correct.mp3',
    './src/sounds/fired.mp3',
    './src/sounds/letterHandling.mp3',
    './src/sounds/mistake.mp3',
    './src/fonts/PressStart2P-Regular.woff',
    './src/fonts/PressStart2P-Regular.woff2',
    './sw.js',
    './webmanifest.json',
];

self.addEventListener('install', async (e) => {
    const cache = await caches.open(cacheName);

    try {
        await Promise.all(staticAssets.map(async (asset) => {
            const response = await fetch(asset);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${asset}`);
            }
            await cache.put(asset, response);
        }));
        return self.skipWaiting();
    } catch (err) {
        console.error('Failed to cache asset:', err);
    }
});


self.addEventListener('activate', (e) => {
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
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
    return cached || fetch(req).then((res) => {
        cache.put(req, res.clone());
        return res;
    });
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached || fetch(req);
    }
}
