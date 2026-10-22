// Offline classroom foundation. Local PIN is a UI lock, not storage encryption.
(function(){
  'use strict';
  const KEY='tala-classroom-v1',PROGRESS='tala-pwa-progress-v1',PREFS='tala-public-preferences-v1';
  let unlockedUntil=0;
  let authQueue=Promise.resolve();
  const authenticate=fn=>{const run=authQueue.then(fn,fn);authQueue=run.catch(()=>{});return run;};
  const clone=v=>JSON.parse(JSON.stringify(v));
  const now=()=>new Date().toISOString();
  const id=()=>crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');
  const name=v=>String(v||'').replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,40);
  function read(){const raw=localStorage.getItem(KEY);if(!raw)return null;const d=JSON.parse(raw);if(d.version!==1||!Array.isArray(d.students)||!d.students.some(s=>s.id===d.activeId))throw Error('Hindi mabasa ang classroom data. Huwag i-clear ang storage; gamitin ang backup.');return d;}
  function write(d){localStorage.setItem(KEY,JSON.stringify(d));return d;}
  function active(d=read()){return d?.students.find(s=>s.id===d.activeId);}
  function requireTeacher(){if(Date.now()>=unlockedUntil)throw Error('Naka-lock ang Teacher Mode. Ilagay muli ang PIN.');unlockedUntil=Date.now()+300000;}
  function edit(fn){requireTeacher();const d=read();if(!d)throw Error('I-set up muna ang Teacher Mode.');fn(d);write(d);return d;}
  function fresh(label){return {curriculumVersion:2,learner:label,setupComplete:true,introSeen:false,questOpeningSeen:false,questEndingSeen:false,stars:0,completed:[],attempts:{},best:{},results:{},lastVisit:null};}
  const profile=(label,section,progress=fresh(label),preferences={})=>({id:id(),name:label,section:name(section),archived:false,createdAt:now(),progress,preferences,history:[],draft:null});
  function materialize(d){const s=active(d);try{localStorage.setItem(PROGRESS,JSON.stringify(s.progress));localStorage.setItem(PREFS,JSON.stringify(s.preferences));}catch{/* Classroom record is authoritative; legacy mirrors are best-effort. */}}
  function finishStudent(s,levelKey,stars){const a=s.history.findLast(a=>a.status==='in-progress'&&a.levelKey===levelKey);if(a){a.status='completed';a.completedAt=now();a.stars=stars;}if(s.assignment&&levelKey===s.assignment.moduleId+':'+s.assignment.level){s.assignment.status='completed';s.assignment.completedAt=now();}s.draft=null;}
  async function digest(value,salt){
    if(!crypto?.subtle)throw Error('Kailangan ng secure app/HTTPS para sa Teacher PIN.');
    const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(value),'PBKDF2',false,['deriveBits']);
    const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',iterations:120000,salt:Uint8Array.from(salt.match(/../g),h=>parseInt(h,16))},key,256);
    return Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,'0')).join('');
  }
  const salt=()=>Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');
  async function setup(pin,school,section){
    if(read())throw Error('May Teacher PIN na. Gamitin ang unlock o recovery.');
    if(!/^\d{6}$/.test(pin))throw Error('Gumamit ng 6-digit PIN.');
    const recovery=Array.from(crypto.getRandomValues(new Uint8Array(10)),v=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[v%32]).join('');
    const pinSalt=salt(),recoverySalt=salt();
    const auth={salt:pinSalt,hash:await digest(pin,pinSalt),recoverySalt,recoveryHash:await digest(recovery,recoverySalt),failures:0,lockedUntil:0};
    // No source keys are deleted. Existing progress becomes the first profile.
    const progress=window.TALA_STORE.get(),preferences=JSON.parse(localStorage.getItem(PREFS)||'{}');
    const student=profile(progress.learner,section,progress,preferences);
    const d={version:1,school:name(school),students:[student],activeId:student.id,auth};
    write(d);unlockedUntil=Date.now()+300000;return recovery;
  }
  async function unlock(secret,recover=false,newPin=''){
    const d=read();if(!d)throw Error('Wala pang Teacher PIN.');
    if(Date.now()<d.auth.lockedUntil)throw Error('Maraming maling PIN. Maghintay ng 30 segundo.');
    if(recover&&!/^\d{6}$/.test(newPin))throw Error('Kailangan ng bagong 6-digit PIN.');
    const actual=await digest(secret,recover?d.auth.recoverySalt:d.auth.salt);
    if(actual!==(recover?d.auth.recoveryHash:d.auth.hash)){
      d.auth.failures++;if(d.auth.failures>=5){d.auth.lockedUntil=Date.now()+30000;d.auth.failures=0;}write(d);throw Error('Hindi tama ang PIN o recovery code.');
    }
    if(recover){d.auth.salt=salt();d.auth.hash=await digest(newPin,d.auth.salt);}
    d.auth.failures=0;d.auth.lockedUntil=0;write(d);unlockedUntil=Date.now()+300000;return true;
  }
  function validateBackup(value){
    if(!value||value.app!=='TALA Classroom'||value.version!==1||!Array.isArray(value.students)||!value.students.length||value.students.length>300)throw Error('Hindi valid ang TALA Classroom backup.');
    const seen=new Set();
    for(const s of value.students){
      if(s.customAssignments!==undefined&&(!Array.isArray(s.customAssignments)||s.customAssignments.length>100||s.customAssignments.some(t=>!t||typeof t.id!=='string'||typeof t.lessonId!=='string'||typeof t.title!=='string'||t.title.length>120||!Number.isInteger(t.version)||t.version<1||!['assigned','completed'].includes(t.status))))throw Error('Invalid custom assignments sa backup.');
      if(s.customResults!==undefined&&(!Array.isArray(s.customResults)||s.customResults.length>10000||s.customResults.some(r=>!r||typeof r.lessonId!=='string'||typeof r.title!=='string'||r.title.length>120||typeof r.at!=='string'||!Number.isInteger(r.version)||r.version<1||!Number.isInteger(r.total)||r.total<1||r.total>20||!Number.isInteger(r.correct)||r.correct<0||r.correct>r.total||!Array.isArray(r.responses)||r.responses.length>20)))throw Error('Invalid custom results sa backup.');
      if(!s||typeof s.id!=='string'||s.id.length>80||seen.has(s.id)||typeof s.name!=='string'||!name(s.name)||typeof s.section!=='string'||!s.progress||!Array.isArray(s.history))throw Error('May invalid o duplicate student sa backup.');
      seen.add(s.id);const p=s.progress;
      if(!Array.isArray(p.completed)||!p.completed.every(k=>/^(phonics|numbers|arts|values|quest):\d+$/.test(k))||!Number.isFinite(p.stars)||p.stars<0||!p.best||!p.results||!p.attempts)throw Error('May invalid progress sa backup.');
      for(const map of [p.best,p.attempts])for(const n of Object.values(map))if(!Number.isInteger(n)||n<0)throw Error('May invalid score o attempts sa backup.');
      if(Object.values(p.best).some(n=>n>5))throw Error('May invalid stars sa backup.');
      const known=k=>{const [module,n]=String(k).split(':');const world=module==='quest'?window.TALA_QUEST.world:window.TALA_DATA.modules.find(m=>m.id===module);return /^\d+$/.test(n)&&!!world?.levels[Number(n)-1];};
      if(!p.completed.every(known)||![...Object.keys(p.best),...Object.keys(p.attempts),...Object.keys(p.results)].every(known))throw Error('May level na wala sa curriculum na ito.');
      if(s.assignment&&(!known(s.assignment.moduleId+':'+s.assignment.level)||!['assigned','completed'].includes(s.assignment.status)))throw Error('May invalid assignment sa backup.');
      const attempts=new Set();for(const a of s.history){if(!a||typeof a.id!=='string'||attempts.has(a.id)||typeof a.levelKey!=='string'||!Array.isArray(a.responses)||typeof a.startedAt!=='string')throw Error('May invalid attempt history sa backup.');attempts.add(a.id);}
      for(const a of s.history){if(!known(a.levelKey)||!['in-progress','interrupted','completed'].includes(a.status))throw Error('May invalid activity sa history.');for(const r of a.responses)if(typeof r.questionKey!=='string'||typeof r.selectedAnswer!=='string'||typeof r.correct!=='boolean'||!Number.isInteger(r.hintsUsed)||r.hintsUsed<0||typeof r.revealed!=='boolean'||typeof r.at!=='string')throw Error('May invalid answer record sa history.');}
    }
    if(!seen.has(value.activeId))throw Error('Wala ang active student sa backup.');
    return clone(value);
  }
  window.TALA_CLASSROOM={
    key:KEY,configured:()=>!!read(),isUnlocked:()=>Date.now()<unlockedUntil,lock(){unlockedUntil=0;},setup:(...args)=>authenticate(()=>setup(...args)),unlock:(...args)=>authenticate(()=>unlock(...args)),
    progress:()=>active()?.progress||null,preferences:()=>active()?.preferences||null,
    saveProgress(p){const d=read();if(d){active(d).progress=clone(p);active(d).name=name(p.learner);write(d);}},
    completeProgress(p,levelKey,stars){const d=read();if(d){const s=active(d);s.progress=clone(p);s.name=name(p.learner);finishStudent(s,levelKey,stars);write(d);}},
    savePreferences(p){const d=read();if(d){active(d).preferences=clone(p);write(d);}},
    overview(){requireTeacher();return clone(read());},
    add(label,section){label=name(label);if(!label)throw Error('Ilagay ang nickname.');let student;edit(d=>{if(d.students.length>=300)throw Error('Hanggang 300 profiles muna sa device.');student=profile(label,section);d.students.push(student);});return student.id;},
    rename(studentId,label,section){label=name(label);if(!label)throw Error('Ilagay ang nickname.');edit(d=>{const s=d.students.find(s=>s.id===studentId);if(!s)throw Error('Wala ang student.');s.name=label;s.section=name(section);s.progress.learner=label;});},
    archive(studentId){edit(d=>{if(d.activeId===studentId)throw Error('Lumipat muna sa ibang student bago i-archive ito.');const s=d.students.find(s=>s.id===studentId);if(s)s.archived=!s.archived;});},
    select(studentId){const d=edit(d=>{const s=d.students.find(s=>s.id===studentId&&!s.archived);if(!s)throw Error('Hindi available ang student.');d.activeId=studentId;});materialize(d);},
    assign(studentId,moduleId,level){const world=window.TALA_DATA.modules.find(m=>m.id===moduleId);if(!world?.levels[level-1])throw Error('Hindi valid ang activity.');edit(d=>{const s=d.students.find(s=>s.id===studentId&&!s.archived);if(!s)throw Error('Wala ang student.');s.assignment={id:id(),moduleId,level,createdAt:now(),status:'assigned'};});},
    assignment:()=>clone(active()?.assignment||null),
    customAssign(studentId,lesson){edit(d=>{const s=d.students.find(s=>s.id===studentId&&!s.archived);if(!s||lesson.status!=='published')throw Error('Invalid custom assignment.');s.customAssignments=s.customAssignments||[];if(s.customAssignments.length>=100)throw Error('Max 100 custom assignments bawat learner.');if(!s.customAssignments.some(t=>t.lessonId===lesson.id))s.customAssignments.push({id:id(),lessonId:lesson.id,title:lesson.title,version:lesson.version,status:'assigned'});});},
    customTasks:()=>clone(active()?.customAssignments||[]),
    customComplete(taskId,result){const d=read(),s=active(d),task=s?.customAssignments?.find(t=>t.id===taskId&&t.lessonId===result.lessonId);if(!task)throw Error('Hindi naka-assign ang lesson sa learner.');if(!Number.isInteger(result.total)||result.total<1||result.total>20||!Number.isInteger(result.correct)||result.correct<0||result.correct>result.total)throw Error('Invalid custom result.');s.customResults=s.customResults||[];s.customResults.push({...clone(result),title:task.title,version:task.version});task.status='completed';write(d);},
    resetActive(){edit(d=>{const s=active(d);s.progress=fresh(s.name);s.history=[];s.draft=null;s.assignment=null;s.customAssignments=[];s.customResults=[];});materialize(read());},
    draft:()=>clone(active()?.draft||null),
    begin(levelKey){const d=read();if(!d)return;const s=active(d);const previous=s.history.find(a=>a.status==='in-progress');if(previous)previous.status='interrupted';s.history.push({id:id(),levelKey,assignmentId:s.assignment?.status==='assigned'?s.assignment.id:null,contentVersion:2,startedAt:now(),status:'in-progress',responses:[]});s.draft=null;write(d);},
    checkpoint(route){const d=read();if(!d)return;active(d).draft=clone(route);write(d);},
    response(item){const d=read();if(!d)return;const a=active(d).history.findLast(a=>a.status==='in-progress');if(a&&!a.responses.some(r=>r.confirmationId&&r.confirmationId===item.confirmationId)){a.responses.push({...clone(item),at:now()});write(d);}},
    finish(levelKey,stars){const d=read();if(!d)return;const s=active(d),a=s.history.findLast(a=>a.status==='in-progress'&&a.levelKey===levelKey);if(a){a.status='completed';a.completedAt=now();a.stars=stars;}if(s.assignment&&levelKey===s.assignment.moduleId+':'+s.assignment.level){s.assignment.status='completed';s.assignment.completedAt=now();}s.draft=null;write(d);},
    backup(){requireTeacher();const d=read();return {app:'TALA Classroom',version:1,exportedAt:now(),school:d.school,activeId:d.activeId,students:d.students.map(s=>({id:s.id,name:s.name,section:s.section,archived:s.archived,createdAt:s.createdAt,progress:s.progress,history:s.history,assignment:s.assignment||null,customAssignments:s.customAssignments||[],customResults:s.customResults||[]}))};},
    previewBackup(text){requireTeacher();if(text.length>5000000)throw Error('Masyadong malaki ang backup (max 5 MB).');return validateBackup(JSON.parse(text));},
    restore(value){requireTeacher();const valid=validateBackup(value),old=read();const students=valid.students.map(s=>({...s,preferences:{},draft:null,progress:{...s.progress,learner:name(s.name)},history:s.history.map(a=>a.status==='in-progress'?{...a,status:'interrupted'}:a)}));write({version:1,school:name(valid.school),students,activeId:valid.activeId,auth:old.auth});materialize(read());},
    withdrawActive(){const d=read();if(d){const s=active(d);s.name='Munting Tala';s.section='';s.progress=fresh(s.name);s.preferences={};s.history=[];s.draft=null;s.assignment=null;s.customAssignments=[];s.customResults=[];write(d);materialize(d);}},
    eraseAll(){requireTeacher();localStorage.removeItem(PROGRESS);localStorage.removeItem(PREFS);localStorage.removeItem(KEY);unlockedUntil=0;}
  };
})();
