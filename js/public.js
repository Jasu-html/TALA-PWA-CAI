(function(){
  const KEY='tala-public-preferences-v1',legal=window.TALA_LEGAL;
  let api,adultUntil=0,adultTarget='parent',origin='start',documentOrigin='start',documentKind='privacy';
  let challenge={a:3,b:4,operator:'×'};
  const read=()=>{try{return window.TALA_CLASSROOM?.preferences()||JSON.parse(localStorage.getItem(KEY))||{};}catch(error){if(window.TALA_CLASSROOM?.configured())throw error;return {};}};
  const write=value=>{try{window.TALA_CLASSROOM?.savePreferences(value);localStorage.setItem(KEY,JSON.stringify(value));return true;}catch{api?.toast('Hindi ma-save ang consent. Paki-check kung may available storage at pinapayagan ng browser ang pag-save.');return false;}};
  const accepted=()=>{const d=read();return d.version===legal.version&&d.guardian===true&&d.terms===true&&d.processing===true;};
  const adult=()=>Date.now()<adultUntil;
  const escape=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const button=(action,text,style='secondary-button')=>`<button type="button" class="${style}" data-action="${action}">${text}</button>`;
  const close=()=>button('public-back','← Bumalik','back-button');
  const contacts=()=>legal.contacts.map(email=>`<button class="text-button" data-action="contact-project" data-email="${escape(email)}">${escape(email)}</button>`).join('');
  const review=()=>legal.releaseStatus==='review'?'<p class="review-note">Test version pa ito. Ongoing ang legal at release review, kaya hindi pa ito ready para sa public distribution.</p>':'';
  function motion(){document.body.dataset.motion=read().reduceMotion?'reduce':'system';}
  function requestAdult(target='parent',from=api.screen()){
    origin=from;adultTarget=target;
    if(adult()){api.go(target);return;}
    const multiplication=Math.random()<.5;
    const number=()=>multiplication?1+Math.floor(Math.random()*9):10+Math.floor(Math.random()*90);
    challenge={a:number(),b:number(),operator:multiplication?'×':'+'};
    api.go('parentGate');
  }
  function openDocument(kind){documentOrigin=api.screen();documentKind=kind;api.go('legal');}
  function startLearning(){
    if(!accepted()){requestAdult('consent','start');return;}
    const d=api.store();api.go(!d.introSeen?'intro':d.setupComplete?'home':'welcome');
  }
  const frame=(title,content)=>`<article class="public-panel" aria-labelledby="public-title">${close()}<header><span class="eyebrow">TALA · PARA SA PAMILYA</span><h1 id="public-title" tabindex="-1">${title}</h1></header>${content}</article>`;
  const screens={
    start(){
      const returning=accepted()&&api.store().setupComplete;
      return `<div class="start-scene"><div class="start-aurora" aria-hidden="true"></div><div class="start-constellations" aria-hidden="true">${Array.from({length:12},(_,i)=>`<i style="--i:${i};--x:${6+(i*29)%88}%;--y:${5+(i*17)%77}%">✦</i>`).join('')}</div><header class="start-brand"><span class="start-mark" aria-hidden="true">✦</span><strong>TALA</strong><p lang="en">A Voice-Guided Learning App<br>for Grade 1 Learners</p></header><div class="start-main"><span class="start-badge">FILIPINO · GRADE 1</span><h1>Munting hakbang.<br><span>Malaking ningning.</span></h1><div class="start-cast" aria-hidden="true">${['Titik','Likha','Tala','Bilang'].map(name=>api.avatar(name,'character-start',name==='Tala'?'Happy':'Neutral')).join('')}</div><p>${returning?'Tuloy ang paglalakbay, '+escape(api.store().learner)+'!':'Matuto, maglaro, at sumikat kasama ang mga kaibigan ni Tala.'}</p><button class="primary-button start-play" data-action="start-game"><span aria-hidden="true">▶</span> ${returning?'Magpatuloy':'Magsimula'}</button><button class="start-parent" data-action="parent-open">Para sa magulang at guro →</button></div><footer class="start-footer"><div>${button('show-child','Para sa bata','start-link')}${button('show-privacy','Privacy','start-link')}${button('show-terms','Terms of Use','start-link')}${button('show-help','Help','start-link')}</div><small>v${legal.appVersion} · ${legal.releaseStatus==='review'?'Test version':'TALA'}</small></footer></div>`;
    },
    parentGate(){return frame(adultTarget==='classroom'?'Teacher check':'Magulang muna',`<p>${adultTarget==='classroom'?'Para sa teacher ang classroom setup. Hindi nito pinapalitan ang consent ng magulang para sa learner.':'Pakiabot muna ang device sa magulang o legal guardian bago magpatuloy.'}</p><form id="adult-gate-form" class="public-form"><label for="adult-answer">Para sa ${adultTarget==='classroom'?'teacher':'magulang'}: ano ang ${challenge.a} ${challenge.operator} ${challenge.b}?</label><input id="adult-answer" inputmode="numeric" autocomplete="off" required aria-describedby="adult-gate-note"><p id="adult-gate-note" class="small-note">Simple check lang ito para sa magulang. Hindi nito nabe-verify ang identity o pagiging legal guardian. Hindi sine-save ang sagot.</p><button class="primary-button" type="submit">Magpatuloy</button><p id="public-error" role="alert"></p></form>`);},
    consent(){return frame('Parent consent',`${review()}<p>Walang kailangang account o bayad, at walang ads. Nickname at learning progress ang sine-save sa device para maituloy ang laro. Optional ang microphone.</p><div class="public-links">${button('show-terms','Basahin ang Terms of Use')}${button('show-privacy','Basahin ang Privacy Notice')}${button('show-child','Para sa bata')}</div><form id="legal-consent-form" class="public-form"><label class="check-row"><input id="guardian-confirm" type="checkbox" required><span>Ako ang magulang o legal guardian ng batang gagamit, at may karapatan akong magbigay ng consent para sa kanya.</span></label><label class="check-row"><input id="terms-confirm" type="checkbox" required><span>Nabasa ko at sumasang-ayon ako sa Terms of Use (version ${legal.version}).</span></label><label class="check-row"><input id="processing-confirm" type="checkbox" required><span>Nabasa ko ang Privacy Notice. Pinapayagan kong i-save at gamitin ng TALA ang nickname, progress, at learning results ng bata sa device na ito para sa pag-aaral. Puwede kong bawiin ang consent at i-delete ang data.</span></label><p class="small-note">Hiwalay ang permission para sa voice input. Naka-off muna ang microphone. Kahit hindi ito gamitin, available pa rin ang lahat ng lessons.</p><button class="primary-button" type="submit">Agree at magpatuloy</button>${button('public-cancel','Hindi muna','text-button')}<p id="public-error" role="alert"></p></form>`);},
    legal(){
      const doc=legal.documents[documentKind]||legal.documents.privacy;
      return frame(doc.title,`${review()}<p class="legal-version">Policy version ${legal.version} · Updated: 23 October 2026</p><p class="legal-intro">${escape(doc.intro)}</p>${doc.sections.map(([title,text])=>`<section class="legal-section"><h2>${escape(title)}</h2><p>${escape(text)}</p></section>`).join('')}<section class="legal-section"><h2>Support at privacy</h2><p>${escape(legal.operator)}</p><div class="contact-list">${contacts()}</div></section>${doc.sources.length?'<section class="legal-section"><h2>Official sources</h2><p>External websites ang mga ito. Magpatulong muna sa magulang bago buksan.</p>'+doc.sources.map(([label,url])=>`<button class="text-button source-link" data-action="open-source" data-url="${escape(url)}">${escape(label)} ↗</button>`).join('')+'</section>':''}`);
    },
    parent(){
      const settings=read();
      return frame('Para sa magulang',`${review()}<div class="public-settings"><section><h2>Learning progress</h2><p>Nickname lang ang kailangan. Nasa device na ito ang saved data.</p>${button('parent-progress','Tingnan ang progress o palitan ang nickname')}${button('export-data','I-download ang saved data')}</section><section><h2>Sound at animations</h2>${button('public-sound',api.soundEnabled()?'Music at SFX: On':'Music at SFX: Off')}${button('toggle-motion',settings.reduceMotion?'Reduce animations: On':'Reduce animations: Sundin ang device')}<p class="small-note">Para sa music at sound effects ang setting na ito, hindi sa recorded voice guides. Puwede ring hinaan ang media volume ng device.</p></section><section><h2>Optional na microphone</h2><p>${settings.voiceInput?'Allowed ang voice input.':'Naka-off. Puwedeng i-type ang nickname.'}</p>${button(settings.voiceInput?'voice-disable':'voice-review',settings.voiceInput?'I-off ang voice input':'I-review ang voice input permission')}</section><section><h2>Help at app info</h2><div class="public-links">${button('show-terms','Terms of Use')}${button('show-privacy','Privacy')}${button('show-child','Para sa bata')}${button('show-help','Help')}${button('show-about','Tungkol sa TALA')}</div></section><section class="danger-zone"><h2>Data at consent</h2><p>Dito puwedeng bawiin ang consent at i-delete ang nickname, progress, settings, at consent records sa device na ito. Hindi nito mabubura ang files na na-download mo na o data na hawak ng ibang provider.</p>${button('delete-review','Bawiin ang consent at i-delete ang data','secondary-button danger-button')}</section></div>`);
    },
    voicePermission(){return frame('Voice input permission',`<p>Optional ang voice input. Maaaring ipadala ng Android o browser voice service (halimbawa, Google) ang boses sa server nito para iproseso, posibleng sa ibang bansa. Paki-check ang privacy policy at settings ng provider. Hindi nagse-save ang TALA ng raw voice recording.</p><p>Para lang ito gawing text ang sinabing nickname. Huwag sabihin ang full name o ibang personal details. Puwedeng mag-type na lang; available pa rin ang parehong lessons.</p><form id="voice-permission-form" class="public-form"><label class="check-row"><input id="voice-confirm" type="checkbox" required><span>Bilang magulang o legal guardian, nabasa ko ang explanation sa itaas at pinapayagan ko ang optional voice input. Puwede ko itong i-off anumang oras.</span></label><button class="primary-button" type="submit">Allow voice input</button>${button('public-cancel','Huwag muna','text-button')}<p id="public-error" role="alert"></p></form><p class="small-note">Hindi pa nito bubuksan ang microphone. Hihingi rin ng device permission kapag gagamitin na ang voice input.</p>`);},
    deleteData(){return frame('I-delete ang saved data?',`<p>Made-delete ang nickname, stars, progress, settings, at consent records sa device na ito. Hindi na ito puwedeng i-undo. Hindi maaapektuhan ang ibang app. Mananatili ang lesson files na bundled o cached; walang learner profile sa mga file na iyon.</p><form id="delete-data-form" class="public-form"><label for="delete-confirm">I-type ang BURAHIN para i-confirm.</label><input id="delete-confirm" autocomplete="off" required><button class="secondary-button danger-button" type="submit">I-delete at bawiin ang consent</button>${button('public-cancel','Huwag i-delete','text-button')}<p id="public-error" role="alert"></p></form>`);},
    help(){return frame('Paano gamitin ang TALA',`<div class="legal-section"><h2>1. Magpatulong sa magulang</h2><p>Magulang muna ang magre-review ng Terms of Use at Privacy Notice. Nickname lang ang kailangan sa setup. Puwedeng magpatulong sa pag-type.</p><h2>2. Piliin ang mundo</h2><p>Piliin ang mundo, tapos i-tap ang unlocked na level. Pakinggan ang aralin, saka pindutin ang Laro.</p><h2>3. Piliin at i-confirm ang sagot</h2><p>I-tap ang isang sagot para marinig ang word, saka pindutin ang Ito ang sagot ko. Automatic na susunod kapag tama. Kapag mali, puwedeng sumubok ulit.</p><h2>Walang boses o tunog?</h2><p>I-check ang media volume ng device. Kung hindi automatic na tumutunog ang voice guide, pindutin ang Pakinggan. Para sa music at SFX ang sound toggle; hiwalay ang recorded voice guides. Hindi kailangan ang voice input para maglaro.</p><h2>Offline at pag-save</h2><p>Kasama na sa APK ang lessons at recordings. Sa browser/PWA, kailangang ma-load muna ang files habang online para ma-save sa cache; hindi siguradong lahat ng MP3 ay available agad offline. Kadalasang kailangan ng internet ang voice input. Huwag i-clear ang app/browser data kung gusto mong panatilihin ang progress.</p><h2>Mag-break din</h2><p>Samahan ang bata habang naglalaro, panatilihing komportable ang volume, at mag-break kapag pagod na. Ang stars ay game feedback lang, hindi official school grades.</p><h2>May bug o kailangan ng help?</h2><p>I-email ang app version, device model, at ginawa mo bago lumabas ang problema. Huwag isama ang pangalan o voice recording ng bata.</p><div class="contact-list">${contacts()}</div></div>`);},
    about(){return frame('Tungkol sa TALA',`${api.avatar('Tala','character-celebrate','Happy')}<p lang="en">A Voice-Guided Learning App for Grade 1 Learners</p><p>Version ${legal.appVersion} · Filipino · 73 main levels at 10 Hamon ni Tala</p><p>${escape(legal.operator)}</p><p>Learning aid ang TALA, hindi official assessment. Hindi automatic na endorsed ito ng college o DepEd.</p><div class="contact-list">${contacts()}</div>${review()}<p class="small-note">Built with HTML, CSS, JavaScript, Web Audio, at Capacitor (MIT). Kailangan pang ma-confirm ang permission sa character images at recordings bago ang public release. Hindi legal certification ang app na ito.</p>`);}
  };
  const about=screens.about;
  screens.about=()=>about().replace('</article>','<details class="license-notice"><summary>Capacitor license</summary><pre>'+escape(legal.thirdPartyLicense)+'</pre></details></article>');
  function fail(message){const error=document.querySelector('#public-error');if(error)error.textContent=message;api.toast(message);}
  function handleSubmit(event){
    const id=event.target.id;
    if(!['adult-gate-form','legal-consent-form','voice-permission-form','delete-data-form'].includes(id))return false;
    event.preventDefault();
    if(id==='adult-gate-form'){
      const answer=challenge.operator==='×'?challenge.a*challenge.b:challenge.a+challenge.b;
      if(Number(document.querySelector('#adult-answer').value)!==answer){fail('Hindi tama ang sagot. Magpatulong sa magulang at subukan ulit.');return true;}
      adultUntil=Date.now()+300000;api.go(adultTarget);return true;
    }
    if(!adult()){requestAdult(id==='legal-consent-form'?'consent':id==='voice-permission-form'?'voicePermission':'deleteData',origin);return true;}
    if(id==='legal-consent-form'){
      if(!['guardian-confirm','terms-confirm','processing-confirm'].every(key=>document.querySelector('#'+key)?.checked)){fail('Paki-review at i-check nang hiwalay ang tatlong items kung sang-ayon ka.');return true;}
      if(write({...read(),version:legal.version,guardian:true,terms:true,processing:true,acceptedAt:new Date().toISOString(),voiceInput:false}))startLearning();
    }
    if(id==='voice-permission-form'){
      if(!document.querySelector('#voice-confirm')?.checked){fail('I-check lang ang box kung pinapayagan mo ang voice input.');return true;}
      if(write({...read(),voiceInput:true,voiceVersion:legal.version,voiceAcceptedAt:new Date().toISOString()})){api.go(origin==='welcome'?'welcome':'parent');api.toast('Allowed na ang voice input. I-tap lang ang microphone kapag gagamitin mo na.');}
    }
    if(id==='delete-data-form'){
      if(document.querySelector('#delete-confirm').value.trim()!=='BURAHIN'){fail('Paki-type ang BURAHIN para i-confirm.');return true;}
      try{window.TALA_CLASSROOM?.withdrawActive();window.TALA_CLASSROOM?.lock();for(const key of [KEY,'tala-pwa-progress-v1','tala-sfx-enabled','tala-audio-volumes-v1'])localStorage.removeItem(key);}
      catch{fail('Hindi ma-delete ang data. Subukang i-clear ang TALA data sa app o browser settings.');return true;}
      adultUntil=0;api.resetSound();motion();api.go('start');api.toast('Nabawi na ang consent at na-delete ang TALA data sa device na ito.');
    }
    return true;
  }
  function back(screen){
    if(screen==='legal'){api.go(documentOrigin);return true;}
    if(['parentGate','consent','parent','voicePermission','deleteData','help','about'].includes(screen)){api.go(['help','about'].includes(screen)?documentOrigin:origin);return true;}
    return false;
  }
  function exportData(){
    if(!confirm('May nickname at learning results ang file. I-save ito sa safe na lugar at huwag basta i-share. I-download na?'))return;
    if(window.TALA_FILES){TALA_FILES.save(JSON.stringify({app:'TALA',exportedAt:new Date().toISOString(),progress:api.store(),preferences:read()},null,2),'TALA-local-data.json','application/json').catch(error=>{if(error.code!=='cancelled')api.toast('Hindi ma-export ang data. Subukang muli.');});return;}
    const blob=new Blob([JSON.stringify({app:'TALA',exportedAt:new Date().toISOString(),progress:api.store(),preferences:read()},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='TALA-local-data.json';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function handle(button){
    const action=button.dataset.action;
    if(action==='start-game'){window.TALA_ROLES?.student();api.tap();startLearning();return true;}
    if(action==='parent-open'){api.tap();requestAdult('parent');return true;}
    if(action==='dashboard'&&!adult()){api.tap();requestAdult('dashboard');return true;}
    if(action==='public-back'||action==='public-cancel'){api.tap();back(api.screen());return true;}
    if(action==='show-terms'||action==='show-privacy'||action==='show-child'){openDocument(action.slice(5));return true;}
    if(action==='show-help'||action==='show-about'){documentOrigin=api.screen();api.go(action.slice(5));return true;}
    if(action==='open-source'){
      const allowed=legal.documents[documentKind]?.sources.some(([,url])=>url===button.dataset.url);
      if(!allowed)return true;
      if(!adult()){api.toast('Magpatulong muna sa magulang. Buksan ang Para sa magulang para magpatuloy.');return true;}
      if(confirm('Magbubukas ng official website sa labas ng app. Kailangan ng internet. Tuloy?'))window.open(button.dataset.url,'_blank','noopener,noreferrer');
      return true;
    }
    if(action==='contact-project'){
      if(!legal.contacts.includes(button.dataset.email))return true;
      if(!adult()){api.toast('Magpatulong muna sa magulang. Buksan ang Para sa magulang para magpatuloy.');return true;}
      if(confirm('Magbubukas ng email app. Huwag isama ang pangalan, photo, o voice recording ng bata. Tuloy?'))window.location.href='mailto:'+button.dataset.email;
      return true;
    }
    if(['parent-progress','export-data','public-sound','toggle-motion','voice-disable','voice-review','delete-review'].includes(action)){
      if(!adult()){requestAdult('parent');return true;}
      if(action==='parent-progress')api.go(accepted()?'dashboard':'consent');
      if(action==='export-data')exportData();
      if(action==='public-sound'){api.toggleSound();api.go('parent');}
      if(action==='toggle-motion'){if(write({...read(),reduceMotion:!read().reduceMotion})){motion();api.go('parent');}}
      if(action==='voice-disable'){write({...read(),voiceInput:false,voiceAcceptedAt:null});api.stopVoice();api.go('parent');}
      if(action==='voice-review'){if(!accepted())api.go('consent');else api.go('voicePermission');}
      if(action==='delete-review')api.go('deleteData');
      return true;
    }
    return false;
  }
  window.TALA_PUBLIC={screens,init(value){api=value;motion();},accepted,handle,handleSubmit,back,
    needsConsent:screen=>!(screen==='customPlay'&&window.TALA_BUILDER?.isPreview())&&!accepted()&&!['start','classroom','builder','teacherSettings',...Object.keys(screens)].includes(screen),
    lockAdult:()=>{adultUntil=0;motion();},
    requestTeacherSetup:()=>requestAdult('classroom'),
    voiceAllowed:()=>accepted()&&read().voiceInput===true&&read().voiceVersion===legal.version,
    requestVoice:()=>requestAdult(accepted()?'voicePermission':'consent'),
    reduceMotion:()=>!!read().reduceMotion,
    parentLink:()=>button('parent-open','⚙ Para sa magulang · Privacy · Help','text-button public-parent-link')
  };
})();
