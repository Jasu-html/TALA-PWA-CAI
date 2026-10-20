const CACHE = 'tala-pwa-v15';
const FILES = ['./','./index.html','./manifest.webmanifest','./css/styles.css','./css/playful.css','./css/vibrant.css','./js/data.js','./js/storage.js','./js/speech.js','./js/sfx.js','./js/visuals.js','./js/app.js','./assets/characters/tala.svg','./assets/characters/likha.svg','./assets/characters/titik.svg','./assets/characters/bilang.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tala-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  // Missing audio must remain a 404; never return HTML for an audio request.
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok&&response.status===200){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}
    return response;
  }).catch(()=>event.request.mode==='navigate'?caches.match('./index.html'):Response.error())));
});
