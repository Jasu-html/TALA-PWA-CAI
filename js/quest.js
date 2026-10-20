// Mixed review uses the live curriculum and its existing shared recordings.
(function () {
  const lesson='Balikan natin ang mga araling natutuhan mo. Piliin at pakinggan ang sagot, saka pindutin ang Ito ang sagot ko. Kaya mo ito!';
  const world={id:'quest',icon:'🌟',guide:'Tala',world:'Landas ng mga Bituin',title:'Hamon ni Tala',color:'gold',levels:Array.from({length:10},(_,i)=>({title:'Hamon '+(i+1),lesson,visual:'✦ '+(i+1)+' ✦',picture:'🌌',questions:[]}))};
  const length=round=>round<=3?8:10;
  const eligible=progress=>TALA_DATA.modules.every(m=>m.levels.every((_,i)=>progress.completed.includes(m.id+':'+(i+1))));
  const finished=progress=>world.levels.every((_,i)=>progress.completed.includes('quest:'+(i+1)));
  // Tala narrates the story, including the gentle shadow villain, Anino.
  const stories={
    opening:[
      {scene:'restored',title:'Bumalik ang ningning!',text:'Natapos mo ang lahat ng aralin! Dahil sa iyong pagsisikap, bumalik na ang aking ningning. Salamat, kaibigan!',characters:['Tala','Titik','Bilang','Likha']},
      {scene:'shadow',title:'Naku, si Anino!',text:'Ngunit biglang lumitaw si Anino! Gusto niyang agawin ang aking ningning at itago ito sa kaniyang ulap. Hindi natin hahayaang mawala ang liwanag!',characters:['Tala'],enemy:true},
      {scene:'challenge',title:'Tulungan muli si Tala!',text:'Gamitin natin ang iyong mga natutuhan! Tapusin ang sampung hamon upang maprotektahan ang aking ningning. Ayos lang magkamali. Susubok tayong muli, nang magkasama!',characters:['Tala','Titik','Bilang','Likha']}
    ],
    ending:[
      {scene:'victory',title:'Nagtagumpay tayo!',text:'Natapos mo ang sampung hamon! Dahil sa iyong tiyaga at kaalaman, hindi na maagaw ni Anino ang aking ningning. Unti-unti siyang lumiit at lumayo.',characters:['Tala'],enemy:true},
      {scene:'radiant',title:'Muling nagningning si Tala!',text:'Muli akong kumikislap sa langit! Kasama sina Titik, Bilang, at Likha, ipinagdiriwang natin ang iyong tagumpay. Ang bawat pagsubok mo ay naging liwanag!',characters:['Tala','Titik','Bilang','Likha']},
      {scene:'thanks',title:'Salamat, kaibigan!',text:'Salamat sa pagtulong sa akin, masipag na mag-aaral! Patuloy kang magbasa, magbilang, lumikha, at gumawa ng mabuti. Lagi mong tandaan: may sarili kang ningning!',characters:['Tala','Titik','Bilang','Likha']}
    ]
  };
  const unlocked=(progress,round)=>Number.isInteger(round)&&round>=1&&round<=10&&eligible(progress)&&(round===1||progress.completed.includes('quest:'+(round-1)));
  // Review stages reuse earlier questions. Deduplicate their full meaning,
  // independent of option order, so a round cannot ask the same question twice.
  const identity=q=>JSON.stringify([q.prompt,q.visual,[...q.choices].sort(),q.choices[q.answer]]);
  function pool(progress) {
    const seen=new Set(),items=[];
    for(const m of TALA_DATA.modules) m.levels.forEach((stage,i)=>{
      if(!progress.completed.includes(m.id+':'+(i+1)))return;
      stage.questions.forEach((q,j)=>{
        const key=identity(q);if(seen.has(key))return;seen.add(key);
        items.push({...q,choices:[...q.choices],questKey:key,audioGuide:m.guide,sourceModule:m.id,sourceLevel:i+1,sourceQuestion:j+1,difficulty:(i/Math.max(1,m.levels.length-1))*.6+(j/Math.max(1,stage.questions.length-1))*.4});
      });
    });
    return items;
  }
  function generate(progress,round) {
    if(!unlocked(progress,round))return [];
    const items=pool(progress),count=length(round);
    if(items.length<count)return [];
    let seed=round*7919+((progress.attempts['quest:'+round]||0)+1)*104729;
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    function shuffle(list){const copy=[...list];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
    const groups=TALA_DATA.modules.map(m=>items.filter(q=>q.sourceModule===m.id)).filter(g=>g.length);
    const selected=[],used=new Set();
    // With four learned worlds: 2/2/2/2 or 3/3/2/2. With fewer, share
    // their places evenly; unavailable content is never used as filler.
    groups.forEach((group,i)=>{
      const quota=Math.floor(count/groups.length)+(i<count%groups.length?1:0);
      const sorted=[...group].sort((a,b)=>a.difficulty-b.difficulty);
      const width=Math.min(sorted.length,Math.max(quota,Math.ceil(sorted.length*.4)));
      const start=Math.floor((round-1)/9*(sorted.length-width));
      for(const q of shuffle(sorted.slice(start,start+width)).slice(0,quota)){selected.push(q);used.add(q.questKey);}
    });
    for(const q of shuffle(items.filter(q=>!used.has(q.questKey)))){
      if(selected.length===count)break;selected.push(q);
    }
    return shuffle(selected).map(q=>{
      const correct=q.choices[q.answer],choices=shuffle(q.choices);
      return {...q,choices,answer:choices.indexOf(correct)};
    });
  }
  window.TALA_QUEST={world,length,eligible,finished,stories,unlocked,pool,generate};
})();
