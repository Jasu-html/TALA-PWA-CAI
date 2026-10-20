const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
function setup(saved,revealItems) {
  const handlers={}, buttons=[], timers=new Map(), timerDelays=new Map(), observers=[], canvasHandlers={};
  let nextTimer=1,value=JSON.stringify(saved?{learner:'Ana',...saved}:{curriculumVersion:2,learner:'Ana'}),html='';
  function element(dataset={}, disabled=false) {
    const tokens=new Set();
    return {dataset,disabled,textContent:'',classList:{
      add(...x){x.forEach(t=>tokens.add(t));},remove(...x){x.forEach(t=>tokens.delete(t));},
      toggle(t,on){if(on)tokens.add(t);else tokens.delete(t);},contains:t=>tokens.has(t)
    },setAttribute(k,v){this[k]=v;},addEventListener(){},scrollIntoView(){}};
  }
  function parse(markup) {
    html=markup;buttons.length=0;
    for(const match of markup.matchAll(/<button\b([^>]*)>/g)) {
      const attrs=match[1],dataset={};
      for(const entry of attrs.matchAll(/data-([\w-]+)="([^"]*)"/g))dataset[entry[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=entry[2];
      buttons.push(element(dataset,/\bdisabled\b/.test(attrs)));
    }
  }
  const canvas={width:800,height:480,getContext:()=>({beginPath(){},moveTo(){},arc(){},fill(){},lineTo(){},stroke(){},clearRect(){},fillText(){}}),
    addEventListener:(name,fn)=>canvasHandlers[name]=fn,setPointerCapture(){},getBoundingClientRect:()=>({left:0,top:0,width:800,height:480})};
  const nodes={'#app':{get innerHTML(){return html;},set innerHTML(v){parse(v);},querySelectorAll:()=>revealItems||[]},'#wallet-stars':{},'#toast':element(),'#feedback':{textContent:''},'#paint-canvas':canvas,'#learner-name':{value:''}};
  const all=selector=>selector==='[data-choice]'?buttons.filter(b=>b.dataset.choice!==undefined):selector==='[data-paint]'?buttons.filter(b=>b.dataset.paint):[];
  const one=selector=>{const action=selector.match(/^\[data-action="([^"]+)"\]$/);return action?buttons.find(b=>b.dataset.action===action[1]):nodes[selector];};
  const ctx={console,setTimeout(fn,delay){const id=nextTimer++;timers.set(id,fn);timerDelays.set(id,delay);return id;},clearTimeout(id){timers.delete(id);timerDelays.delete(id);},
    Audio:class{constructor(src){this.src=src;}play(){return Promise.resolve();}pause(){}},
    localStorage:{getItem:()=>value,setItem:(_,v)=>value=v,removeItem:()=>value=null},
    document:{body:{dataset:{}},querySelector:one,querySelectorAll:all,
      addEventListener(e,fn){(handlers[e]||=[]).push(fn);},removeEventListener(e,fn){handlers[e]=(handlers[e]||[]).filter(f=>f!==fn);}},
    navigator:{},scrollTo(){},addEventListener(){},confirm:()=>false};
  if(revealItems)ctx.IntersectionObserver=class{
    constructor(callback){this.callback=callback;observers.push(this);}
    observe(){}
    disconnect(){this.disconnected=true;}
  };
  ctx.window=ctx;vm.createContext(ctx);
  for(const file of ['data','quest','storage','speech','sfx','visuals','app'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',file+'.js'),'utf8'),ctx);
  function click(dataset) {
    const b=buttons.find(b=>Object.entries(dataset).every(([k,v])=>b.dataset[k]===v)) || (['home','dashboard'].includes(dataset.action)?element(dataset):null);
    assert.ok(b,'Button exists: '+JSON.stringify(dataset));
    if(b.disabled)return;
    for(const fn of [...handlers.click])fn({target:{closest:()=>b}});
  }
  const enter=(module,n=1)=>{click({module});click({level:String(n)});click({action:'practice'});};
  const submitName=name=>{nodes['#learner-name'].value=name;for(const fn of handlers.submit)fn({target:{id:'name-form'},preventDefault(){}});};
  return {ctx,nodes,click,enter,one,all,canvasHandlers,timers,timerDelays,observers,submitName,saved:()=>JSON.parse(value)};
}
const allCoreStages=()=>[['phonics',33],['numbers',15],['arts',15],['values',10]].flatMap(([id,count])=>Array.from({length:count},(_,i)=>id+':'+(i+1)));
const questSave=(extra={})=>({curriculumVersion:2,completed:allCoreStages(),questOpeningSeen:true,...extra});
test('Quest requires every core stage, regardless of stars, and locks later rounds',()=>{
  const completed=allCoreStages().filter(id=>id!=='arts:15');
  const env=setup(questSave({completed:[...completed,'quest:1','arts:999'],best:Object.fromEntries(completed.map(id=>[id,5]))})),{ctx,click,nodes}=env;
  const p=ctx.TALA_STORE.get();assert.equal(ctx.TALA_QUEST.eligible(p),false);
  assert.equal(ctx.TALA_QUEST.generate(p,1).length,0);
  click({module:'quest'});assert.match(nodes['#app'].innerHTML,/Matuto muna kasama/);
  assert.doesNotMatch(nodes['#app'].innerHTML,/data-level=/);
  p.completed.push('arts:15');p.best=Object.fromEntries(allCoreStages().map(id=>[id,1]));
  assert.equal(ctx.TALA_QUEST.eligible(p),true);
  for(const missing of allCoreStages())assert.equal(ctx.TALA_QUEST.eligible({...p,completed:p.completed.filter(id=>id!==missing)}),false,missing+' is required');
  p.completed=p.completed.filter(id=>id!=='quest:1');
  assert.equal(ctx.TALA_QUEST.unlocked(p,1),true);assert.equal(ctx.TALA_QUEST.unlocked(p,2),false);
  for(const invalid of [0,11,1.5,NaN])assert.equal(ctx.TALA_QUEST.generate(p,invalid).length,0);
});
test('Quest mixes only learned questions, removes review repeats, and raises difficulty',()=>{
  const {ctx}=setup(),quest=ctx.TALA_QUEST;
  const p={completed:ctx.TALA_DATA.modules.flatMap(m=>m.levels.map((_,i)=>m.id+':'+(i+1))).concat(Array.from({length:9},(_,i)=>'quest:'+(i+1))),attempts:{}};
  const pool=quest.pool(p);assert.ok(pool.length>=60);
  assert.equal(new Set(pool.map(q=>q.questKey)).size,pool.length);
  for(let round=1;round<=10;round++){
    const questions=quest.generate(p,round);assert.equal(questions.length,round<=3?8:10);
    assert.equal(new Set(questions.map(q=>q.questKey)).size,questions.length);
    const counts=ctx.TALA_DATA.modules.map(m=>questions.filter(q=>q.sourceModule===m.id).length);
    assert.deepEqual(Array.from(counts),round<=3?[2,2,2,2]:[3,3,2,2]);
    for(const q of questions){
      assert.ok(p.completed.includes(q.sourceModule+':'+q.sourceLevel));
      const m=ctx.TALA_DATA.modules.find(m=>m.id===q.sourceModule),original=m.levels[q.sourceLevel-1].questions[q.sourceQuestion-1];
      assert.equal(q.choices[q.answer],original.choices[original.answer]);assert.equal(q.audioGuide,m.guide);
    }
  }
  const mean=round=>quest.generate(p,round).reduce((sum,q)=>sum+q.difficulty,0)/quest.length(round);
  assert.ok(mean(10)>mean(1), 'Later rounds select harder learned material');
  const sparse={completed:['phonics:1','phonics:2','phonics:3','numbers:1','numbers:2','numbers:3'],attempts:{}};
  assert.equal(quest.generate(sparse,1).length,0);
});
test('All ten Quest rounds save stars, open the ending, and survive reload',()=>{
  const env=setup(questSave()),{ctx,click,nodes}=env;
  ctx.TALA_SPEECH.speak=()=>{};
  for(let round=1;round<=10;round++){
    click({module:'quest'});
    assert.match(nodes['#app'].innerHTML,/Landas ng mga Bituin/);
    if(round<10)assert.match(nodes['#app'].innerHTML,new RegExp('data-level="'+(round+1)+'" disabled'));
    click({level:String(round)});
    const questions=ctx.TALA_QUEST.generate(ctx.TALA_STORE.get(),round);
    click({action:'practice'});
    assert.match(nodes['#app'].innerHTML,/quest-walker/);
    for(const q of questions){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
    const d=ctx.TALA_STORE.get();assert.equal(d.best['quest:'+round],5);assert.equal(d.attempts['quest:'+round],1);
    assert.equal(d.results['quest:'+round].length,questions.length);
    assert.ok(d.results['quest:'+round].every(q=>d.completed.includes(q.sourceModule+':'+q.sourceLevel)));
    if(round===10){assert.equal(ctx.document.body.dataset.screen,'questStory');click({action:'quest-story-skip'});}
    else assert.match(nodes['#app'].innerHTML,/quest-constellation/);
    click({action:'home'});
  }
  assert.equal(ctx.TALA_STORE.get().stars,50);
  click({module:'quest'});click({level:'1'});click({action:'practice'});
  const replay=ctx.TALA_QUEST.generate(ctx.TALA_STORE.get(),1);
  for(const q of replay){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
  assert.equal(ctx.TALA_STORE.get().stars,50);assert.equal(ctx.TALA_STORE.get().attempts['quest:1'],2);
  const reloaded=setup(env.saved());reloaded.click({module:'quest'});
  assert.doesNotMatch(reloaded.nodes['#app'].innerHTML,/data-level="10" disabled/);
  reloaded.click({action:'dashboard'});assert.match(reloaded.nodes['#app'].innerHTML,/10 sa 10 hamon ang natapos/);
});
test('Quest preview and hint recordings keep their source character and never submit on selection',()=>{
  const env=setup(questSave()),{ctx,click,one}=env;
  const clips=[];ctx.TALA_SPEECH.play=(...args)=>clips.push(args);ctx.TALA_SPEECH.speak=()=>{};
  click({module:'quest'});click({level:'1'});
  const questions=ctx.TALA_QUEST.generate(ctx.TALA_STORE.get(),1),q=questions[0];
  click({action:'practice'});assert.deepEqual(clips.at(-1),[q.audioGuide,q.prompt]);
  assert.equal(one('[data-action="confirm-answer"]').disabled,true);
  const wrong=(q.answer+1)%q.choices.length;
  click({choice:String(wrong)});assert.deepEqual(clips.at(-1),[q.audioGuide,ctx.TALA_SPEECH.spokenText(q.choices[wrong])]);
  assert.equal(ctx.TALA_STORE.get().stars,0);assert.equal(one('[data-action="next-question"]'),undefined);
  click({action:'hint'});assert.deepEqual(clips.at(-1),[q.audioGuide,q.hint]);
  for(let i=0;i<3;i++){click({choice:String(wrong)});click({action:'confirm-answer'});}
  assert.ok(one('[data-action="next-question"]'));click({action:'next-question'});
  for(const q of questions.slice(1)){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
  assert.equal(ctx.TALA_STORE.get().best['quest:1'],4);
  assert.equal(ctx.TALA_STORE.get().results['quest:1'][0].misses,3);
});
test('Quest instruction MP3 matches the reusable actor script and missing prompts do not block play',async()=>{
  const env=setup(questSave()),{ctx,click,one,nodes}=env;
  const lesson=ctx.TALA_QUEST.world.levels[0].lesson,script=fs.readFileSync(path.join(__dirname,'../docs/voice-scripts/TALA_QUEST.md'),'utf8');
  assert.ok(script.includes(lesson));assert.ok(script.includes(path.basename(ctx.TALA_SPEECH.sharedPath('Tala',lesson))));
  ctx.Audio=class{play(){return Promise.reject(new Error('missing MP3'));}pause(){}};
  click({module:'quest'});click({level:'1'});click({action:'practice'});
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(nodes['#toast'].textContent,/Wala pang recording/);
  click({choice:'0'});assert.equal(one('[data-action="confirm-answer"]').disabled,false);
  click({action:'home'});await new Promise(resolve=>setImmediate(resolve));
  assert.equal(ctx.document.body.dataset.screen,'home');
  assert.equal(ctx.TALA_STORE.get().completed.includes('quest:1'),false);
});
test('Quest opening introduces Anino after all modules, saves on completion, and can replay',()=>{
  const env=setup(questSave({questOpeningSeen:false,best:Object.fromEntries(allCoreStages().map(id=>[id,1]))})),{ctx,click,nodes,one}=env;
  const recordings=[];let tts=0;
  ctx.TALA_SPEECH.play=(...args)=>recordings.push(args);ctx.TALA_SPEECH.speak=()=>tts++;
  click({module:'quest'});assert.equal(ctx.document.body.dataset.screen,'questStory');
  assert.match(nodes['#app'].innerHTML,/Bumalik ang ningning/);assert.equal(one('[data-action="quest-story-back"]').disabled,true);
  assert.equal(ctx.TALA_STORE.get().questOpeningSeen,false);
  for(let i=0;i<3;i++){
    click({action:'quest-story-listen'});assert.deepEqual(recordings.at(-1),['Tala',ctx.TALA_QUEST.stories.opening[i].text]);
    if(i===1){assert.match(nodes['#app'].innerHTML,/anino-body/);click({action:'quest-story-back'});click({action:'quest-story-next'});}
    click({action:'quest-story-next'});
  }
  assert.equal(tts,0);assert.equal(ctx.document.body.dataset.screen,'map');
  assert.equal(ctx.TALA_STORE.get().questOpeningSeen,true);assert.equal(ctx.TALA_STORE.get().questEndingSeen,false);
  assert.equal(ctx.TALA_STORE.get().stars,0);assert.equal(ctx.TALA_STORE.get().completed.length,73);
  const reload=setup(env.saved());reload.click({module:'quest'});assert.equal(reload.ctx.document.body.dataset.screen,'map');
  reload.click({action:'quest-opening'});assert.match(reload.nodes['#app'].innerHTML,/Bumalik ang ningning/);
  reload.click({action:'quest-story-skip'});assert.equal(reload.ctx.document.body.dataset.screen,'map');
});
test('One-star final challenge saves before the ending, resumes the ending, and thanks the learner',()=>{
  const previous=Array.from({length:9},(_,i)=>'quest:'+(i+1));
  const env=setup(questSave({completed:allCoreStages().concat(previous),best:Object.fromEntries(previous.map(id=>[id,1]))})),{ctx,click,nodes}=env;
  ctx.TALA_SPEECH.speak=()=>{};
  click({module:'quest'});assert.doesNotMatch(nodes['#app'].innerHTML,/data-action="quest-ending"/);
  click({level:'10'});const questions=ctx.TALA_QUEST.generate(ctx.TALA_STORE.get(),10);click({action:'practice'});
  for(const q of questions){const wrong=String((q.answer+1)%q.choices.length);for(let i=0;i<3;i++){click({choice:wrong});click({action:'confirm-answer'});}click({action:'next-question'});}
  assert.equal(ctx.document.body.dataset.screen,'questStory');assert.match(nodes['#app'].innerHTML,/Nagtagumpay tayo/);
  assert.equal(ctx.TALA_STORE.get().best['quest:10'],1);assert.equal(ctx.TALA_STORE.get().attempts['quest:10'],1);
  assert.equal(ctx.TALA_STORE.get().results['quest:10'].length,10);assert.equal(ctx.TALA_STORE.get().questEndingSeen,false);
  // Leaving before the ending finishes must not lose the final quiz result.
  click({action:'home'});const reload=setup(env.saved()),clips=[];
  reload.ctx.TALA_SPEECH.play=(...args)=>clips.push(args);
  reload.click({module:'quest'});assert.equal(reload.ctx.document.body.dataset.screen,'questStory');
  for(let i=0;i<3;i++){
    reload.click({action:'quest-story-listen'});assert.deepEqual(clips.at(-1),['Tala',reload.ctx.TALA_QUEST.stories.ending[i].text]);
    if(i===2)assert.match(reload.nodes['#app'].innerHTML,/Salamat, Ana!/);
    reload.click({action:'quest-story-next'});
  }
  assert.equal(reload.ctx.document.body.dataset.screen,'home');assert.equal(reload.ctx.TALA_STORE.get().questEndingSeen,true);
  const stars=reload.ctx.TALA_STORE.get().stars;
  reload.click({module:'quest'});assert.equal(reload.ctx.document.body.dataset.screen,'map');
  reload.click({action:'quest-ending'});reload.click({action:'quest-story-skip'});
  assert.equal(reload.ctx.TALA_STORE.get().stars,stars);assert.equal(reload.ctx.TALA_STORE.get().attempts['quest:10'],1);
  reload.click({action:'dashboard'});reload.ctx.confirm=()=>true;reload.click({action:'reset'});
  assert.equal(reload.ctx.TALA_STORE.get().questOpeningSeen,false);assert.equal(reload.ctx.TALA_STORE.get().questEndingSeen,false);
});
test('Every Quest story page has an exact reusable Tala recording script',()=>{
  const {ctx}=setup(),script=fs.readFileSync(path.join(__dirname,'../docs/voice-scripts/TALA_QUEST_STORY.md'),'utf8'),files=new Set();
  for(const kind of ['opening','ending']){
    assert.equal(ctx.TALA_QUEST.stories[kind].length,3);
    for(const page of ctx.TALA_QUEST.stories[kind]){
      const file=ctx.TALA_SPEECH.sharedPath('Tala',page.text);files.add(file);
      assert.ok(script.includes(page.text));assert.ok(script.includes(path.basename(file)));
    }
  }
  assert.equal(files.size,6);
});
test('First launch story supports back, recordings, completion, and returning learner setup',()=>{
  const env=setup({curriculumVersion:2,learner:'Munting Tala'}),{ctx,nodes,click,one}=env;
  const recordings=[];let synthesized=0,stops=0;
  ctx.TALA_SPEECH.play=(...args)=>recordings.push(args);
  ctx.TALA_SPEECH.speak=()=>synthesized++;
  ctx.TALA_SPEECH.stop=()=>stops++;
  assert.equal(ctx.document.body.dataset.screen,'intro');
  assert.equal(one('[data-action="intro-back"]').disabled,true);
  click({action:'intro-back'});
  assert.match(nodes['#app'].innerHTML,/Ang munting bituin/);
  for(let i=0;i<3;i++){
    click({action:'intro-listen'});
    assert.equal(recordings.at(-1)[0],'Tala');
    assert.equal(recordings.at(-1)[1],ctx.TALA_DATA.intro[i].text);
    if(i===1){click({action:'intro-back'});assert.match(nodes['#app'].innerHTML,/Ang munting bituin/);click({action:'intro-next'});}
    click({action:'intro-next'});
  }
  assert.equal(synthesized,0);assert.ok(stops>=5);
  assert.equal(ctx.document.body.dataset.screen,'welcome');
  assert.equal(env.saved().introSeen,true);assert.equal(env.saved().setupComplete,false);
  assert.equal(env.saved().stars,0);assert.deepEqual(env.saved().completed,[]);
  const resumed=setup(env.saved());assert.equal(resumed.ctx.document.body.dataset.screen,'welcome');
  // Even the default learner name counts as completed setup when submitted.
  resumed.submitName('');assert.equal(resumed.saved().setupComplete,true);
  assert.equal(setup(resumed.saved()).ctx.document.body.dataset.screen,'home');
});
test('Skipping and replaying the story preserve learning progress; reset restores first launch',()=>{
  const first=setup({curriculumVersion:2,learner:'Munting Tala'});
  first.click({action:'intro-skip'});assert.equal(first.saved().introSeen,true);
  assert.equal(first.ctx.document.body.dataset.screen,'welcome');
  const env=setup({curriculumVersion:2,learner:'Ana',stars:7,completed:['phonics:1'],best:{'phonics:1':5}});
  assert.equal(env.ctx.document.body.dataset.screen,'home');
  env.click({action:'intro-open'});env.click({action:'intro-next'});env.click({action:'intro-skip'});
  assert.equal(env.ctx.document.body.dataset.screen,'home');
  assert.equal(env.saved().stars,7);assert.deepEqual(env.saved().completed,['phonics:1']);
  env.click({action:'intro-open'});assert.match(env.nodes['#app'].innerHTML,/Ang munting bituin/);
  env.click({action:'intro-next'});env.click({action:'intro-next'});env.click({action:'intro-next'});
  assert.equal(setup(env.saved()).ctx.document.body.dataset.screen,'home');
  env.click({action:'dashboard'});env.ctx.confirm=()=>true;env.click({action:'reset'});
  assert.equal(env.ctx.document.body.dataset.screen,'intro');
  assert.equal(env.ctx.TALA_STORE.get().introSeen,false);assert.equal(env.ctx.TALA_STORE.get().stars,0);
});
test('All three optional story recordings have exact scripts and use shared Tala paths',()=>{
  const {ctx}=setup(),script=fs.readFileSync(path.join(__dirname,'../docs/voice-scripts/TALA_INTRO.md'),'utf8');
  assert.equal(ctx.TALA_DATA.intro.length,3);
  const paths=new Set();
  for(const page of ctx.TALA_DATA.intro){
    const source=ctx.TALA_SPEECH.sharedPath('Tala',page.text);paths.add(source);
    assert.ok(source.startsWith('assets/audio/fil/shared/tala/'));
    assert.ok(script.includes(path.basename(source)));assert.ok(script.includes(page.text));
  }
  assert.equal(paths.size,3);
});
test('Level reveals share a 120ms queue across separate scroll callbacks',()=>{
  const stage=top=>{
    const classes=new Set(['stage']);
    return {classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c)},getBoundingClientRect:()=>({top})};
  };
  const [first,second,third]=[stage(150),stage(335),stage(520)];
  const {observers,timers,timerDelays,click}=setup(undefined,[first,second,third]);
  const observer=observers.at(-1),entry=(target,isIntersecting=true)=>({target,isIntersecting});
  observer.callback([entry(first)]);
  assert.ok(first.classList.contains('is-visible'));
  observer.callback([entry(second)]);
  observer.callback([entry(third)]);
  assert.equal(second.classList.contains('is-visible'),false);
  assert.equal(third.classList.contains('is-visible'),false);
  assert.equal(timers.size,1);
  const [id,run]=timers.entries().next().value;
  assert.equal(timerDelays.get(id),120);
  timers.delete(id);timerDelays.delete(id);run();
  assert.ok(second.classList.contains('is-visible'));
  assert.equal(third.classList.contains('is-visible'),false);
  observer.callback([entry(third,false)]);
  const [nextId,nextRun]=timers.entries().next().value;
  timers.delete(nextId);timerDelays.delete(nextId);nextRun();
  assert.equal(third.classList.contains('is-visible'),false);
  observer.callback([entry(third)]);
  assert.ok(third.classList.contains('is-visible'));
  click({module:'phonics'});
  assert.ok(observer.disconnected);
  assert.equal(timers.size,0);
});
test('All four modules have complete content and valid, distinct options',()=>{
  const {ctx}=setup();const modules=ctx.TALA_DATA.modules;
  assert.deepEqual(Array.from(modules,m=>m.levels.length),[33,15,15,10]);
  assert.equal(modules[0].levels[25].title,'Ang titik Z');
  for(const m of modules)for(const l of m.levels){
    assert.ok(l.lesson&&l.visual&&l.title);
    if(l.type==='paint'){assert.equal(l.questions.length,0);continue;}
    assert.equal(l.questions.length,5);
    for(const q of l.questions){
      assert.ok(q.prompt&&q.visual&&q.hint);assert.ok(q.choices[q.answer]);
      assert.equal(new Set(q.choices).size,q.choices.length);
    }
  }
});
test('Every stage has a unique map position and locked stages cannot open',()=>{
  const {nodes,click}=setup();click({module:'phonics'});
  const html=nodes['#app'].innerHTML;
  assert.equal((html.match(/id="stage-/g)||[]).length,33);
  assert.equal(new Set([...html.matchAll(/class="stage"[^>]*style="([^"]+)"/g)].map(m=>m[1])).size,33);
  assert.match(html,/data-level="26" disabled/);
  click({level:'26'});assert.match(nodes['#app'].innerHTML,/trail-road/);
});
test('Selecting/reselecting only plays option audio; confirmation is required',()=>{
  const env=setup(),{ctx,enter,click,all,one}=env;const recordings=[];
  ctx.TALA_SPEECH.play=(...args)=>recordings.push(args);
  enter('phonics');
  assert.equal(one('[data-action="confirm-answer"]').disabled,true);
  click({choice:'1'});click({choice:'0'});
  const options=ctx.TALA_DATA.modules[0].levels[0].questions[0].choices;
  assert.ok(recordings.some(args=>args[1]===options[0]));
  assert.ok(recordings.some(args=>args[1]===options[1]));
  assert.equal(all('[data-choice]')[0]['aria-pressed'],'true');
  assert.equal(all('[data-choice]')[1]['aria-pressed'],'false');
  assert.equal(ctx.TALA_STORE.get().stars,0);
  assert.equal(ctx.TALA_STORE.get().completed.length,0);
  assert.equal(one('[data-action="confirm-answer"]').disabled,false);
  click({action:'confirm-answer'});
  assert.ok(one('[data-action="next-question"]'));
  assert.equal(ctx.TALA_STORE.get().stars,0);
});
test('Wrong confirmations allow retry; third miss reveals answer then advances',()=>{
  const {ctx,enter,click,one,nodes}=setup();ctx.TALA_SPEECH.speak=()=>{};
  enter('phonics');
  for(let i=0;i<3;i++){click({choice:'1'});click({action:'confirm-answer'});}
  assert.ok(one('[data-action="next-question"]'));
  assert.match(nodes['#feedback'].textContent,/Sabay nating tandaan/);
  assert.equal(ctx.TALA_STORE.get().completed.length,0);
  click({action:'next-question'});
  assert.match(nodes['#app'].innerHTML,/Tanong 2 sa 5/);
  assert.equal(one('[data-action="confirm-answer"]').disabled,true);
});
test('All 72 quiz stages finish, save once, score accurately, and unlock next stage',()=>{
  const {ctx,enter,click,nodes}=setup();ctx.TALA_SPEECH.speak=()=>{};
  let stages=0;
  for(const m of ctx.TALA_DATA.modules){
    for(let i=0;i<m.levels.length;i++){
      const l=m.levels[i];if(l.type==='paint')continue;
      enter(m.id,i+1);
      for(const q of l.questions){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
      stages++;
      assert.match(nodes['#app'].innerHTML,/Isang bagong/);
      const id=m.id+':'+(i+1),saved=ctx.TALA_STORE.get();
      assert.ok(saved.completed.includes(id));assert.equal(saved.best[id],5);
      assert.equal(saved.results[id].length,5);assert.ok(saved.results[id].every(r=>r.firstTry));
      click({action:'map'});assert.doesNotMatch(nodes['#app'].innerHTML,new RegExp('data-level="'+(i+2)+'" disabled'));
      click({action:'home'});
    }
  }
  assert.equal(stages,72);assert.equal(ctx.TALA_STORE.get().stars,360);
});
test('A first-question retry earns four stars and replay adds only the improvement',()=>{
  const {ctx,enter,click}=setup();ctx.TALA_SPEECH.speak=()=>{};
  const questions=ctx.TALA_DATA.modules[0].levels[0].questions;
  enter('phonics');click({choice:'1'});click({action:'confirm-answer'});
  for(const q of questions){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
  assert.equal(ctx.TALA_STORE.get().stars,4);
  click({action:'replay'});
  for(const q of questions){click({choice:String(q.answer)});click({action:'confirm-answer'});click({action:'next-question'});}
  assert.equal(ctx.TALA_STORE.get().stars,5);
  assert.equal(ctx.TALA_STORE.get().attempts['phonics:1'],2);
});
test('Painting finale requires a drawing or a stamp and saves completion',()=>{
  const completed=Array.from({length:14},(_,i)=>'arts:'+(i+1));
  const {ctx,enter,click,one}=setup({curriculumVersion:2,completed});
  enter('arts',15);assert.equal(one('[data-action="paint-finish"]').disabled,true);
  click({action:'paint-star'});assert.equal(one('[data-action="paint-finish"]').disabled,false);
  click({action:'paint-clear'});assert.equal(one('[data-action="paint-finish"]').disabled,true);
  click({action:'paint-star'});click({action:'paint-finish'});
  assert.ok(ctx.TALA_STORE.get().completed.includes('arts:15'));
});
test('Original demo progress migrates to matching concepts without extra rewards',()=>{
  const {ctx}=setup({learner:'Ana',stars:10,completed:['phonics:3','numbers:1'],best:{'phonics:3':5},attempts:{'phonics:3':1}});
  const s=ctx.TALA_STORE.get();
  assert.ok(s.completed.includes('phonics:13'));assert.ok(s.completed.includes('numbers:6'));
  assert.equal(s.best['phonics:13'],5);
  assert.equal(ctx.TALA_STORE.complete('phonics:13',5).earned,0);
  assert.equal(ctx.TALA_STORE.get().stars,10);
  assert.equal(ctx.TALA_STORE.get().curriculumVersion,2);
});
test('Lessons, question selection, and hints never use synthesized content audio',()=>{
  const {ctx,enter,click}=setup();let spoken=0;const recordings=[];
  ctx.TALA_SPEECH.speak=()=>spoken++;ctx.TALA_SPEECH.play=(...args)=>recordings.push(args);
  enter('numbers');click({choice:'0'});click({action:'hint'});
  assert.equal(spoken,0);assert.ok(recordings.some(args=>args[1]===ctx.TALA_DATA.modules[1].levels[0].questions[0].hint));
  assert.equal(ctx.TALA_SPEECH.path('Likha','bilog'),'assets/audio/fil/shared/likha/bilog.mp3');
  assert.equal(ctx.TALA_SPEECH.path('numbers',1,'questions/1/option-1'),'assets/audio/fil/numbers/1/questions/1/option-1.mp3');
});
test('TTS selects Filipino/Tagalog voice and refuses English fallback',()=>{
  const {ctx}=setup();let spoken=0,selected;
  ctx.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  ctx.speechSynthesis={getVoices:()=>[{lang:'en-US'}],cancel(){},addEventListener(){},speak(u){spoken++;selected=u;}};
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/speech.js'),'utf8'),ctx);
  ctx.TALA_SPEECH.speak('Mahusay!');assert.equal(spoken,0);
  ctx.speechSynthesis.getVoices=()=>[{lang:'en-US'},{lang:'tl-PH',name:'Tagalog'}];
  ctx.TALA_SPEECH.speak('Mahusay!');assert.equal(spoken,1);assert.equal(selected.lang,'tl-PH');
});
test('Missing option audio stays silent and does not block answer confirmation',async()=>{
  const {ctx,enter,click,one,nodes}=setup();let spoken=0;
  ctx.TALA_SPEECH.speak=()=>spoken++;
  ctx.Audio=class{play(){return Promise.reject(new Error('missing recording'));}pause(){}};
  enter('phonics');click({choice:'0'});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(spoken,0);
  assert.equal(one('[data-action="confirm-answer"]').disabled,false);
  assert.match(nodes['#toast'].textContent,/Wala pang recording/);
  click({action:'confirm-answer'});assert.ok(one('[data-action="next-question"]'));
});
test('Every stage and question has an exact recording script',()=>{
  const {ctx}=setup();
  for(const m of ctx.TALA_DATA.modules)for(let i=0;i<m.levels.length;i++){
    const l=m.levels[i],root=path.join(__dirname,'../assets/audio/fil',m.id,String(i+1));
    const script=fs.readFileSync(path.join(root,'SCRIPT.md'),'utf8');
    assert.ok(script.includes(l.lesson),m.id+':'+(i+1)+' lesson script');
    for(let j=0;j<l.questions.length;j++){
      const question=l.questions[j],text=fs.readFileSync(path.join(root,'questions',String(j+1),'SCRIPT.md'),'utf8');
      assert.ok(text.includes(question.prompt));assert.ok(text.includes(question.hint));
      for(let k=0;k<question.choices.length;k++){assert.ok(text.includes('option-'+(k+1)+'.mp3'));assert.ok(text.includes('Displayed option: '+question.choices[k]));}
    }
  }
});
