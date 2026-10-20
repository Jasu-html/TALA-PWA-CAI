// Offline sound effects and four gentle, looping world themes.
(function () {
  let context, master, musicBus, musicTimer, world = null, desiredWorld = null, enabled = true, narrating = false;
  let tapTurn = 0, scrollStep = 0, lastScrollNote = -Infinity;
  const effects = new Set(), musicNotes = new Set(), scrollNotes = new Set();
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
  // Each pattern is a two-bar melody. Frequencies are fixed to keep playback deterministic offline.
  const themes = {
    phonics: { beat: .36, melody: [523,659,784,659,587,659,784,1047,784,659,587,523,392,523,659,0], bass: [262,0,392,0,294,0,392,0], type: 'sine' },
    numbers: { beat: .39, melody: [587,740,880,0,740,587,494,0,587,740,988,880,740,587,494,0], bass: [294,0,440,0,370,0,440,0], type: 'triangle' },
    arts: { beat: .34, melody: [659,831,988,831,740,831,988,1245,988,831,740,659,554,659,831,0], bass: [330,0,494,0,370,0,494,0], type: 'sine' },
    values: { beat: .44, melody: [392,494,587,0,659,587,494,0,392,494,587,784,659,587,494,0], bass: [196,0,294,0,247,0,294,0], type: 'triangle' }
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
  }
  function stop() { stopEffects(); stopMusic(); }
  function engine() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return false;
    try {
      if (!context) {
        context = new Audio();
        master = context.createGain(); master.gain.value = .28; master.connect(context.destination);
        musicBus = context.createGain(); musicBus.gain.value = .48; musicBus.connect(master);
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
      theme.melody.forEach((f,i) => note(f,time+i*beat,beat*.8,theme.type,.14,musicBus,musicNotes));
      theme.bass.forEach((f,i) => note(f,time+i*beat*2,beat*.72,'sine',.075,musicBus,musicNotes));
      musicTimer = setTimeout(() => scheduleMusic(module), beat*16*1000);
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
    if (!next || !enabled || document.hidden || !engine()) return;
    world = next;
    scheduleMusic(next);
  }
  function setNarrating(value) {
    narrating = !!value;
    if (narrating) release(scrollNotes);
    if (musicBus) musicBus.gain.value = narrating ? .12 : .48;
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
    }
  });
  window.TALA_SFX = { play, scroll, stop, setWorld, setNarrating, toggle, isEnabled: () => enabled };
})();
