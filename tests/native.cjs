const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../js/native.js'),'utf8');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function setup(){
  let event,resolve,reject,removed=0;
  const starts=[],cancels=[];
  const plugin={addListener:async(name,callback)=>{assert.equal(name,'listening');event=callback;return{remove:async()=>removed++};},
    start:options=>{starts.push(options);return new Promise((yes,no)=>{resolve=yes;reject=no;});},
    cancel:async options=>cancels.push(options)};
  const ctx={Capacitor:{isNativePlatform:()=>true,Plugins:{TalaVoiceInput:plugin}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);
  return {ctx,starts,cancels,event:data=>event(data),resolve:data=>resolve(data),reject:error=>reject(error),removed:()=>removed};
}
test('Native voice naming uses the injected Android plugin without needing the frontend npm runtime',async()=>{
  const env=setup(),recognition=new env.ctx.TALA_NATIVE.Recognition(),events=[];
  recognition.onstart=()=>events.push('listening');recognition.onresult=e=>events.push(e.results[0][0].transcript);
  recognition.start();await tick();assert.equal(env.starts[0].language,'fil-PH');
  env.event({sessionId:'stale'});assert.deepEqual(events,[]);
  env.event({sessionId:env.starts[0].sessionId});assert.deepEqual(events,['listening']);
  env.resolve({transcript:'Ako si Maria'});await tick();assert.deepEqual(events,['listening','Ako si Maria']);assert.equal(env.removed(),1);
});
test('Native voice input cancels the matching session and ignores delayed results',async()=>{
  const env=setup(),recognition=new env.ctx.TALA_NATIVE.Recognition();let results=0;
  recognition.onresult=()=>results++;recognition.start();await tick();recognition.abort();
  assert.equal(env.cancels[0].sessionId,env.starts[0].sessionId);
  env.resolve({transcript:'Late result'});await tick();assert.equal(results,0);assert.equal(env.removed(),1);
});
test('Native voice input reports permission denial and service/network errors to the Filipino UI',async()=>{
  for(const code of ['not-allowed','network','service-unavailable','language-not-supported']){
    const env=setup(),recognition=new env.ctx.TALA_NATIVE.Recognition();let reported;
    recognition.onerror=event=>reported=event.error;recognition.start();await tick();env.reject({code});await tick();assert.equal(reported,code);
  }
});
test('Cancelling before listener setup completes never starts the Android microphone',async()=>{
  const env=setup(),recognition=new env.ctx.TALA_NATIVE.Recognition();recognition.start();recognition.abort();await tick();
  assert.equal(env.starts.length,0);assert.equal(env.removed(),1);
});
test('Browser builds do not register the Android speech adapter',()=>{
  const ctx={};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);assert.equal(ctx.TALA_NATIVE,undefined);
});
