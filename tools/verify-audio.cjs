// Validate the actual shared MP3 library against the app's runtime catalog.
const fs=require('node:fs');
const path=require('node:path');
const {catalog}=require('./audio-catalog.cjs');
const root=path.resolve(__dirname,'..');
function duration(bytes){
  let offset=0,frames=0,seconds=0;
  if(bytes.subarray(0,3).toString()==='ID3')offset=10+((bytes[6]&127)<<21)+((bytes[7]&127)<<14)+((bytes[8]&127)<<7)+(bytes[9]&127);
  while(offset+4<=bytes.length){
    if(bytes[offset]!==255||(bytes[offset+1]&224)!==224){offset++;continue;}
    const version=(bytes[offset+1]>>3)&3,layer=(bytes[offset+1]>>1)&3,index=bytes[offset+2]>>4,sample=(bytes[offset+2]>>2)&3;
    if(version===1||layer!==1||index===0||index===15||sample===3){offset++;continue;}
    const bitrate=(version===3?[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320]:[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160])[index];
    const rate=[44100,48000,32000][sample]/(version===3?1:version===2?2:4);
    const size=Math.floor((version===3?144000:72000)*bitrate/rate)+((bytes[offset+2]>>1)&1);
    if(offset+size>bytes.length)break;
    frames++;seconds+=(version===3?1152:576)/rate;offset+=size;
  }
  if(!frames)throw Error('No complete MPEG Layer III frames');
  return seconds;
}
function verify(){
  const rows=catalog().entries,missing=[],invalid=[],counts={};let bytes=0,seconds=0;
  for(const row of rows){
    const file=path.join(root,row.file);
    if(!fs.existsSync(file)){missing.push(row.file);continue;}
    try{
      const data=fs.readFileSync(file);seconds+=duration(data);bytes+=data.length;
      counts[row.character]=(counts[row.character]||0)+1;
    }catch(error){invalid.push({file:row.file,error:error.message});}
  }
  const result={expected:rows.length,valid:Object.values(counts).reduce((a,b)=>a+b,0),characters:counts,megabytes:Number((bytes/1024/1024).toFixed(2)),minutes:Number((seconds/60).toFixed(1)),missing,invalid};
  console.log(JSON.stringify(result,null,2));
  if(missing.length||invalid.length)process.exitCode=1;
  return result;
}
if(require.main===module)verify();
module.exports={duration,verify};
