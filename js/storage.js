(function () {
  const KEY = 'tala-pwa-progress-v1';
  const fresh = () => ({ curriculumVersion:2, learner:'Munting Tala', setupComplete:false, introSeen:false, questOpeningSeen:false, questEndingSeen:false, stars:0, completed:[], attempts:{}, best:{}, results:{}, lastVisit:null });
  function read() {
    try {
      const raw = window.TALA_CLASSROOM?.progress() || JSON.parse(localStorage.getItem(KEY)) || {};
      const d = { ...fresh(), ...raw };
      // Existing learners should not be sent through first-run setup after an update.
      const returning = (typeof raw.learner==='string' && raw.learner!=='Munting Tala') || d.completed.length>0;
      d.setupComplete = raw.setupComplete ?? returning;
      d.introSeen = raw.introSeen ?? d.setupComplete;
      d.completed = d.completed.map(id => id.includes(':') ? id : `${id}:1`);
      if (raw.curriculumVersion !== 2) {
        // The original three-stage demo used a different order. Keep its
        // completions attached to the concepts the learner actually finished.
        const maps={phonics:{1:1,2:2,3:13},numbers:{1:6,2:7,3:13},arts:{1:1,2:2,3:8},values:{1:7,2:3,3:6}};
        const migrate=id=>{const [m,n]=id.split(':');return m+':'+(maps[m]?.[n]||n);};
        d.completed=[...new Set(d.completed.map(migrate))];
        d.best=Object.fromEntries(Object.entries(d.best).map(([id,n])=>[migrate(id),n]));
        d.attempts=Object.fromEntries(Object.entries(d.attempts).map(([id,n])=>[migrate(id),n]));
        d.curriculumVersion=2;
      }
      return d;
    } catch (error) { if(window.TALA_CLASSROOM?.configured())throw error;return fresh(); }
  }
  function save(d,completion) {
    d.lastVisit = new Date().toISOString();
    if(completion)window.TALA_CLASSROOM?.completeProgress(d,completion.id,completion.stars);
    else window.TALA_CLASSROOM?.saveProgress(d);
    try { localStorage.setItem(KEY, JSON.stringify(d)); }
    catch { window.TALA_UI?.toast('Hindi mai-save ang progreso sa browser na ito.'); }
    return d;
  }
  window.TALA_STORE = {
    get:read,
    hasHeardGuidance(key) { const heard=read().heardGuidance; return Array.isArray(heard)&&heard.includes(key); },
    markGuidanceHeard(key) { const d=read(); d.heardGuidance=[...new Set([...(Array.isArray(d.heardGuidance)?d.heardGuidance:[]),key])]; return save(d); },
    setLearner(name) { const d=read(); d.learner=String(name).replace(/[\u0000-\u001f\u007f]/g,'').replace(/\s+/g,' ').trim().slice(0,24) || 'Munting Tala'; d.setupComplete=true; return save(d); },
    markIntroSeen() { const d=read(); d.introSeen=true; return save(d); },
    markQuestStorySeen(kind) {
      const d=read();
      if(kind==='opening')d.questOpeningSeen=true;
      if(kind==='ending')d.questEndingSeen=true;
      return save(d);
    },
    complete(id, stars, results = []) {
      const d=read(), previous=d.best[id] || (d.completed.includes(id) ? 5 : 0);
      const before=window.TALA_NAV?JSON.parse(JSON.stringify(d)):null;
      const earned=Math.max(0, stars-previous);
      if (!d.completed.includes(id)) d.completed.push(id);
      d.best[id]=Math.max(previous,stars); d.stars+=earned;
      d.results[id]=results;
      d.attempts[id]=(d.attempts[id] || 0)+1; save(d,{id,stars});
      // Compare persisted progress, not clicks or a separate device-wide badge list.
      try{if(before)window.TALA_NAV.celebrate(before,read());}catch{/* Rewards must never block saving a lesson. */}
      return {earned, stars:d.best[id]};
    },
    reset() { window.TALA_NAV?.clearCelebrations();if(window.TALA_CLASSROOM?.configured()){window.TALA_CLASSROOM.resetActive();return read();}localStorage.removeItem(KEY); return fresh(); }
  };
})();
