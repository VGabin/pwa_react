const cacheData = "v1";

this.addEventListener('install', (event) => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/",
                "/offline.html",
                "/static/js/bundle.js",
            ]);
        }));
    console.log(`${cacheData} Install`);
});

this.addEventListener('activate', (event) => {
    clients.claim();
    event.waitUntil((
        async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (!key.includes(cacheData)) {
                        return caches.delete(key);
                    };
                })
            );
        })()
    );
    console.log(`${cacheData} Activate`);
});

this.addEventListener("fetch", (event) => {
    console.log(`Fetching : ${event.request.url}, Mode : ${event.request.mode}`);
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    return await fetch(event.request);
                } catch (e) {
                    const cache = await caches.open(cacheData);
                    return await cache.match("/offline.html");
                };
            })()
        );
    }
});