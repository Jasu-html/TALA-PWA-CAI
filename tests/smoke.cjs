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
  const nodes={'#app':{get innerHTML(){return html;},set innerHTML(v){parse(v);},querySelectorAll:()=>revealItems||[]},'#wallet-stars':{},'#toast':element(),'#feedback':{textContent:''},'#paint-canvas':canvas};
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
  for(const file of ['data','storage','speech','sfx','visuals','app'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',file+'.js'),'utf8'),ctx);
  function click(dataset) {
    const b=buttons.find(b=>Object.entries(dataset).every(([k,v])=>b.dataset[k]===v));
    assert.ok(b,'Button exists: '+JSON.stringify(dataset));
    if(b.disabled)return;
    for(const fn of [...handlers.click])fn({target:{closest:()=>b}});
  }
  const enter=(module,n=1)=>{click({module});click({level:String(n)});click({action:'practice'});};
  return {ctx,nodes,click,enter,one,all,canvasHandlers,timers,timerDelays,observers};
}
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
