// Offline procedural sound design: five musical identities and gentle world ambience.
(function () {
  let context, master, musicBus, ambienceBus, musicTimer, world = null, desiredWorld = null, enabled = true, narrating = false;
  let tapTurn = 0, scrollStep = 0, lastScrollNote = -Infinity;
  const effects = new Set(), musicNotes = new Set(), scrollNotes = new Set(), ambience = new Set();
  let noiseBuffer;
  // Game audio only: recorded voiceovers use their own HTMLAudioElement volume.
  // Keep ducking gentle enough for the music to remain audible under narration.
  const mix={master:.48,music:.72,musicUnderVoice:.30,ambience:.60,ambienceUnderVoice:.25};
  try { enabled = localStorage.getItem('tala-sfx-enabled') !== 'false'; } catch {}

  const scores = {
    tap: [
      [[659,0,.05,'sine',.27],[988,.035,.055,'sine',.15]],
      [[587,0,.055,'triangle',.19],[784,.04,.075,'sine',.16]],
      [[698,0,.045,'sine',.22],[1047,.03,.06,'sine',.12]]
    ],
    select: [[523,0,.08,'sine',.25],[784,.045,.1,'triangle',.16]],
    enter: [[392,0,.1,'triangle',.22],[523,.08,.13,'sine',.21],[659,.17,.16,'sine',.19]],
    correct: [[523,0,.12,'triangle',.28],[659,.09,.14,'triangle',.24],[784,.18,.25,'sine',.25]],
    retry: [[440,0,.13,'sine',.14],[523,.12,.2,'sine',.14]],
    hint: [[880,0,.12,'sine',.16],[1175,.1,.2,'sine',.14]],
    complete: [[523,0,.16,'triangle',.2],[659,.12,.16,'triangle',.18],[784,.24,.17,'triangle',.18],[1047,.4,.5,'sine',.22],[659,.4,.45,'sine',.1],[784,.4,.45,'sine',.1]],
    stamp: [[440,0,.07,'triangle',.21],[880,.05,.12,'sine',.17]],
    next: [[587,0,.065,'sine',.18],[784,.07,.09,'sine',.17]],
    paint: [[523,0,.08,'triangle',.17],[698,.06,.11,'sine',.14]],
    sparkle: [[1047,0,.08,'sine',.13],[1319,.065,.12,'sine',.12]]
  };
  // Distinct rhythms, rests, instruments and accompaniment, not transposed copies.
  const themes = {
    home: { beat:.30, instrument:'celesta', melody:[523,0,659,784,0,659,587,0,523,659,0,880,784,0,659,0,587,0,698,880,0,784,659,0,523,0,392,523,659,0,0,0], chords:[[131,165,196],[175,220,262],[147,196,247],[131,165,196]] },
    phonics: { beat:.43, instrument:'flute', melody:[659,0,0,784,880,0,784,0,659,587,0,0,523,0,0,0,587,0,659,0,784,0,1047,0,880,784,0,659,587,0,0,0], chords:[[131,196,262],[110,165,220],[147,220,294],[131,196,262]] },
    numbers: { beat:.25, instrument:'marimba', melody:[587,0,740,880,0,740,0,587,0,494,587,0,740,0,880,0,988,0,880,0,740,880,0,740,587,0,494,587,0,0,0,0], chords:[[147,185,220],[123,185,247],[165,220,277],[147,185,220]] },
    arts: { beat:.23, instrument:'pluck', melody:[523,659,784,0,0,659,698,880,1047,0,880,0,784,659,523,587,698,880,784,0,659,587,523,0], chords:[[131,165,196],[175,220,262],[147,175,220],[131,165,196]] },
    values: { beat:.52, instrument:'piano', melody:[392,0,0,494,0,587,659,0,587,0,0,0,494,0,392,0,440,0,494,0,587,0,0,0], chords:[[98,123,147],[131,165,196],[110,147,185],[98,123,147]] }
  };
  function release(set) {
    for (const note of set) { try { note.stop(); } catch {} }
    set.clear();
  }
  function stopEffects() { release(effects); release(scrollNotes); }
  function stopMusic() {
    world = null;
    clearTimeout(musicTimer);
    musicTimer = null;
    release(musicNotes);
    release(ambience);
  }
  function stop() { stopEffects(); stopMusic(); }
  function engine() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return false;
    try {
      if (!context) {
        context = new Audio();
        master = context.createGain(); master.gain.value = mix.master; master.connect(context.destination);
        musicBus = context.createGain(); musicBus.gain.value = narrating ? mix.musicUnderVoice : mix.music; musicBus.connect(master);
        ambienceBus = context.createGain(); ambienceBus.gain.value = narrating ? mix.ambienceUnderVoice : mix.ambience; ambienceBus.connect(master);
      }
      if (context.state === 'suspended') context.resume().catch(() => {});
      return context.state !== 'closed';
    } catch { return false; }
  }
  function note(frequency, start, duration, type, volume, output, set, attack = .025) {
    if (!frequency) return;
    const oscillator = context.createOscillator(), gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(.001, start);
    gain.gain.linearRampToValueAtTime(volume, start + attack);
    gain.gain.exponentialRampToValueAtTime(.001, start + duration);
    oscillator.connect(gain); gain.connect(output); set.add(oscillator);
    oscillator.onended = () => { set.delete(oscillator); oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(start); oscillator.stop(start + duration + .02);
  }
  function instrument(kind,f,time,length,volume=.13) {
    if(!f)return;
    const partial=(ratio,duration,gain,type='sine',attack=.008)=>note(f*ratio,time,duration,type,volume*gain,musicBus,musicNotes,attack);
    if(kind==='flute') {
      partial(1,length*1.45,1,'sine',.085);partial(2,length,.12,'sine',.06);
    } else if(kind==='marimba') {
      partial(1,.42,1);partial(4,.10,.20);partial(10,.045,.035);
    } else if(kind==='pluck') {
      partial(1,.19,1,'triangle',.004);partial(2,.09,.18,'sine',.003);
    } else if(kind==='celesta') {
      partial(1,.65,.85);partial(2,.27,.25);partial(3,.14,.06);
    } else {
      partial(1,.95,1);partial(2,.38,.23);partial(3,.20,.08);
    }
  }
  function soften(bus,value) {
    if(!bus||!context)return;
    const gain=bus.gain,time=context.currentTime;
    // Short ramps avoid abrupt volume changes under speech.
    gain.cancelScheduledValues?.(time);gain.setValueAtTime(gain.value,time);
    gain.linearRampToValueAtTime(value,time+.18);
  }
  function rustle(time,length,volume,frequency=900) {
    if(!context.createBuffer||!context.createBufferSource||!context.createBiquadFilter)return;
    if(!noiseBuffer) {
      noiseBuffer=context.createBuffer(1,context.sampleRate*2,context.sampleRate);
      const samples=noiseBuffer.getChannelData(0);
      let seed=913;
      for(let i=0;i<samples.length;i++){seed=(seed*16807)%2147483647;samples[i]=(seed/2147483647)*2-1;}
    }
    const source=context.createBufferSource(),filter=context.createBiquadFilter(),gain=context.createGain();
    source.buffer=noiseBuffer;source.loop=true;filter.type='lowpass';filter.frequency.value=frequency;
    gain.gain.setValueAtTime(.001,time);gain.gain.linearRampToValueAtTime(volume,time+length*.38);
    gain.gain.exponentialRampToValueAtTime(.001,time+length);
    source.connect(filter);filter.connect(gain);gain.connect(ambienceBus);ambience.add(source);
    source.onended=()=>{ambience.delete(source);source.disconnect();filter.disconnect();gain.disconnect();};
    source.start(time);source.stop(time+length+.03);
  }
  function bird(time,beach=false) {
    const oscillator=context.createOscillator(),gain=context.createGain();
    oscillator.type='sine';
    const f=beach?850:1450;
    oscillator.frequency.setValueAtTime(f,time);
    oscillator.frequency.linearRampToValueAtTime?.(beach?1250:2350,time+.11);
    oscillator.frequency.exponentialRampToValueAtTime?.(beach?650:1750,time+(beach?.48:.23));
    gain.gain.setValueAtTime(.001,time);gain.gain.linearRampToValueAtTime(beach?.055:.065,time+.035);
    gain.gain.exponentialRampToValueAtTime(.001,time+(beach?.55:.28));
    oscillator.connect(gain);gain.connect(ambienceBus);ambience.add(oscillator);
    oscillator.onended=()=>{ambience.delete(oscillator);oscillator.disconnect();gain.disconnect();};
    oscillator.start(time);oscillator.stop(time+(beach?.58:.31));
  }
  function environment(module,time,entry=false) {
    if(module==='phonics') {
      rustle(time,entry?2.6:3.5,entry?.16:.06,1400);
      bird(time+.16);bird(time+.52);if(entry)bird(time+1.15);
    } else if(module==='numbers') {
      rustle(time,entry?3.1:4.2,entry?.26:.13,650);
      bird(time+.4,true);if(entry)bird(time+1.1,true);
    } else if(module==='arts') {
      if(entry){rustle(time,.55,.11,2400);[523,659,784,1047].forEach((f,i)=>note(f,time+i*.09,.35,'sine',.1,ambienceBus,ambience));}
    } else if(module==='values') {
      rustle(time,2.6,entry?.10:.035,700);
      if(entry)[784,988,1175].forEach((f,i)=>note(f,time+i*.25,.85,'sine',.085,ambienceBus,ambience));
    } else if(entry)note(1047,time,.6,'sine',.07,ambienceBus,ambience);
  }
  function enterWorld(module) {
    if(!themes[module]||!enabled||document.hidden||!engine())return;
    release(ambience);
    try{environment(module,context.currentTime+.025,true);}catch{release(ambience);}
  }
  function play(name = 'tap') {
    if (!enabled || document.hidden || !engine()) return;
    stopEffects();
    const score = name === 'tap' ? scores.tap[tapTurn++ % scores.tap.length] : scores[name] || scores.tap[0];
    const time = context.currentTime;
    try { for (const [f,d,l,t,v] of score) note(f,time+d,l,t,v,master,effects); }
    catch { stopEffects(); }
    if (desiredWorld && !world) setWorld(desiredWorld);
  }
  function scheduleMusic(module) {
    if (world !== module || !enabled || document.hidden || !engine()) return;
    const theme = themes[module], beat = theme.beat, time = context.currentTime + .03;
    try {
      theme.melody.forEach((f,i) => instrument(theme.instrument,f,time+i*beat,beat));
      const bar=theme.melody.length/4;
      theme.chords.forEach((chord,i)=>{
        const start=time+i*bar*beat;
        note(chord[0],start,beat*1.5,'sine',.085,musicBus,musicNotes);
        if(module==='numbers') {
          // Bright off-beat ukulele-like strums over the marimba.
          for(const offset of [1.5,3.5,5.5])chord.forEach((f,j)=>note(f*2,start+offset*beat+j*.012,.20,'triangle',.025,musicBus,musicNotes,.005));
        } else if(module==='arts') {
          // A skipping three-beat pizzicato accompaniment.
          [2,4].forEach(offset=>chord.slice(1).forEach(f=>note(f,start+offset*beat,.17,'triangle',.035,musicBus,musicNotes,.005)));
        } else chord.forEach((f,j)=>instrument(module==='phonics'?'pluck':'piano',f*2,start+(j+1)*beat,beat,.035));
      });
      environment(module,time+1.3);
      musicTimer = setTimeout(() => scheduleMusic(module), beat*theme.melody.length*1000);
    } catch { stopMusic(); }
  }
  function scroll(direction = 1) {
    // Scrolling cannot start the audio engine before the first user interaction.
    if (!enabled || document.hidden || narrating || !context || context.state !== 'running') return;
    const time = context.currentTime;
    if (time - lastScrollNote < .17) return;
    lastScrollNote = time;
    const scale = [0,2,4,7,9,12];
    const root = {phonics:60,numbers:62,arts:64,values:67}[desiredWorld] || 60;
    scrollStep = (scrollStep + (direction < 0 ? -1 : 1) + scale.length) % scale.length;
    const frequency = 440 * Math.pow(2,(root + scale[scrollStep] - 69) / 12);
    if (scrollNotes.size >= 12) release(scrollNotes);
    try {
      // A soft struck fundamental with two faster-decaying piano-like harmonics.
      note(frequency,time,.6,'sine',.14,master,scrollNotes,.006);
      note(frequency*2,time,.25,'sine',.033,master,scrollNotes,.005);
      note(frequency*3,time,.13,'sine',.012,master,scrollNotes,.004);
    } catch { release(scrollNotes); }
  }
  function setWorld(module) {
    const next = themes[module] ? module : null;
    desiredWorld = next;
    if (next === world) return;
    stopMusic();
    // Initial render only remembers the theme. A tap unlocks audio on mobile.
    if (!next || !enabled || document.hidden || !context || !engine()) return;
    world = next;
    scheduleMusic(next);
  }
  function setNarrating(value) {
    narrating = !!value;
    if (narrating) release(scrollNotes);
    soften(musicBus,narrating?mix.musicUnderVoice:mix.music);
    soften(ambienceBus,narrating?mix.ambienceUnderVoice:mix.ambience);
  }
  function toggle() {
    enabled = !enabled;
    try { localStorage.setItem('tala-sfx-enabled',String(enabled)); } catch {}
    if (!enabled) stop();
    else { play('tap'); if (desiredWorld) setWorld(desiredWorld); }
    return enabled;
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
      if (context?.state === 'running') context.suspend().catch(() => {});
    } else if(context&&desiredWorld&&enabled)setWorld(desiredWorld);
  });
  window.TALA_SFX = { play, scroll, stop, setWorld, enterWorld, setNarrating, toggle, isEnabled: () => enabled,
    resetPreferences(){stop();enabled=true;desiredWorld=null;}
  };
})();
