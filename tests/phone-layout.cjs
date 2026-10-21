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
      localStorage.setItem('tala-public-preferences-v1',JSON.stringify({version:'2026-10-21.2',guardian:true,terms:true,processing:true}));
      HTMLMediaElement.prototype.play=()=>Promise.resolve();
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/');
    const check=async(name,maxOverflow=10)=>{
      await page.locator('.character-image').evaluateAll(async images=>{
        await Promise.all(images.map(img=>img.decode()));
      });
      for(const src of await page.locator('.character-image').evaluateAll(images=>images.map(img=>img.getAttribute('src')))){
        assert.match(src,/assets\/characters\/(Tala|Titik|Likha|Bilang)-(Neutral|Happy|Talking)\.png$/,'Use the new PNG artwork, not a fallback');
      }
      const size=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight}));
      const theme=await page.evaluate(()=>({background:getComputedStyle(document.body).backgroundColor,gradient:getComputedStyle(document.body).backgroundImage,stars:getComputedStyle(document.body,':before').pointerEvents}));
      assert.equal(theme.background,'rgb(21, 31, 71)','Night sky must replace the yellow canvas on every screen');
      assert.ok(theme.gradient.includes('58, 52, 119'),'Keep the violet glow from the Start screen');
      assert.equal(theme.stars,'none','Sky decoration must not intercept taps');
      for(const color of await page.locator('.activity-card,.speech-bubble,.choice,.world-copy').evaluateAll(elements=>elements.map(el=>getComputedStyle(el).backgroundColor))){
        assert.notEqual(color,'rgb(255, 255, 255)','Avoid pure-white reading and answer surfaces against the night sky');
      }
      if(['lesson','question'].includes(name)&&viewport.height>=700){
        const bottom=await page.locator('.activity-card').evaluate(el=>el.getBoundingClientRect().bottom);
        assert.ok(bottom<=viewport.height-20,`${name} needs breathing room below the card: bottom=${bottom}, height=${viewport.height}`);
        assert.ok(bottom>=viewport.height-70,`${name} should fill the screen instead of leaving a large empty area: bottom=${bottom}, height=${viewport.height}`);
      }
      await page.screenshot({path:path.join(output,`${name}-${viewport.width}x${viewport.height}.png`),fullPage:true});
      if(size.scrollHeight>size.height+maxOverflow)console.log(await page.evaluate(()=>[...document.querySelectorAll('.topbar,.screen-listen,.greeting,.world-card,.world-copy,.gentle-note,.home-scene,.quest-card,.story-replay,.activity-card,.flow-top,.intro-card')].map(el=>({class:el.className,height:el.getBoundingClientRect().height,top:el.getBoundingClientRect().top,margin:getComputedStyle(el).margin}))));
      assert.ok(size.scrollWidth<=size.width+1,`${name} horizontal overflow: ${JSON.stringify(size)}`);
      assert.ok(size.scrollHeight<=size.height+maxOverflow,`${name} excessive vertical scroll: ${JSON.stringify(size)}`);
      console.log(`${name} ${viewport.width}x${viewport.height}: page height ${size.scrollHeight}`);
    };
    await page.waitForSelector('#launch-splash',{state:'detached'});
    await check('start',viewport.width===320?110:20);
    await page.locator('[data-action="start-game"]').click();
    // Preserve readable 12px secondary / 16px body text on short phones.
    // Allow bounded scrolling there, never clip content to force a single screen.
    const homeOverflow=viewport.width===320?220:viewport.height<700?110:20;
    await check('home',homeOverflow);
    if(viewport.height>=700){
      const bottom=await page.locator('.story-replay').evaluate(el=>el.getBoundingClientRect().bottom);
      assert.ok(bottom>=viewport.height-30&&bottom<=viewport.height+1,`Home must use the available height: bottom=${bottom}, viewport=${viewport.height}`);
      const artHeight=await page.locator('.world-art').first().evaluate(el=>el.getBoundingClientRect().height);
      assert.ok(artHeight>46,'Tall screens should expand the module artwork instead of leaving a bottom gap');
    }
    await page.locator('[data-module="phonics"]').click();
    const mapHeight=await page.evaluate(()=>document.documentElement.scrollHeight);assert.ok(mapHeight>2000,'Level trail must remain scrollable');
    await page.evaluate(()=>window.scrollTo(0,1200));
    await page.waitForFunction(()=>document.querySelector('.map-heading')?.classList.contains('is-scrolled'));
    const sticky=await page.evaluate(()=>({header:document.querySelector('.topbar').getBoundingClientRect().bottom,bar:document.querySelector('.map-heading').getBoundingClientRect().top,background:getComputedStyle(document.querySelector('.map-heading')).backgroundColor}));
    assert.ok(sticky.bar>=sticky.header&&sticky.bar<=sticky.header+12,`Trail Back must stick below the header: ${JSON.stringify(sticky)}`);
    assert.equal(sticky.background,'rgb(222, 215, 240)');
    const contrast=await page.locator('.topbar .brand-button strong').evaluate(el=>{
      const luminance=value=>{const rgb=value.match(/[\d.]+/g).slice(0,3).map(Number).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;});return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;};
      const a=luminance(getComputedStyle(el).color),b=luminance(getComputedStyle(document.querySelector('.topbar')).backgroundColor);
      return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    });
    assert.ok(contrast>=4.5,'Scrolled header branding must remain readable against its solid night surface');
    await page.screenshot({path:path.join(output,`map-sticky-${viewport.width}x${viewport.height}.png`)});
    await page.locator('.map-heading .back-button').click();
    assert.equal(await page.locator('body').getAttribute('data-screen'),'home');
    await page.locator('[data-module="phonics"]').click();
    await page.locator('[data-level="1"]').click();await check('lesson',viewport.width===320?110:20);
    assert.equal(await page.locator('.tutorial-disclosure').getAttribute('open'),null);
    await page.locator('[data-action="practice"]').click();await check('question',viewport.width===320?140:viewport.height<700?50:20);
    const choices=await page.locator('.choice').evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect();return {left:r.left,top:r.top,bottom:r.bottom,width:r.width};}));
    for(let i=1;i<choices.length;i++){
      assert.ok(Math.abs(choices[i].left-choices[0].left)<1,'Answers must share one vertical column');
      assert.ok(choices[i].top>=choices[i-1].bottom,'Answer rows must not overlap');
    }
    const bubbleHeight=await page.locator('.question-card .speech-bubble').evaluate(el=>el.getBoundingClientRect().height);
    assert.ok(bubbleHeight<=viewport.height*.48,'Dialogue must leave roughly half the play area for answers');
    for(const choice of choices)assert.ok(choice.bottom-choice.top<=80,'Simple answer rows must stay compact, not stretch to fill their zone');
    if(viewport.height>=850){
      const zones=await page.evaluate(()=>['.question-card>.guide-conversation','.question-card>.choices'].map(s=>document.querySelector(s).getBoundingClientRect().height));
      assert.ok(Math.abs(zones[0]-zones[1])<=2,'Dialogue and choices should evenly split the available play area');
    }
    await page.waitForFunction(()=>document.querySelector('.guide-conversation .character')?.dataset.expression==='Talking');
    await page.evaluate(()=>TALA_VISUALS.setMood(document.querySelector('.guide-conversation'),'happy'));
    assert.match(await page.locator('.guide-conversation .character-image').getAttribute('src'),/Titik-Happy\.png$/);
    await page.evaluate(()=>{TALA_SPEECH.stop();TALA_VISUALS.setMood(document.querySelector('.guide-conversation'),'idle');});
    assert.match(await page.locator('.guide-conversation .character-image').getAttribute('src'),/Titik-Neutral\.png$/);
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
    assert.ok(resized>=viewport.height+140-30&&resized<=viewport.height+141+(viewport.width===320?120:0),'Home must adapt after the viewport changes without clipping readable content');
    assert.deepEqual(errors,[],'No runtime errors');
    await context.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
