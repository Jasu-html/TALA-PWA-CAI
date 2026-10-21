const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
function png(file,size){
  const data=fs.readFileSync(path.join(root,file));
  assert.equal(data.subarray(1,4).toString(),'PNG',file);
  assert.equal(data.readUInt32BE(16),size,file+' width');
  assert.equal(data.readUInt32BE(20),size,file+' height');
}
test('PWA has correctly sized normal, Apple and maskable icons available offline',()=>{
  const manifest=JSON.parse(read('manifest.webmanifest')),worker=read('sw.js');
  for(const icon of manifest.icons){png(icon.src,parseInt(icon.sizes));assert.ok(worker.includes(icon.src),'Cache '+icon.src);}
  assert.ok(manifest.icons.some(i=>i.purpose==='maskable'));
  png('assets/icons/tala-180.png',180);
  assert.match(read('index.html'),/apple-touch-icon[^>]+tala-180\.png/);
  assert.match(read('index.html'),/rel="icon"[^>]+tala-192\.png/);
  assert.ok(fs.existsSync(path.join(root,'docs/icon-source/Tala-icon.png')),'Preserve supplied portrait');
  assert.match(read('tools/create-icons.cjs'),/docs\/icon-source\/tala-portrait-master\.png/,'Export from the portrait master');
});
test('Android launcher uses matching density assets, adaptive layers and themed artwork',()=>{
  const manifest=read('android/app/src/main/AndroidManifest.xml');
  assert.match(manifest,/android:icon="@mipmap\/ic_launcher"/);
  assert.match(manifest,/android:roundIcon="@mipmap\/ic_launcher_round"/);
  for(const [density,scale]of [['mdpi',1],['hdpi',1.5],['xhdpi',2],['xxhdpi',3],['xxxhdpi',4]]){
    const folder='android/app/src/main/res/mipmap-'+density+'/';
    for(const name of ['ic_launcher','ic_launcher_round'])png(folder+name+'.png',48*scale);
    for(const name of ['ic_launcher_foreground','ic_launcher_background'])png(folder+name+'.png',108*scale);
  }
  for(const api of [26,33])for(const icon of ['ic_launcher','ic_launcher_round']){
    const xml=read(`android/app/src/main/res/mipmap-anydpi-v${api}/${icon}.xml`);
    assert.match(xml,/@mipmap\/ic_launcher_background/);assert.match(xml,/@mipmap\/ic_launcher_foreground/);
    if(api===33)assert.match(xml,/<monochrome android:drawable="@drawable\/tala_monochrome"/);
  }
  assert.match(read('android/app/src/main/res/drawable/tala_icon.xml'),/@mipmap\/ic_launcher_foreground/);
});
