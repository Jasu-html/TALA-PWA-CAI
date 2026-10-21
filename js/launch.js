// Small independent boot controller: never hides a failed app behind an endless spinner.
(function(){
  const splash=document.querySelector('#launch-splash'),status=document.querySelector('#launch-status');
  if(!splash)return;
  const began=Date.now();let ready=false,finished=false,bootFailed=false;
  const retry=document.querySelector('#launch-retry');
  retry?.addEventListener('click',()=>location.reload());
  function failed(){
    if(finished||ready)return;
    bootFailed=true;
    splash.classList.add('launch-failed');
    if(status)status.textContent='Hindi pa mabuksan ang TALA. Subukang muli. Sa unang web load, kailangan ng internet.';
    if(retry)retry.hidden=false;
  }
  const timeout=setTimeout(failed,12000);
  window.addEventListener('error',failed);
  window.TALA_LAUNCH={fail:failed,ready(){
    if(ready||bootFailed)return;ready=true;clearTimeout(timeout);
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const min=reduced?80:850;
    const fonts=document.fonts?.ready||Promise.resolve();
    const hero=new Image();hero.src='assets/characters/Tala-Happy.png';
    // Font/image loading may fail offline; neither is allowed to trap the learner.
    const warm=Promise.allSettled([fonts,hero.decode?.()||Promise.resolve()]);
    Promise.race([warm,new Promise(resolve=>setTimeout(resolve,1800))]).then(()=>{
      setTimeout(()=>{
        finished=true;splash.classList.add('launch-done');splash.setAttribute('aria-hidden','true');
        window.removeEventListener('error',failed);
        setTimeout(()=>{splash.remove();if(document.activeElement===document.body)document.querySelector('[data-action="start-game"]')?.focus({preventScroll:true});},reduced?0:320);
      },Math.max(0,min-(Date.now()-began)));
    });
  }};
})();
