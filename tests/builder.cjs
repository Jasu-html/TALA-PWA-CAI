const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function validator(){const ctx={document:{addEventListener(){}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/builder.js','utf8'),ctx);return ctx.TALA_BUILDER.validate;}
function lesson(){return {id:'a',rootId:'a',module:'Mga Hayop',stage:'Bukid',title:'Pusa',instructions:'Pumili.',audio:'',version:1,status:'draft',questions:[{text:'Alin ang pusa?',hint:'',picture:'',audio:'',hintAudio:'',answer:0,options:[{text:'Pusa',audio:''},{text:'Aso',audio:''},{text:'Ibon',audio:''}]}]};}
test('Custom lesson validation enforces content, media limits and safe local-only formats',()=>{
 const check=validator(),l=lesson();assert.doesNotThrow(()=>check(l,true));
 for(const value of ['https://example.com/a.png','data:image/svg+xml;base64,PHN2Zz4=']){const bad=lesson();bad.questions[0].picture=value;assert.throws(()=>check(bad,true));}
 const duplicate=lesson();duplicate.questions[0].options[1].text='PUSA';assert.throws(()=>check(duplicate,true));
 const empty=lesson();empty.title='';assert.doesNotThrow(()=>check(empty));assert.throws(()=>check(empty,true));
 const audio=lesson();audio.audio='data:audio/webm;base64,';assert.throws(()=>check(audio,true));
 const large=lesson();large.audio='x'.repeat(4800001);assert.throws(()=>check(large,true));
});
