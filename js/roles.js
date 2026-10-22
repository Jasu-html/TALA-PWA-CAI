// Explicit UI contexts. Teacher PIN remains the authority for classroom writes.
(function(){
  let mode='choice',api;
  const teacherScreens=new Set(['classroom','builder','teacherSettings']);
  const gameScreens=new Set(['home','map','lesson','practice','complete','intro','questStory','welcome','tasks','achievements','settings']);
  function student(){mode='student';window.TALA_CLASSROOM?.lock();window.TALA_PUBLIC?.lockAdult();}
  function resolve(screen){
    if(screen==='start'){if(mode==='teacher'){window.TALA_CLASSROOM?.lock();window.TALA_PUBLIC?.lockAdult();}mode='choice';}
    if(teacherScreens.has(screen))mode='teacher';
    if(mode==='teacher'&&(gameScreens.has(screen)||(screen==='customPlay'&&!window.TALA_BUILDER?.isPreview())))return 'classroom';
    if(screen==='teacherSettings'&&!window.TALA_CLASSROOM?.isUnlocked())return 'classroom';
    document.body.dataset.role=mode;return screen;
  }
  function settings(){
    if(!window.TALA_CLASSROOM?.isUnlocked())return '<p>I-unlock ang Teacher Mode.</p>';
    return `<article class="teacher-panel teacher-settings"><p class="eyebrow">TEACHER SETTINGS</p><h1>Device at classroom settings</h1>${window.TALA_NAV.screens.settings()}<section><h2>Classroom files</h2><p>May learner records ang classroom backups. Hiwalay ang lesson packages na may recordings.</p><button class="secondary-button" data-action="teacher-backup">Download classroom backup</button><button class="secondary-button" data-action="teacher-csv">Export answer records (CSV)</button></section><section><h2>Session</h2><button class="primary-button" data-action="role-logout">Log out of Teacher Mode</button></section></article>`;
  }
  function summary(){
    if(!window.TALA_CLASSROOM?.isUnlocked())return '';
    const d=TALA_CLASSROOM.overview(),active=d.students.filter(s=>!s.archived),complete=active.reduce((n,s)=>n+s.progress.completed.length,0),custom=active.reduce((n,s)=>n+(s.customResults||[]).length,0);
    return `<div class="teacher-summary"><div><strong>${active.length}</strong><span>Active students</span></div><div><strong>${complete}</strong><span>Built-in levels completed</span></div><div><strong>${custom}</strong><span>Custom attempts completed</span></div></div>`;
  }
  window.TALA_ROLES={init(value){api=value;},student,resolve,summary,isTeacher:()=>mode==='teacher',screens:{teacherSettings:settings},
    handle(button){const a=button.dataset.action;if(a==='role-logout'){window.TALA_CLASSROOM?.lock();window.TALA_PUBLIC?.lockAdult();api.go('start');return true;}
      if(a==='role-dashboard'){api.go('classroom');return true;}
      if(a==='role-activities'){if(window.TALA_CLASSROOM?.isUnlocked())window.TALA_BUILDER.handle({dataset:{action:'builder-open'}});else api.go('classroom');return true;}
      if(a==='role-settings'){api.go('teacherSettings');return true;}return false;}
  };
})();
