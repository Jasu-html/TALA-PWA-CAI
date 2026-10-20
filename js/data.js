// Filipino-only curriculum. No audio is generated; see assets/audio/fil/RECORDINGS.md.
(function () {
  const q = (prompt, visual, choices, correct, hint) => ({ prompt, visual, choices, answer:choices.indexOf(correct), hint });
  // Rotate options so the correct answer is not always in the same position.
  function stage(title, lesson, visual, picture, questions, extra = {}) {
    questions = questions.map((item, i) => {
      const correct = item.choices[item.answer], offset = i % item.choices.length;
      const choices = item.choices.slice(offset).concat(item.choices.slice(0, offset));
      return { ...item, visual:item.visual.replace(/\\n/g, String.fromCharCode(10)), choices, answer:choices.indexOf(correct) };
    });
    return { title, lesson, visual, picture, questions, ...extra };
  }
  const letters = [
    ['A','araw','☀️'],['B','bola','⚽'],['C','carrot','🥕'],['D','dahon','🍃'],
    ['E','elepante','🐘'],['F','folder','📁'],['G','gatas','🥛'],['H','halaman','🪴'],
    ['I','isda','🐟'],['J','jeep','🚙'],['K','kamay','✋'],['L','lapis','✏️'],
    ['M','mangga','🥭'],['N','niyog','🥥'],['O','orasan','🕒'],['P','pusa','🐱'],
    ['Q','quilt','🧵'],['R','rosas','🌹'],['S','saging','🍌'],['T','tasa','☕'],
    ['U','ulan','🌧️'],['V','vase','🏺'],['W','walis','🧹'],['X','x-ray','🩻'],
    ['Y','yoyo','🪀'],['Z','zebra','🦓']
  ];
  const borrowed = {
    C:'Ang carrot ay karot sa Filipino.',
    F:'Ang folder ay lalagyan ng mga papel.',
    J:'Ang jeep ay sasakyang pampasahero.',
    Q:'Ang quilt ay isang kumot na pinagtagpi-tagpi.',
    V:'Ang vase ay plorera sa Filipino.',
    X:'Ang x-ray ay larawang nagpapakita ng loob ng katawan.',
    Z:'Ang zebra ay hayop na may guhit na itim at puti.'
  };
  const phonics = letters.map(([letter, word, icon], i) => {
    const other = letters[(i + 5) % 26], third = letters[(i + 11) % 26];
    return stage('Ang titik ' + letter,
      'Ito ang malaking ' + letter + ' at maliit na ' + letter.toLowerCase() + '. Nagsisimula sa ' + letter + ' ang ' + word + '. ' + (borrowed[letter] || ''),
      letter + ' ' + letter.toLowerCase(), icon, [
        q('Alin ang nagsisimula sa ' + letter + '?', letter, [icon+' '+word,other[2]+' '+other[1],third[2]+' '+third[1]],icon+' '+word,'Hanapin ang '+word+'.'),
        q('Alin ang malaking titik ' + letter + '?', icon+' '+word,[letter,other[0],third[0]],letter,'Tingnan ang unang titik ng '+word+'.'),
        q('Alin ang maliit na titik ' + letter + '?',letter,[letter.toLowerCase(),other[0].toLowerCase(),third[0].toLowerCase()],letter.toLowerCase(),'Magkapareha ang '+letter+' at '+letter.toLowerCase()+'.'),
        q('Ano ang unang titik ng '+word+'?',icon+' '+word,[letter,third[0],other[0]],letter,'Ulitin ang pangalan ng larawan: '+word+'.'),
        q('Aling pares ng titik ang magkapareha?',icon,[letter+' '+letter.toLowerCase(),letter+' '+other[0].toLowerCase(),other[0]+' '+letter.toLowerCase()],letter+' '+letter.toLowerCase(),'Piliin ang malaki at maliit na anyo ng iisang titik.')
      ]);
  });
  [
    ['bata','ba','ta','🧒','b','t'],['pusa','pu','sa','🐱','p','s'],
    ['saging','sa','ging','🍌','s','g'],['bahay','ba','hay','🏠','b','h']
  ].forEach(([word,a,b,icon,first,other]) => phonics.push(stage('Buuin ang '+word,
    'Pagsamahin ang mga pantig: '+a+' at '+b+'. '+a+'-'+b+' — '+word+'!',a+' + '+b,icon,[
      q('Anong salita ang mabubuo?',a+' + '+b,[word,'mesa','lobo'],word,'Pagsamahin ang dalawang pantig.'),
      q('Ano ang unang pantig ng '+word+'?',icon+' '+word,[a,b,'mi'],a,'Simulan sa '+a+'.'),
      q('Ano ang huling pantig ng '+word+'?',icon+' '+word,[b,a,'ko'],b,'Ang huling bahagi ay '+b+'.'),
      q('Ano ang unang titik ng '+word+'?',icon+' '+word,[first,other,'e'],first,'Tingnan ang simula ng salita.'),
      q('Alin ang salitang nasa larawan?',icon,[word,'mesa','lobo'],word,'Ito ay '+word+'.')
    ])));
  [['ako','ikaw','👧'],['si','ang','📖']].forEach(([a,b,icon])=>phonics.push(stage('Basahin: '+a+' at '+b,
    a==='ako'?'Ang ako ay tumutukoy sa sarili. Ang ikaw ay tumutukoy sa kausap.':'Ginagamit ang si bago ang pangalan ng tao. Ginagamit ang ang bago ang pangngalan.',
    a+' · '+b,icon,a==='ako'?[
      q('Piliin ang salitang ako.','ako',['ako','ikaw','si'],'ako','Tingnan ang mga titik a-k-o.'),
      q('Piliin ang salitang ikaw.','ikaw',['ikaw','ako','ang'],'ikaw','Nagsisimula ito sa i.'),
      q('Ano ang tumutukoy sa sarili?','👧',['ako','ikaw','si'],'ako','Kapag itinuturo mo ang iyong sarili.'),
      q('Ano ang tumutukoy sa kausap?','👧 💬 🧒',['ikaw','ako','ang'],'ikaw','Ito ang salitang ginagamit para sa taong kausap mo.'),
      q('Buuin: ___ ay bata. (Tinutukoy ang sarili.)','👧',['Ako','Si','Ang'],'Ako','Magsimula sa Ako.')
    ]:[
      q('Piliin ang salitang si.','si',['si','ang','ako'],'si','May dalawang titik: s-i.'),
      q('Piliin ang salitang ang.','ang',['ang','si','ikaw'],'ang','Tingnan ang pagkakasulat ng salitang ang.'),
      q('Buuin: ___ Ana ay mabait.','👧 Ana',['Si','Ang','Ako'],'Si','Ginagamit ito bago ang pangalan ng tao.'),
      q('Buuin: ___ bola ay bilog.','⚽',['Ang','Si','Ikaw'],'Ang','Ginagamit ito bago ang pangngalang bola.'),
      q('Buuin: ___ Ben ay bata.','🧒 Ben',['Si','Ang','Ako'],'Si','Ben ang pangalan ng tao.')
    ])));
  phonics.push(stage('Balik-tanaw sa mga titik','Balikan ang mga titik at mga salitang natutuhan natin. Kaya mo ito!','A → Z','📚',
    [0,5,12,20,25].map(i=>phonics[i].questions[0])));

  const names=['sero','isa','dalawa','tatlo','apat','lima','anim','pito','walo','siyam','sampu'];
  const objects = n => Array(n).fill('⭐').join(' ');
  const options = n => [String(n),String(n===10?8:n+1),String(n===0?2:n-1)];
  const countQ = (n, icon='⭐') => q('Ilan ang nasa larawan?',Array(n).fill(icon).join(' '),options(n),String(n),'Ituro ang bawat larawan habang nagbibilang.');
  const numbers = Array.from({length:5},(_,i)=>{
    const a=i*2+1,b=a+1;
    return stage('Mga bilang '+a+' at '+b,'Ito ang '+names[a]+' ('+a+') at '+names[b]+' ('+b+'). Bilangin ang bawat bituin.',a+' · '+b,'⭐',[
      countQ(a),countQ(b,'🍎'),
      q('Alin ang bilang na '+names[a]+'?',names[a],options(a),String(a),'Hanapin ang numerong '+a+'.'),
      q('Alin ang bilang na '+names[b]+'?',names[b],options(b),String(b),'Hanapin ang numerong '+b+'.'),
      countQ(b,'🌼')
    ]);
  });
  [3,5,10].forEach((n,i)=>numbers.push(stage('Bilangin ang mga '+['bituin','prutas','bulaklak'][i],
    'Bilangin nang isa-isa. Ang huling bilang ang nagsasabi kung ilan ang lahat.',String(n),'🧺',
    [n,Math.max(1,n-1),Math.max(1,n-2),Math.min(10,n+1),n].map((x,j)=>countQ(x,['⭐','🍎','🌼','🐟','🥭'][j])))));
  [[1,2,3,4,5],[6,7,8,9,10]].forEach(seq=>numbers.push(stage('Ayusin ang mga bilang '+seq[0]+'–'+seq[4],
    'Sundin ang tamang pagkakasunod ng mga bilang: '+seq.join(', ')+'.',seq.join(' '),'🔢',
    seq.map((n,j)=>q('Anong bilang ang nawawala?',seq.map((x,k)=>j===k?'?':x).join(' → '),options(n),String(n),'Bilangin mula '+seq[0]+' hanggang '+seq[4]+'.')))));
  ['Mas marami','Mas kaunti'].forEach((title,i)=>numbers.push(stage(title,
    i?'Mas kaunti ang pangkat na may mas maliit na bilang.':'Mas marami ang pangkat na may mas malaking bilang.','🍎 🍎   |   🍎 🍎 🍎','🧺',
    [[2,4],[5,3],[6,8],[4,1],[7,10]].map(([a,b])=>q('Aling pangkat ang '+title.toLowerCase()+'?','A: '+objects(a)+'\\nB: '+objects(b),['Pangkat A','Pangkat B'],(i?a<b:a>b)?'Pangkat A':'Pangkat B','Bilangin ang laman ng bawat pangkat.')))));
  numbers.push(stage('Dagdag na bilang','Kapag nagdagdag, dumarami ang mga bagay. Dalawa dagdag isa ay tatlo.','2 + 1','🎈',
    [[2,1],[1,3],[3,2],[4,2],[5,3]].map(([a,b])=>q('Ilan ang lahat?',a+' + '+b+' = ?',options(a+b),String(a+b),'Magsimula sa '+a+' at magdagdag ng '+b+'.'))));
  numbers.push(stage('Pagbabawas','Kapag may inalis, kumakaunti ang mga bagay. Lima bawas dalawa ay tatlo.','5 − 2','🍎',
    [[5,2],[4,1],[6,2],[8,3],[10,1]].map(([a,b])=>q('Ilan ang natira?',a+' − '+b+' = ?',options(a-b),String(a-b),'Mula sa '+a+', mag-alis ng '+b+'.'))));
  numbers.push(stage('Saya sa mga bilang','Balikan ang pagbibilang, pagdaragdag, at pagbabawas.','1 → 10','🏅',
    [countQ(7),countQ(9,'🍎'),q('Ano ang kasunod ng 5?','4 → 5 → ?',['6','3','7'],'6','Magbilang pasulong.'),
      q('Ilan ang lahat?','3 + 3 = ?',['6','5','7'],'6','Pagsamahin ang dalawang pangkat ng tatlo.'),
      q('Ilan ang natira?','7 − 2 = ?',['5','4','6'],'5','Mag-alis ng dalawa mula sa pito.')]));

  const shapes=[
    ['bilog','●','⚽','Walang sulok ang bilog.'],['parisukat','■','🎁','May apat na magkakapantay na gilid ang parisukat.'],
    ['tatsulok','▲','🔺','May tatlong gilid at tatlong sulok ang tatsulok.'],['parihaba','▬','🚪','May apat na sulok ang parihaba. Magkasinghaba ang magkaharap na gilid nito.'],
    ['bituin','★','⭐','May matutulis na dulo ang hugis bituin.'],['puso','♥','💝','Ang hugis puso ay may dalawang umbok sa itaas at tulis sa ibaba.']
  ];
  const shapeChoice = s => s[1]+' '+s[0];
  const arts = shapes.map((s,i)=>{
    const a=shapes[(i+1)%6],b=shapes[(i+3)%6],choices=[shapeChoice(s),shapeChoice(a),shapeChoice(b)];
    return stage('Hugis '+s[0],s[3],s[1],s[2],[
      q('Alin ang '+s[0]+'?',s[1],choices,shapeChoice(s),'Tingnan ang hugis sa itaas.'),
      q('Ano ang pangalan ng hugis?',s[1],[s[0],a[0],b[0]],s[0],s[3]),
      q('Alin ang kaparehong hugis?',s[1],[s[1],a[1],b[1]],s[1],'Pagtapatin sa isip ang mga gilid at sulok.'),
      q('Alin ang hugis na natutuhan natin?',s[2],choices,shapeChoice(s),s[3]),
      q('Piliin muli ang '+s[0]+'.',s[1],[shapeChoice(b),shapeChoice(s),shapeChoice(a)],shapeChoice(s),s[3])
    ]);
  });
  const colors=[['pula','🔴'],['asul','🔵'],['dilaw','🟡'],['berde','🟢'],['kahel','🟠'],['lila','🟣'],['rosas','🩷'],['kayumanggi','🟤']];
  const colorChoice = c => c[1]+' '+c[0];
  for(let i=0;i<8;i+=2){
    const a=colors[i],b=colors[i+1],c=colors[(i+2)%8];
    arts.push(stage('Kulay '+a[0]+' at '+b[0],'Kilalanin ang '+a[0]+' at '+b[0]+'. Tingnan at ihambing ang dalawang kulay.',a[1]+' '+b[1],'🎨',
      [a,b,a,b,a].map((target,j)=>q(j%2?'Ano ang pangalan ng kulay?':'Alin ang kulay '+target[0]+'?',target[1],[colorChoice(a),colorChoice(b),colorChoice(c)],colorChoice(target),'Tingnan ang bilog na '+target[0]+'.'))));
  }
  [
    ['berde','🔵 + 🟡', 'asul at dilaw','lila','kahel'],
    ['kahel at lila','🔴 + 🟡   ·   🔴 + 🔵','pula at dilaw','berde','rosas']
  ].forEach((entry,i)=>{
    const prompts=i?[
      q('Ano ang mabubuong kulay?','🔴 + 🟡',['🟠 Kahel','🟢 Berde','🟣 Lila'],'🟠 Kahel','Pula at dilaw ay kahel.'),
      q('Ano ang mabubuong kulay?','🔴 + 🔵',['🟣 Lila','🟠 Kahel','🟢 Berde'],'🟣 Lila','Pula at asul ay lila.'),
      q('Ano ang ihahalo sa pula para maging kahel?','🔴 + ? = 🟠',['🟡 Dilaw','🔵 Asul','🟢 Berde'],'🟡 Dilaw','Pula at dilaw ay kahel.'),
      q('Ano ang ihahalo sa asul para maging lila?','🔵 + ? = 🟣',['🔴 Pula','🟡 Dilaw','🟢 Berde'],'🔴 Pula','Pula at asul ay lila.'),
      q('Piliin ang lila.','🟣',['🟣 Lila','🟠 Kahel','🟢 Berde'],'🟣 Lila','Ito ang kulay mula sa pula at asul.')
    ]:[
      q('Ano ang mabubuong kulay?','🔵 + 🟡',['🟢 Berde','🟠 Kahel','🟣 Lila'],'🟢 Berde','Asul at dilaw ay berde.'),
      q('Ano ang ihahalo sa asul para maging berde?','🔵 + ? = 🟢',['🟡 Dilaw','🔴 Pula','🟣 Lila'],'🟡 Dilaw','Asul at dilaw ay berde.'),
      q('Ano ang ihahalo sa dilaw para maging berde?','🟡 + ? = 🟢',['🔵 Asul','🔴 Pula','🟠 Kahel'],'🔵 Asul','Dilaw at asul ay berde.'),
      q('Alin ang berde?','🟢',['🟢 Berde','🔵 Asul','🟡 Dilaw'],'🟢 Berde','Ito ang kulay ng maraming dahon.'),
      q('Aling dalawang kulay ang bubuo ng berde?','🟢',['Asul at dilaw','Pula at asul','Pula at dilaw'],'Asul at dilaw','Balikan ang dalawang kulay sa aralin.')
    ];
    arts.push(stage('Paghaluin: '+entry[0],i?'Pula at dilaw ay kahel. Pula at asul ay lila.':'Asul at dilaw ay berde. Subukang alalahanin ang dalawang kulay.',entry[1],'🖌️',prompts));
  });
  arts.push(stage('Mga padron sa banig','Ang padron ay ayos na paulit-ulit. Sa banig, maaaring magpalitan ang mga kulay o hugis.','🔴 🔵 🔴 🔵','🧺',[
    q('Ano ang kasunod?','🔴 🔵 🔴 🔵 ?',['🔴 Pula','🔵 Asul','🟡 Dilaw'],'🔴 Pula','Salit-salitan ang pula at asul.'),
    q('Ano ang kasunod?','▲ ■ ▲ ■ ?',['▲ Tatsulok','■ Parisukat','● Bilog'],'▲ Tatsulok','Salit-salitan ang tatsulok at parisukat.'),
    q('Ano ang kasunod?','🟡 🟢 🟡 🟢 ?',['🟡 Dilaw','🟢 Berde','🔴 Pula'],'🟡 Dilaw','Bumalik sa unang kulay.'),
    q('Ano ang kasunod?','★ ♥ ★ ♥ ?',['★ Bituin','♥ Puso','■ Parisukat'],'★ Bituin','Salit-salitan ang bituin at puso.'),
    q('Ano ang kasunod?','● ● ▲ ● ● ?',['▲ Tatsulok','● Bilog','■ Parisukat'],'▲ Tatsulok','Dalawang bilog, saka isang tatsulok.')
  ]));
  arts.push(stage('Balik-kulay at hugis','Balikan ang mga hugis, kulay, at padron!','● ▲ ■','🌈',
    [arts[0].questions[0],arts[2].questions[1],arts[7].questions[0],arts[10].questions[0],arts[12].questions[4]]));
  arts.push(stage('Aking munting obra','Gamitin ang mga kulay upang gumuhit. Walang maling guhit! Kapag tapos na, pindutin ang Tapos na ang obra ko.','🎨','🖌️',[],{type:'paint'}));

  const scenarios = [
    ['Paggalang sa nakatatanda','Bumisita si Ana kay Lola. Binati niya ito at magalang na nagtanong kung maaari siyang magmano. Natuwa si Lola sa magalang na pagbati.','👧 👵',[
      ['Paano babatiin si Lola?','Magandang umaga po!','Hoy!','Huwag pansinin'],
      ['Ano ang maaari mong itanong?','Maaari po bang magmano?','Bigyan mo ako!','Umalis ka!'],
      ['Paano makikipag-usap sa nakatatanda?','Magalang','Pasigaw','Pabalang'],
      ['May bisitang nakatatanda. Ano ang gagawin?','Batiin siya','Talikuran siya','Sigawan siya'],
      ['Ano ang ipinakita ni Ana?','Paggalang','Pag-aaway','Panunukso']
    ]],
    ['Po at opo','Tinanong si Ben kung nais niyang kumain. Sumagot siya ng Opo, salamat po. Magalang siyang sumagot sa kanyang tiyahin.','🧒 💬',[
      ['Paano magalang na sasagot ng oo?','Opo','Hoy','Ay'],
      ['Buuin: Salamat ___.','po','hoy','ay'],
      ['Tinawag ka ng iyong lolo. Ano ang sagot?','Bakit po?','Ano?!','Huwag!'],
      ['Paano hihingi ng tubig?','Pahingi po ng tubig.','Tubig! Bilis!','Akin iyan!'],
      ['Ano ang ipinapakita ng po at opo?','Paggalang','Pang-aasar','Galit']
    ]],
    ['Mga mahiwagang salita','Nanghiram si Mia ng lapis. Nagsabi siya ng Pakiusap, maaari bang humiram? Pagkatapos, nagsabi siya ng Salamat. Nang mabangga ang kaibigan, sinabi niyang Pasensya na.','✏️ 💛',[
      ['Ano ang sasabihin kapag tinulungan?','Salamat!','Ayoko!','Bilisan mo!'],
      ['Ano ang sasabihin kapag nakasakit?','Pasensya na.','Kasalanan mo!','Wala akong pakialam.'],
      ['Paano magalang na hihiram?','Pakiusap, maaari bang humiram?','Akin na iyan!','Kukunin ko na.'],
      ['Ano ang sasabihin matapos humiram?','Salamat sa pagpapahiram.','Akin na ito.','Hindi ko ibabalik.'],
      ['Paano magalang na dadaan?','Makikiraan po.','Tabi!','Itutulak kita.']
    ]],
    ['Bahaginan at bayanihan','May mga krayola si Leo. Walang dalang krayola ang kaibigan niya kaya nagbahagi siya. Pagkatapos gumuhit, nagtulungan silang magligpit.','🖍️ 🤝',[
      ['Walang krayola ang kaibigan. Ano ang maaari mong gawin?','Magpahiram','Manukso','Itago lahat'],
      ['Maraming kailangang ligpitin. Ano ang gagawin?','Tumulong','Umalis agad','Magkalat pa'],
      ['Paano magpahiram?','Iabot nang maingat','Ihagis','Sirain muna'],
      ['Kapag may humiram, ano ang mabuting paalala?','Ingatan at ibalik.','Huwag mong ibalik.','Itapon mo.'],
      ['Ano ang bayanihan?','Pagtutulungan','Pag-aaway','Panunukso']
    ]],
    ['Malinis na kamay','Bago kumain, naghugas ng kamay si Liza gamit ang sabon at tubig. Hinugasan niya ang palad, likod ng kamay, at pagitan ng mga daliri. Nagbanlaw siya at nagpatuyo.','🧼 👐',[
      ['Ano ang gagawin bago kumain?','Maghugas ng kamay','Maglaro sa putik','Punasan sa damit'],
      ['Ano ang kasama ng tubig sa paghuhugas?','Sabon','Buhangin','Pandikit'],
      ['Aling bahagi ang lilinisin?','Pati pagitan ng daliri','Palad lang','Isang daliri lang'],
      ['Ano ang gagawin pagkatapos magsabon?','Magbanlaw','Humawak ng basura','Kumain agad'],
      ['Paano patutuyuin ang malinis na kamay?','Malinis na tuwalya','Maruming damit','Sahig']
    ]],
    ['Iligpit ang mga laruan','Masayang naglaro sina Ana at Ben. Pagkatapos, ibinalik nila ang mga laruan sa kahon. Naging maayos at ligtas ang daanan.','🧸 🧺',[
      ['Ano ang gagawin pagkatapos maglaro?','Iligpit ang laruan','Iwan sa sahig','Itago sa ilalim ng kama'],
      ['Saan ilalagay ang laruan?','Sa tamang lalagyan','Sa hagdan','Sa daanan'],
      ['May laruan sa daanan. Ano ang gagawin?','Iligpit nang maingat','Sipain','Dagdagan pa'],
      ['Bakit mahalagang magligpit?','Upang maayos at ligtas','Upang makalat','Upang may matisod'],
      ['May kaibigang nagliligpit. Ano ang gagawin?','Tumulong','Manood lang palagi','Ikalat ulit']
    ]],
    ['Sa loob ng klase','Nakikinig si Ana habang nagsasalita ang guro. Kapag nais niyang sumagot, nagtataas siya ng kamay at naghihintay ng pagkakataon.','👩‍🏫 👂',[
      ['Ano ang gagawin habang nagsasalita ang guro?','Makinig','Sumigaw','Tumakbo'],
      ['Paano hihingi ng pagkakataong sumagot?','Itaas ang kamay','Sumabat','Tumayo sa mesa'],
      ['May kaklaseng nagsasalita. Ano ang gagawin?','Hintaying matapos','Tawanan','Sigawan'],
      ['May pila sa labas. Ano ang gagawin?','Hintayin ang turno','Sumingit','Manulak'],
      ['Nagkamali ang kaklase. Ano ang mabuting gawin?','Hikayatin siyang sumubok','Pagtawanan','Asarin']
    ]],
    ['Sa ating tahanan','Nakita ni Ben ang nabasag niyang tasa. Sinabi niya ang totoo sa nakatatanda at humingi ng tulong. Hindi niya hinawakan ang matutulis na bubog.','🏠 💛',[
      ['May nasira kang gamit. Ano ang gagawin?','Sabihin ang totoo','Magsinungaling','Isisi sa iba'],
      ['May bubog sa sahig. Ano ang gagawin?','Humingi ng tulong sa nakatatanda','Pulutin gamit ang kamay','Tapakan'],
      ['May gawaing kaya mong gawin. Ano ang maaari mong gawin?','Tumulong','Magkalat','Manigaw'],
      ['May nagpapahinga. Paano kikilos?','Mahinahon','Maingay','Pasigaw'],
      ['May nakitang gamit na hindi sa iyo. Ano ang gagawin?','Ibalik sa may-ari','Itago','Sirain']
    ]],
    ['Sa ating pamayanan','Namasyal si Mia kasama ang nakatatanda. Itinapon niya ang balot sa basurahan. Nang makakita ng ligaw na hayop, hindi niya ito nilapitan at humingi siya ng tulong sa nakatatanda.','🌳 🏘️',[
      ['Saan itatapon ang balot?','Sa basurahan','Sa ilog','Sa kalsada'],
      ['May di-kilalang hayop. Ano ang ligtas gawin?','Lumayo at magsabi sa nakatatanda','Hilain ang buntot','Habulin'],
      ['May bulaklak sa pampublikong hardin. Ano ang gagawin?','Alagaan at huwag pitasin','Bunutin','Tapakan'],
      ['Tatawid ka ng kalsada. Ano ang gagawin?','Magpatulong sa kasama mong nakatatanda','Tumakbo mag-isa','Maglaro sa gitna'],
      ['May matandang may dalang mabigat. Ano ang maaari mong gawin?','Magtanong nang magalang kung kailangan ng tulong','Pagtawanan','Harangan']
    ]]
  ];
  const values=scenarios.map(([title,lesson,visual,items])=>stage(title,lesson,visual,'💛',
    items.map(([prompt,correct,a,b])=>q(prompt,visual,[correct,a,b],correct,'Alalahanin ang mabuting gawi: '+correct+'.'))));
  values.push(stage('Bituin ng kabutihan','Dalhin ang kabutihan sa klase, tahanan, at pamayanan.','💛 🤝','⭐',
    [values[0].questions[0],values[2].questions[0],values[3].questions[1],values[6].questions[3],values[8].questions[0]]));
  window.TALA_DATA={version:2,modules:[
    {id:'phonics',icon:'🔤',guide:'Titik',world:'Gubat ng mga Titik',title:'Titik at Tunog',color:'purple',levels:phonics},
    {id:'numbers',icon:'🔢',guide:'Bilang',world:'Pulo ng mga Bilang',title:'Pagbibilang',color:'blue',levels:numbers},
    {id:'arts',icon:'🎨',guide:'Likha',world:'Hardin ng mga Kulay',title:'Hugis at Kulay',color:'coral',levels:arts},
    {id:'values',icon:'💛',guide:'Tala',world:'Burol ng Kabutihan',title:'Mabuting Gawi',color:'gold',levels:values}
  ]};
})();
