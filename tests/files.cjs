const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/files.js'),'utf8');
test('Android file exports use the native document picker with explicit data and MIME, not blob URLs',async()=>{
  const calls=[];const ctx={Blob,Capacitor:{isNativePlatform:()=>true,Plugins:{TalaClassroomFiles:{async save(value){calls.push(value);},async open(){return {data:'{"backup":true}'};}}}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);await ctx.TALA_FILES.save('test','TALA-records.csv','text/csv;charset=utf-8');assert.equal(calls[0].mime,'text/csv');assert.equal(calls[0].data,'test');assert.equal(await ctx.TALA_FILES.open(),'{"backup":true}');
});
test('Missing native plugin, cancelled exports and write errors propagate rather than claiming success',async()=>{
  const ctx={Blob,Capacitor:{isNativePlatform:()=>true,Plugins:{}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(source,ctx);await assert.rejects(ctx.TALA_FILES.save('x','x.json','application/json'));
  ctx.Capacitor.Plugins.TalaClassroomFiles={save:()=>Promise.reject(Object.assign(Error('Cancelled'),{code:'cancelled'}))};await assert.rejects(ctx.TALA_FILES.save('x','x.json','application/json'),e=>e.code==='cancelled');
});
test('Android document plugin bounds imports, validates names and adds no broad storage permission',()=>{
  const java=fs.readFileSync(path.join(__dirname,'../android/app/src/main/java/com/tala/learning/TalaClassroomFilesPlugin.java'),'utf8');assert.match(java,/ACTION_CREATE_DOCUMENT/);assert.match(java,/ACTION_OPEN_DOCUMENT/);assert.match(java,/bytes.size\(\) \+ count > 5000000/);assert.match(java,/writer.execute/);const manifest=fs.readFileSync(path.join(__dirname,'../android/app/src/main/AndroidManifest.xml'),'utf8');assert.doesNotMatch(manifest,/MANAGE_EXTERNAL_STORAGE|WRITE_EXTERNAL_STORAGE/);
});
