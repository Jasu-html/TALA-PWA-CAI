const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(extra={}){const ctx={document:{addEventListener(){}},setTimeout,clearTimeout,...extra};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/navigation.js','utf8'),ctx);return ctx.TALA_NAV;}
test('78 distinct achievements are locked for a new learner and all are achievable',()=>{
  const nav=setup(),blank={completed:[],best:{},stars:0};
  assert.equal(nav.catalog.length,78);assert.equal(new Set(nav.catalog.map(x=>x.id)).size,78);
  assert.ok(nav.evaluate(blank).every(x=>!x.unlocked&&x.value===0));
  const completed=[];for(const [id,n]of [['phonics',33],['numbers',15],['arts',15],['values',10],['quest',10]])for(let i=1;i<=n;i++)completed.push(`${id}:${i}`);
  assert.ok(nav.evaluate({completed,best:Object.fromEntries(completed.map(id=>[id,5])),stars:415}).every(x=>x.unlocked));
});
test('One-star completion earns module and letter badges without requiring perfect scores',()=>{
  const nav=setup(),progress={completed:['phonics:1','phonics:1','invalid:1','quest:999'],best:{'phonics:1':1},stars:1},badges=nav.evaluate(progress);
  const get=id=>badges.find(x=>x.id===id);
  for(const id of ['letter-A','stars-1','phonics-1','stages-1'])assert.equal(get(id).unlocked,true);
  for(const id of ['letter-B','perfect-1','quest-1','all-worlds'])assert.equal(get(id).unlocked,false);
  assert.equal(get('stages-3').value,1);
  assert.ok(nav.evaluate({completed:[],best:{},stars:0}).every(x=>!x.unlocked),'A different learner does not inherit badges');
});
test('Bottom navigation replaces the hamburger and is cached for offline use',()=>{
  const html=fs.readFileSync('index.html','utf8');assert.match(html,/<nav id="bottom-nav"/);
  assert.doesNotMatch(html,/<header[\s\S]*?data-action="dashboard"[\s\S]*?<\/header>/);
  assert.match(fs.readFileSync('sw.js','utf8'),/js\/navigation\.js/);
  assert.match(fs.readFileSync('sw.js','utf8'),/css\/navigation\.css/);
});
test('Four icon-only SVG tabs use the requested order and accessible labels',()=>{
  const root={innerHTML:''},body={dataset:{}};
  const nav=setup({document:{addEventListener(){},querySelector:()=>root,body}});nav.render('tasks');
  assert.deepEqual([...root.innerHTML.matchAll(/data-action="([^"]+)"/g)].map(m=>m[1]),['nav-home','nav-tasks','nav-achievements','nav-settings']);
  assert.deepEqual([...root.innerHTML.matchAll(/aria-label="([^"]+)"/g)].map(m=>m[1]),['Home','Mga Gawain','Tagumpay','Settings']);
  assert.equal((root.innerHTML.match(/<svg/g)||[]).length,4);
  assert.equal(root.innerHTML.replace(/<[^>]*>/g,'').trim(),'');
  assert.doesNotMatch(root.innerHTML,/\p{Extended_Pictographic}/u);
  assert.match(root.innerHTML,/data-action="nav-tasks"[^>]*aria-current="page"/);
  nav.render('start');assert.equal(root.hidden,true);
});
test('Activities use only current learner progress, escape lesson titles and guard replay',()=>{
  let progress={completed:['phonics:1'],best:{'phonics:1':1}},opened=null;
  const nav=setup({TALA_DATA:{modules:[{id:'phonics',guide:'Titik',title:'Titik at Tunog',levels:[{title:'<script>bad</script>'},{title:'B'}]}]},TALA_SFX:{play(){}},TALA_CLASSROOM:{assignment:()=>({moduleId:'phonics',level:2,status:'assigned'}),draft:()=>({state:{module:'phonics',level:1}})}});
  nav.init({store:()=>progress,openTask:t=>opened=t});let html=nav.screens.tasks();
  assert.match(html,/classroom-assigned/);assert.match(html,/classroom-resume/);assert.match(html,/Mga natapos na yugto \(1\)/);
  assert.doesNotMatch(html,/<script>/);assert.match(html,/&lt;script&gt;/);
  nav.handle({dataset:{action:'task-replay',task:'phonics:2'}});assert.equal(opened,null);
  nav.handle({dataset:{action:'task-replay',task:'phonics:1'}});assert.equal(opened.moduleId,'phonics');assert.equal(opened.level,1);
  progress={completed:[],best:{}};assert.match(nav.screens.tasks(),/Mga natapos na yugto \(0\)/);
});
test('Activities have a useful standalone empty state without classroom setup',()=>{
  const nav=setup({TALA_DATA:{modules:[]}});nav.init({store:()=>({completed:[],best:{}})});
  assert.match(nav.screens.tasks(),/Wala pang naka-assign/);assert.match(nav.screens.tasks(),/nav-home/);
  assert.doesNotMatch(nav.screens.tasks(),/data-action="classroom-resume"/);
});
test('New unlocks queue one banner and chime at a time, never on unchanged progress',()=>{
  const timers=new Map(),notices=[],sounds=[];let next=0;
  const document={hidden:false,addEventListener(){},createElement(){return {setAttribute(){},remove(){this.removed=true;}};},body:{append(el){notices.push(el);}}};
  const nav=setup({document,setTimeout(fn,delay){timers.set(++next,{fn,delay});return next;},clearTimeout(id){timers.delete(id);},TALA_SFX:{play(name){sounds.push(name);}}});
  const empty={completed:[],best:{},stars:0},earned={completed:['phonics:1'],best:{'phonics:1':1},stars:1};
  assert.equal(nav.newlyUnlocked(empty,earned).length,4);assert.equal(nav.newlyUnlocked(earned,earned).length,0);
  nav.celebrate(empty,earned);assert.equal(timers.size,1);assert.equal(notices.length,0);
  const tick=()=>{const [id,t]=timers.entries().next().value;timers.delete(id);t.fn();};tick();
  assert.equal(notices.length,1);assert.match(notices[0].innerHTML,/Bagong tagumpay/);assert.deepEqual(sounds,['achievement']);
  tick();assert.equal(notices[0].removed,true);assert.equal(notices.length,2);
  nav.handle({dataset:{action:'badge-dismiss'}});assert.equal(timers.size,0);assert.equal(notices[1].removed,true);
  nav.celebrate(earned,earned);assert.equal(timers.size,0);
  document.hidden=true;nav.celebrate(empty,earned);assert.equal(timers.size,0);
});
