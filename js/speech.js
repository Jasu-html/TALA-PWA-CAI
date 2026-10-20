(function () {
  let recording = null, generation = 0;
  const synth = window.speechSynthesis;
  let voices = [];
  const refresh = () => { voices = synth ? synth.getVoices() : []; };
  refresh();
  synth?.addEventListener('voiceschanged', refresh);
  function stop() {
    generation++; synth?.cancel();
    if (recording) { recording.pause(); recording.currentTime = 0; recording = null; }
    window.TALA_SFX?.setNarrating(false);
  }
  function speak(text) {
    stop(); refresh();
    const voice = voices.find(v => /^(fil|tl|tgl)(-|_|$)/i.test(v.lang));
    if (!synth || !voice) { window.TALA_UI?.toast('Walang naka-install na boses Filipino sa device.'); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice; utterance.lang = voice.lang;
    utterance.rate = 0.85; utterance.pitch = 1.05;
    utterance.onend = utterance.onerror = () => window.TALA_SFX?.setNarrating(false);
    window.TALA_SFX?.setNarrating(true);
    synth.speak(utterance);
  }
  function fileName(text) {
    const value = String(text ?? '').trim();
    if (/^[A-Za-z]$/.test(value)) return value.toUpperCase();
    const cleaned = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-+|-+$/g, '').toLowerCase();
    return cleaned || 'phrase';
  }
  function spokenText(text) {
    const value = String(text ?? '').trim();
    const visualNames = {'●':'bilog','■':'parisukat','▬':'parihaba','▲':'tatsulok','★':'bituin','♥':'puso'};
    return visualNames[value] || value;
  }
  const sharedPath = (character, text) => `assets/audio/fil/shared/${String(character).toLowerCase()}/${fileName(spokenText(text))}.mp3`;
  // The three-argument form remains available for old demo links and migration checks.
  const path = (moduleOrCharacter, levelOrText, clip) => clip === undefined
    ? sharedPath(moduleOrCharacter, levelOrText)
    : `assets/audio/fil/${moduleOrCharacter}/${levelOrText}/${clip}.mp3`;
  async function play(character, text) {
    stop(); const token = generation;
    const player = new Audio(sharedPath(character, text)); recording = player;
    player.onended = player.onerror = () => {
      if (token === generation) { recording = null; window.TALA_SFX?.setNarrating(false); }
    };
    window.TALA_SFX?.setNarrating(true);
    try { await player.play(); }
    catch {
      if (token === generation) {
        recording = null;
        window.TALA_SFX?.setNarrating(false);
        window.TALA_UI?.toast('Wala pang recording para dito.');
      }
    }
  }
  window.TALA_SPEECH = { speak, play, stop, path, sharedPath, fileName, spokenText };
})();
