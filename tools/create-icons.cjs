// Deterministic rasterization of the repo's vector app mark; no image service needed.
const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
  const root=path.resolve(__dirname,'..'),svg=fs.readFileSync(path.join(root,'assets/icons/tala.svg'),'utf8');
  const browser=await chromium.launch({channel:process.env.TALA_BROWSER||'chrome',headless:true});
  try{
    const page=await browser.newPage();
    for(const size of [192,512]){
      const base64=await page.evaluate(async({svg,size})=>{
        const image=new Image();image.src='data:image/svg+xml;base64,'+btoa(svg);await image.decode();
        const canvas=document.createElement('canvas');canvas.width=canvas.height=size;canvas.getContext('2d').drawImage(image,0,0,size,size);
        return canvas.toDataURL('image/png').split(',')[1];
      },{svg,size});
      fs.writeFileSync(path.join(root,`assets/icons/tala-${size}.png`),Buffer.from(base64,'base64'));
      console.log(`Generated ${size}px icon`);
    }
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
