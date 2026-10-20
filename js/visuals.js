(function () {
  // Replace these image paths with your final transparent PNG/WebP artwork.
  const characters={
    Tala:{image:'assets/characters/tala.svg',label:'Tala',color:'gold',icon:'★'},
    Likha:{image:'assets/characters/likha.svg',label:'Likha',color:'coral',icon:'🎨'},
    Titik:{image:'assets/characters/titik.svg',label:'Titik',color:'purple',icon:'📖'},
    Bilang:{image:'assets/characters/bilang.svg',label:'Bilang',color:'blue',icon:'123'}
  };
  function avatar(name,style='') {
    const c=characters[name]||characters.Tala;
    return '<span class="character '+c.color+' '+style+'" data-character="'+c.label+'"><span class="character-shadow"></span><img class="character-image" src="'+c.image+'" alt="" width="160" height="200" draggable="false"><span class="character-fallback" aria-hidden="true">'+c.icon+'</span><span class="character-name">'+c.label+'</span></span>';
  }
  function guide(name,content,mood='idle') {
    return '<div class="guide-conversation" data-mood="'+mood+'"><div class="guide-actor">'+avatar(name)+'</div><div class="speech-bubble">'+content+'</div></div>';
  }
  const art={
    tree:'<path d="M49 73h12v37H49z" fill="#a47652"/><path d="M55 3 91 61H76l18 24H16l18-24H19z" fill="#62b99b"/><path d="M55 3v82H16l18-24H19z" fill="#79c9a8"/><path d="m44 48 11-17 12 17" fill="none" stroke="#a0dfbc" stroke-width="5" stroke-linecap="round"/>',
    bush:'<ellipse cx="55" cy="93" rx="48" ry="8" fill="#2a795d" opacity=".1"/><path d="M8 88a24 24 0 0 1 16-36 28 28 0 0 1 54-3 23 23 0 0 1 24 39z" fill="#82cda6"/><path d="m29 70 9-8m19 15 8-8m17 6 5-7" stroke="#d5f2be" stroke-width="5" stroke-linecap="round"/>',
    flower:'<path d="M55 98V52m0 32Q22 59 27 86q12 14 28 5m0-16q28-25 30-4-11 16-30 12" fill="#78b58b" stroke="#78b58b" stroke-width="5"/><g fill="#ffcbd0"><ellipse cx="55" cy="26" rx="13" ry="22"/><ellipse cx="55" cy="26" rx="13" ry="22" transform="rotate(72 55 45)"/><ellipse cx="55" cy="26" rx="13" ry="22" transform="rotate(144 55 45)"/><ellipse cx="55" cy="26" rx="13" ry="22" transform="rotate(216 55 45)"/><ellipse cx="55" cy="26" rx="13" ry="22" transform="rotate(288 55 45)"/></g><circle cx="55" cy="45" r="14" fill="#ffd265"/>',
    island:'<ellipse cx="55" cy="92" rx="52" ry="14" fill="#9bdfe0"/><ellipse cx="55" cy="87" rx="38" ry="12" fill="#f5d59a"/><path d="M52 86q12-31 9-55" fill="none" stroke="#b48a5d" stroke-width="9"/><path d="M61 34Q18 10 10 42q27-4 51-8m0 0Q34-7 33 7q8 25 28 27m0 0Q89-2 102 19q-17 3-41 15m0 0q42-7 40 26Q83 40 61 34" fill="#69baa0"/><circle cx="61" cy="38" r="7" fill="#b28a5c"/>',
    book:'<path d="M14 30q22-10 41 3 20-13 41-3v61q-22-9-41 2-21-11-41-2z" fill="#fff8df" stroke="#a292db" stroke-width="5" stroke-linejoin="round"/><path d="M55 34v58M27 47l17 3m-17 9 17 3m25-12 15-4M69 62l15-4" fill="none" stroke="#c5b9ed" stroke-width="4" stroke-linecap="round"/><path d="M71 27v25l7-5 7 3V25" fill="#f3a898"/>',
    cottage:'<path d="M24 49h64v51H24z" fill="#fff1d2"/><path d="m13 51 42-35 44 35z" fill="#e99b83"/><path d="M44 68h22v32H44" fill="#b78b68"/><rect x="29" y="60" width="11" height="15" rx="3" fill="#96d0d3"/><rect x="71" y="60" width="11" height="15" rx="3" fill="#96d0d3"/><path d="M78 22V9h10v22" fill="#c28f71"/>',
    mushroom:'<path d="M44 56h24v44H44z" fill="#fff1d4"/><path d="M10 63Q22-3 55 9q29 0 46 54z" fill="#dba0bb"/><circle cx="37" cy="41" r="8" fill="#fff4e7"/><circle cx="66" cy="28" r="7" fill="#fff4e7"/><circle cx="80" cy="48" r="6" fill="#fff4e7"/>',
    cloud:'<path d="M19 72a18 18 0 0 1 1-36 26 26 0 0 1 49-9 22 22 0 0 1 20 45z" fill="#fff" opacity=".85"/>',
    pond:'<ellipse cx="55" cy="72" rx="51" ry="28" fill="#c6e5c9"/><ellipse cx="55" cy="69" rx="44" ry="23" fill="#9ed5dc"/><path d="M26 66h24m10 12h20" stroke="#d7f6ef" stroke-width="4" stroke-linecap="round"/><ellipse cx="68" cy="56" rx="12" ry="6" fill="#72b79a"/><path d="m68 56 4-7" stroke="#d9eee0" stroke-width="2"/>'
  };
  const themes={phonics:['tree','book','mushroom','bush'],numbers:['island','pond','island','bush'],arts:['flower','mushroom','flower','pond'],values:['cottage','tree','flower','bush']};
  function scenery(module,count,step) {
    const theme=themes[module]||themes.values;
    let markup='<div class="map-scenery" aria-hidden="true">';
    for(let i=0;i<count;i++) {
      const type=theme[i%theme.length],side=i%4<2?'left':'right';
      markup+='<span class="map-prop prop-'+type+' prop-'+side+'" style="top:'+(120+i*step)+'px"><svg viewBox="0 0 110 115">'+art[type]+'</svg></span>';
      if(i%4===0)markup+='<span class="map-cloud" style="top:'+(45+i*step)+'px;'+(i%8===0?'right':'left')+':-5%"><svg viewBox="0 0 110 115">'+art.cloud+'</svg></span>';
      if(i%4===2)markup+='<span class="map-pebbles" style="top:'+(145+i*step)+'px;'+side+':7%"><i></i><i></i><i></i></span>';
    }
    return markup+'</div>';
  }
  document.addEventListener('error',event=>{
    if(event.target?.classList?.contains('character-image'))event.target.closest('.character')?.classList.add('image-missing');
  },true);
  window.TALA_VISUALS={characters,avatar,guide,scenery};
})();
