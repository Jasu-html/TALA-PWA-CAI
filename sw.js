const CACHE = 'tala-pwa-v49';
const FILES = ['./','./index.html','./manifest.webmanifest','./css/styles.css?v=49','./css/playful.css?v=49','./css/vibrant.css?v=49','./css/compact.css?v=49','./js/data.js?v=49','./js/quest.js?v=49','./js/storage.js?v=49','./js/speech.js?v=49','./js/sfx.js?v=49','./js/visuals.js?v=49','./js/native.js?v=49','./js/app.js?v=49','./assets/characters/tala.svg','./assets/characters/likha.svg','./assets/characters/titik.svg','./assets/characters/bilang.svg'];
FILES.push('./css/public.css?v=49','./js/launch.js?v=49','./js/legal.js?v=49','./js/public.js?v=49','./assets/icons/tala.svg','./assets/icons/tala-192.png','./assets/icons/tala-512.png');
FILES.push('./css/night.css?v=49');
FILES.push('./css/teacher.css?v=49','./js/classroom.js?v=49','./js/teacher.js?v=49');
FILES.push('./js/files.js?v=49','./js/navigation.js?v=49','./css/navigation.css?v=49');
FILES.push('./css/fit.css?v=49','./css/builder.css?v=49','./js/builder.js?v=49');
FILES.push('./js/roles.js?v=49','./css/roles.css?v=49');
FILES.push('./assets/icons/tala-180.png','./assets/icons/tala-maskable-512.png');
for(const name of ['Tala','Titik','Likha','Bilang']) {
  for(const expression of ['Neutral','Happy','Talking'])FILES.push(`./assets/characters/${name}-${expression}.png`);
}
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
