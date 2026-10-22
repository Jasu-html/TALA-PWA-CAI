(function(){
  window.TALA_FILES={async open(){const plugin=window.Capacitor?.Plugins?.TalaClassroomFiles;if(!plugin?.open)throw Error('Hindi available ang native import.');return (await plugin.open()).data;},async save(data,filename,type){
    if(new Blob([data]).size>5000000)throw Error('Masyadong malaki ang export (max 5 MB).');
    if(window.Capacitor?.isNativePlatform?.()){
      const plugin=window.Capacitor.Plugins?.TalaClassroomFiles;
      if(!plugin?.save)throw Error('Hindi available ang native file export sa build na ito.');
      await plugin.save({data,filename,mime:type.split(';')[0]});return;
    }
    const url=URL.createObjectURL(new Blob([data],{type})),link=document.createElement('a');link.href=url;link.download=filename;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }};
})();
