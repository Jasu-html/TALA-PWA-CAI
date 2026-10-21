const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {catalog,removeRepeatedNumerals}=require('../tools/audio-catalog.cjs');
const root=path.resolve(__dirname,'..');
test('TTS removes matching redundant digits but keeps standalone numbers, decimals, and math',()=>{
  for(const [input,expected]of [
    ['Ito ang isa (1) at dalawa (2).','Ito ang isa at dalawa.'],
    ['isa 1 at dalawa 2','isa at dalawa'],
    ['LIMA [5], anim ( 6 ), pito 7.','LIMA, anim, pito.'],
    ['Bilang 1 at 2. 1 + 2 = 3.','Bilang 1 at 2. 1 + 2 = 3.'],
    ['isa (2), isa 10, isa1, isa 1.5, isa 1,000','isa (2), isa 10, isa1, isa 1.5, isa 1,000']
  ])assert.equal(removeRepeatedNumerals(input),expected);
  const entry=catalog().entries.find(e=>e.file==='assets/audio/fil/shared/bilang/ito-ang-isa-1-at-dalawa-2-bilangin-ang-bawat-bituin.mp3');
  assert.equal(entry.synthesisText,'Ito ang isa at dalawa. Bilangin ang bawat bituin.');
  assert.ok(entry.sourceText.includes('(1)'));assert.ok(entry.sourceText.includes('(2)'));
});
test('Audio catalog covers live lessons, questions, options and stories with runtime-compatible filenames',()=>{
  const ctx={};ctx.window=ctx;vm.createContext(ctx);
  for(const name of ['data','quest','speech'])vm.runInContext(fs.readFileSync(path.join(root,'js',name+'.js'),'utf8'),ctx);
  const result=catalog(),byPath=new Map(result.entries.map(e=>[e.file,e]));
  assert.equal(byPath.size,result.entries.length);
  function check(character,text){assert.ok(byPath.has(ctx.TALA_SPEECH.sharedPath(character,text)),character+': '+text);}
  for(const m of ctx.TALA_DATA.modules)for(const l of m.levels){
    check(m.guide,l.lesson);
    for(const q of l.questions){check(m.guide,q.prompt);check(m.guide,q.hint);q.choices.forEach(c=>check(m.guide,c));}
  }
  for(const page of ctx.TALA_DATA.intro)check('Tala',page.text);
  for(const pages of Object.values(ctx.TALA_QUEST.stories))for(const page of pages)check('Tala',page.text);
  check('Tala',ctx.TALA_QUEST.world.levels[0].lesson);
  check('Tala',ctx.TALA_DATA.welcomeVoice);
  for(const text of Object.values(ctx.TALA_DATA.uiVoice))check('Tala',text);
  for(const text of Object.values(ctx.TALA_DATA.moduleVoice))check('Tala',text);
  for(const character of ['Tala','Titik','Bilang','Likha'])
    for(const step of ctx.TALA_DATA.tutorials.quiz)check(character,step[1]+' '+step[2]);
  for(const step of ctx.TALA_DATA.tutorials.paint)check('Likha',step[1]+' '+step[2]);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,'docs/voice-scripts/audio-manifest.json'),'utf8')),result);
});
test('Rebuilt scripts retain letters r and n, remove decorative emoji, and flag letter audio for review',()=>{
  const entries=catalog().entries;
  const get=(character,name)=>entries.find(e=>e.file===`assets/audio/fil/shared/${character}/${name}.mp3`);
  assert.equal(get('titik','hanapin-ang-araw').text,'Hanapin ang araw.');
  assert.equal(get('likha','walang-sulok-ang-bilog').text,'Walang sulok ang bilog.');
  assert.equal(get('titik','araw').synthesisText,'araw');
  assert.equal(get('titik','A').requiresReview,true);
  assert.equal(get('titik','A').file,'assets/audio/fil/shared/titik/A.mp3');
  for(const character of ['Tala','Likha','Titik','Bilang']){
    const doc=fs.readFileSync(path.join(root,'docs/voice-scripts',character.toUpperCase()+'_PHRASES.md'),'utf8');
    for(const row of entries.filter(e=>e.character===character))assert.ok(doc.includes(path.basename(row.file)+' — '+row.text));
  }
});
