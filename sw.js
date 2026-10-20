const CACHE = 'tala-pwa-v20';
const FILES = ['./','./index.html','./manifest.webmanifest','./css/styles.css?v=20','./css/playful.css?v=20','./css/vibrant.css?v=20','./js/data.js?v=20','./js/quest.js?v=20','./js/storage.js?v=20','./js/speech.js?v=20','./js/sfx.js?v=20','./js/visuals.js?v=20','./js/app.js?v=20','./assets/characters/tala.svg','./assets/characters/likha.svg','./assets/characters/titik.svg','./assets/characters/bilang.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tala-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  const shell=event.request.mode==='navigate'||/\.(?:html|css|js|webmanifest)$/.test(new URL(event.request.url).pathname);
  event.respondWith((async()=>{
    // Restrict lookups to this release instead of matching stale older caches.
    const cache=await caches.open(CACHE);
    const cached=await cache.match(event.request);
    const network=async()=>{
      const response=await fetch(event.request,shell?{cache:'no-cache'}:undefined);
      if(response.ok&&response.status===200)event.waitUntil(cache.put(event.request,response.clone()));
      return response;
    };
    // Code/styles check the server first. Recordings and images stay cache-first.
    if(!shell&&cached)return cached;
    try{return await network();}
    catch{return cached||(event.request.mode==='navigate'?await cache.match('./index.html'):null)||Response.error();}
  })());
});
