(function () {
  const KEY = 'tala-pwa-progress-v1';
  const fresh = () => ({ curriculumVersion:2, learner:'Munting Tala', stars:0, completed:[], attempts:{}, best:{}, results:{}, lastVisit:null });
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY)) || {};
      const d = { ...fresh(), ...raw };
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
    } catch { return fresh(); }
  }
  function save(d) {
    d.lastVisit = new Date().toISOString();
    try { localStorage.setItem(KEY, JSON.stringify(d)); }
    catch { window.TALA_UI?.toast('Hindi mai-save ang progreso sa browser na ito.'); }
    return d;
  }
  window.TALA_STORE = {
    get:read,
    setLearner(name) { const d=read(); d.learner=name.trim() || 'Munting Tala'; return save(d); },
    complete(id, stars, results = []) {
      const d=read(), previous=d.best[id] || (d.completed.includes(id) ? 5 : 0);
      const earned=Math.max(0, stars-previous);
      if (!d.completed.includes(id)) d.completed.push(id);
      d.best[id]=Math.max(previous,stars); d.stars+=earned;
      d.results[id]=results;
      d.attempts[id]=(d.attempts[id] || 0)+1; save(d);
      return {earned, stars:d.best[id]};
    },
    reset() { localStorage.removeItem(KEY); return fresh(); }
  };
})();
