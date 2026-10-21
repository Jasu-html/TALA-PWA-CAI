const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base='http://localhost:4173/';
function setup(){
  const handlers={},stores=new Map(),calls=[];
  const absolute=input=>new URL(typeof input==='string'?input:input.url,base).href;
  function store(name){
    if(!stores.has(name))stores.set(name,new Map());
    const data=stores.get(name);
    return {match:async key=>data.get(absolute(key))?.clone(),put:async(key,response)=>{data.set(absolute(key),response);}};
  }
  const env={offline:false,body:'fresh asset',status:200};
  const ctx={URL,Response,self:{location:{origin:new URL(base).origin},addEventListener:(name,fn)=>handlers[name]=fn},
    caches:{open:async name=>store(name),match:()=>{throw new Error('Do not mix releases with global cache matching');}},
    fetch:async(request,options)=>{calls.push({request,options});if(env.offline)throw new Error('offline');return new Response(env.body,{status:env.status});}};
  vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),ctx);
  const current=vm.runInContext('CACHE',ctx);
  async function request(url,mode='cors'){
    let response;const pending=[];
    handlers.fetch({request:{url:absolute(url),method:'GET',mode},respondWith:p=>response=p,waitUntil:p=>pending.push(p)});
    const result=await response;await Promise.all(pending);return result;
  }
  return {env,calls,request,cache:store(current),oldCache:store('tala-pwa-v18')};
}
test('Every supplied character expression is in the offline installation list',()=>{
  const ctx={self:{addEventListener(){}}};vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8'),ctx);
  const files=vm.runInContext('FILES',ctx);
  for(const name of ['Tala','Titik','Likha','Bilang'])for(const expression of ['Neutral','Happy','Talking']){
    assert.ok(files.includes(`./assets/characters/${name}-${expression}.png`));
  }
});
test('Styles and scripts refresh online instead of remaining stuck on cached versions',async()=>{
  const {env,cache,calls,request}=setup();
  for(const asset of ['css/vibrant.css?v=19','js/app.js?v=19']){
    await cache.put(asset,new Response('old asset'));
    env.body='new '+asset;
    assert.equal(await (await request(asset)).text(),env.body);
    assert.equal(calls.at(-1).options.cache,'no-cache');
    assert.equal(await (await cache.match(asset)).text(),env.body);
  }
});
test('Offline styles and navigation use this release; older release entries are ignored',async()=>{
  const {env,cache,oldCache,request}=setup();env.offline=true;
  await cache.put('css/vibrant.css?v=19',new Response('current quest styles'));
  await cache.put('./index.html',new Response('current home'));
  await oldCache.put('js/app.js?v=19',new Response('incompatible old code'));
  assert.equal(await (await request('css/vibrant.css?v=19')).text(),'current quest styles');
  assert.equal(await (await request('a-saved-screen','navigate')).text(),'current home');
  assert.equal((await request('js/app.js?v=19')).type,'error');
});
test('Recordings stay cache-first and missing MP3 files never receive HTML',async()=>{
  const {env,cache,calls,request}=setup();
  await cache.put('assets/audio/fil/shared/titik/A.mp3',new Response('recording'));
  await cache.put('./index.html',new Response('home HTML'));
  assert.equal(await (await request('assets/audio/fil/shared/titik/A.mp3')).text(),'recording');
  assert.equal(calls.length,0);
  env.status=404;env.body='Not found';
  const missing='assets/audio/fil/shared/titik/B.mp3';
  const response=await request(missing);
  assert.equal(response.status,404);assert.equal(await response.text(),'Not found');
  assert.equal(await cache.match(missing),undefined);
  env.offline=true;assert.equal((await request(missing)).type,'error');
});
