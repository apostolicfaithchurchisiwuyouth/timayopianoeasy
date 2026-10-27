const CACHE_NAME = "piano-easy-v2";
const APP_SHELL = ["./", "./index.html", "./style.css", "./script.js", "./enhancements.js", "./manifest.json"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { if(event.request.method !== "GET") return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if(response.ok && new URL(event.request.url).origin === self.location.origin){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));} return response; }).catch(()=>caches.match("./index.html")))); });
