const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
test('Teacher routes never resolve to learner games and role exit locks authority',()=>{
 let unlocked=true,locks=0;const ctx={document:{body:{dataset:{}}},TALA_CLASSROOM:{isUnlocked:()=>unlocked,lock(){unlocked=false;locks++;}},TALA_PUBLIC:{lockAdult(){}},TALA_BUILDER:{isPreview:()=>false}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/roles.js','utf8'),ctx);const role=ctx.TALA_ROLES;
 assert.equal(role.resolve('classroom'),'classroom');assert.equal(role.isTeacher(),true);
 for(const screen of ['home','map','lesson','practice','complete','tasks','achievements','settings','customPlay'])assert.equal(role.resolve(screen),'classroom');
 role.resolve('start');assert.equal(locks,1);assert.equal(role.isTeacher(),false);role.student();assert.equal(role.resolve('home'),'home');assert.equal(ctx.document.body.dataset.role,'student');
 assert.equal(role.resolve('teacherSettings'),'classroom');
});
