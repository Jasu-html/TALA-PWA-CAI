const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'.tools','public-launch');
fs.mkdirSync(output,{recursive:true});let browser,server;
async function adult(page){
  const question=await page.locator('label[for="adult-answer"]').innerText();
  const [,a,operator,b]=question.match(/(\d+) ([×+]) (\d+)/);
  await page.locator('#adult-answer').fill(String(operator==='×'?+a*+b:+a+ +b));await page.locator('#adult-gate-form button[type="submit"]').click();
}
async function screenshot(page,name){
  await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('.screen')).opacity)>.99);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),name+' must not overflow horizontally');
  await page.screenshot({path:path.join(output,name+'.png'),fullPage:true});
}
(async()=>{
  try{await fetch('http://127.0.0.1:4173/');}catch{
    server=spawn(process.execPath,['tools/serve.cjs'],{cwd:root,stdio:'ignore',windowsHide:true});
    for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:4173/');break;}catch{await new Promise(r=>setTimeout(r,100));}}
  }
  browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  for(const viewport of [{width:390,height:780},{width:1024,height:768},{width:320,height:568}]){
    const context=await browser.newContext({viewport,serviceWorkers:'block',reducedMotion:'no-preference'});
    await context.addInitScript(()=>{
      window.testMicStarts=0;
      window.SpeechRecognition=class{start(){window.testMicStarts++;}abort(){}};
      HTMLMediaElement.prototype.play=()=>Promise.resolve();
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));page.on('dialog',dialog=>dialog.accept());
    await page.goto('http://127.0.0.1:4173/');
    await page.screenshot({path:path.join(output,`splash-${viewport.width}.png`)});
    await page.waitForSelector('#launch-splash',{state:'detached'});
    assert.equal(await page.locator('body').getAttribute('data-screen'),'start');
    await screenshot(page,'start-'+viewport.width);
    await page.locator('[data-action="start-game"]').click();await adult(page);
    assert.equal(await page.locator('input[type="checkbox"]:checked').count(),0,'No preselected consent');
    await screenshot(page,'consent-'+viewport.width);
    await page.locator('[data-action="show-privacy"]').click();await screenshot(page,'privacy-'+viewport.width);
    assert.ok((await page.locator('.public-panel').innerText()).includes('j.alarcio@olivarezcollege.edu.ph'));
    await page.locator('[data-action="public-back"]').click();
    assert.equal(await page.locator('body').getAttribute('data-screen'),'consent');
    await page.locator('#guardian-confirm').check();await page.locator('#terms-confirm').check();
    await page.locator('#legal-consent-form button[type="submit"]').click();
    assert.equal(await page.locator('body').getAttribute('data-screen'),'consent','Processing consent remains separate');
    await page.locator('#processing-confirm').check();await page.locator('#legal-consent-form button[type="submit"]').click();
    assert.equal(await page.locator('body').getAttribute('data-screen'),'intro');
    await page.locator('[data-action="intro-skip"]').click();
    await page.locator('#learner-name').fill('Ana');await page.locator('#name-form button[type="submit"]').click();
    await page.locator('header [data-action="dashboard"]').click();await page.locator('[data-action="parent-open"]').click();
    await screenshot(page,'parent-'+viewport.width);
    await page.locator('[data-action="toggle-motion"]').click();
    assert.equal(await page.locator('body').getAttribute('data-motion'),'reduce');
    await page.locator('[data-action="voice-review"]').click();
    await page.locator('#voice-confirm').check();await page.locator('#voice-permission-form button[type="submit"]').click();
    assert.equal(await page.evaluate(()=>testMicStarts),0,'Consent alone cannot open the microphone');
    await page.locator('[data-action="voice-disable"]').click();
    const downloadEvent=page.waitForEvent('download');await page.locator('[data-action="export-data"]').click();
    const download=await downloadEvent,filename=path.join(output,'local-data-'+viewport.width+'.json');await download.saveAs(filename);
    assert.equal(JSON.parse(fs.readFileSync(filename)).progress.learner,'Ana');
    await page.evaluate(()=>localStorage.setItem('other-app','untouched'));
    await page.locator('[data-action="delete-review"]').click();await page.locator('#delete-confirm').fill('BURAHIN');await page.locator('#delete-data-form button[type="submit"]').click();
    assert.equal(await page.locator('body').getAttribute('data-screen'),'start');
    assert.deepEqual(await page.evaluate(()=>['tala-pwa-progress-v1','tala-public-preferences-v1'].map(key=>localStorage.getItem(key))),[null,null]);
    assert.equal(await page.evaluate(()=>localStorage.getItem('other-app')),'untouched');
    assert.deepEqual(errors,[]);console.log(`Start, guardian consent, privacy, export/delete, and motion passed at ${viewport.width}x${viewport.height}`);
    await context.close();
  }
  const offline=await browser.newContext({reducedMotion:'reduce'}),page=await offline.newPage();
  await page.goto('http://127.0.0.1:4173/');await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await offline.setOffline(true);await page.reload();await page.waitForSelector('#launch-splash',{state:'detached'});
  await page.locator('[data-action="show-terms"]').click();assert.ok((await page.locator('.public-panel').innerText()).includes('Liability at legal rights'));
  await page.locator('[data-action="public-back"]').click();await page.locator('[data-action="show-child"]').click();
  assert.ok((await page.locator('.public-panel').innerText()).includes('Palayaw lang!'));console.log('Legal pages and launch available after offline reload');await offline.close();
  const broken=await browser.newContext({serviceWorkers:'block'}),brokenPage=await broken.newPage();
  await brokenPage.route('**/js/public.js*',route=>route.abort());await brokenPage.goto('http://127.0.0.1:4173/');
  await brokenPage.waitForSelector('.launch-failed');assert.equal(await brokenPage.locator('#launch-retry').isVisible(),true);
  assert.equal(await brokenPage.locator('#app').innerHTML(),'','Missing consent controller must fail closed');
  console.log('Failed startup offers retry and cannot bypass consent');await broken.close();
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
