// Adapt Android's speech service to the same interface as browser voice naming.
(function () {
  const capacitor=window.Capacitor;
  if(!capacitor?.isNativePlatform?.())return;
  // Buildless pages use the plugin proxy injected by Android; bundled apps can
  // alternatively provide registerPlugin from the Capacitor frontend runtime.
  const speech=capacitor.Plugins?.TalaVoiceInput||capacitor.registerPlugin?.('TalaVoiceInput');
  if(!speech)return;
  let sequence=0;
  class NativeRecognition {
    constructor(){this.active=false;this.sessionId=Date.now()+'-'+(++sequence);this.listener=null;}
    start(){
      if(this.active)throw new Error('Already listening');
      this.active=true;
      this.run();
    }
    async run(){
      try{
        const listener=await speech.addListener('listening',event=>{
          if(this.active&&event.sessionId===this.sessionId)this.onstart?.();
        });
        if(!this.active){await listener.remove();return;}
        this.listener=listener;
        const result=await speech.start({sessionId:this.sessionId,language:'fil-PH'});
        if(this.active)this.onresult?.({results:[[{transcript:result.transcript||''}]]});
      }catch(error){if(this.active)this.onerror?.({error:error.code||'service-not-allowed'});}
      finally{this.active=false;this.removeListener();this.onend?.();}
    }
    removeListener(){const listener=this.listener;this.listener=null;if(listener)Promise.resolve(listener.remove()).catch(()=>{});}
    abort(){
      const active=this.active;this.active=false;this.removeListener();
      if(active)Promise.resolve(speech.cancel({sessionId:this.sessionId})).catch(()=>{});
    }
  }
  window.TALA_NATIVE={Recognition:NativeRecognition};
})();
