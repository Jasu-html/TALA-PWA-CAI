// Real headless Chrome layout checks; npm run test:phone (Chrome must be installed).
const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const output=path.join(root,'.tools','phone-layout');fs.mkdirSync(output,{recursive:true});
let server,browser;
(async()=>{
  try{await fetch('http://127.0.0.1:4173/');}catch{
    server=spawn(process.execPath,['tools/serve.cjs'],{cwd:root,stdio:'ignore',windowsHide:true});
    for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:4173/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
  }
  browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  const sizes=process.argv.includes('--tablet')
    ? [{width:600,height:960},{width:768,height:1024},{width:800,height:1280},{width:1024,height:768},{width:1280,height:800},{width:1366,height:1024},{width:800,height:600}]
    : [{width:360,height:640},{width:390,height:780},{width:412,height:900},{width:360,height:800},{width:320,height:568}];
  for(const viewport of sizes){
    const context=await browser.newContext({viewport,serviceWorkers:'block',reducedMotion:'reduce',isMobile:true,hasTouch:true});
    await context.addInitScript(()=>{
      localStorage.setItem('tala-pwa-progress-v1',JSON.stringify({curriculumVersion:2,learner:'Ana',introSeen:true,setupComplete:true,heardGuidance:['home','map:phonics']}));
      HTMLMediaElement.prototype.play=()=>Promise.resolve();
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/');
    const check=async(name,maxOverflow=10)=>{
      const size=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));
      await page.screenshot({path:path.join(output,`${name}-${viewport.width}x${viewport.height}.png`),fullPage:true});
      if(size.scrollHeight>size.height+maxOverflow)console.log(await page.evaluate(()=>[...document.querySelectorAll('.topbar,.screen-listen,.greeting,.world-card,.world-copy,.gentle-note,.home-scene,.quest-card,.story-replay,.activity-card,.flow-top,.intro-card')].map(el=>({class:el.className,height:el.getBoundingClientRect().height,top:el.getBoundingClientRect().top,margin:getComputedStyle(el).margin}))));
      assert.ok(size.scrollWidth<=size.width+1,`${name} horizontal overflow: ${JSON.stringify(size)}`);
      assert.ok(size.scrollHeight<=size.height+maxOverflow,`${name} excessive vertical scroll: ${JSON.stringify(size)}`);
      console.log(`${name} ${viewport.width}x${viewport.height}: page height ${size.scrollHeight}`);
    };
    await check('home',viewport.width===320?110:20);
    if(viewport.height>=700){
      const bottom=await page.locator('.story-replay').evaluate(el=>el.getBoundingClientRect().bottom);
      assert.ok(bottom>=viewport.height-30&&bottom<=viewport.height+1,`Home must use the available height: bottom=${bottom}, viewport=${viewport.height}`);
      const artHeight=await page.locator('.world-art').first().evaluate(el=>el.getBoundingClientRect().height);
      assert.ok(artHeight>46,'Tall screens should expand the module artwork instead of leaving a bottom gap');
    }
    await page.locator('[data-module="phonics"]').click();
    const mapHeight=await page.evaluate(()=>document.documentElement.scrollHeight);assert.ok(mapHeight>2000,'Level trail must remain scrollable');
    await page.locator('[data-level="1"]').click();await check('lesson',viewport.width===320?110:20);
    assert.equal(await page.locator('.tutorial-disclosure').getAttribute('open'),null);
    await page.locator('[data-action="practice"]').click();await check('question',viewport.width===320?110:20);
    await page.locator('[data-choice="0"]').click();
    await page.locator('header [data-action="dashboard"]').click();
    await page.evaluate(()=>TALA_UI.back());
    assert.equal(await page.locator('body').getAttribute('data-screen'),'practice');
    assert.equal(await page.locator('[data-choice="0"]').getAttribute('aria-pressed'),'true');
    await page.evaluate(()=>TALA_UI.back());assert.equal(await page.locator('body').getAttribute('data-screen'),'lesson');
    await page.evaluate(()=>TALA_UI.back());assert.equal(await page.locator('body').getAttribute('data-screen'),'map');
    await page.evaluate(()=>TALA_UI.back());assert.equal(await page.locator('body').getAttribute('data-screen'),'home');
    assert.equal(await page.evaluate(()=>TALA_UI.back()),false);
    await page.locator('[data-action="intro-open"]').click();await check('story',viewport.width===320?110:20);
    if(viewport.height>=700){
      const bottom=await page.locator('.intro-card').evaluate(el=>el.getBoundingClientRect().bottom);
      assert.ok(bottom>=viewport.height-25,'Story card should fill the available height');
    }
    await page.locator('[data-action="intro-skip"]').click();
    await page.setViewportSize({width:viewport.width,height:viewport.height+140});
    const resized=await page.locator('.story-replay').evaluate(el=>el.getBoundingClientRect().bottom);
    assert.ok(resized>=viewport.height+140-30&&resized<=viewport.height+141,'Home must adapt after the viewport changes');
    assert.deepEqual(errors,[],'No runtime errors');
    await context.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
