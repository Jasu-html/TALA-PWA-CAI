(function(){
  const version='2026-10-21.2';
  const contacts=['j.alarcio@olivarezcollege.edu.ph','kylestephen.verdan@olivarezcollege.edu.ph'];
  window.TALA_LEGAL={
    version,appVersion:'1.0.14',operator:'Olivarez College - IT Students',contacts,
    // Do not switch this to a public release until docs/PUBLIC_RELEASE_CHECKLIST.md is cleared.
    releaseStatus:'review',postalAddress:'',
    thirdPartyLicense:`Capacitor Core / Android 8.5.3
MIT License

Copyright (c) 2017-present Drifty Co.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    documents:{
      terms:{title:'Terms of Use',intro:'Para ito sa magulang o legal guardian. Test version pa ang app at ongoing ang legal review. Hindi garantiya ng legal compliance ang document na ito.',sections:[
        ['1. Ano ang TALA?','Ang TALA ay learning app sa Filipino para sa Grade 1, na ginawa ng Olivarez College - IT Students. Supplement ito sa pag-aaral ng bata. Hindi ibig sabihin ng project name na officially endorsed ito ng college, DepEd, o ibang ahensiya. Para sa support, privacy questions, o bugs, puwedeng mag-email sa contacts sa ibaba.'],
        ['2. Sino ang dapat magbigay ng consent?','Magulang o legal guardian ang dapat magbasa at pumayag sa terms. Hiwalay ang consent para sa paggamit ng data ng bata. Ang math question bago ang parent screens ay simpleng check lang: hindi nito nabe-verify ang identity o pagiging legal guardian. Kung school ang gagamit, responsibilidad din nitong i-check ang authority nito, privacy notices, at iba pang legal requirements.'],
        ['3. Para saan ang app?','Puwedeng gamitin ang TALA sa pag-aaral ng bata, kasama ang gabay ng magulang o guro. Hindi ito official exam, certification, o kapalit ng guro. Ang stars ay feedback sa laro, hindi official school grades. Walang garantisadong learning result. Gumamit ng komportableng volume at mag-break kapag pagod na ang bata.'],
        ['4. Content, copyright, at licenses','Ang artwork, recordings, code, at ibang content ay pag-aari pa rin ng kani-kanilang owners. Hindi naililipat sa user ang copyright dahil ginagamit niya ang app. Huwag ibenta o i-redistribute ang content nang walang tamang permission, maliban sa paggamit na pinapayagan ng batas. May sarili ring licenses ang third-party software at content. Bago ang public release, kailangang ma-confirm ng team ang rights sa images, voices, music, at iba pang materials.'],
        ['5. Safe at maayos na paggamit','Nickname o palayaw lang ang ilagay. Huwag gumamit ng full name, address, phone number, o ibang sensitive details. Huwag gamitin ang app para manloko, manggulo, maglagay ng harmful code, o kumuha ng data ng ibang tao nang walang permission. Walang chat, ads, o in-app purchases sa current version.'],
        ['6. Bugs at mga limitasyon','Puwedeng magkaroon ng bugs, updates, o interruptions. Puwedeng mawala ang saved progress kung binura ang app/browser data o nasira ang device. Optional ang voice input at maaaring kailangan nito ng internet at ibang service. Hindi namin maipapangakong error-free, laging available, o compatible sa lahat ng device ang app.'],
        ['7. Liability at legal rights','Ang anumang limitasyon sa responsibility ng developers ay hanggang sa pinapayagan lang ng batas. Hindi inaalis ng terms na ito ang privacy rights, ibang rights na hindi puwedeng i-waive, o liability na hindi puwedeng limitahan sa ilalim ng Philippine law, kasama ang liability para sa future fraud. Hindi ito blanket waiver para sa negligence o illegal acts. Walang guaranteed result o compatibility sa bawat device.'],
        ['8. Updates at pag-withdraw ng consent','Puwedeng tumigil sa paggamit anumang oras. Sa Para sa magulang, puwedeng bawiin ang consent at i-delete ang data na naka-save sa device. Hihingi ulit ng approval kapag may bagong version ng importanteng terms o may pagbabago sa purpose ng data processing. Hindi automatic na bagong consent ang patuloy na paggamit ng app.'],
        ['9. Applicable law at mga concerns','Applicable Philippine law ang susundin. Hindi nito inaalis ang mandatory legal rights na maaaring applicable sa ibang bansa. Puwedeng mag-email muna sa team para sa tulong. Hindi required ang arbitration, at walang pagbabawal sa pag-file ng complaint sa tamang ahensiya o court.']
      ],sources:[['Civil Code, RA 386','https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/53360'],['Intellectual Property Code, RA 8293','https://www.ipophil.gov.ph/reference/laws-issuance-and-treaties/']]},
      privacy:{title:'Privacy Notice',intro:'Ito ang explanation kung anong data ang ginagamit ng current version ng TALA at bakit. Hiwalay ang approval sa Terms of Use, consent sa data, at optional na microphone.',sections:[
        ['1. Sino ang puwedeng i-contact?','Ang project team ay Olivarez College - IT Students. Puwedeng gamitin ang alinman sa emails sa ibaba para sa privacy questions, support, corrections, o requests. Bago ang public release, kailangan pang i-confirm ang legal na personal information controller (ang responsable sa data), address, contact person, at setup kasama ang college o school.'],
        ['2. Anong data ang sine-save?','Kapag pumayag ang magulang, sine-save sa device ang nickname, completed levels, stars, number of attempts, answer results, date ng huling save, at mga voice guide na napakinggan na. Ginagamit ang mga ito para maituloy ang laro at makita ang progress. Ang details tungkol sa pag-aaral ay maaaring ituring na sensitive personal information. Hindi humihingi ang TALA ng account, birthday, location, contact list, advertising ID, o payment details.'],
        ['3. Saan naka-save ang data?','Nasa local storage ng browser o Android WebView ang progress—ibig sabihin, nasa device na ito. Naka-save rin kung kailan ka pumayag, anong policy version ang binasa mo, at ang sound/motion settings. Nandoon ang data hanggang i-delete mo, i-clear ang app/browser data, o linisin ng device ang storage. Walang automatic cloud backup o online learner database ang TALA. Hindi ine-encrypt ng app mismo ang local storage, kaya puwedeng makita ang data ng ibang gumagamit ng parehong device. Hindi secure login ang parent check. Hindi sine-save bilang image ang drawing sa canvas.'],
        ['4. Optional ang microphone','Naka-off ang voice input sa simula. Kapag pinayagan ng magulang at pinindot ang microphone, ginagamit ang Android o browser voice service para gawing text ang sinabing nickname. Maaaring ipadala ang boses sa provider, gaya ng Google, para iproseso online, posibleng sa ibang bansa. Ang provider ang may sariling rules kung paano at gaano katagal nito hinahawakan ang data; hindi ito kontrolado ng TALA. Hindi nagre-record o nagse-save ang TALA ng raw audio. Draft muna ang recognized text; magiging saved name lang ito kapag kinumpirma. Puwedeng mag-type na lang—pareho pa rin ang available lessons.'],
        ['5. May data bang ipinapadala online?','Walang analytics, advertising SDK, o automatic upload ng learner profile sa developers sa current code. Sa web/PWA, nakakatanggap ang hosting provider ng normal network requests, gaya ng IP address at requested files. Kailangang tukuyin ang host at rules nito sa pag-save ng logs bago i-deploy. Nasa APK na ang lessons at MP3s. Mag-e-export o mag-e-email lang kapag pinili ng magulang; i-check muna ang file bago i-share. Kahit hindi ina-upload ang progress, puwede pa ring may network activity ang device o voice service.'],
        ['6. Paano ko makokontrol ang data?','Sa Para sa magulang, puwedeng tingnan ang progress, palitan ang nickname, i-download ang saved data, i-off ang voice input, o bawiin ang consent at i-delete ang TALA data. May privacy rights ka sa ilalim ng batas: malaman ang paggamit ng data, humingi ng access o correction, tumutol, humiling ng deletion o blocking, at humiling ng data portability kung applicable. Puwede ring mag-file ng complaint o humingi ng damages kung may legal na basehan. Kung voice o hosting provider ang may hawak ng data, maaaring kailangan ding gamitin ang sarili nilang settings o contacts. Puwedeng lumapit sa National Privacy Commission para sa privacy concerns.'],
        ['7. Paano mapapanatiling safe ang data?','Nickname lang ang gamitin. Ingatan ang shared device at huwag basta i-share ang downloaded data. Walang system na garantisadong 100% secure. Kung magbabago ang paraan o purpose ng data processing, kailangang i-update muna ang notice at humingi ng bagong consent kung kailangan.']
      ],sources:[['Data Privacy Act, RA 10173','https://privacy.gov.ph/data-privacy-act/'],['DPA Implementing Rules and Regulations','https://privacy.gov.ph/implementing-rules%20regulations-data-privacy-act-2012/'],['NPC child-oriented transparency guidance','https://privacy.gov.ph/pips-and-pics/advisories-circulars/'],['National Privacy Commission','https://privacy.gov.ph/']]},
      child:{title:'Tungkol sa pangalan at laro mo',intro:'Basahin ito kasama ang magulang o gurong kasama mo.',sections:[
        ['Palayaw lang!','Puwede kang gumamit ng nickname o palayaw. Huwag ibigay ang address o phone number mo.'],
        ['Naka-save ang mga bituin mo','Naaalala ng device ang palayaw mo at mga natapos mong laro. Makikita rin ito ng magulang o gurong kasama mo.'],
        ['Puwedeng mag-type na lang','Hindi mo kailangang gamitin ang microphone. Puwede kang magpatulong sa pag-type. Kung gagamit ka ng microphone, puwedeng mapakinggan ng voice service ng device ang sasabihin mo.'],
        ['Magpatulong lang','Sabihin sa magulang kung may mali, may hindi ka maintindihan, o gusto mong i-delete ang pangalan at progress mo.']
      ],sources:[]}
    }
  };
})();
