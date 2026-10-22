// Badges are derived from the active learner's real saved progress, never from clicks.
(function () {
  const catalog=[];
  const add=(id,title,description,icon,target,count)=>catalog.push({id,title,description,icon,target,count});
  const valid=new Set();
  const modules=[['phonics','Titik at Tunog','🌳',33],['numbers','Pagbibilang','🌊',15],['arts','Hugis at Kulay','🎨',15],['values','Mabuting Gawi','💛',10]];
  modules.forEach(([id,,,total])=>{for(let i=1;i<=total;i++)valid.add(`${id}:${i}`);});
  const completed=p=>new Set((p.completed||[]).filter(id=>valid.has(id)));
  const moduleCount=(p,id)=>[...completed(p)].filter(key=>key.startsWith(id+':')).length;
  const questCount=p=>new Set((p.completed||[]).filter(id=>/^quest:(?:[1-9]|10)$/.test(id))).size;
  for(const n of [1,5,10,20,30,50,75,100,150,200,300,400])add('stars-'+n,n===1?'Unang bituin!':`${n} bituin!`,`Makakuha ng ${n} bituin.`, '⭐',n,p=>Math.max(0,Number(p.stars)||0));
  for(const n of [1,3,5,10,20,30,50,73])add('stages-'+n,n===1?'Unang tagumpay!':`${n} yugto, tapos na!`,`Tapusin ang ${n} magkakaibang yugto sa apat na mundo.`,'🚩',n,p=>completed(p).size);
  for(const [id,name,icon,total] of modules){
    const steps=id==='phonics'?[1,5,10,15,20,26,33]:id==='values'?[1,3,5,10]:[1,5,10,15];
    for(const n of steps)add(`${id}-${n}`,n===total?`Kumpleto: ${name}!`:`${name}: ${n} yugto`,`Tapusin ang ${n} sa ${total} yugto ng ${name}.`,icon,n,p=>moduleCount(p,id));
  }
  for(let i=0;i<26;i++){
    const letter=String.fromCharCode(65+i),key=`phonics:${i+1}`;
    add('letter-'+letter,`Kaibigan ng ${letter}`,`Tapusin ang yugto para sa titik ${letter}.`,'🔤',1,p=>completed(p).has(key)?1:0);
  }
  for(const n of [1,3,5,10,20,30,50])add('perfect-'+n,`${n} limang-bituing yugto`,`Makakuha ng 5 bituin sa ${n} magkakaibang yugto.`,'🌟',n,p=>[...completed(p)].filter(id=>Number(p.best?.[id])===5).length);
  for(const n of [1,3,5,10])add('quest-'+n,n===10?'Ningning ni Tala!':`Kakampi ni Tala: ${n}`,`Tapusin ang ${n} round ng Hamon ni Tala.`,'✨',n,questCount);
  add('all-worlds','Apat na mundo!','Tapusin ang kahit isang yugto sa bawat mundo.','🌍',4,p=>modules.filter(([id])=>moduleCount(p,id)>0).length);
  add('whole-adventure','Buong paglalakbay!','Tapusin ang lahat ng 73 yugto at 10 round ng Hamon ni Tala.','🏆',83,p=>completed(p).size+questCount(p));
  function evaluate(progress){return catalog.map(({count,...item})=>{const value=Math.min(item.target,Math.max(0,count(progress)));return {...item,value,unlocked:value>=item.target};});}
  function newlyUnlocked(before,after){const earned=new Set(evaluate(before).filter(x=>x.unlocked).map(x=>x.id));return evaluate(after).filter(x=>x.unlocked&&!earned.has(x.id));}
  let badgeQueue=[],badgeTimer=null,badgeNotice=null;
  function clearCelebrations(){clearTimeout(badgeTimer);badgeTimer=null;badgeQueue=[];badgeNotice?.remove();badgeNotice=null;}
  function showNextBadge(){
    badgeNotice?.remove();badgeNotice=null;
    if(document.hidden){clearCelebrations();return;}
    const badge=badgeQueue.shift();if(!badge){badgeTimer=null;return;}
    const notice=document.createElement('aside');notice.className='achievement-notice';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');
    notice.innerHTML=`<span class="achievement-notice-icon">${icon('achievements')}</span><div><strong>Bagong tagumpay!</strong><span>${escape(badge.title)}</span><small>${badgeQueue.length?`${badgeQueue.length} pang bagong badge`:'Nadagdag sa iyong koleksiyon'}</small></div><button data-action="badge-dismiss" aria-label="Isara ang notification">×</button>`;
    document.body.append(notice);badgeNotice=notice;
    window.TALA_SFX?.play('achievement');
    badgeTimer=setTimeout(showNextBadge,3200);
  }
  function celebrate(before,after){
    const pending=new Set(badgeQueue.map(b=>b.id));
    const badges=newlyUnlocked(before,after).filter(b=>!pending.has(b.id));
    if(!badges.length||document.hidden)return;
    badgeQueue.push(...badges);
    if(!badgeTimer)badgeTimer=setTimeout(showNextBadge,850);
  }
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearCelebrations();});
  let api,filter='all';
  // Original, code-native vector icons. No font, CDN, emoji or third-party license.
  const paths={
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    tasks:'<path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v16h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4Z"/><path d="M12 5v16M7 8h2M7 12h2m6-4h2m-2 4h2"/>',
    achievements:'<path d="M7 3h10v5a5 5 0 0 1-10 0ZM7 5H3v2a5 5 0 0 0 5 5m9-7h4v2a5 5 0 0 1-5 5M12 13v5m-4 3v-3h8v3Z"/>',
    settings:'<path d="m9 3-.5 3-2 .9L4 6l-2 3.5 2.5 2v1L2 14.5 4 18l2.5-.9 2 .9.5 3h6l.5-3 2-.9 2.5.9 2-3.5-2.5-2v-1l2.5-2L20 6l-2.5.9-2-.9L15 3Z"/><circle cx="12" cy="12" r="3"/>'
  };
  const icon=id=>`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[id]}</svg>`;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function tasks(){
    const p=api.store(),assignment=window.TALA_CLASSROOM?.assignment(),draft=window.TALA_CLASSROOM?.draft();
    const resolve=key=>{const [id,n]=String(key).split(':'),world=window.TALA_DATA.modules.find(m=>m.id===id),stage=world?.levels[Number(n)-1];return stage?{key,world,stage,n:Number(n)}:null;};
    const task=assignment&&resolve(assignment.moduleId+':'+assignment.level);
    const pending=draft&&resolve(draft.state?.module+':'+draft.state?.level);
    const finished=[...new Set(p.completed||[])].map(resolve).filter(Boolean);
    const card=(item,status,button,action,extra='')=>`<article class="task-card"><img src="assets/characters/${item.world.guide}-Happy.png" alt="" width="76" height="96"><div><span class="task-status">${status}</span><h2>${escape(item.stage.title)}</h2><p>${escape(item.world.title)} · Yugto ${item.n}</p><button class="primary-button" data-action="${action}" ${extra}>${button}</button></div></article>`;
    return `<div class="nav-page tasks-page"><p class="eyebrow">MGA GAWAIN</p><h1>Ano ang gagawin natin?</h1><p>Gawain ni Teacher, laro na itutuloy, at mga natapos mong yugto.</p>${window.TALA_BUILDER?.learnerPanel()||''}<section class="task-section"><h2>Gawain ni Teacher</h2>${task?card(task,assignment.status==='completed'?'Tapos na!':'Gagawin ngayon',assignment.status==='completed'?'Laruin muli':'Simulan','classroom-assigned'):'<div class="task-empty"><p>Wala pang naka-assign na gawain. Puwede ka munang pumili ng mundo sa Home, o magpatulong kay Teacher.</p><button class="secondary-button" data-action="nav-home">Pumili ng mundo</button></div>'}</section>${pending?card(pending,'Hindi pa tapos','Ituloy','classroom-resume'):''}<details class="compact-disclosure"><summary>Mga natapos na yugto (${finished.length})</summary><div class="task-list">${finished.map(item=>card(item,`${Number(p.best?.[item.key])||0} bituin`,'Laruin muli','task-replay',`data-task="${escape(item.key)}"`)).join('')||'<p class="task-empty">Dito mapupunta ang mga yugtong natapos mo. Kaya mo iyan!</p>'}</div></details></div>`;
  }
  function achievements(){
    const items=evaluate(api.store()),earned=items.filter(x=>x.unlocked).length;
    return `<div class="nav-page"><p class="eyebrow">MGA TAGUMPAY</p><h1>Ang iyong koleksiyon 🏆</h1><p>${earned} sa ${items.length} badge ang nakuha mo. Bawat hakbang, may bagong saya!</p><div class="badge-filters"><button class="secondary-button" data-action="badge-all" aria-pressed="${filter==='all'}">Lahat</button><button class="secondary-button" data-action="badge-earned" aria-pressed="${filter==='earned'}">Nakuha (${earned})</button></div><div class="achievement-grid">${items.filter(x=>filter==='all'||x.unlocked).map(x=>`<article class="achievement ${x.unlocked?'earned':'locked'}"><span class="badge-icon" aria-hidden="true">${x.unlocked?x.icon:'🔒'}</span><div><h2>${x.title}</h2><p>${x.description}</p><progress max="${x.target}" value="${x.value}" aria-label="${x.title}"></progress><small>${x.unlocked?'✓ Nakuha na!':`${x.value} / ${x.target}`}</small></div></article>`).join('')||'<p>Simulan ang isang yugto para makuha ang unang badge mo!</p>'}</div><p class="settings-note">Batay ang badges sa natapos na yugto at naipong bituin, hindi sa mastery assessment. Hiwalay ang koleksiyon ng bawat learner.</p></div>`;
  }
  function settings(){
    const volumes=TALA_SFX.getVolumes();
    return `<div class="nav-page settings-page"><p class="eyebrow">SETTINGS</p><h1>Ayusin ang iyong laro ⚙</h1><section class="settings-card"><h2>Mga tunog</h2><p>Hindi mababago ang lakas ng voice guide.</p><button class="secondary-button" data-action="nav-sound" aria-pressed="${TALA_SFX.isEnabled()}">${TALA_SFX.isEnabled()?'🔊 Naka-on':'🔇 Naka-off'} ang music at SFX</button>${[['music','🎵 Music'],['sfx','🔔 Sound effects at ambience']].map(([id,label])=>`<div class="volume-control"><label for="volume-${id}">${label}</label><output id="volume-${id}-value" for="volume-${id}">${Math.round(volumes[id]*100)}%</output><input id="volume-${id}" data-volume="${id}" type="range" min="0" max="100" step="1" value="${Math.round(volumes[id]*100)}" aria-describedby="audio-note"></div>`).join('')}<details class="audio-help"><summary>Audio guide at sound test</summary><p id="audio-note" class="settings-note">0% = tahimik. Naka-save sa device na ito. I-on ang tunog sa itaas para marinig ang music at SFX.</p><button class="secondary-button" data-action="nav-test">🔔 Subukan ang SFX</button></details></section>${window.TALA_ROLES?.isTeacher()?'':`<section class="settings-card student-options"><button class="secondary-button" data-action="parent-open">Para sa magulang</button><button class="secondary-button" data-action="role-logout">Bumalik sa pagpili ng role</button></section>`}</div>`;
  }
  function render(screen){
    if(['start','welcome','classroom','parent','parentGate','consent','deleteData'].includes(screen))clearCelebrations();
    const nav=document.querySelector('#bottom-nav');if(!nav)return;
    const visible=['home','map','lesson','practice','complete','tasks','achievements','settings','dashboard','classroom','builder','customPlay','teacherSettings'].includes(screen);
    document.body.dataset.bottomNav=String(visible);nav.hidden=!visible;
    if(window.TALA_ROLES?.isTeacher()){
      nav.hidden=!window.TALA_CLASSROOM?.isUnlocked()||!visible;document.body.dataset.bottomNav=String(!nav.hidden);
      const selected=screen==='builder'||screen==='customPlay'?'activities':screen==='teacherSettings'?'settings':'dashboard';
      nav.innerHTML=[['dashboard','home','Dashboard'],['activities','tasks','Make Activity'],['settings','settings','Teacher Settings']].map(([id,glyph,label])=>`<button data-action="role-${id}" aria-label="${label}" title="${label}" ${selected===id?'aria-current="page"':''}>${icon(glyph)}</button>`).join('');return;
    }
    const active=['tasks','achievements'].includes(screen)?screen:['settings','dashboard','classroom','builder'].includes(screen)?'settings':'home';
    nav.innerHTML=[['home','Home'],['tasks','Mga Gawain'],['achievements','Tagumpay'],['settings','Settings']].map(([id,label])=>`<button data-action="nav-${id}" aria-label="${label}" title="${label}" ${active===id?'aria-current="page"':''}>${icon(id)}</button>`).join('');
  }
  function handle(button){
    const action=button.dataset.action;
    if(action==='task-shortcut'){TALA_SFX.play('tap');api.go('tasks');return true;}
    if(action==='badge-dismiss'){clearCelebrations();return true;}
    if(['nav-home','nav-tasks','nav-achievements','nav-settings'].includes(action)){TALA_SFX.play('tap');api.go(action.slice(4));return true;}
    if(action==='task-replay'){
      const key=button.dataset.task,[moduleId,n]=String(key).split(':'),level=Number(n);
      if(api.store().completed.includes(key)&&window.TALA_DATA.modules.find(m=>m.id===moduleId)?.levels[level-1]){TALA_SFX.play('tap');api.openTask({moduleId,level});}
      return true;
    }
    if(action==='badge-all'||action==='badge-earned'){filter=action==='badge-all'?'all':'earned';api.go('achievements',false);return true;}
    if(action==='nav-test'){TALA_SFX.play('correct');return true;}
    if(action==='nav-sound'){TALA_SFX.toggle();api.go(window.TALA_ROLES?.isTeacher()?'teacherSettings':'settings',false);return true;}
    return false;
  }
  document.addEventListener('input',event=>{
    const key=event.target.dataset?.volume;if(!['music','sfx'].includes(key))return;
    const value=Number(event.target.value);TALA_SFX.setVolumes({[key]:value/100});
    document.querySelector(`#volume-${key}-value`).textContent=`${value}%`;
  });
  document.addEventListener('change',event=>{if(event.target.dataset?.volume==='sfx')TALA_SFX.play('tap');});
  window.TALA_NAV={init(value){api=value;},screens:{tasks,achievements,settings},render,handle,evaluate,catalog,newlyUnlocked,celebrate,clearCelebrations};
})();
