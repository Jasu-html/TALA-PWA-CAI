(function () {
  const app=document.querySelector('#app');
  const state={screen:'welcome',module:'phonics',level:1,question:0,selected:null,misses:0,firstTry:0,results:[],submitted:false,earned:0,stars:0};
  let timer, version=0, toastTimer;
  let introPage=0;
  let questStoryKind='opening',questStoryPage=0;
  let questQuestions=[];
  let pendingVoice='',storyTimer=null,storyRun=0,storyAuto=true;
  let idleTimer=null,answerTimer=null;
  const navigation=[];
  let renderedRoute=null;
  const captureRoute=()=>({state:JSON.parse(JSON.stringify(state)),introPage,questStoryKind,questStoryPage,questQuestions:[...questQuestions]});
  function goBack(){
    if(state.screen==='start')return false;
    if(window.TALA_PUBLIC?.back(state.screen))return true;
    // A world trail is a root destination, never a return to an old victory screen.
    if(state.screen==='map'){go(store().setupComplete?'home':'welcome',false);return true;}
    if(state.screen==='intro'&&introPage>0){introPage--;go('intro',false);return true;}
    if(state.screen==='questStory'&&questStoryPage>0){questStoryPage--;go('questStory',false);return true;}
    if(state.screen==='complete'){
      while(navigation.length&&['practice','lesson','map'].includes(navigation.at(-1).state.screen))navigation.pop();
      go('map',false);return true;
    }
    const previous=navigation.pop();
    if(previous){
      Object.assign(state,previous.state);introPage=previous.introPage;questStoryKind=previous.questStoryKind;questStoryPage=previous.questStoryPage;questQuestions=previous.questQuestions;
      go(state.screen,false);return true;
    }
    if(!['home','welcome'].includes(state.screen)){go(store().setupComplete?'home':'welcome',false);return true;}
    return false;
  }
  const voice=TALA_DATA.uiVoice;
  const correctPraise=[voice.correct,voice.correct2,voice.correct3,voice.correct4];
  let lastPraise='';
  function praise(){
    const choices=correctPraise.filter(text=>text!==lastPraise);
    lastPraise=choices[Math.floor(Math.random()*choices.length)];
    return lastPraise;
  }
  function say(character,text,options={}) {
    const before=pendingVoice?[pendingVoice,...(options.before||[])]:options.before;
    pendingVoice='';
    return TALA_SPEECH.play(character,text,{...options,...(before?{before}:{})});
  }
  function cancelStoryTimer(){clearTimeout(storyTimer);storyTimer=null;storyRun++;}
  function advanceStory(){
    if(state.screen==='intro'){
      if(introPage<TALA_DATA.intro.length-1){introPage++;go('intro');}else finishIntro();
    }else if(state.screen==='questStory'){
      if(questStoryPage<TALA_QUEST.stories[questStoryKind].length-1){questStoryPage++;go('questStory');}else finishQuestStory();
    }
  }
  function storyTools(){return `<div class="story-auto-tools"><p id="story-auto-status" role="status">${storyAuto?'Kusang susunod limang segundo matapos ang boses.':'Nakahinto ang kusang pagsunod. Pindutin ang Susunod kapag handa na.'}</p><button class="text-button" data-action="story-auto" aria-pressed="${storyAuto}">${storyAuto?'⏸ Ihinto ang kusang pagsunod':'▶ Ituloy ang kusang pagsunod'}</button></div>`;}
  function narrateStory(){
    cancelStoryTimer();const run=storyRun,pageVersion=version;
    const text=state.screen==='intro'?TALA_DATA.intro[introPage].text:TALA_QUEST.stories[questStoryKind][questStoryPage].text;
    say('Tala',text,{onEnded:()=>{
      if(!storyAuto||run!==storyRun||pageVersion!==version||document.hidden)return;
      storyTimer=setTimeout(()=>{if(storyAuto&&run===storyRun&&pageVersion===version&&!document.hidden)advanceStory();},5000);
    }});
  }
  function guidance(key,character,text,options={},force=false){
    pendingVoice='';
    if(!force&&TALA_STORE.hasHeardGuidance(key))return;
    let marked=false;
    const mark=()=>{if(!marked){marked=true;TALA_STORE.markGuidanceHeard(key);}};
    say(character,text,{...options,onStarted:mark,onEnded:()=>{mark();options.onEnded?.();}});
  }
  function resetIdle(){
    clearTimeout(idleTimer);idleTimer=null;
    if(document.hidden||['intro','questStory'].includes(state.screen))return;
    const screenVersion=version;
    idleTimer=setTimeout(()=>{
      if(screenVersion!==version||document.hidden)return;
      if(!nameRecognition&&!(state.screen==='practice'&&state.submitted)&&!TALA_SPEECH.isPlaying())narrateScreen(true);
      resetIdle();
    },180000);
  }
  function scheduleAnswerAdvance(delay){
    clearTimeout(answerTimer);const screenVersion=version;
    answerTimer=setTimeout(()=>{
      answerTimer=null;
      if(screenVersion===version&&state.screen==='practice'&&state.submitted&&!document.hidden)nextQuestion();
    },delay);
  }
  function narrateScreen(force=false){
    const screen=state.screen;
    if(screen==='intro'||screen==='questStory'){narrateStory();return;}
    if(screen==='lesson')say(world().guide,level().lesson);
    if(screen==='welcome')guidance('welcome','Tala',TALA_DATA.welcomeVoice,{},force);
    if(screen==='practice'&&!state.submitted){
      if(level().type==='paint')guidance('painting','Likha','Gamitin ang iyong imahinasyon. Bawat guhit ay espesyal!',{},force);
      else {
        const help=state.question===0&&!TALA_STORE.hasHeardGuidance('practice-help');
        say(recordingGuide(),question().prompt,help?{after:[voice.practiceHelp],onEnded:()=>TALA_STORE.markGuidanceHeard('practice-help')}:{});
      }
    }
    if(screen==='home')guidance('home','Tala',voice.home,{},force);
    if(screen==='dashboard')guidance('dashboard','Tala',voice.dashboard,{},force);
    if(screen==='complete')guidance('complete','Tala',voice.complete,{},force);
    if(screen==='map'){
      const ready=state.module==='quest'&&TALA_QUEST.eligible(store());
      guidance('map:'+state.module+(state.module==='quest'?(ready?':ready':':locked'):''),'Tala',state.module==='quest'?(ready?voice.questReady:voice.questLocked):voice.map,
        state.module==='quest'?{}:{before:[TALA_DATA.moduleVoice[state.module]]},force);
    }
  }
  let nameRecognition=null,nameVoiceTimer=null,nameVoiceConsent=false;
  const Recognition=window.TALA_NATIVE?.Recognition||window.SpeechRecognition||window.webkitSpeechRecognition;
  function stopNameVoice() {
    clearTimeout(nameVoiceTimer);
    const active=nameRecognition;nameRecognition=null;
    if(active){active.onresult=active.onerror=active.onend=active.onstart=null;try{active.abort();}catch{}}
    window.TALA_SFX?.setNarrating(false);
    const button=document.querySelector('[data-action="name-voice"]');
    if(button){button.textContent='🎤 Sabihin ang pangalan';button.setAttribute('aria-pressed','false');}
  }
  function nameStatus(text) { const status=document.querySelector('#name-voice-status');if(status)status.textContent=text; }
  function startNameVoice() {
    if(window.TALA_PUBLIC&&!TALA_PUBLIC.voiceAllowed()){TALA_PUBLIC.requestVoice();return;}
    if(nameRecognition){stopNameVoice();nameStatus('Huminto na. Maaari mong subukan muli.');return;}
    if(!Recognition){nameStatus('Hindi suportado ang mikropono sa browser na ito. Magpatulong sa pag-type ng pangalan.');return;}
    if(!nameVoiceConsent){
      if(!confirm('Para sa magulang: Gagamitin ang mikropono upang isulat ang pangalan. Maaaring ipadala ng browser o Android voice service ang boses sa online na serbisyo nito. Hindi nag-iimbak ng recording ang TALA. Payagan ang voice input?'))return;
      nameVoiceConsent=true;
    }
    TALA_SPEECH.stop();
    const input=document.querySelector('#learner-name'),button=document.querySelector('[data-action="name-voice"]');
    let recognition;
    try{recognition=new Recognition();}catch{ nameStatus('Hindi mabuksan ang mikropono. Magpatulong sa pag-type.');return; }
    nameRecognition=recognition;
    recognition.lang='fil-PH';recognition.continuous=false;recognition.interimResults=false;recognition.maxAlternatives=1;
    let received=false;
    const finish=message=>{if(nameRecognition!==recognition)return;stopNameVoice();nameStatus(message);};
    recognition.onstart=()=>{
      if(nameRecognition!==recognition)return;
      button.textContent='⏹ Ihinto ang pakikinig';button.setAttribute('aria-pressed','true');
      nameStatus('Nakikinig… Sabihin lamang ang iyong pangalan.');
    };
    recognition.onresult=event=>{
      if(nameRecognition!==recognition)return;
      const transcript=event.results?.[0]?.[0]?.transcript||'';
      const name=transcript.replace(/^\s*(?:(?:ang\s+)?pangalan\s+ko\s+(?:ay|si)|ako\s+si)\s+/iu,'').replace(/[.!?,]+$/u,'').replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,24);
      if(!name){finish('Walang narinig na pangalan. Subukan muli o magpatulong sa pag-type.');return;}
      received=true;input.value=name;
      finish('Narinig: '+name+'. Tingnan ang pangalan, saka pindutin ang Tara na! Maaari itong itama ng magulang sa menu.');
    };
    recognition.onerror=event=>finish(({ 'not-allowed':'Hindi pinayagan ang mikropono. Magpatulong sa pag-type o payagan ito sa browser.', 'service-unavailable':'Walang voice service sa telepono. I-enable o i-update ang Google app at Speech Services, o magpatulong sa pag-type.', 'service-not-allowed':'Hindi pinayagan ang voice input sa browser na ito. Magpatulong sa pag-type.', 'audio-capture':'Walang magamit na mikropono. Magpatulong sa pag-type.', 'network':'Kailangan ng koneksiyon para sa voice input. Maaari ring mag-type.', 'no-speech':'Walang narinig. Pindutin muli ang mikropono at sabihin ang pangalan.', 'language-not-supported':'Hindi suportado ang Filipino voice input dito. Magpatulong sa pag-type.' })[event.error]||'Hindi nakilala ang boses. Subukan muli o magpatulong sa pag-type.');
    recognition.onend=()=>{if(!received)finish('Tapos na ang pakikinig. Subukan muli o magpatulong sa pag-type.');};
    nameStatus('Binubuksan ang mikropono…');window.TALA_SFX?.setNarrating(true);
    nameVoiceTimer=setTimeout(()=>finish('Huminto na ang pakikinig. Pindutin muli upang subukan.'),15000);
    try{recognition.start();}catch{finish('Hindi mabuksan ang mikropono. Subukan muli o magpatulong sa pag-type.');}
  }
  const store=()=>TALA_STORE.get();
  const world=()=>state.module==='quest'?TALA_QUEST.world:TALA_DATA.modules.find(m=>m.id===state.module);
  const level=()=>state.module==='quest'?{...world().levels[state.level-1],questions:questQuestions}:world().levels[state.level-1];
  const question=()=>level().questions[state.question];
  const recordingGuide=()=>state.module==='quest'&&state.screen==='practice'?question().audioGuide:world().guide;
  let paintCleanup=()=>{},revealCleanup=()=>{},tutorialCleanup=()=>{},transitionCleanup=()=>{};
  function moduleTransition(id) {
    TALA_SFX.enterWorld(id==='quest'?'values':id);
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||window.TALA_PUBLIC?.reduceMotion()||!document.createElement)return;
    transitionCleanup();
    const m=id==='quest'?TALA_QUEST.world:TALA_DATA.modules.find(item=>item.id===id);
    if(!m)return;
    const overlay=document.createElement('div');
    overlay.className='world-transition '+m.color;
    overlay.setAttribute('aria-hidden','true');
    overlay.innerHTML='<i class="world-wave wave-one"></i><i class="world-wave wave-two"></i><i class="world-wave wave-three"></i><span class="world-arrival"><b>'+m.icon+'</b><strong>'+m.title+'</strong></span>';
    document.body.append(overlay);
    const cleanup=()=>{clearTimeout(fallback);overlay.remove();if(transitionCleanup===cleanup)transitionCleanup=()=>{};};
    const fallback=setTimeout(cleanup,1100);
    transitionCleanup=cleanup;
    overlay.addEventListener('animationend',event=>{if(event.target===overlay)cleanup();});
  }
  function startPractice() {
    if(state.module==='quest'){
      questQuestions=TALA_QUEST.generate(store(),state.level);
      if(!questQuestions.length){go('map');toast('Tapusin muna ang iba pang aralin kasama ang mga kaibigan ko.');return;}
    }
    state.question=0; state.selected=null; state.misses=0; state.firstTry=0; state.results=[]; state.submitted=false; go('practice');
  }
  const key=(id=state.module,n=state.level)=>`${id}:${n}`;
  const done=(id,n)=>store().completed.includes(key(id,n));
  const unlocked=n=>state.module==='quest'?TALA_QUEST.unlocked(store(),n):n===1 || done(state.module,n-1);
  const esc=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const avatar=(name,style='',expression='Neutral')=>TALA_VISUALS.avatar(name,style,expression);
  const guide=(name,content,mood)=>TALA_VISUALS.guide(name,content,mood);
  const ratingStars=rating=>Array.from({length:5},(_,i)=>'<span class="rating-star '+(i<rating?'is-filled':'is-empty')+'" aria-hidden="true">'+(i<rating?'★':'☆')+'</span>').join('');
  const topbar=document.querySelector('.topbar');
  const updateTopbar=()=>{
    const scrolled=window.scrollY>24;
    topbar?.classList.toggle('is-scrolled',scrolled);
    document.querySelector('.map-heading')?.classList.toggle('is-scrolled',scrolled);
    if(topbar?.getBoundingClientRect){
      const inset=parseFloat(window.getComputedStyle?.(topbar).top)||0;
      document.documentElement?.style.setProperty('--map-sticky-top',(topbar.getBoundingClientRect().height+inset+8)+'px');
    }
  };
  window.addEventListener('resize',updateTopbar,{passive:true});
  if(window.ResizeObserver&&topbar)new ResizeObserver(updateTopbar).observe(topbar);
  let lastScrollY=window.scrollY||0,scrollDistance=0;
  window.addEventListener('scroll',()=>{
    resetIdle();
    updateTopbar();
    const y=window.scrollY||0,delta=y-lastScrollY;
    lastScrollY=y;
    scrollDistance+=Math.abs(delta);
    if(delta&&scrollDistance>=48){
      TALA_SFX.scroll(delta>0?1:-1);
      scrollDistance=0;
    }
  },{passive:true});
  updateTopbar();
  function setupScrollReveal() {
    revealCleanup();
    revealCleanup=()=>{};
    if (!window.IntersectionObserver || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || window.TALA_PUBLIC?.reduceMotion()) return;
    const items=app.querySelectorAll('.greeting,.world-card,.gentle-note,.map-title,.map-companion,.stage,.map-prop,.map-guide,.dashboard-title,.summary-grid,.report-row');
    let previousScroll=window.scrollY||0,revealTimer=null;
    const pending=[];
    function revealNext() {
      revealTimer=null;
      const stage=pending.shift();
      if(!stage)return;
      stage.classList.add('is-visible');
      // This cooldown is shared across observer callbacks, including while scrolling.
      revealTimer=setTimeout(revealNext,120);
    }
    const revealObserver=new IntersectionObserver(entries=>{
      const scroll=window.scrollY||0,goingUp=scroll<previousScroll;
      for(const entry of entries){
        const item=entry.target;
        if(!item.classList.contains('stage')){item.classList.toggle('is-visible',entry.isIntersecting);continue;}
        if(!entry.isIntersecting){
          const index=pending.indexOf(item);
          if(index!==-1)pending.splice(index,1);
          item.classList.remove('is-visible');
        }else if(!item.classList.contains('is-visible')&&!pending.includes(item))pending.push(item);
      }
      pending.sort((a,b)=>goingUp?b.getBoundingClientRect().top-a.getBoundingClientRect().top:a.getBoundingClientRect().top-b.getBoundingClientRect().top);
      if(pending.length&&revealTimer===null)revealNext();
      previousScroll=scroll;
    },{threshold:.08,rootMargin:'-80px 0px -6% 0px'});
    items.forEach(item=>{item.classList.add('scroll-reveal');revealObserver.observe(item);});
    revealCleanup=()=>{revealObserver.disconnect();clearTimeout(revealTimer);pending.length=0;};
  }
  function mood(value) { const actor=document.querySelector('.guide-conversation'); if(actor)TALA_VISUALS.setMood(actor,value); }
  function syncSoundButton() { const button=document.querySelector('[data-action="sound-toggle"]');if(!button)return;const enabled=TALA_SFX.isEnabled();button.textContent=enabled?'🔊':'🔇';button.setAttribute('aria-pressed',String(enabled));button.setAttribute('aria-label',enabled?'Patayin ang tunog ng laro':'Buksan ang tunog ng laro'); }
  const star='<span class="star-face" aria-hidden="true"><i></i></span>';
  const back=action=>`<button class="back-button" data-action="${action}">← <span>Bumalik</span></button>`;
  function go(screen,remember=true) {
    if(window.TALA_PUBLIC?.needsConsent(screen))screen='start';
    transitionCleanup();
    if(['home','welcome','start'].includes(screen))navigation.length=0;
    else if(remember&&renderedRoute&&screen!==renderedRoute.state.screen&&screen!=='complete'&&!window.TALA_PUBLIC?.screens[screen]&&!window.TALA_PUBLIC?.screens[renderedRoute.state.screen]){
      navigation.push(renderedRoute);if(navigation.length>30)navigation.shift();
    }
    clearTimeout(answerTimer);answerTimer=null;clearTimeout(idleTimer);
    cancelStoryTimer();
    stopNameVoice();
    clearTimeout(timer); paintCleanup(); paintCleanup=()=>{}; tutorialCleanup(); tutorialCleanup=()=>{}; version++; TALA_SPEECH.stop(); state.screen=screen;
    document.body.dataset.screen=screen;
    document.querySelector('#wallet-stars').textContent=store().stars;
    app.innerHTML=`<section class="screen">${['home','map','complete','dashboard'].includes(screen)?'<button class="listen-button screen-listen" data-action="screen-listen" aria-label="Pakinggan muli ang gabay">🔊 Pakinggan ang gabay</button>':''}${({welcome,home,map,lesson,practice,complete,dashboard,intro,questStory,...(window.TALA_PUBLIC?.screens||{})})[screen]()}${screen==='home'?questCard()+'<button class="text-button story-replay" data-action="intro-open">✦ Ang kuwento ni Tala</button>':''}${screen==='dashboard'?nameEditor()+questReport()+(window.TALA_PUBLIC?.parentLink()||''):''}${state.module==='quest'&&['map','complete'].includes(screen)&&TALA_QUEST.eligible(store())?constellation()+questStoryControls():''}</section>`;
    if(screen==='lesson') {
      const card=document.querySelector('.activity-card');
      if(card?.insertAdjacentHTML) card.insertAdjacentHTML('beforeend','<details class="tutorial-disclosure"><summary>🔊 Paano ito laruin?</summary>'+tutorial()+'</details>');
    }
    lastScrollY=0;scrollDistance=0;
    window.scrollTo({top:0,behavior:'instant'});
    updateTopbar();
    setupScrollReveal();
    syncSoundButton();
    TALA_SFX.setWorld(['home','welcome','start'].includes(screen)?'home':['map','lesson','practice'].includes(screen)?(state.module==='quest'?'values':state.module):null);
    if(screen==='complete')TALA_SFX.play('complete');
    if (screen==='practice' && level().type==='paint') setupPainting();
    if(screen==='practice'&&level().type!=='paint'&&state.selected!==null){
      const options=[...document.querySelectorAll('[data-choice]')],confirm=document.querySelector('[data-action="confirm-answer"]');
      options.forEach((button,i)=>{button.classList.toggle('selected',i===state.selected);button.setAttribute('aria-pressed',String(i===state.selected));button.disabled=state.submitted;});
      confirm.disabled=state.submitted;confirm.hidden=state.submitted;
      if(state.submitted){options[question().answer]?.classList.add('correct');const hint=document.querySelector('[data-action="hint"]');if(hint){hint.disabled=true;hint.hidden=true;}scheduleAnswerAdvance(600);}
      else confirm.classList.add('needs-confirmation');
    }
    if (screen==='lesson') setupTutorial();
    if (screen==='intro') document.querySelector('#intro-title')?.focus({preventScroll:true});
    if (screen==='questStory') {
      document.querySelector('#quest-story-title')?.focus({preventScroll:true});
      if(questStoryKind==='ending'&&questStoryPage===0)TALA_SFX.play('complete');
    }
    narrateScreen();
    resetIdle();
    renderedRoute=captureRoute();
  }
  function questCount() {return TALA_QUEST.world.levels.filter((_,i)=>done('quest',i+1)).length;}
  function questCard() {
    const ready=TALA_QUEST.eligible(store()),count=questCount();
    return `<button class="quest-card gold" data-module="quest"><span class="quest-card-avatar" aria-hidden="true">${avatar('Tala')}</span><span class="quest-card-copy"><span class="eyebrow">HAMON NI TALA</span><strong>${TALA_QUEST.finished(store())?'Muling nagningning si Tala!':'Handa ka na bang sumikat?'}</strong><span>${ready?count+' sa 10 hamon ang natapos':'Tapusin ang lahat ng yugto. Kahit ilang bituin!'}</span></span><span class="quest-card-symbol" aria-hidden="true">${ready?'→':'🔒'}</span></button>`;
  }
  function openQuest() {
    state.module='quest';
    if(!TALA_QUEST.eligible(store())){go('map');return;}
    if(TALA_QUEST.finished(store())&&!store().questEndingSeen){openQuestStory('ending');return;}
    if(!store().questOpeningSeen){openQuestStory('opening');return;}
    go('map');
  }
  function openQuestStory(kind) {
    if(!TALA_QUEST.eligible(store())||(kind==='ending'&&!TALA_QUEST.finished(store())))return;
    state.module='quest';questStoryKind=kind;questStoryPage=0;go('questStory');
  }
  function finishQuestStory() {
    TALA_STORE.markQuestStorySeen(questStoryKind);
    go(questStoryKind==='ending'?'home':'map',false);
  }
  function questStoryControls() {
    return `<div class="quest-story-controls"><button class="text-button" data-action="quest-opening">↻ Balikan ang simula ng hamon</button>${TALA_QUEST.finished(store())?'<button class="text-button" data-action="quest-ending">✦ Balikan ang tagumpay ni Tala</button>':''}</div>`;
  }
  function questStory() {
    const pages=TALA_QUEST.stories[questStoryKind],page=pages[questStoryPage],last=questStoryPage===pages.length-1;
    const enemy=page.enemy?'<div class="story-enemy"><div class="anino-body"><i></i><i></i><span></span></div><strong>Anino</strong></div>':'';
    return `<article class="intro-card quest-story-card gold" aria-labelledby="quest-story-title">
      <div class="intro-toolbar"><span class="pill">${questStoryKind==='ending'?'ANG TAGUMPAY NI TALA':'ANG HULING HAMON'}</span><button class="secondary-button" data-action="quest-story-skip">Laktawan</button></div>
      <div class="intro-scene intro-shine story-${page.scene}" aria-hidden="true"><div class="intro-stars">${Array.from({length:12},(_,i)=>`<span style="--i:${i};--x:${7+(i*29)%87}%;--y:${8+(i*17)%54}%">✦</span>`).join('')}</div><div class="intro-moon"></div><div class="intro-hill"></div>${enemy}<div class="intro-cast">${page.characters.map((name,i)=>`<div class="intro-actor" style="--actor:${i}">${avatar(name,'character-story')}</div>`).join('')}</div></div>
      <div class="intro-copy"><span class="eyebrow">BAHAGI ${questStoryPage+1} SA ${pages.length}</span><h1 id="quest-story-title" tabindex="-1">${page.scene==='thanks'?'Salamat, '+esc(store().learner)+'!':page.title}</h1><p>${page.text}</p><button class="listen-button" data-action="quest-story-listen" aria-label="Pakinggan ang bahaging ito ng kuwento">🔊 Pakinggan ang kuwento</button>${questStoryKind==='ending'?'<p class="quest-story-result">★ Natapos mo ang lahat ng 10 hamon!</p>':''}</div>
      ${storyTools()}<div class="intro-navigation"><button class="secondary-button" data-action="quest-story-back" ${questStoryPage===0?'disabled':''}>← Bumalik</button><div class="intro-dots" aria-label="Bahagi ${questStoryPage+1} sa ${pages.length}">${pages.map((_,i)=>`<span class="${i===questStoryPage?'is-current':''}" aria-hidden="true"></span>`).join('')}</div><button class="primary-button" data-action="quest-story-next">${last?(questStoryKind==='ending'?'Tuloy ang pagkatuto!':'Tulungan si Tala!'):'Susunod'} <span aria-hidden="true">→</span></button></div>
    </article>`;
  }
  function questReport() {
    const d=store();
    return `<section class="quest-report gold" aria-labelledby="quest-report-title"><h2 id="quest-report-title">Hamon ni Tala</h2><p>${questCount()} sa 10 hamon ang natapos</p><div class="quest-report-list">${TALA_QUEST.world.levels.map((l,i)=>{const id='quest:'+(i+1),stars=d.best[id]||0;return `<div><strong>${l.title}</strong><span aria-label="${stars} bituin">${ratingStars(stars)}</span><small>${d.attempts[id]||0} pagsubok</small></div>`;}).join('')}</div></section>`;
  }
  function constellation() {
    return `<div class="quest-constellation" role="img" aria-label="${questCount()} sa 10 bituin ang nagningning">${TALA_QUEST.world.levels.map((_,i)=>`<span class="${done('quest',i+1)?'is-lit':''}" aria-hidden="true">★</span>`).join('')}</div>`;
  }
  function finishIntro() {
    TALA_STORE.markIntroSeen();
    go(store().setupComplete?'home':'welcome');
  }
  function intro() {
    const pages=TALA_DATA.intro,page=pages[introPage],last=introPage===pages.length-1;
    return `<article class="intro-card gold" aria-labelledby="intro-title">
      <div class="intro-toolbar"><span class="pill">ANG KUWENTO NI TALA</span><button class="secondary-button" data-action="intro-skip">Laktawan</button></div>
      <div class="intro-scene intro-${page.scene}" aria-hidden="true">
        <div class="intro-stars">${Array.from({length:12},(_,i)=>`<span style="--i:${i};--x:${7+(i*29)%87}%;--y:${8+(i*17)%54}%">✦</span>`).join('')}</div>
        <div class="intro-moon"></div><div class="intro-hill"></div>
        <div class="intro-cast">${page.characters.map((name,i)=>`<div class="intro-actor" style="--actor:${i}">${avatar(name,'character-story')}</div>`).join('')}</div>
      </div>
      <div class="intro-copy"><span class="eyebrow">BAHAGI ${introPage+1} SA ${pages.length}</span><h1 id="intro-title" tabindex="-1">${page.title}</h1><p>${page.text}</p>
        <button class="listen-button" data-action="intro-listen" aria-label="Pakinggan ang bahaging ito ng kuwento">🔊 Pakinggan ang kuwento</button>
      </div>
      ${storyTools()}<div class="intro-navigation"><button class="secondary-button" data-action="intro-back" ${introPage===0?'disabled':''}>← Bumalik</button><div class="intro-dots" aria-label="Bahagi ${introPage+1} sa ${pages.length}">${pages.map((_,i)=>`<span class="${i===introPage?'is-current':''}" aria-hidden="true"></span>`).join('')}</div><button class="primary-button" data-action="intro-next">${last?'Tara na!':'Susunod'} <span aria-hidden="true">→</span></button></div>
    </article>`;
  }
  function welcome() {
    return `<div class="welcome-scene"><div class="welcome-art" aria-hidden="true"><span class="cloud cloud-one"></span><span class="cloud cloud-two"></span><div class="sun-halo">${avatar('Tala','character-hero')}</div><span class="floating-flower">🌼</span><span class="little-star">✦</span><div class="welcome-hill"></div></div>
      <div class="welcome-copy"><span class="pill">Munting hakbang. Malaking saya.</span><h1>Tara, <span>sumikat!</span></h1><p>Matuto at maglaro kasama si Tala.</p>
      <button type="button" class="listen-button welcome-listen" data-action="welcome-listen">🔊 Pakinggan si Tala</button>
      <form id="name-form"><label for="learner-name">Ano ang pangalan mo?</label>
        <input id="learner-name" maxlength="24" autocomplete="given-name" placeholder="Pangalan mo" aria-describedby="name-voice-status" value="${esc(store().learner==='Munting Tala'?'':store().learner)}">
        <button type="button" class="secondary-button name-voice" data-action="name-voice" aria-pressed="false" ${Recognition?'':'disabled'}>🎤 Sabihin ang pangalan</button>
        <p id="name-voice-status" class="name-voice-status" role="status" aria-live="polite">${Recognition?'Pindutin ang mikropono, saka sabihin lamang ang pangalan.':'Hindi suportado ang voice input dito. Magpatulong sa pag-type ng pangalan.'}</p>
        <button class="primary-button" type="submit">Tara na! <span>→</span></button>
      </form><p class="name-privacy">Para sa magulang: maaaring gumamit ng internet at Google o Android voice service ang voice input. Walang recording na iniimbak ang TALA. Maaari ring mag-type.</p>
      <button class="text-button" data-action="dashboard">Para sa guro o magulang</button></div></div>`;
  }
  function nameEditor() {
    return `<section class="name-editor"><h2>Pangalan ng mag-aaral</h2><p>Maaaring itama ng guro o magulang ang baybay. Hindi mababago ang progreso.</p><form id="edit-name-form"><label for="edit-learner-name">Pangalan</label><input id="edit-learner-name" maxlength="24" autocomplete="given-name" required value="${esc(store().learner)}"><button type="submit" class="secondary-button">I-save ang pangalan</button></form></section>`;
  }
  function home() {
    return `<div class="home-scene"><div class="home-sky" aria-hidden="true"><span class="home-sun"></span><span class="home-cloud cloud-a"></span><span class="home-cloud cloud-b"></span><span class="home-hill hill-a"></span><span class="home-hill hill-b"></span><span class="home-float float-a">✦</span><span class="home-float float-b">✿</span><span class="home-float float-c">✦</span><span class="home-float float-d">✿</span></div><div class="greeting"><div><span class="eyebrow">KUMUSTA, ${esc(store().learner)}!</span><h1>Saan tayo <span>ngayon?</span></h1><p>Pumili ng mundo.</p></div><div class="greeting-star">${avatar('Tala','character-host')}</div></div><div class="world-grid">${TALA_DATA.modules.map((m,i)=>{const count=m.levels.filter((_,j)=>done(m.id,j+1)).length;return `<button class="world-card ${m.color}" data-module="${m.id}"><span class="world-art" aria-hidden="true"><span class="world-sun"></span><span class="world-land"></span><span class="world-symbol">${avatar(m.guide,'character-world')}</span><span class="world-token">${m.icon}</span><span class="world-sprout">${['🌳','🌴','🌷','🌼'][i]}</span></span><span class="world-copy"><span class="world-guide">Kasama si ${m.guide}</span><strong>${m.title}</strong><span class="world-bottom"><span>${count} / ${m.levels.length} yugto</span><span class="round-arrow">→</span></span><span class="progress-track"><i style="width:${count/m.levels.length*100}%"></i></span></span></button>`}).join('')}</div><div class="gentle-note"><span>🌱</span> Bawat pagsubok, bagong pagkatuto!</div></div>`;
  }
  function map() {
    if(state.module==='quest'&&!TALA_QUEST.eligible(store())) {
      const d=store();
      return `<div class="activity-card gold quest-lock">${back('home')}<h1>Hamon ni Tala</h1>${guide('Tala','<p>Matuto muna kasama ang mga kaibigan ko! Tapusin ang lahat ng yugto sa apat na mundo upang mabuksan ang huling hamon. Hindi kailangang limang bituin. Ang mahalaga ay natapos mo!</p>')}<div class="quest-unlock-list">${TALA_DATA.modules.map(m=>{const n=m.levels.filter((_,i)=>d.completed.includes(m.id+':'+(i+1))).length;return `<button class="secondary-button ${m.color}" data-module="${m.id}"><span>${m.icon} ${m.title}</span><strong>${n} / ${m.levels.length} ${n===m.levels.length?'✓':''}</strong></button>`;}).join('')}</div></div>`;
    }
    const m=world(),count=m.levels.filter((_,i)=>done(m.id,i+1)).length;
    const positions=[50,73,50,27];
    const step=185, height=m.levels.length*step+80;
    const point=i=>({x:positions[i%4]*4,y:70+i*step});
    let road='M'+point(0).x+' '+point(0).y;
    for(let i=1;i<m.levels.length;i++) {
      const prev=point(i-1),current=point(i);
      road+=' C'+prev.x+' '+(prev.y+90)+' '+current.x+' '+(current.y-90)+' '+current.x+' '+current.y;
    }
    const last=point(m.levels.length-1);
    road+=' C'+last.x+' '+(last.y+80)+' 200 '+(height-80)+' 200 '+(height-25);
    const current=m.levels.findIndex((_,i)=>unlocked(i+1)&&!done(m.id,i+1));
    return '<div class="map-page '+m.color+'"><div class="map-heading">'+back('home')+'<span class="map-count">★ '+count+' / '+m.levels.length+'</span></div><div class="map-title"><span class="eyebrow">KASAMA SI '+m.guide.toUpperCase()+'</span><h1>'+m.world+'</h1><p>Pindutin ang yugto. Simulan ang saya!</p><button class="secondary-button jump-stage" data-action="jump-stage" data-target="'+(current<0?m.levels.length:current+1)+'">Pumunta sa '+(current<0?'huling':'susunod na')+' yugto ↓</button></div><div class="map-companion">'+guide(m.guide,'<strong>Tara, tuklasin natin!</strong><p>Isang yugto, isang bagong galing.</p>')+'</div><div class="trail" style="height:'+height+'px"><svg class="trail-road" viewBox="0 0 400 '+height+'" preserveAspectRatio="none" aria-hidden="true"><path d="'+road+'" class="road-edge"/><path d="'+road+'" class="road-fill"/><path d="'+road+'" class="road-dashes"/></svg>'+TALA_VISUALS.scenery(m.id,m.levels.length,step)+
    m.levels.map((l,i)=>{
      const n=i+1,available=unlocked(n),completed=done(m.id,n),current=available&&!completed;
      const rating=completed?(store().best[key(m.id,n)]||5):0;
      return '<div class="stage" id="stage-'+n+'" style="left:'+positions[i%4]+'%;top:'+(22+i*step)+'px"><button class="stage-button '+(completed?'is-complete':current?'is-current':'is-locked')+'" data-level="'+n+'" '+(available?'':'disabled')+' aria-label="Yugto '+n+': '+esc(l.title)+(available?'':', naka-lock')+'">'+(current?'<span class="play-label">TARA NA!</span>':'')+'<span>'+(completed?'✓':available?n:'🔒')+'</span></button><span class="stage-stars" aria-label="'+rating+' bituin">'+ratingStars(rating)+'</span><strong>'+l.title+'</strong></div>';
    }).join('')+'<div class="trail-finish" style="top:'+(height-45)+'px" aria-hidden="true">🏁</div></div><div class="map-guide">'+avatar(m.guide,'character-mini')+'<p>“Kaya mo iyan! Sasamahan kita.”<small>— '+m.guide+'</small></p></div></div>';
  }
  const audio=text=>`<button class="listen-button" data-audio-text="${esc(text)}" aria-label="Pakinggan ang recording">🔊 <span>Pakinggan</span></button>`;
  const flow=(practicing=false)=>`<div class="flow-top">${back('map')}<div class="flow-steps"><span class="${practicing?'finished':'active'}">1 <b>Aralin</b></span><i></i><span class="${practicing?'active':''}">2 <b>Laro</b></span></div></div>`;
  function tutorialSteps() {
    return TALA_DATA.tutorials[level().type==='paint'?'paint':'quiz'];
  }
  function tutorial() {
    const steps=tutorialSteps();
    return `<section class="tutorial-panel" aria-labelledby="tutorial-title"><div class="tutorial-heading"><div><span class="eyebrow">MALIIT NA GABAY</span><h2 id="tutorial-title">Paano ito laruin?</h2></div><button class="secondary-button tutorial-replay" data-action="demo-replay" aria-label="Ulitin ang gabay">↻ Ulitin</button></div><div class="tutorial-demo" aria-live="polite"><span class="tutorial-hand" aria-hidden="true">${steps[0][3]}</span><strong class="tutorial-demo-title">${steps[0][1]}</strong><p class="tutorial-demo-text">${steps[0][2]}</p></div><div class="tutorial-steps" role="tablist" aria-label="Mga hakbang sa gabay">${steps.map((step,i)=>`<button class="tutorial-step ${i===0?'is-active':''}" data-demo-step="${i}" role="tab" aria-selected="${i===0}"><span>${step[0]}</span><strong>${step[1]}</strong></button>`).join('')}</div></section>`;
  }
  function setupTutorial() {
    const steps=tutorialSteps(),panel=document.querySelector('.tutorial-panel');
    if(!panel)return;
    const title=panel.querySelector('.tutorial-demo-title'),text=panel.querySelector('.tutorial-demo-text'),hand=panel.querySelector('.tutorial-hand'),buttons=[...panel.querySelectorAll('[data-demo-step]')];
    let active=0,run=0;
    const show=index=>{active=(index+steps.length)%steps.length;title.textContent=steps[active][1];text.textContent=steps[active][2];hand.textContent=steps[active][3];hand.classList.remove('tutorial-hand-pop');void hand.offsetWidth;hand.classList.add('tutorial-hand-pop');buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===active);b.setAttribute('aria-selected',String(i===active));});};
    const stop=()=>{run++;};
    const narrate=(index,replay=false,token=run)=>{
      show(index);
      TALA_SPEECH.play(world().guide,steps[index][1]+' '+steps[index][2],{
        onEnded:()=>{if(replay&&token===run&&index+1<steps.length)narrate(index+1,true,token);}
      });
    };
    buttons.forEach((button,i)=>button.addEventListener('click',()=>{stop();narrate(i);}));
    panel.querySelector('[data-action="demo-replay"]').addEventListener('click',()=>{stop();narrate(0,true);});
    tutorialCleanup=stop;
  }
  function lesson() {
    const m=world(),l=level();
    return `${flow()}<div class="activity-card ${m.color}"><div class="activity-heading"><span class="pill">Yugto ${state.level} · ${m.guide}</span>${audio(l.lesson)}</div><h1>${l.title}</h1>${guide(m.guide,'<p class="lesson-text">'+l.lesson+'</p>')}<div class="teaching-art"><span class="teaching-main">${l.visual}</span><span class="teaching-picture">${l.picture}</span></div><button class="primary-button" data-action="practice">Maglaro na! <span>→</span></button></div>`;
  }
  function practice() {
    const content=practiceCard();
    if(state.module!=='quest')return content;
    const total=level().questions.length,progress=state.question/Math.max(1,total-1)*100;
    return `<div class="quest-walk gold" aria-hidden="true"><div class="quest-walk-track"><span class="quest-walker" style="left:${progress}%">${avatar('Tala')}</span>${level().questions.map((_,i)=>`<span class="quest-stone ${i<state.question?'is-done':i===state.question?'is-current':''}">${i<state.question?'✓':i+1}</span>`).join('')}</div></div>`+content.replace('Yugto '+state.level,'Hamon '+state.level);
  }
  function practiceCard() {
    const m=world(),l=level();
    if(l.type==='paint') return flow(true)+'<div class="activity-card coral"><div class="activity-heading"><span class="pill">Aking munting obra</span>'+audio('Gamitin ang iyong imahinasyon. Bawat guhit ay espesyal!')+'</div><h1>Gumuhit at magkulay!</h1>'+guide(m.guide,'<p>Gamitin ang iyong imahinasyon. Bawat guhit ay espesyal!</p>')+'<div class="paint-palette" role="group" aria-label="Mga kulay">'+[['#e55a59','Pula'],['#4f85db','Asul'],['#efc53b','Dilaw'],['#54ad77','Berde'],['#9a6bcc','Lila'],['#30365e','Itim']].map(([color,name],i)=>'<button class="paint-color '+(i===0?'selected':'')+'" data-paint="'+color+'" style="--paint:'+color+'" aria-pressed="'+(i===0)+'" aria-label="'+name+'"></button>').join('')+'</div><canvas id="paint-canvas" width="800" height="480" aria-label="Lugar ng pagguhit"></canvas><p>Iguhit gamit ang daliri o mouse. Maaari ring magdagdag ng bituin.</p><div class="paint-actions"><button class="secondary-button" data-action="paint-star">★ Magdagdag ng bituin</button><button class="secondary-button" data-action="paint-clear">Burahin ang guhit</button></div><button class="primary-button" data-action="paint-finish" disabled>Tapos na ang obra ko! ✓</button></div>';
    const item=question();
    return flow(true)+'<div class="activity-card question-card '+m.color+'"><div class="activity-heading"><span class="pill">Yugto '+state.level+' · '+m.guide+'</span><span class="question-counter">Tanong '+(state.question+1)+' sa '+l.questions.length+'</span></div><div class="question-progress" aria-label="Progreso">'+l.questions.map((_,i)=>'<span class="'+(i<state.question?'done':i===state.question?'current':'')+'"></span>').join('')+'</div><h1>'+item.prompt+'</h1>'+guide(m.guide,'<div class="bubble-audio">'+audio(item.prompt)+'</div><div class="question-visual">'+item.visual+'</div>')+'<p class="selection-instruction"><span class="instruction-step">1</span> Piliin at pakinggan. <span class="instruction-step">2</span> Kumpirmahin.</p><div class="choices" role="group" aria-label="Mga pagpipilian">'+item.choices.map((c,i)=>'<button class="choice" data-choice="'+i+'" data-audio-text="'+esc(c)+'" aria-pressed="false"><span>'+c+'</span><small>🔊</small></button>').join('')+'</div><div class="answer-dock"><p id="feedback" class="feedback" role="status"></p><button class="primary-button confirm-answer" data-action="confirm-answer" disabled>Ito ang sagot ko ✓</button><button class="hint-button" data-action="hint">💡 Pahiwatig</button></div></div>';
  }
  function finishStage(stars) {
    const result=TALA_STORE.complete(key(),stars,state.results);
    state.earned=result.earned;state.stars=stars;
    if(state.module==='quest'&&TALA_QUEST.finished(store())&&!store().questEndingSeen){openQuestStory('ending');return;}
    go('complete');
  }
  function nextQuestion() {
    if(state.question+1>=level().questions.length) {
      const accuracy=state.firstTry/level().questions.length*100;
      finishStage(accuracy>=90?5:accuracy>=75?4:accuracy>=60?3:accuracy>=40?2:1);
    } else { state.question++;state.selected=null;state.misses=0;state.submitted=false;go('practice'); }
  }
  function confirmAnswer() {
    if(state.screen!=='practice'||level().type==='paint'||state.selected===null||state.submitted)return;
    const buttons=[...document.querySelectorAll('[data-choice]')];
    const feedback=document.querySelector('#feedback'),confirm=document.querySelector('[data-action="confirm-answer"]');
    const correct=state.selected===question().answer;
    confirm.classList.remove('needs-confirmation');
    TALA_SPEECH.stop();
    if(correct||state.misses>=2) {
      state.submitted=true;buttons.forEach(b=>b.disabled=true);confirm.disabled=true;
      document.querySelectorAll('.question-card .listen-button').forEach(button=>button.disabled=true);
      confirm.hidden=true;
      const hint=document.querySelector('[data-action="hint"]');if(hint){hint.disabled=true;hint.hidden=true;}
      const answerVersion=version;
      const advance=delay=>{if(answerVersion===version&&state.screen==='practice'&&state.submitted)scheduleAnswerAdvance(delay);};
      // A bounded fallback also moves on if a recording is missing or blocked.
      advance(8000);
      buttons[question().answer].classList.add('correct');
      if(correct) {
        if(state.misses===0)state.firstTry++;
        const encouragement=praise();feedback.textContent=encouragement;mood('happy');TALA_SFX.play('correct');
        say('Tala',encouragement,{onEnded:()=>advance(450),onError:()=>advance(900)});
      } else {
        feedback.textContent='Sabay nating tandaan: '+question().choices[question().answer]+'.';mood('thinking');TALA_SFX.play('hint');
        say('Tala',voice.reveal,{after:[{character:recordingGuide(),text:TALA_SPEECH.spokenText(question().choices[question().answer])}],onEnded:()=>advance(800),onError:()=>advance(1200)});
      }
      state.results.push({question:state.question+1,firstTry:correct&&state.misses===0,misses:state.misses+(correct?0:1),...(state.module==='quest'?{sourceModule:question().sourceModule,sourceLevel:question().sourceLevel,sourceQuestion:question().sourceQuestion}:{})});
    } else {
      state.misses++;mood('thinking');TALA_SFX.play('retry');
      feedback.textContent='Kaya mo iyan. Pumili at subukan muli!';
      buttons[state.selected].classList.add('try-again');
      buttons[state.selected].addEventListener('animationend',()=>buttons.forEach(b=>b.classList.remove('try-again')),{once:true});
      buttons.forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});
      state.selected=null;confirm.disabled=true;say('Tala',voice.retry);
    }
  }
  function setupPainting() {
    const canvas=document.querySelector('#paint-canvas'),ctx=canvas.getContext('2d');
    let color='#e55a59',drawing=false;
    const finish=document.querySelector('[data-action="paint-finish"]');
    const point=event=>{const r=canvas.getBoundingClientRect();return {x:(event.clientX-r.left)*canvas.width/r.width,y:(event.clientY-r.top)*canvas.height/r.height};};
    const start=event=>{if(event.button!==0&&event.pointerType==='mouse')return;drawing=true;canvas.setPointerCapture(event.pointerId);const p=point(event);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,6,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(p.x,p.y);finish.disabled=false;};
    const move=event=>{if(!drawing)return;const p=point(event);ctx.strokeStyle=color;ctx.lineWidth=12;ctx.lineCap='round';ctx.lineJoin='round';ctx.lineTo(p.x,p.y);ctx.stroke();};
    const end=()=>{drawing=false;};
    canvas.addEventListener('pointerdown',start);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
    function actions(event) {
      const b=event.target.closest('button');if(!b)return;
      if(b.dataset.paint){color=b.dataset.paint;document.querySelectorAll('[data-paint]').forEach(p=>{p.classList.toggle('selected',p===b);p.setAttribute('aria-pressed',String(p===b));});}
      if(b.dataset.action==='paint-clear'){ctx.clearRect(0,0,canvas.width,canvas.height);finish.disabled=true;}
      if(b.dataset.action==='paint-star'){ctx.font='90px sans-serif';ctx.fillStyle=color;ctx.fillText('★',80+Math.random()*550,110+Math.random()*250);finish.disabled=false;}
    }
    document.addEventListener('click',actions);
    paintCleanup=()=>{document.removeEventListener('click',actions);};
  }
  function complete() {
    return `<div class="celebration"><div class="confetti-field" aria-hidden="true">${Array.from({length:36},(_,i)=>'<i style="--i:'+i+';--x:'+((i*37)%99)+'%;--drift:'+((i*17)%140-70)+'px;--delay:'+((i*7)%13)*.055+'s"></i>').join('')}</div><div class="celebration-sparks" aria-hidden="true">✦ <span>✧</span> ✦</div><div class="celebration-mascot">${avatar(world().guide,'character-celebrate')}</div><span class="pill">ANG GALING MO, ${esc(store().learner.toUpperCase())}!</span><h1>Isang bagong <span>ningning!</span></h1><p>Natapos mo ang “${level().title}”.</p><div class="earned-stars" aria-label="${state.stars} bituin">${ratingStars(state.stars)}</div><p class="reward-caption">${state.earned?`+${state.earned} bituin sa iyong koleksiyon`:'Naitala na ang iyong pinakamagandang marka!'}</p><button class="primary-button" data-action="map">Tuloy ang saya! <span>→</span></button><button class="text-button" data-action="replay">Laruin muli</button></div>`;
  }
  function dashboard() {
    const d=store(),total=TALA_DATA.modules.reduce((sum,m)=>sum+m.levels.length,0),count=TALA_DATA.modules.reduce((sum,m)=>sum+m.levels.filter((_,i)=>done(m.id,i+1)).length,0);
    return `${back('home')}<div class="dashboard-title"><span class="eyebrow">PARA SA GURO AT MAGULANG</span><h1>Mga munting <span>tagumpay</span></h1><p>Progreso ni ${esc(d.learner)}</p></div><div class="summary-grid"><div><span>⭐ Mga bituin</span><strong>${d.stars}</strong></div><div><span>🏁 Natapos na yugto</span><strong>${count} / ${total}</strong></div></div><div class="report-panel">${TALA_DATA.modules.map(m=>`<div class="report-row"><span class="report-icon ${m.color}">${m.icon}</span><div><strong>${m.title}</strong><span>${m.levels.filter((_,i)=>done(m.id,i+1)).length} sa ${m.levels.length} yugto</span></div></div>`).join('')}</div><button class="secondary-button" data-action="reset">Burahin ang progreso</button>`;
  }
  function toast(message) { const el=document.querySelector('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),4000); }
  window.TALA_UI={toast,back:goBack};
  window.TALA_PUBLIC?.init({go,store,avatar,toast,screen:()=>state.screen,tap:()=>TALA_SFX.play('tap'),soundEnabled:TALA_SFX.isEnabled,toggleSound:()=>{TALA_SFX.toggle();syncSoundButton();},stopVoice:stopNameVoice,resetSound:()=>{TALA_SFX.resetPreferences();syncSoundButton();}});
  document.addEventListener('submit',event=>{
    if(window.TALA_PUBLIC?.handleSubmit(event))return;
    if(event.target.id==='edit-name-form'){
      event.preventDefault();
      const name=document.querySelector('#edit-learner-name').value.trim();
      if(!name){toast('Ilagay muna ang pangalan.');return;}
      TALA_STORE.setLearner(name);pendingVoice=voice.saved;go('dashboard');toast('Na-save na ang pangalan!');return;
    }
    if(event.target.id!=='name-form')return;
    event.preventDefault(); TALA_STORE.setLearner(document.querySelector('#learner-name').value);pendingVoice=voice.start;go('home');
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('button'); if(!button||button.disabled)return;
    const {action,module:moduleId,level:levelNumber,recording,choice}=button.dataset;
    renderedRoute=captureRoute();
    if(window.TALA_PUBLIC?.handle(button))return;
    if(button.classList.contains('back-button')){pendingVoice='';TALA_SFX.play('tap');goBack();return;}
    pendingVoice='';
    if(action==='screen-listen'){narrateScreen(true);return;}
    if(action==='name-voice'&&state.screen==='welcome'){startNameVoice();return;}
    if(action==='welcome-listen'&&state.screen==='welcome'){stopNameVoice();guidance('welcome','Tala',TALA_DATA.welcomeVoice,{},true);return;}
    if(action==='sound-toggle'){TALA_SFX.toggle();syncSoundButton();say('Tala',TALA_SFX.isEnabled()?voice.soundOn:voice.soundOff);return;}
    // Navigation uses short sound effects; introductions are remembered separately.
    if(action==='story-auto'&&['intro','questStory'].includes(state.screen)){
      cancelStoryTimer();storyAuto=!storyAuto;
      button.textContent=storyAuto?'⏸ Ihinto ang kusang pagsunod':'▶ Ituloy ang kusang pagsunod';button.setAttribute('aria-pressed',String(storyAuto));
      const status=document.querySelector('#story-auto-status');if(status)status.textContent=storyAuto?'Kusang susunod limang segundo matapos ang boses.':'Nakahinto ang kusang pagsunod.';
      if(storyAuto){pendingVoice=voice.resumeStory;narrateStory();}else say('Tala',voice.pauseStory);
      return;
    }
    TALA_SFX.play(choice!==undefined?'select':action==='hint'?'hint':moduleId||levelNumber?'enter':action==='paint-star'?'stamp':action==='next-question'?'next':action==='paint-clear'?'paint':'tap');
    if(moduleId){if(moduleId==='quest')openQuest();else{state.module=moduleId;go('map');}moduleTransition(moduleId);}
    if(levelNumber&&unlocked(Number(levelNumber))){state.level=Number(levelNumber);state.misses=0;go('lesson');}
    if(button.dataset.audioText && choice===undefined) TALA_SPEECH.play(recordingGuide(),TALA_SPEECH.spokenText(button.dataset.audioText));
    if(action==='intro-open'){introPage=0;go('intro');}
    if(action==='quest-opening')openQuestStory('opening');
    if(action==='quest-ending')openQuestStory('ending');
    if(state.screen==='questStory'){
      if(action==='quest-story-listen')narrateStory();
      if(action==='quest-story-back'&&questStoryPage>0){questStoryPage--;go('questStory');}
      if(action==='quest-story-next'){
        if(questStoryPage<TALA_QUEST.stories[questStoryKind].length-1){questStoryPage++;go('questStory');}
        else finishQuestStory();
      }
      if(action==='quest-story-skip'){finishQuestStory();return;}
    }
    if(state.screen==='intro') {
      if(action==='intro-listen')narrateStory();
      if(action==='intro-back'&&introPage>0){introPage--;go('intro');}
      if(action==='intro-next'){if(introPage<TALA_DATA.intro.length-1){introPage++;go('intro');}else finishIntro();}
      if(action==='intro-skip'||action==='home'){finishIntro();return;}
    }
    if(['home','map','lesson','dashboard'].includes(action))go(action==='home'&&!store().setupComplete?'welcome':action);
    if(action==='practice'||action==='replay')startPractice();
    if(action==='jump-stage')document.querySelector('#stage-'+button.dataset.target)?.scrollIntoView({behavior:'smooth',block:'center'});
    if(action==='hint'&&state.screen==='practice'&&!state.submitted){
      mood('thinking');
      document.querySelector('#feedback').textContent=question().hint;
      say(recordingGuide(),question().hint);
    }
    if(action==='reset'&&confirm('Burahin ang lahat ng progreso sa device na ito?')){TALA_STORE.reset();introPage=0;go('intro');}
    if(choice!==undefined&&state.screen==='practice'&&!state.submitted){
      state.selected=Number(choice);mood('listening');
      document.querySelectorAll('[data-choice]').forEach(b=>{
        const selected=Number(b.dataset.choice)===state.selected;
        b.classList.toggle('selected',selected);b.classList.remove('try-again');b.setAttribute('aria-pressed',String(selected));
      });
      const confirm=document.querySelector('[data-action="confirm-answer"]');
      confirm.disabled=false;confirm.classList.remove('needs-confirmation');void confirm.offsetWidth;confirm.classList.add('needs-confirmation');
      document.querySelector('#feedback').textContent='';
      TALA_SPEECH.play(recordingGuide(),TALA_SPEECH.spokenText(question().choices[state.selected]));
    }
    if(action==='confirm-answer')confirmAnswer();
    if(action==='paint-finish'&&state.screen==='practice'&&level().type==='paint')finishStage(5);
    if(button.dataset.paint){pendingVoice=({'#e55a59':voice.red,'#4f85db':voice.blue,'#efc53b':voice.yellow,'#54ad77':voice.green,'#9a6bcc':voice.purple,'#30365e':voice.black})[button.dataset.paint]||'';}
    if(pendingVoice)say('Tala',pendingVoice);
  });
  document.addEventListener('input',event=>{if(event.target.id==='learner-name'&&nameRecognition){stopNameVoice();nameStatus('Maaari mong itama ang pangalan bago magpatuloy.');}});
  for(const type of ['click','pointerdown','pointermove','keydown','input'])document.addEventListener(type,resetIdle,{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){clearTimeout(idleTimer);clearTimeout(answerTimer);cancelStoryTimer();stopNameVoice();TALA_SPEECH.stop();}
    else {resetIdle();if(state.screen==='practice'&&state.submitted)scheduleAnswerAdvance(600);}
  });
  window.addEventListener('pagehide',()=>{clearTimeout(idleTimer);clearTimeout(answerTimer);cancelStoryTimer();stopNameVoice();TALA_SPEECH.stop();});
  // Native builds load the bundled assets directly; only the browser PWA needs a service worker.
  if(!window.Capacitor?.isNativePlatform?.()&&'serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{}));
  // A failed legal/consent script must never silently fall back to ungated learning.
  if(document.querySelector('#launch-splash')&&(!window.TALA_PUBLIC||!window.TALA_LEGAL)){window.TALA_LAUNCH?.fail();return;}
  go(window.TALA_PUBLIC?'start':!store().introSeen?'intro':store().setupComplete?'home':'welcome');
  window.TALA_LAUNCH?.ready();
})();
