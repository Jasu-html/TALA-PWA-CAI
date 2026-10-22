const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const {webcrypto}=require('node:crypto');
function setup(seed,map){
  const values=map||new Map(),errors=[];let clock=Date.now(),fail=false;
  if(seed)values.set('tala-pwa-progress-v1',JSON.stringify(seed));
  class Clock extends Date{static now(){return clock;}}
  const ctx={crypto:webcrypto,TextEncoder,Date:Clock,console,localStorage:{getItem:k=>values.get(k)||null,setItem(k,v){if(fail)throw Error('QuotaExceeded');values.set(k,v);},removeItem:k=>values.delete(k)}};
  ctx.window=ctx;ctx.TALA_UI={toast:e=>errors.push(e)};vm.createContext(ctx);
  for(const file of ['data','quest','storage','classroom'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/'+file+'.js'),'utf8'),ctx);
  return {ctx,db:ctx.TALA_CLASSROOM,store:ctx.TALA_STORE,values,errors,advance:ms=>clock+=ms,quota:value=>fail=value};
}
const legacy={curriculumVersion:2,learner:'Ana',setupComplete:true,introSeen:true,stars:3,completed:['phonics:1'],best:{'phonics:1':3},attempts:{'phonics:1':2},results:{'phonics:1':[{firstTry:true}]}};
const response={confirmationId:'phonics:1:0:0',questionKey:'phonics:1:1',selectedAnswer:'araw',correct:true,hintsUsed:1,revealed:false};

test('Custom lessons isolate assignments/results, preserve revisions in backup, and reject foreign completion',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');const first=e.db.overview().activeId,second=e.db.add('Ben','');
  const lesson={id:'lesson-one',title:'Teacher lesson',status:'published',version:1};e.db.customAssign(first,lesson);e.db.customAssign(first,lesson);assert.equal(e.db.customTasks().length,1);
  const task=e.db.customTasks()[0];e.db.select(second);assert.equal(e.db.customTasks().length,0);
  const result={lessonId:lesson.id,title:lesson.title,version:1,correct:1,total:1,responses:[{question:0,answer:0,firstTry:true}],at:new Date().toISOString()};
  assert.throws(()=>e.db.customComplete(task.id,result));e.db.select(first);e.db.customComplete(task.id,result);assert.equal(e.store.get().stars,3);
  const backup=e.db.backup();assert.equal(backup.students[0].customResults[0].version,1);e.db.restore(backup);assert.equal(e.db.customTasks()[0].status,'completed');
  const invalid=JSON.parse(JSON.stringify(backup));invalid.students[0].customResults[0].correct=99;assert.throws(()=>e.db.restore(invalid));
  e.db.withdrawActive();assert.equal(e.db.customTasks().length,0);assert.equal(e.db.overview().students[0].customResults.length,0);
});
test('Teacher setup migrates existing progress without inventing attempt history or deleting source',async()=>{
  const e=setup(legacy);const original=e.values.get('tala-pwa-progress-v1');const recovery=await e.db.setup('123456','School','Rose');
  assert.match(recovery,/^[A-Z2-9]{10}$/);const d=e.db.overview();assert.equal(d.students.length,1);assert.equal(d.students[0].progress.stars,3);assert.equal(d.students[0].history.length,0);assert.equal(e.values.get('tala-pwa-progress-v1'),original);assert.notEqual(d.auth.hash,'123456');assert.ok(!e.values.get(e.db.key).includes(recovery));
});
test('Profiles isolate progress, heard instructions, guardian consent and microphone permission',async()=>{
  const e=setup(legacy);e.values.set('tala-public-preferences-v1',JSON.stringify({guardian:true,voiceInput:true}));await e.db.setup('123456','','');const first=e.db.overview().activeId,second=e.db.add('Ana','Lily');
  e.db.select(second);assert.equal(e.store.get().stars,0);assert.deepEqual(JSON.parse(JSON.stringify(e.db.preferences())),{});e.store.markGuidanceHeard('home');e.store.complete('numbers:1',4,[]);
  e.db.select(first);assert.equal(e.store.get().stars,3);assert.equal(e.store.hasHeardGuidance('home'),false);assert.equal(e.db.preferences().voiceInput,true);e.db.rename(first,'Anah','Rose');assert.equal(e.db.overview().activeId,first);assert.equal(e.store.get().stars,3);
});
test('PIN lockout persists across reload, expiry blocks writes, and recovery changes only auth',async()=>{
  const e=setup(legacy);const code=await e.db.setup('123456','','');e.db.lock();for(let i=0;i<5;i++)await assert.rejects(e.db.unlock('000000'));
  const reload=setup(null,e.values);await assert.rejects(reload.db.unlock('123456'),/30/);e.advance(31000);await e.db.unlock(code,true,'654321');assert.equal(e.store.get().stars,3);e.db.lock();await assert.rejects(e.db.unlock('123456'));await e.db.unlock('654321');e.advance(300001);assert.throws(()=>e.db.add('Other',''),/lock/);
});
test('Concurrent bad PIN submissions cannot bypass the persisted failure counter',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');e.db.lock();await Promise.all(Array.from({length:5},()=>e.db.unlock('000000').catch(()=>{})));await assert.rejects(e.db.unlock('123456'),/30/);
});
test('Attempt history, hint evidence and checkpoint persist; completion is atomic with progress',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');e.db.begin('phonics:1');e.db.response(response);e.db.response(response);e.db.checkpoint({state:{screen:'practice',question:0}});assert.equal(e.db.overview().students[0].history[0].responses.length,1);
  const reload=setup(null,e.values);assert.equal(reload.db.draft().state.question,0);reload.store.complete('phonics:1',4,[{firstTry:true}]);await reload.db.unlock('123456');const s=reload.db.overview().students[0];assert.equal(s.history[0].status,'completed');assert.equal(s.history[0].responses[0].hintsUsed,1);assert.equal(s.progress.best['phonics:1'],4);assert.equal(reload.db.draft(),null);
  reload.db.begin('phonics:1');reload.db.begin('numbers:1');assert.equal(reload.db.overview().students[0].history[1].status,'interrupted');assert.equal(reload.db.overview().students[0].history.length,3);
});
test('Assignment opens only valid core activities and completion does not mark prerequisites done',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');const student=e.db.overview().activeId;e.db.assign(student,'numbers',5);assert.throws(()=>e.db.assign(student,'unknown',99));e.db.begin('numbers:5');e.store.complete('numbers:5',2,[]);assert.equal(e.db.assignment().status,'completed');assert.equal(e.store.get().completed.includes('numbers:4'),false);
});
test('Backup restore round-trip excludes auth and consent, preserves IDs, replaces without duplicates',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');e.db.begin('phonics:1');e.db.response(response);e.store.complete('phonics:1',4,[]);const backup=e.db.backup();assert.equal(backup.auth,undefined);assert.equal(backup.students[0].preferences,undefined);const before=e.db.overview().auth.hash;
  e.db.add('Bob','');e.db.restore(backup);e.db.restore(backup);assert.equal(e.db.overview().students.length,1);assert.equal(e.db.overview().students[0].history.length,1);assert.equal(e.db.overview().auth.hash,before);assert.deepEqual(JSON.parse(JSON.stringify(e.db.preferences())),{});
});
test('Invalid or oversized backups leave classroom records unchanged',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');const saved=e.values.get(e.db.key),backup=e.db.backup();
  for(const change of [b=>b.students.push(b.students[0]),b=>b.students[0].progress.best['phonics:1']=6,b=>b.students[0].progress.completed.push('phonics:999'),b=>b.activeId='missing']){const value=JSON.parse(JSON.stringify(backup));change(value);assert.throws(()=>e.db.restore(value));assert.equal(e.values.get(e.db.key),saved);}
  assert.throws(()=>e.db.previewBackup(' '.repeat(5000001)));
});
test('Quota errors do not switch, overwrite or falsely complete learner progress',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');const other=e.db.add('Bob',''),before=e.values.get(e.db.key);e.quota(true);assert.throws(()=>e.db.select(other));assert.equal(e.values.get(e.db.key),before);assert.throws(()=>e.store.complete('numbers:1',5,[]));assert.equal(e.values.get(e.db.key),before);
});
test('Archiving and active learner withdrawal do not erase classmates',async()=>{
  const e=setup(legacy);await e.db.setup('123456','','');const first=e.db.overview().activeId,other=e.db.add('Bob','');e.db.archive(other);assert.throws(()=>e.db.select(other));e.db.archive(other);e.db.withdrawActive();assert.equal(e.store.get().stars,0);assert.equal(e.db.overview().students.find(s=>s.id===other).name,'Bob');assert.equal(e.db.overview().students.find(s=>s.id===first).history.length,0);
});
