// Regenerate reusable scripts from the running curriculum, never from old MD text.
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
function removeRepeatedNumerals(text){
  const words=['sero','isa','dalawa','tatlo','apat','lima','anim','pito','walo','siyam','sampu'];
  words.forEach((word,n)=>{
    const redundant=new RegExp('(?<![\\p{L}\\p{N}])('+word+')(?:\\s*\\(\\s*'+n+'\\s*\\)|\\s*\\[\\s*'+n+'\\s*\\]|\\s+'+n+'(?![\\p{L}\\p{N}]|[.,]\\d))','giu');
    text=text.replace(redundant,'$1');
  });
  return text.replace(/\s+/g,' ').trim();
}
function catalog(){
  const ctx={};ctx.window=ctx;vm.createContext(ctx);
  for(const name of ['data','quest','speech'])vm.runInContext(fs.readFileSync(path.join(ROOT,'js',name+'.js'),'utf8'),ctx);
  const entries=new Map();
  const clean=text=>text.replace(/[^\p{Letter}\p{Number}\p{Punctuation}\p{Separator}]/gu,' ').replace(/\s+/g,' ').trim();
  function add(character,text,source){
    text=ctx.TALA_SPEECH.spokenText(text);
    const file=ctx.TALA_SPEECH.sharedPath(character,text);
    if(!entries.has(file)){
      const original=clean(text),spoken=removeRepeatedNumerals(original);
      entries.set(file,{character,file,sourceText:original,text:spoken,synthesisText:spoken,requiresReview:/^[a-z]$|^[a-z] [a-z]$/i.test(text),sources:[]});
    }
    const entry=entries.get(file);if(!entry.sources.includes(source))entry.sources.push(source);
  }
  for(const module of ctx.TALA_DATA.modules)module.levels.forEach((level,i)=>{
    const source=module.id+':'+(i+1);add(module.guide,level.lesson,source+':lesson');
    for(const [j,q] of level.questions.entries()){
      add(module.guide,q.prompt,source+':question:'+(j+1));add(module.guide,q.hint,source+':hint:'+(j+1));
      q.choices.forEach(choice=>add(module.guide,choice,source+':option:'+(j+1)));
    }
  });
  ctx.TALA_DATA.intro.forEach((page,i)=>add('Tala',page.text,'intro:'+(i+1)));
  add('Tala',ctx.TALA_DATA.welcomeVoice,'welcome:instruction');
  for(const [key,text] of Object.entries(ctx.TALA_DATA.uiVoice))add('Tala',text,'interface:'+key);
  for(const [key,text] of Object.entries(ctx.TALA_DATA.moduleVoice))add('Tala',text,'module:'+key);
  for(const [kind,pages] of Object.entries(ctx.TALA_QUEST.stories))pages.forEach((page,i)=>add('Tala',page.text,'quest:'+kind+':'+(i+1)));
  add('Tala',ctx.TALA_QUEST.world.levels[0].lesson,'quest:instruction');
  add('Likha','Gamitin ang iyong imahinasyon. Bawat guhit ay espesyal!','paint:instruction');
  for(const character of ['Tala','Titik','Bilang','Likha'])
    ctx.TALA_DATA.tutorials.quiz.forEach((step,i)=>add(character,step[1]+' '+step[2],'tutorial:quiz:'+(i+1)));
  ctx.TALA_DATA.tutorials.paint.forEach((step,i)=>add('Likha',step[1]+' '+step[2],'tutorial:paint:'+(i+1)));
  return {schemaVersion:1,entries:[...entries.values()]};
}
function write(){
  const result=catalog(),folder=path.join(ROOT,'docs','voice-scripts');
  fs.writeFileSync(path.join(folder,'audio-manifest.json'),JSON.stringify(result,null,2)+'\n','utf8');
  for(const character of ['Tala','Likha','Titik','Bilang']){
    const rows=result.entries.filter(entry=>entry.character===character);
    let text=`# TALA — ${character} phrase library\n\nFolder: assets/audio/fil/shared/${character.toLowerCase()}\n\nIsang recording lang bawat natatanging filename. Ang mga linya ay mula sa kasalukuyang curriculum.\n\n${rows.length} reusable recordings. Huwag basahin ang emoji o filename. Ang mga titik at pares ng titik ay kailangang pakinggan at suriin bago gamitin sa pagtuturo.\n\n`;
    if(character==='Tala')text+='Mga gabay sa pag-arte: [unang kuwento](TALA_INTRO.md), [gabay sa hamon](TALA_QUEST.md), at [Tala at Anino](TALA_QUEST_STORY.md).\n\n';
    if(character==='Titik')text+='Para sa paisa-isang titik at pares ng titik, gamitin ang **English na pangalan ng titik**: A = ey, B = bi. English TTS voice ang ginagamit sa mga clip na ito; Filipino pa rin ang mga pangungusap at salita. Tingnan ang [voice notes](../../VOICE_RESEARCH.md).\n\n';
    text+=rows.map(row=>'- '+path.basename(row.file)+' — '+row.text).join('\n')+'\n';
    fs.writeFileSync(path.join(folder,character.toUpperCase()+'_PHRASES.md'),text,'utf8');
  }
  console.log(JSON.stringify({recordings:result.entries.length,characters:Object.fromEntries(['Tala','Likha','Titik','Bilang'].map(c=>[c,result.entries.filter(e=>e.character===c).length])),review:result.entries.filter(e=>e.requiresReview).length}));
}
if(require.main===module){if(process.argv.includes('--write'))write();else console.log(JSON.stringify(catalog(),null,2));}
module.exports={catalog,removeRepeatedNumerals};
