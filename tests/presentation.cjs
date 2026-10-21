const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
test('All four character slots use bundled artwork and support a single-path replacement',()=>{
  const ctx={document:{addEventListener(){}}};ctx.window=ctx;vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'js/visuals.js'),'utf8'),ctx);
  for(const name of ['Tala','Likha','Titik','Bilang']){
    const config=ctx.TALA_VISUALS.characters[name];
    assert.ok(fs.existsSync(path.join(root,config.image)));
    assert.match(ctx.TALA_VISUALS.guide(name,'<p>Kaya mo iyan!</p>'),new RegExp('data-character="'+name+'"'));
  }
  ctx.TALA_VISUALS.characters.Tala.image='assets/characters/tala.png';
  assert.match(ctx.TALA_VISUALS.avatar('Tala'),/src="assets\/characters\/tala.png"/);
});
test('Character expressions follow playback, preserve happy feedback, and stop on interruption',async()=>{
  const actors=['Tala','Titik','Likha','Bilang'].map(name=>{
    const img={dataset:{},src:''};
    return {dataset:{character:name,baseExpression:'Neutral',expression:'Neutral'},classList:{remove(){},add(){}},querySelector:()=>img,img};
  });
  const players=[];
  class Audio {
    constructor(){players.push(this);}
    play(){return Promise.resolve();}
    pause(){}
  }
  const ctx={Audio,document:{addEventListener(){},querySelectorAll:()=>actors}};
  ctx.window=ctx;vm.createContext(ctx);
  for(const file of ['visuals','speech'])vm.runInContext(fs.readFileSync(path.join(root,'js',file+'.js'),'utf8'),ctx);
  const visual=ctx.TALA_VISUALS;
  for(const name of ['Tala','Titik','Likha','Bilang']){
    for(const expression of ['Neutral','Happy','Talking']){
      const file=visual.characters[name].expressions[expression];
      assert.ok(fs.existsSync(path.join(root,file)),file);
      assert.match(visual.avatar(name,'',expression),new RegExp(name+'-'+expression+'\\.png'));
    }
  }
  assert.match(visual.avatar('Tala','character-celebrate'),/Tala-Happy\.png/);
  await ctx.TALA_SPEECH.play('Titik','A');
  assert.equal(actors[1].dataset.expression,'Talking');
  assert.equal(actors[0].dataset.expression,'Neutral');
  const container={dataset:{},querySelectorAll:()=>[actors[1]]};
  visual.setMood(container,'happy');assert.equal(actors[1].dataset.expression,'Happy');
  players[0].onended();assert.equal(actors[1].dataset.expression,'Happy');
  visual.setMood(container,'thinking');assert.equal(actors[1].dataset.expression,'Neutral');
  await ctx.TALA_SPEECH.play('Likha','Bilog');
  const old=players.at(-1);ctx.TALA_SPEECH.stop();
  assert.equal(actors[2].dataset.expression,'Neutral');
  await ctx.TALA_SPEECH.play('Bilang','Isa');old.onended();
  assert.equal(actors[3].dataset.expression,'Talking','Stale playback must not reset the new speaker');
  players.at(-1).onerror({name:'NetworkError'});
  assert.equal(actors[3].dataset.expression,'Neutral');
});
test('Each path gets world-specific scenery with no interactive obstacles',()=>{
  const ctx={document:{addEventListener(){}}};ctx.window=ctx;vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'js/visuals.js'),'utf8'),ctx);
  for(const [module,count,landmark]of [['phonics',33,'book'],['numbers',15,'island'],['arts',15,'flower'],['values',10,'cottage']]){
    const html=ctx.TALA_VISUALS.scenery(module,count,185);
    assert.match(html,new RegExp('prop-'+landmark));
    assert.equal((html.match(/class="map-prop /g)||[]).length,count);
    assert.match(html,/aria-hidden="true"/);assert.doesNotMatch(html,/<button|tabindex=/);
  }
});
function audioSetup(saved=new Map()){
  const events={},notes=[],textures=[],gains=[];let created=0,audioContext;
  class AudioContext{
    constructor(){created++;audioContext=this;this.currentTime=0;this.sampleRate=8000;this.state='running';this.destination={};}
    createGain(){const bus={gain:{value:0,setValueAtTime(v){this.value=v;},linearRampToValueAtTime(v){this.value=v;},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};gains.push(bus);return bus;}
    createBuffer(channels,length){return {getChannelData:()=>new Float32Array(length)};}
    createBufferSource(){const source={connect(){},disconnect(){},start(){source.started=true;},stop(){source.stopped=true;source.onended?.();}};textures.push(source);return source;}
    createBiquadFilter(){return {frequency:{value:0},connect(){},disconnect(){}};}
    createOscillator(){const note={frequency:{setValueAtTime(f){note.frequencyValue=f;}},connect(){},disconnect(){},start(t){note.started=t;},stop(){note.stopped=true;note.onended?.();}};notes.push(note);return note;}
    resume(){this.state='running';return Promise.resolve();}
    suspend(){this.state='suspended';return Promise.resolve();}
  }
  const timers=new Map();let nextTimer=1;
  const ctx={AudioContext,document:{hidden:false,addEventListener:(e,fn)=>events[e]=fn},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},setTimeout:(fn,delay)=>{const id=nextTimer++;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)};
  ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'js/sfx.js'),'utf8'),ctx);
  return {ctx,notes,textures,gains,events,saved,timers,created:()=>created,context:()=>audioContext};
}
test('Scroll piano changes notes, limits rapid swipes, and respects narration and mute',()=>{
  const env=audioSetup(),{ctx,notes}=env;
  ctx.TALA_SFX.scroll(1);assert.equal(env.created(),0);
  ctx.TALA_SFX.play('tap');
  const start=notes.length;
  ctx.TALA_SFX.scroll(1);assert.equal(notes.length,start+3);
  const first=notes[start].frequencyValue;
  ctx.TALA_SFX.scroll(1);assert.equal(notes.length,start+3);
  env.context().currentTime=.2;
  ctx.TALA_SFX.scroll(1);assert.equal(notes.length,start+6);
  assert.notEqual(notes[start+3].frequencyValue,first);
  env.context().currentTime=.4;
  ctx.TALA_SFX.scroll(-1);assert.equal(notes[start+6].frequencyValue,first);
  const count=notes.length;
  ctx.TALA_SFX.setNarrating(true);env.context().currentTime=.6;
  ctx.TALA_SFX.scroll(1);assert.equal(notes.length,count);
  ctx.TALA_SFX.setNarrating(false);
  ctx.document.hidden=true;ctx.TALA_SFX.scroll(1);assert.equal(notes.length,count);
  ctx.document.hidden=false;
  ctx.TALA_SFX.toggle();ctx.TALA_SFX.scroll(1);assert.equal(notes.length,count);
});
test('Effects initialize on interaction, completion plays a jingle, and muting persists',()=>{
  const env=audioSetup(),{ctx,notes,saved}=env;
  assert.equal(env.created(),0);ctx.TALA_SFX.play('complete');
  assert.equal(env.created(),1);assert.equal(notes.length,6);
  assert.ok(notes.every(n=>n.started!==undefined));
  ctx.TALA_SFX.toggle();assert.equal(ctx.TALA_SFX.isEnabled(),false);assert.ok(notes.every(n=>n.stopped));
  ctx.TALA_SFX.play('tap');assert.equal(notes.length,6);
  const next=audioSetup(saved);assert.equal(next.ctx.TALA_SFX.isEnabled(),false);
  next.ctx.TALA_SFX.play('tap');assert.equal(next.created(),0);
});
test('Effects stop in background and gracefully tolerate missing audio support',()=>{
  const {ctx,events,notes}=audioSetup();
  ctx.TALA_SFX.play('tap');ctx.document.hidden=true;events.visibilitychange();assert.ok(notes.every(n=>n.stopped));
  const length=notes.length;ctx.TALA_SFX.play('complete');assert.equal(notes.length,length);
  const unsupported={document:{addEventListener(){}},localStorage:{getItem(){}}};unsupported.window=unsupported;
  vm.createContext(unsupported);vm.runInContext(fs.readFileSync(path.join(root,'js/sfx.js'),'utf8'),unsupported);
  assert.doesNotThrow(()=>unsupported.TALA_SFX.play('tap'));
});
test('Five themes have distinct timbres and phrasing, switch cleanly, and respect mute',()=>{
  const {ctx,notes,timers}=audioSetup();
  ctx.TALA_SFX.setWorld('home');assert.equal(notes.length,0,'Rendering alone must not start music');
  ctx.TALA_SFX.play('tap');
  const melodies=[];
  const durations=[];
  for(const world of ['phonics','numbers','arts','values','home']){
    const start=notes.length;
    ctx.TALA_SFX.setWorld(world);
    melodies.push(notes.slice(start,start+4).map(n=>n.frequencyValue).join(','));
    assert.equal(timers.size,1);
    durations.push([...timers.values()][0].delay);
  }
  assert.equal(new Set(melodies).size,5);
  assert.equal(new Set(durations).size,5,'Different phrase lengths and tempos');
  const count=notes.length;
  ctx.TALA_SFX.toggle();assert.equal(timers.size,0);
  ctx.TALA_SFX.setWorld('phonics');assert.equal(notes.length,count);
  ctx.TALA_SFX.toggle();assert.ok(notes.length>count);
  ctx.TALA_SFX.setWorld(null);assert.equal(timers.size,0);
});
test('World arrivals add independent ambience, duck under speech, and stop when hidden or muted',()=>{
  const env=audioSetup(),{ctx,notes,textures,gains,events,timers}=env;
  ctx.TALA_SFX.play('tap');
  for(const world of ['phonics','numbers','arts','values']){
    ctx.TALA_SFX.setWorld(world);
    const before=notes.length,noise=textures.length;
    ctx.TALA_SFX.enterWorld(world);
    assert.ok(notes.length>before,world+' arrival has a unique tonal cue');
    assert.ok(textures.length>noise,world+' arrival has a natural texture');
    assert.equal(timers.size,1,'Arrival must not create another music loop');
  }
  assert.equal(gains[0].gain.value,.48,'SFX master level is raised without changing the voiceover player');
  ctx.TALA_SFX.setNarrating(true);assert.equal(gains[1].gain.value,.30);assert.equal(gains[2].gain.value,.25);
  ctx.TALA_SFX.setNarrating(false);assert.equal(gains[1].gain.value,.72);assert.equal(gains[2].gain.value,.60);
  ctx.document.hidden=true;events.visibilitychange();assert.equal(timers.size,0);
  const count=notes.length;ctx.TALA_SFX.enterWorld('phonics');assert.equal(notes.length,count);
  ctx.document.hidden=false;events.visibilitychange();assert.equal(timers.size,1);
  ctx.TALA_SFX.toggle();assert.equal(timers.size,0);
  const muted=notes.length;ctx.TALA_SFX.enterWorld('numbers');assert.equal(notes.length,muted);
  assert.ok(textures.every(source=>source.stopped));
});
test('First interaction during narration starts the louder game mix already ducked',()=>{
  const {ctx,gains}=audioSetup();
  ctx.TALA_SFX.setNarrating(true);ctx.TALA_SFX.setWorld('home');ctx.TALA_SFX.play('tap');
  assert.equal(gains[0].gain.value,.48);
  assert.equal(gains[1].gain.value,.30);
  assert.equal(gains[2].gain.value,.25);
});
test('Offline shell includes all new visual and audio code assets',()=>{
  const ctx={self:{addEventListener(){}}};vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root,'sw.js'),'utf8'),ctx);const files=vm.runInContext('FILES',ctx);
  const paths=Array.from(files,file=>file.split('?')[0]);
  for(const file of paths)assert.ok(fs.existsSync(path.resolve(root,file)),file);
  for(const required of ['./css/playful.css','./css/vibrant.css','./js/sfx.js','./js/visuals.js','./js/quest.js','./assets/characters/tala.svg'])assert.ok(paths.includes(required));
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const [,asset]of html.matchAll(/(?:src|href)="((?:css|js)\/[^\"]+)"/g))assert.ok(files.includes('./'+asset),asset+' is cached at the same version as HTML');
});
