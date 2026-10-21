// Export the portrait master; do not redraw character artwork here.
const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
  const root=path.resolve(__dirname,'..');
  const master='data:image/png;base64,'+fs.readFileSync(path.join(root,'docs/icon-source/tala-portrait-master.png')).toString('base64');
  const background='data:image/svg+xml;base64,'+Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><defs><linearGradient id="sky" x2="1" y2="1"><stop stop-color="#6742CB"/><stop offset="1" stop-color="#30246C"/></linearGradient></defs><rect width="512" height="512" fill="url(#sky)"/></svg>').toString('base64');
  const browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  try{
    const page=await browser.newPage();
    async function render(source,size,file,mask='none'){
      const base64=await page.evaluate(async({source,size,mask})=>{
        const image=new Image();image.src=source;await image.decode();
        const canvas=document.createElement('canvas');canvas.width=canvas.height=size;const ctx=canvas.getContext('2d');
        ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
        if(mask!=='none'){
          ctx.beginPath();
          if(mask==='circle')ctx.arc(size/2,size/2,size/2,0,Math.PI*2);
          else ctx.roundRect(0,0,size,size,size*.21875);
          ctx.clip();
        }
        ctx.drawImage(image,0,0,size,size);
        return canvas.toDataURL('image/png').split(',')[1];
      },{source,size,mask});
      fs.writeFileSync(path.join(root,file),Buffer.from(base64,'base64'));
      console.log('Generated '+file+' ('+size+'px)');
    }
    for(const size of [192,512])await render(master,size,'assets/icons/tala-'+size+'.png','rounded');
    await render(master,512,'assets/icons/tala-maskable-512.png');
    await render(master,180,'assets/icons/tala-180.png');
    for(const [density,scale]of [['mdpi',1],['hdpi',1.5],['xhdpi',2],['xxhdpi',3],['xxxhdpi',4]]){
      const dir='android/app/src/main/res/mipmap-'+density;
      await render(master,48*scale,dir+'/ic_launcher.png');
      await render(master,48*scale,dir+'/ic_launcher_round.png','circle');
      // Full-bleed foreground lets each Android launcher apply its own mask.
      await render(master,108*scale,dir+'/ic_launcher_foreground.png');
      await render(background,108*scale,dir+'/ic_launcher_background.png');
    }
    const checks=await page.evaluate(async source=>{
      const image=new Image();image.src=source;await image.decode();
      const canvas=document.createElement('canvas');canvas.width=canvas.height=512;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,512,512);
      const pixels=ctx.getImageData(0,0,512,512).data;
      let opaque=true;for(let i=3;i<pixels.length;i+=4)if(pixels[i]!==255)opaque=false;
      // Face landmarks measured from this master, not an automatic face detector.
      const points=[[.38,.35],[.58,.29],[.50,.43]];
      return {opaque,square:image.width===image.height,faceInsideSafeCircle:points.every(([x,y])=>Math.hypot(x-.5,y-.5)<33/108)};
    },master);
    if(!checks.opaque||!checks.square||!checks.faceInsideSafeCircle)throw Error('Icon validation failed: '+JSON.stringify(checks));
    console.log('Portrait master checks passed: '+JSON.stringify(checks));
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
