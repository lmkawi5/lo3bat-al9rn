const CACHE="emoji-secret-v10";
const ASSETS=["./","./index.html","./style.css","./app.js","./manifest.json","./icon.svg","./auth.css","./config.js","./auth-api.js","./auth-ui.js","./community.css","./community.js","./social.js"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Network first (always fresh when online), cache as offline fallback
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(c=>c||caches.match("./index.html"))))});
