const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'.tools','classroom');fs.mkdirSync(output,{recursive:true});let server,browser;
async function adult(page){const [,a,op,b]=(await page.locator('label[for="adult-answer"]').innerText()).match(/(\d+) ([×+]) (\d+)/);await page.locator('#adult-answer').fill(String(op==='×'?+a*+b:+a+ +b));await page.locator('#adult-gate-form button[type="submit"]').click();}
async function teacher(page){await page.locator('[data-action="nav-settings"]').click();await page.locator('[data-action="role-logout"]').click();await page.locator('[data-action="teacher-open"]').click();if(await page.locator('#teacher-pin').count()){await page.locator('#teacher-pin').fill('123456');await page.locator('#teacher-unlock button[type="submit"]').click();}await page.waitForSelector('.teacher-roster');}
async function layout(page,label){const size=await page.evaluate(()=>({w:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(size.scroll<=size.w+1,label+' horizontal overflow: '+JSON.stringify(size));await page.screenshot({path:path.join(output,label+'.png'),fullPage:true});}
(async()=>{
  try{await fetch('http://127.0.0.1:4173/');}catch{server=spawn(process.execPath,['tools/serve.cjs'],{cwd:root,stdio:'ignore',windowsHide:true});for(let i=0;i<30;i++){try{await fetch('http://127.0.0.1:4173/');break;}catch{await new Promise(r=>setTimeout(r,100));}}}
  browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  for(const viewport of [{width:390,height:844},{width:1024,height:768},{width:320,height:568}]){
    const context=await browser.newContext({viewport,acceptDownloads:true,reducedMotion:'reduce',serviceWorkers:'block'});
    await context.addInitScript(()=>{
      if(!localStorage.getItem('classroom-test-seeded')){localStorage.setItem('classroom-test-seeded','1');localStorage.setItem('tala-pwa-progress-v1',JSON.stringify({curriculumVersion:2,learner:'Ana',introSeen:true,setupComplete:true,stars:3,completed:['phonics:1'],best:{'phonics:1':3}}));localStorage.setItem('tala-public-preferences-v1',JSON.stringify({version:'2026-10-23.2',guardian:true,terms:true,processing:true}));}
      HTMLMediaElement.prototype.play=()=>Promise.resolve();const timeout=window.setTimeout;window.setTimeout=(fn,ms,...args)=>timeout(fn,ms===8000?60:ms,...args);
    });
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
    await page.goto('http://127.0.0.1:4173/');await page.waitForSelector('#launch-splash',{state:'detached'});
    await page.locator('[data-action="teacher-open"]').click();await adult(page);await page.locator('#teacher-school').fill('Demo School');await page.locator('#teacher-section').fill('Rose');await page.locator('#teacher-pin').fill('123456');await page.locator('#teacher-pin-repeat').fill('123456');await page.locator('#teacher-setup button[type="submit"]').click();
    await page.waitForSelector('.recovery-code');assert.match(await page.locator('.recovery-code').innerText(),/^[A-Z2-9]{10}$/);await page.locator('[data-action="teacher-recovery-saved"]').click();
    await page.locator('#teacher-name').fill('Ben');await page.locator('#teacher-section').fill('Lily');await page.locator('#teacher-add button[type="submit"]').click();
    let ben=page.locator('.teacher-student').filter({has:page.locator('h3',{hasText:'Ben'})});await ben.locator('summary').first().click();await ben.locator('select').selectOption('numbers:5');await ben.locator('.teacher-assignment button').click();
    await layout(page,'roster-'+viewport.width);
    await ben.locator('[data-action="teacher-select"]').click();assert.equal(await page.evaluate(()=>TALA_PUBLIC.accepted()),false,'A new student must not inherit consent');
    await page.locator('[data-action="start-game"]').click();await adult(page);for(const id of ['guardian-confirm','terms-confirm','processing-confirm'])await page.locator('#'+id).check();await page.locator('#legal-consent-form button[type="submit"]').click();await page.locator('[data-action="intro-skip"]').click();
    await page.locator('[data-action="nav-tasks"]').click();await page.waitForSelector('.tasks-page');
    assert.match(await page.locator('.tasks-page').innerText(),/Gagawin ngayon/);
    await page.locator('[data-action="classroom-assigned"]').click();await page.locator('[data-action="practice"]').click();
    for(let i=0;i<5;i++){
      await page.waitForFunction(n=>document.querySelector('.question-counter')?.textContent.includes('Tanong '+n+' sa'),i+1);
      if(i===0)await page.locator('[data-action="hint"]').click();
      const correct=await page.evaluate(n=>TALA_DATA.modules.find(m=>m.id==='numbers').levels[4].questions[n].answer,i);
      await page.locator('[data-choice="'+correct+'"]').click();await page.locator('[data-action="confirm-answer"]').click();
    }
    await page.waitForSelector('body[data-screen="complete"]');await teacher(page);
    const data=await page.evaluate(()=>TALA_CLASSROOM.overview());const b=data.students.find(s=>s.name==='Ben'),ana=data.students.find(s=>s.name==='Ana');assert.equal(b.history[0].responses.length,5);assert.equal(b.history[0].responses[0].hintsUsed,1);assert.equal(b.assignment.status,'completed');assert.equal(ana.progress.stars,3);assert.equal(ana.history.length,0);assert.ok(!b.progress.completed.includes('numbers:4'));
    await page.locator('#teacher-search').fill('Ben');assert.equal(await page.locator('.teacher-student:visible').count(),1);await page.locator('#teacher-search').fill('');
    const download=page.waitForEvent('download');await page.locator('[data-action="teacher-backup"]').click();const file=await download,backupPath=path.join(output,'backup-'+viewport.width+'.json');await file.saveAs(backupPath);const backup=JSON.parse(fs.readFileSync(backupPath));assert.equal(backup.auth,undefined);assert.equal(backup.students[0].preferences,undefined);
    const csvEvent=page.waitForEvent('download');await page.locator('[data-action="teacher-csv"]').click();const csvFile=await csvEvent,csvPath=path.join(output,'records-'+viewport.width+'.csv');await csvFile.saveAs(csvPath);assert.match(fs.readFileSync(csvPath,'utf8'),/Ben/);
    ben=page.locator('.teacher-student').filter({has:page.locator('h3',{hasText:'Ben'})});await ben.locator('[data-action="teacher-select"]').click();await page.locator('[data-action="start-game"]').click();await page.locator('[data-module="phonics"]').click();await page.locator('[data-level="1"]').click();await page.locator('[data-action="practice"]').click();await page.locator('[data-choice="1"]').click();
    await page.reload();await page.waitForSelector('#launch-splash',{state:'detached'});await page.locator('[data-action="start-game"]').click();await page.locator('[data-action="nav-tasks"]').click();await page.locator('[data-action="classroom-resume"]').click();assert.equal(await page.locator('[data-choice="1"]').getAttribute('aria-pressed'),'true');await layout(page,'resume-'+viewport.width);
    await teacher(page);await page.locator('#teacher-backup-file').setInputFiles(backupPath);await page.waitForSelector('#teacher-restore-confirm');await page.locator('#teacher-restore-confirm').fill('RESTORE');await page.locator('#teacher-restore button[type="submit"]').click();await page.waitForSelector('.teacher-roster');assert.equal(await page.evaluate(()=>TALA_CLASSROOM.overview().students.length),2);assert.equal(await page.evaluate(()=>TALA_PUBLIC.accepted()),false);
    assert.deepEqual(errors,[],'No classroom runtime errors');console.log('Migration, PIN, profiles, consent isolation, assignment, recording, CSV, backup/restore and resume passed at '+viewport.width+'x'+viewport.height);await context.close();
  }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server?.kill();});
