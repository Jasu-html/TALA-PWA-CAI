// Targeted rendered-color audit, not a claim of full WCAG conformance.
const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'.tools','theme-audit');
fs.mkdirSync(output,{recursive:true});const baseline=process.argv.includes('--baseline');
let browser,server;const results=[],navigation=[];
async function sample(page,label,selector,options={}){
  if(!await page.locator(selector).count()){
    if(baseline)return;
    assert.fail('Missing required audit sample: '+label+' ('+selector+')');
  }
  const data=await page.locator(selector).first().evaluate((el,options)=>{
    const parse=value=>value.startsWith('#')?value.slice(1).match(/../g).map(v=>parseInt(v,16)):[...value.matchAll(/[\d.]+/g)].map(v=>+v[0]);
    const blend=(color,base)=>{const a=color[3]??1;return color.slice(0,3).map((n,i)=>n*a+base[i]*(1-a));};
    const luminance=rgb=>rgb.slice(0,3).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((n,c,i)=>n+c*[.2126,.7152,.0722][i],0);
    const ratio=(a,b)=>{const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
    const style=getComputedStyle(el);let backgrounds=[],method='opaque CSS surface';
    const target=options.backgroundSelector?document.querySelector(options.backgroundSelector):el;
    for(let node=target;node;node=node.parentElement){
      const cs=getComputedStyle(node),color=parse(cs.backgroundColor);
      if(cs.backgroundImage!=='none'){
        const stops=[...cs.backgroundImage.matchAll(/rgba?\([^)]*\)/g)].map(m=>parse(m[0]));
        backgrounds=stops.map(c=>blend(c,[58,52,119]));method='gradient-stop samples';break;
      }
      if((color[3]??1)>0){backgrounds=[blend(color,[58,52,119])];method=(color[3]??1)<1?'alpha over conservative sky sample':method;break;}
    }
    if(!backgrounds.length){backgrounds=[[21,31,71],[58,52,119],[24,61,75]];method='night-canvas reference samples';}
    const foreground=parse(options.kind==='border'?style.borderTopColor:style.color);
    if(options.kind==='border'&&el.parentElement){const parent=parse(getComputedStyle(el.parentElement).backgroundColor);if((parent[3]??1)===1)backgrounds.push(parent);}
    const ratios=backgrounds.map(bg=>ratio(foreground,bg));
    return {text:(el.innerText||el.getAttribute('aria-label')||'').trim().slice(0,85),foreground:style[options.kind==='border'?'borderTopColor':'color'],backgrounds,ratio:Math.min(...ratios),fontSize:parseFloat(style.fontSize),method};
  },options);
  const row={screen:await page.locator('body').getAttribute('data-screen'),label,...data,minimum:options.minimum??(options.kind==='border'?3:4.5),minFont:options.kind==='border'?0:options.minFont??12};
  row.pass=row.ratio>=row.minimum&&row.fontSize>=row.minFont;results.push(row);
}
async function top(page,label){
  await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(300);
  const state=await page.evaluate(()=>['.topbar','.map-heading'].flatMap(selector=>{
    const el=document.querySelector(selector);return el?[{selector,scrolled:el.classList.contains('is-scrolled'),background:getComputedStyle(el).backgroundColor}]:[];
  }));
  navigation.push({label,edge:'top',state});
  if(!baseline)for(const item of state){assert.equal(item.scrolled,false);assert.equal(item.background,'rgba(0, 0, 0, 0)',item.selector+' must be transparent at the top');}
}
(async()=>{
  try{await fetch('http://127.0.0.1:4173/');}catch{
    server=spawn(process.execPath,['tools/serve.cjs'],{cwd:root,stdio:'ignore',windowsHide:true});
    for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:4173/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
  }
  browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block',reducedMotion:'reduce'});
  await context.addInitScript(()=>{
    localStorage.setItem('tala-pwa-progress-v1',JSON.stringify({curriculumVersion:2,learner:'Ana',introSeen:true,setupComplete:true,heardGuidance:['home','map:phonics']}));
    localStorage.setItem('tala-public-preferences-v1',JSON.stringify({version:'2026-10-21.2',guardian:true,terms:true,processing:true}));
    HTMLMediaElement.prototype.play=()=>Promise.resolve();
  });
  const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');await page.waitForSelector('#launch-splash',{state:'detached'});
  await sample(page,'start subtitle','.start-brand p');
  await sample(page,'start primary action','.start-play');
  await sample(page,'start instruction','.start-main>p',{minFont:16});
  await sample(page,'start parent link','.start-parent');
  await page.locator('[data-action="start-game"]').click();
  await top(page,'home');
  for(const [label,selector,options] of [
    ['header subtitle','.brand-button small',{}],['home instruction','.greeting p',{minFont:16}],['home quest title','.quest-card-copy>strong',{}],['home quest detail','.quest-card-copy>span:last-child',{minFont:16}],['story replay','.story-replay',{}]
  ])await sample(page,label,selector,options);
  for(const color of ['purple','blue','coral','gold']){
    await sample(page,color+' module label',`.world-card.${color} .world-guide`);
    await sample(page,color+' stage count',`.world-card.${color} .world-bottom>span:first-child`);
    await sample(page,color+' arrow',`.world-card.${color} .round-arrow`,{minimum:3});
  }
  await page.screenshot({path:path.join(output,(baseline?'before':'after')+'-home.png'),fullPage:true});
  await page.locator('[data-module="phonics"]').click();await top(page,'map');
  await sample(page,'map Back at top','.map-heading .back-button');
  await sample(page,'trail level label','.stage strong');
  await sample(page,'trail current level','.stage-button.is-current');
  await sample(page,'trail count','.map-count');
  await sample(page,'trail empty stars','.stage-stars .rating-star.is-empty',{minimum:3});
  await page.evaluate(()=>window.scrollTo(0,1000));await page.waitForTimeout(300);
  if(!baseline){for(const selector of ['.topbar','.map-heading'])assert.equal(await page.locator(selector).evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(222, 215, 240)');}
  await sample(page,'header subtitle after scroll','.brand-button small');await sample(page,'map Back after scroll','.map-heading .back-button');
  await top(page,'map return to top');
  await page.locator('[data-level="1"]').click();await top(page,'lesson');
  for(const [label,selector]of [['lesson title','.activity-card h1'],['lesson copy','.lesson-text'],['listen','.activity-heading .listen-button'],['tutorial','.tutorial-disclosure>summary'],['primary action','.activity-card>.primary-button']])await sample(page,label,selector,{minFont:label==='lesson copy'?16:12});
  await page.screenshot({path:path.join(output,(baseline?'before':'after')+'-lesson.png'),fullPage:true});
  await page.locator('[data-action="practice"]').click();
  for(const [label,selector]of [['question counter','.question-counter'],['instructions','.selection-instruction'],['answer','.choice'],['answer border','.choice']])await sample(page,label,selector,{kind:label==='answer border'?'border':'text',minFont:label==='answer'?16:12});
  await page.locator('[data-choice="0"]').click();await sample(page,'selected answer','.choice.selected',{minFont:16});await sample(page,'selected answer boundary','.choice.selected',{kind:'border'});await sample(page,'confirm enabled','.confirm-answer');
  await page.locator('header [data-action="dashboard"]').click();
  const [,a,op,b]=(await page.locator('label[for="adult-answer"]').innerText()).match(/(\d+) ([×+]) (\d+)/);await page.locator('#adult-answer').fill(String(op==='×'?+a*+b:+a+ +b));await page.locator('#adult-gate-form button[type="submit"]').click();
  await top(page,'menu');
  await sample(page,'menu replay guidance','.screen-listen');
  await sample(page,'menu eyebrow','.dashboard-title .eyebrow');
  await sample(page,'report empty stars','.quest-report .rating-star.is-empty',{minimum:3});
  for(const [label,selector,options]of [['menu counts','.report-row div span',{minFont:12}],['edit input','#edit-learner-name',{kind:'border'}],['input text','#edit-learner-name',{minFont:16}],['reset progress','[data-action="reset"]',{}]])await sample(page,label,selector,options);
  await page.screenshot({path:path.join(output,(baseline?'before':'after')+'-menu.png'),fullPage:true});
  if(!baseline){
    await page.evaluate(()=>TALA_STORE.complete('quest:1',3));
    await page.locator('header [data-action="dashboard"]').click();
    await sample(page,'report filled stars','.quest-report .rating-star.is-filled',{minimum:3});
  }
  await page.locator('[data-action="parent-open"]').click();await sample(page,'parent body','.public-settings p',{minFont:16});await sample(page,'parent destructive','.danger-button');
  await page.locator('[data-action="show-privacy"]').click();await sample(page,'privacy body','.legal-section p',{minFont:16});
  const failures=results.filter(r=>!r.pass),report={scope:'Targeted text/boundary samples. Gradients use explicit reference samples; no full accessibility certification.',results,navigation,failures};
  fs.writeFileSync(path.join(output,baseline?'before.json':'after.json'),JSON.stringify(report,null,2));
  for(const r of results)console.log(`${r.pass?'PASS':'FAIL'} ${r.label}: ${r.ratio.toFixed(2)}:1, ${r.fontSize}px (${r.method})`);
  console.log(`${results.length-failures.length}/${results.length} samples passed`);
  if(!baseline)assert.deepEqual(failures.map(r=>r.label),[],'Targeted contrast/type checks must pass');
  await context.close();
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
