// Real Web Audio rendering plus non-reduced-motion transition checks.
const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'.tools','sound-design');fs.mkdirSync(output,{recursive:true});
let browser,server;
(async()=>{
  try{await fetch('http://127.0.0.1:4173/');}catch{
    server=spawn(process.execPath,['tools/serve.cjs'],{cwd:root,stdio:'ignore',windowsHide:true});
    for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:4173/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
  }
  browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  const source=fs.readFileSync(path.join(root,'js/sfx.js'),'utf8');
  const signatures=[];
  for(const theme of ['home','phonics','numbers','arts','values']){
    const page=await browser.newPage();
    const result=await page.evaluate(async({source,theme})=>{
      const sampleRate=22050;
      const offline=new OfflineAudioContext(1,sampleRate*16,sampleRate);
      window.AudioContext=function(){return offline;};
      new Function('setTimeout','clearTimeout',source)(()=>0,()=>{});
      TALA_SFX.setWorld(theme);TALA_SFX.play('tap');TALA_SFX.enterWorld(theme);
      const buffer=await offline.startRendering(),samples=buffer.getChannelData(0);
      let peak=0,sum=0,signature=0;
      for(let i=0;i<samples.length;i++){
        if(!Number.isFinite(samples[i]))throw new Error('Invalid sample');
        peak=Math.max(peak,Math.abs(samples[i]));sum+=samples[i]*samples[i];
        signature+=samples[i]*((i%997)+1);
      }
      // Store short reviewable WAV previews as test artifacts, not app dependencies.
      const bytes=new Uint8Array(44+samples.length*2),view=new DataView(bytes.buffer);
      const word=(offset,text)=>[...text].forEach((c,i)=>view.setUint8(offset+i,c.charCodeAt(0)));
      word(0,'RIFF');view.setUint32(4,bytes.length-8,true);word(8,'WAVE');word(12,'fmt ');
      view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);
      view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);
      word(36,'data');view.setUint32(40,samples.length*2,true);
      for(let i=0;i<samples.length;i++)view.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,samples[i]))*32767),true);
      let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
      return {peak,rms:Math.sqrt(sum/samples.length),signature:signature.toFixed(4),wav:btoa(binary)};
    },{source,theme});
    assert.ok(result.peak<.95,theme+' must not clip');assert.ok(result.rms>.004,theme+' must remain audible at the boosted mix level');
    signatures.push(result.signature);
    fs.writeFileSync(path.join(output,theme+'.wav'),Buffer.from(result.wav,'base64'));
    console.log(`${theme}: peak=${result.peak.toFixed(3)}, RMS=${result.rms.toFixed(4)}`);
    await page.close();
  }
  assert.equal(new Set(signatures).size,5,'All five renders must differ');
  for(const viewport of [{width:390,height:780},{width:1024,height:768}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block',reducedMotion:'no-preference'});
    await context.addInitScript(()=>{
      localStorage.setItem('tala-pwa-progress-v1',JSON.stringify({curriculumVersion:2,learner:'Ana',introSeen:true,setupComplete:true,heardGuidance:['home','map:phonics','map:numbers','map:arts','map:values']}));
      localStorage.setItem('tala-public-preferences-v1',JSON.stringify({version:'2026-10-23.2',guardian:true,terms:true,processing:true}));
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/');
    await page.waitForSelector('#launch-splash',{state:'detached'});
    await page.locator('[data-action="start-game"]').click();
    for(const module of ['phonics','numbers','arts','values']){
      await page.locator(`[data-module="${module}"]`).click();
      assert.equal(await page.locator('.world-transition').count(),1);
      assert.equal(await page.locator('.world-transition').getAttribute('aria-hidden'),'true');
      assert.equal(await page.locator('.world-transition').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
      await page.waitForTimeout(370);
      await page.screenshot({path:path.join(output,`arrival-${module}-${viewport.width}.png`)});
      await page.waitForFunction(()=>!document.querySelector('.world-transition'));
      await page.locator('.map-heading .back-button').click();
      assert.equal(await page.locator('body').getAttribute('data-screen'),'home');
    }
    // Navigation before animation end must remove the overlay and its cleanup timer.
    await page.locator('[data-module="phonics"]').click();await page.evaluate(()=>TALA_UI.back());
    assert.equal(await page.locator('.world-transition').count(),0);
    assert.deepEqual(errors,[]);
    console.log(`Wave transitions and early cancellation passed at ${viewport.width}x${viewport.height}`);
    await context.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
