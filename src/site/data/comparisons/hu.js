export const hu = {
  filebot: {
    title: 'SWAYA vs FileBot: Modern Asztali Médiaszervező és Fájlátnevező',
    metaTitle: 'FileBot Alternatíva Windows-ra - SWAYA Kötegelt Rendszerező és MPV Lejátszó',
    metaDescription: 'Modern FileBot alternatívát keresel? A SWAYA átnevezi a fájlokat TMDb & StashDB alapján, offline médiatárat és 4K MPV lejátszót biztosít.',
    heroTagline: 'Miért csak átneveznéd a fájljaidat, amikor a teljes gyűjteményedet le is játszhatod?',
    heroSubtitle: 'A FileBot kiváló fájlátnevezésre, de a SWAYA magasabb szintre emeli a helyi médiádat: lemezrendezés, lenyűgöző offline médiatár és beépített 4K HDR MPV lejátszó egy modern asztali appban.',
    competitorPricing: '$6/év vagy $48 örökös licenc',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'Kizárólag parancssoros (CLI) eszközre van szükséged Linux szerveren vagy NAS szkriptekhez.',
      'Egyedi Groovy átnevezési kifejezéseket és automatizált scripteket használsz.',
      'Már használsz külön médiaszervert (Plex/Kodi), és nincs szükséged beépített asztali lejátszóra.',
    ],
    whenToChooseSwaya: [
      'Minden-egyben asztali megoldást szeretnél: fájlátnevezés ÉS azonnali médiatár-böngészés/lejátszás.',
      'Fősodorbeli filmeket/sorozatokat (TMDb) és felnőtt jeleneteket (StashDB, FansDB) is kezelsz.',
      'Beépített hardveresen gyorsított MPV lejátszót szeretnél kockapontos pozíciómentéssel és transzkódolás nélkül.',
      'Elegáns, modern asztali felületet szeretnél biztonságos próba-futtatással és ütközésvédelemmel.',
    ],
    matrix: [
      { feature: 'Fizikai Fájlátnevezés a Merevlemezen', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Próba-futtatás és Ütközésvédelem', swayaNote: 'Intelligens ütközésvizsgálat & csere', competitorNote: 'Előnézeti lista' },
      { feature: 'Beépített 4K/HDR MPV Videólejátszó', swayaNote: 'Hardveres gyorsítás, felirat- és hangsávkezelés', competitorNote: 'Nincs beépített lejátszó' },
      { feature: 'Vizuális Offline Médiatár és Részletes Adatlapok', swayaNote: 'Poszterek, háttérképek, szereplők, műfajok, értékelések', competitorNote: 'Nincs médiatár felület' },
      { feature: 'Felnőtt Média és StashDB Támogatás', swayaNote: 'Natív StashDB, FansDB és szereplőindex', competitorNote: 'Csak fősodorbeli adatbázisok' },
      { feature: 'Kettős Mód (SFW / NSFW) PIN Védelemmel', swayaNote: 'Teljes adatbázis-szétválasztás és zárolás', competitorNote: 'Nem érhető el' },
      { feature: 'Torrent Kliens Auto-Import (qBittorrent)', swayaNote: 'Beépített integráció & helyben importálás', competitorNote: 'Csak egyedi CLI szkriptekkel' },
      { feature: '100% Offline és Szervermentes Működés', swayaNote: 'Nulla háttérszolgáltatás vagy nyitott port', competitorNote: 'Helyi Java alkalmazás' },
      { feature: 'Modern Windows Felület (Java Nem Szükséges)', swayaNote: 'Natív asztali alkalmazás', competitorNote: 'Java / Swing felület' },
      { feature: 'Egyszeri Örökös Licenc Vásárlás', swayaNote: '€39 bevezető / €79 végleges', competitorNote: '$48 örökös vagy $6/év' },
    ],
    deepDives: [
      {
        title: 'Több Mint Puszta Átnevezés: Teljes Média-Univerzum',
        description: 'A FileBot megáll ott, ahol a fájlok át lettek nevezve a lemezen. A SWAYA a fájljaidból azonnal egy gazdag, vizuális médiatárat épít poszterekkel, szereplő-életrajzokkal és egyedi listákkal.',
      },
      {
        title: 'Beépített 4K HDR MPV Lejátszó',
        description: 'Nem kell külső lejátszót indítanod. Kattints bármelyik videóra a SWAYA-ban a nagy bitrátájú MKV, HDR és többcsatornás hangsávok azonnali lejátszásához.',
      },
      {
        title: 'Fősodorbeli és Felnőtt Média Egy Helyen',
        description: 'A SWAYA az első média-munkaállomás dedikált Kettős Mód architektúrával: filmek a TMDb-ből és jelenetek a StashDB-ből, opcionális PIN-zár mögé rejtve.',
      },
    ],
    faqs: [
      {
        q: 'Képes a SWAYA helyettesíteni a FileBotot sorozatok és filmek átnevezésére?',
        a: 'Igen. A SWAYA átvizsgálja a letöltési mappáidat, felismeri a címeket a TMDb segítségével, lehetővé teszi a finomhangolást, és fizikailag átnevezi vagy áthelyezi a fájlokat.',
      },
      {
        q: 'Támogatja a SWAYA a torrent seedelést rendszerezés közben?',
        a: 'Igen. A SWAYA rendelkezik "Helyben Importálás" móddal, amely minden metaadatot és posztert letölt a könyvtárba, miközben a lemezen lévő fájlokat és mappákat érintetlenül hagyja.',
      },
      {
        q: 'Szükséges a Java telepítése a SWAYA futtatásához?',
        a: 'Nem. A SWAYA egy önálló, natív asztali alkalmazás, amely nem igényel Java-t vagy külső futtatókörnyezetet.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: 100%-ban Valódi Offline Asztali Média-Munkaállomás',
    metaTitle: 'Plex Alternatíva Windows-ra (Szerver Nem Szükséges) - SWAYA',
    metaDescription: 'Privát, offline Plex alternatívát keresel szerverbeállítás nélkül? A SWAYA rendezi a merevlemezen lévő fájlokat és 4K HDR-t játszik le MPV-vel fiókok nélkül.',
    heroTagline: 'Személyes médiagyűjteményed szerverek, felhőfiókok és telemetria nélkül.',
    heroSubtitle: 'A Plex otthoni hálózati streamelésre készült, de folyamatosan futó háttérfolyamatokat, felhőfiókot és Plex Pass előfizetést igényel. A SWAYA zéró konfigurációjú, 100%-ban offline asztali élményt nyújt közvetlenül a PC-den.',
    competitorPricing: 'Ingyenes / $4.99/hó / $119 örökös (Plex Pass)',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'A médiádat okostévékre, telefonokra és távoli családtagoknak szeretnéd streamelni.',
      'Dedikált NAS-t vagy otthoni szervert üzemeltetsz több felhasználós transzkódolással.',
      'Eszközök közötti távoli szinkronizációra van szükséged iOS, Android és Apple TV között.',
    ],
    whenToChooseSwaya: [
      'Közvetlenül a Windows PC-den, laptopodon vagy monitorodon nézel filmeket és sorozatokat.',
      '100% adatvédelmet akarsz: nulla felhőfiók, nulla telemetria és nulla nyitott hálózati port.',
      'A merevlemezeden lévő fizikai fájlok tiszta és rendezett elnevezését szeretnéd.',
      'Eleged van a szerverkonfigurálásból, háttérfolyamatokból és a transzkódolási hibákból.',
    ],
    matrix: [
      { feature: '100% Offline & Zéró Szerverbeállítás', swayaNote: 'Azonnali asztali app, nincs háttérfolyamat', competitorNote: 'Plex Media Server háttérprogram szükséges' },
      { feature: 'Fizikai Fájlátnevezés a Merevlemezen', swayaNote: 'A tényleges fájlokat nevezi át a lemezen', competitorNote: 'Csak virtuális adatbázis; a fájlokat nem nevezi át' },
      { feature: 'Zéró Felhőfiók / Teljes Adatvédelem', swayaNote: 'Nincs bejelentkezés, nincs telemetria, helyi adatbázis', competitorNote: 'Plex online azonosítás és telemetria kötelező' },
      { feature: 'Natív MPV Lejátszó (Nincs Transzkódolás)', swayaNote: 'Bármilyen formátumot közvetlenül lejátszik 4K HDR-ben', competitorNote: 'Gyakran feleslegesen transzkódol lejátszáskor' },
      { feature: 'Felnőtt Média (StashDB) & Kettős Mód', swayaNote: 'Dedikált felnőtt mód & StashDB/FansDB', competitorNote: 'Bizonytalan külső bővítményeket igényel' },
      { feature: 'Interaktív Próba-futtatás Rendszerező', swayaNote: 'Ellenőrzés, szerkesztés és egyeztetés átnevezés előtt', competitorNote: 'Csak passzív mappavizsgálat' },
      { feature: 'Torrent Kliens Integráció (Helyben Importálás)', swayaNote: 'qBittorrent és Transmission támogatás', competitorNote: 'Nincs natív támogatás' },
      { feature: 'Egyszeri Örökös Ár (Nincs Havidíj)', swayaNote: '€39 bevezető akció egyszeri díjjal', competitorNote: '$119 Plex Pass vagy $4.99/hó' },
      { feature: 'Kockapontos Emlékezetes Pillanat Könyvjelzők', swayaNote: 'Egygombos képernyőkép és időbélyeg mentés', competitorNote: 'Nem érhető el' },
      { feature: 'Nulla Háttér CPU / Memória Terhelés', swayaNote: 'Bezárás után semmi sem fut', competitorNote: 'A szerverfolyamat folyamatosan fut' },
    ],
    deepDives: [
      {
        title: 'Zéró Szerver, Zéró Hálózati Terhelés',
        description: 'A Plex állandó háttérfolyamatokat futtat a portokon. A SWAYA egy könnyed asztali program: amikor bezárod, semmi sem fut a háttérben.',
      },
      {
        title: 'Valódi Lemezrendezés a Virtuális Adatbázisok Helyett',
        description: 'A Plex csak metaadatokat képez a rendezetlen mappák fölé. A SWAYA fizikailag megtisztítja, átnevezi és struktúrába szervezi a fájljaidat.',
      },
      {
        title: 'Natív MPV a Transzkódolási Akadozások Helyett',
        description: 'Eleged van abból, hogy a Plex 4K HDR videókat transzkódol? A SWAYA optimalizált MPV motorja akadozásmentesen játssza le a legnehezebb formátumokat is.',
      },
    ],
    faqs: [
      {
        q: 'Használhatom a SWAYA-t internetkapcsolat nélkül?',
        a: 'Igen! A SWAYA 100%-ban működik offline. A metaadatok és poszterek letöltése után semmilyen hálózati kapcsolat nem szükséges a böngészéshez és lejátszáshoz.',
      },
      {
        q: 'Streamel a SWAYA telefonra vagy okostévére?',
        a: 'A SWAYA kifejezetten személyes asztali munkaállomásként készült PC-re és laptopra, nem működik hálózati streaming szerverként.',
      },
      {
        q: 'Gyűjt a SWAYA megtekintési adatokat vagy kér bejelentkezést?',
        a: 'Nem. A SWAYA nem igényel fiókot vagy bejelentkezést, és semmilyen megtekintési adatot nem továbbít a hálózaton.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: Modern Asztali Médiagyűjtemény-Kezelő és Lejátszó',
    metaTitle: 'tinyMediaManager Alternatíva Windows-ra - SWAYA',
    metaDescription: 'Modern tinyMediaManager alternatívát keresel? A SWAYA gyors kötegelt fájlátnevezést, TMDb/StashDB adatletöltést és beépített MPV lejátszót nyújt Java nélkül.',
    heroTagline: 'Kezeld, rendszerezd és azonnal élvezd a médiádat nehézkes Java felületek nélkül.',
    heroSubtitle: 'A tinyMediaManager egy funkciókban gazdag NFO generátor, de Java-t igényel és nincs beépített lejátszója. A SWAYA ötvözi a fizikai lemezrendezést egy elegáns médiatárral és beépített 4K MPV motorral.',
    competitorPricing: '€15/év (v4/v5 Pro)',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'Kifejezetten részletes .NFO fájlok generálására van szükséged külső Kodi konfigurációkhoz.',
      'Egyszerre kezelsz médiát macOS, Linux és Windows rendszereken.',
      'Bonyolult egyedi XML/NFO tag-szerkesztésre van szükséged.',
    ],
    whenToChooseSwaya: [
      'Modern, villámgyors asztali alkalmazást szeretnél Java környezet telepítése nélkül.',
      'Egyetlen integrált munkafolyamatot akarsz: rendszerezés, böngészés és azonnali lejátszás egy kattintással.',
      'Felnőtt médiát (StashDB, FansDB) és fősodorbeli filmeket/sorozatokat is egy helyen kezelnél.',
      'Egyszeri örökös licencet preferálsz az éves megújuló előfizetési díj helyett.',
    ],
    matrix: [
      { feature: 'Fizikai Lemezrendezés és Mappastruktúrák', swayaNote: 'Intelligens sablonok és ütközésvédelem', competitorNote: 'Egyedi mintázatú átnevező' },
      { feature: 'Beépített Hardveresen Gyorsított Videólejátszó', swayaNote: 'Natív 4K HDR MPV lejátszó', competitorNote: 'Nincs beépített lejátszó motor' },
      { feature: 'Felnőtt Média (StashDB / FansDB) Támogatás', swayaNote: 'Dedikált felnőtt lekérdezők és szereplőindex', competitorNote: 'Nem támogatott' },
      { feature: 'Kettős Mód PIN Védelemmel', swayaNote: 'Elkülönített adatbázis és gyors zárolás', competitorNote: 'Nincs adatvédelem vagy kettős mód' },
      { feature: 'Modern Asztali Felület (Java Nem Szükséges)', swayaNote: 'Elegáns, könnyed natív alkalmazás', competitorNote: 'Java Swing felület' },
      { feature: 'Interaktív Egyeztető és Finomhangoló Ablakok', swayaNote: 'Gyors keresés, epizódfelismerés & címkeszerkesztő', competitorNote: 'Scraper párbeszédpanelek' },
      { feature: 'Torrent Kliens Integráció (Seedelés Megtartása)', swayaNote: 'Helyben importálás és kliens integráció', competitorNote: 'Nem érhető el' },
      { feature: 'Megtekintési Előzmények és Kedvenc Pillanatok', swayaNote: 'Részletes statisztikák és időbélyegek', competitorNote: 'Alapvető megtekintett jelölők' },
      { feature: 'Licencelési Modell', swayaNote: 'Egyszeri örökös licenc (€39)', competitorNote: '€15 / Év folyamatos díj' },
    ],
    deepDives: [
      {
        title: 'Minden Egyben: Rendszerezés, Böngészés és Lejátszás',
        description: 'A tinyMediaManager használatakor folyamatosan váltanod kell a tMM és egy külső lejátszó (VLC, Kodi) között. A SWAYA egyetlen egységes asztali munkaterületet nyújt.',
      },
      {
        title: 'Egyszeri Örökös Vásárlás az Éves Előfizetés Helyett',
        description: 'A tMM v4/v5 éves előfizetést kér az online metaadatok letöltéséhez. A SWAYA egyszeri vásárlással örökre a tiéd az összes jövőbeli frissítéssel.',
      },
      {
        title: 'Fősodorbeli és Felnőtt Média Egyetlen Helyen',
        description: 'Míg a tMM csak a mainstream médiára fókuszál, a SWAYA első osztályú StashDB és FansDB támogatást nyújt a teljes gyűjteményed kezelésére.',
      },
    ],
    faqs: [
      {
        q: 'Generál a SWAYA NFO fájlokat Kodi/Jellyfin számára?',
        a: 'A SWAYA a szabványos Plex/Jellyfin/Kodi mappastruktúrákat és elnevezéseket követi, így a fájljaid bármilyen külső szoftverrel azonnal kompatibilisek maradnak.',
      },
      {
        q: 'Gyorsabban indul a SWAYA, mint a Java-alapú szoftverek?',
        a: 'Igen. A SWAYA azonnal, minimális memóriahasználattal indul a Java Virtuális Gép késleltetése nélkül.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Natív Asztali Munkaállomás Web Szerver Nélkül',
    metaTitle: 'StashApp Alternatíva Windows-ra - SWAYA',
    metaDescription: 'Natív Windows alternatívát keresel a StashApp helyett? A SWAYA ötvözi a StashDB integrációt, fizikai lemezrendezést és beépített MPV lejátszót.',
    heroTagline: 'A tökéletes privát médiaállomás localhost web szerverek és Docker nélkül.',
    heroSubtitle: 'A Stash egy remek nyílt forráskódú felnőtt médiaszerver, de a böngésződben fut helyi webdémonként. A SWAYA egy natív asztali app Windows-ra TMDb és StashDB támogatással, valamint beépített MPV motorral.',
    competitorPricing: 'Ingyenes / Nyílt forráskódú',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'Linux szervert vagy Docker konténert futtatsz többklienses eléréshez.',
      'Egyedi közösségi pluginokat és ritka oldalak lekérdezőit használod.',
      'Kifejezetten böngészőben futó nyílt forráskódú webalkalmazást keresel.',
    ],
    whenToChooseSwaya: [
      'Tiszta, egyetlen asztali programot szeretnél háttérben futó webkiszolgálók (`localhost:9999`) nélkül.',
      'Fősodorbeli filmeket (TMDb) és felnőtt jeleneteket (StashDB) is egy közös felületen kezelnél.',
      'Fizikai lemezrendezést, átnevezést és ütközésvédelmet akarsz a meghajtóidon.',
      'Natív MPV motort szeretnél, amely akadozás nélkül viszi a 4K 60fps / VR videókat böngészős korlátok nélkül.',
    ],
    matrix: [
      { feature: 'Natív Asztali App (Nincs Localhost Web Szerver)', swayaNote: 'Egyetlen futtatható program, zéró háttérfolyamat', competitorNote: 'Go web szervert futtat a localhost:9999-en' },
      { feature: 'Fizikai Fájlátnevezés és Mapparendszerezés', swayaNote: 'Átnevezi és rendezi a valódi fájlokat a lemezen', competitorNote: 'A fájlokat változatlanul hagyja a mappákban' },
      { feature: 'Kettős Mód: Fősodor (TMDb) + Felnőtt (StashDB)', swayaNote: 'Azonnali váltás a privát és általános profilok között', competitorNote: 'Csak felnőtt média' },
      { feature: 'Natív Hardveresen Gyorsított 4K MPV Lejátszó', swayaNote: 'Bármilyen kodeket akadozásmentesen lejátszik', competitorNote: 'Böngészős HTML5 lejátszó (kodek korlátokkal)' },
      { feature: 'Interaktív Egyeztető és Kötegelt Módosító', swayaNote: 'Biztonságos próba-táblázat csoportos műveletekkel', competitorNote: 'Tagger felület' },
      { feature: 'Szereplőprofilok, Stúdiócímkék és Tegek', swayaNote: 'Részletes adatlapok és képgalériák', competitorNote: 'Részletes szereplő adatbázis' },
      { feature: 'Kedvenc Pillanatok és Képernyőkép Mentés', swayaNote: 'Egygombos Enter gyorsbillentyű, galéria és idővonal', competitorNote: 'Markerek & O-meter' },
      { feature: 'PIN Védelemmel Ellátott Biztonsági Zár', swayaNote: 'Azonnali zárolás és rejtett felnőtt adatbázis', competitorNote: 'Alapvető hitelesítési plugin' },
      { feature: 'Torrent Kliens Integráció (qBittorrent)', swayaNote: 'Közvetlen szinkronizálás és seedelési támogatás', competitorNote: 'Külső szkripteket igényel' },
    ],
    deepDives: [
      {
        title: 'Natív MPV Lejátszó a Böngészős Korlátok Helyett',
        description: 'A Stash a böngésződben játssza le a videókat HTML5-tel, ami problémás lehet HEVC/H.265 és nagy bitrátájú 4K esetén. A SWAYA optimalizált MPV motorja akadozás nélkül játssza le a legnehezebb fájlokat is.',
      },
      {
        title: 'Egységes Fősodorbeli és Felnőtt Médiatár',
        description: 'Miért használnál több különálló alkalmazást? A SWAYA azonnali váltást biztosít a Mainstream (TMDb) és Adult (StashDB, FansDB, ThePornDB) módok között teljes adatbázis-szeparációval.',
      },
      {
        title: 'Fizikai Fájlrendezés a Merevlemezeiden',
        description: 'A Stash-sel ellentétben, amely csak egy adatbázisban indexeli a fájlokat, a SWAYA fizikailag átnevezi és tiszta struktúrába rendezi a letöltéseidet a merevlemezen.',
      },
    ],
    faqs: [
      {
        q: 'Tud a SWAYA közvetlenül a StashDB-ből adatokat letölteni?',
        a: 'Igen! Csak add meg a StashDB API kulcsodat a Beállításokban, és a SWAYA automatikusan felismeri a jeleneteket, szereplőket és borítóképeket.',
      },
      {
        q: 'Hogyan védi a SWAYA a felnőtt tartalmak privát jellegét?',
        a: 'A SWAYA tartalmaz egy dedikált PIN zárat. Zárolt állapotban a felnőtt profil teljesen láthatatlan, megnyitásához meg kell adnod a biztonsági PIN kódodat.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Helyi Asztali Lejátszás vs Otthoni Médiaszerver',
    metaTitle: 'Jellyfin Alternatíva Helyi Lejátszásra - SWAYA Windows App',
    metaDescription: 'Egyszerűbb Jellyfin alternatívát keresel PC-re? A SWAYA egy zéró konfigurációjú 100% offline lejátszó és lemezrendező.',
    heroTagline: 'Teljes offline médiaélmény szerverek és hálózati beállítások nélkül.',
    heroSubtitle: 'A Jellyfin a legjobb nyílt forráskódú otthoni szerver, de ha csak a saját PC-den szeretnél videókat nézni és rendezni, a SWAYA sokkal gyorsabb és kényelmesebb.',
    competitorPricing: 'Ingyenes & Nyílt forráskódú',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'A médiádat az egész lakásban, tévékre és mobilokra szeretnéd streamelni.',
      'Szerverparkot üzemeltetsz Linuxon és több felhasználót szolgálsz ki.',
      'Kifejezetten 100%-ban nyílt forráskódú szerverszoftvert keresel.',
    ],
    whenToChooseSwaya: [
      'A saját számítógépeden nézed a filmeket és rendezed a letöltéseidet.',
      'Nincs kedved szervereket telepíteni, portokat nyitni vagy transzkódolási profilokat debuggolni.',
      'Fizikai fájlátnevezést és beépített MPV 4K minőséget szeretnél transzkódolási késleltetések nélkül.',
      'Felnőtt média (StashDB) támogatást szeretnél a fősodorbeli filmek mellett.',
    ],
    matrix: [
      { feature: 'Zéró Szerverkonfiguráció és Karbantartás', swayaNote: 'Azonnal indul, nincs háttérfolyamat', competitorNote: 'Szerver telepítése és karbantartása kötelező' },
      { feature: 'Fájlátnevezés és Rendszerezés a Lemezeken', swayaNote: 'Valódi fizikai fájlrendezés a merevlemezen', competitorNote: 'Csak olvasható virtuális könyvtár' },
      { feature: 'Beépített MPV 4K HDR Motor', swayaNote: 'Natív GPU gyorsítás transzkódolás nélkül', competitorNote: 'Web/HTML5 vagy elektron kliensek' },
      { feature: 'Felnőtt Média (StashDB) & Kettős Mód', swayaNote: 'Natív StashDB/FansDB integráció', competitorNote: 'Külső bővítményeket igényel' },
      { feature: '100% Offline, Nyitott Portok Nélkül', swayaNote: 'Nincsenek nyitott portok, 100% helyi', competitorNote: 'Helyi hálózati szervert igényel' },
      { feature: 'Interaktív Próba-futtatás Rendszerező', swayaNote: 'Teljes finomhangolás és ütközésvédelem', competitorNote: 'Csak automatikus mappafigyelés' },
      { feature: 'Torrent Kliens Integráció (Seedelés Megtartása)', swayaNote: 'Közvetlen qBittorrent támogatás', competitorNote: 'Nem támogatott' },
      { feature: 'Kedvenc Pillanatok és Könyvjelzők', swayaNote: 'Egygombos képernyőkép és mentés', competitorNote: 'Nem érhető el' },
    ],
    deepDives: [
      {
        title: 'Asztali Egyszerűség a Szerverkomplexitás Helyett',
        description: 'A Jellyfin beállítása hálózati portok konfigurálását és démonok felügyeletét igényli. A SWAYA egy letisztult asztali app, amely azonnal működik.',
      },
      {
        title: 'Fizikai Fájlrendezés a Merevlemezeiden',
        description: 'A Jellyfin megköveteli a fájlok előzetes kézi rendszerezését. A SWAYA aktívan rendezi a letöltési mappáidat és tiszta struktúrába mozgatja a fájlokat.',
      },
      {
        title: 'Natív MPV Teljesítmény',
        description: 'Élvezd az azonnali tekerést, a hibátlan felirat-megjelenítést és az akadozásmentes 4K HDR lejátszást a SWAYA beépített MPV lejátszójával.',
      },
    ],
    faqs: [
      {
        q: 'Használhatom a SWAYA-t a Jellyfin mappáim rendszerezésére?',
        a: 'Igen! A SWAYA tökéletesen alkalmas a Jellyfin mappastruktúrák előkészítésére és a fájlok átnevezésére a szabványos konvenciók szerint.',
      },
      {
        q: 'Fogyaszt a SWAYA erőforrásokat a háttérben?',
        a: 'Nem. Amikor bezárod a SWAYA-t, semmilyen háttérfolyamat vagy szerverszolgáltatás nem fut tovább.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Modern Asztali Médiaállomás Bonyolult Bővítmények Nélkül',
    metaTitle: 'Kodi Alternatíva Windows PC-re - SWAYA',
    metaDescription: 'Modern Kodi alternatívát keresel Windows-ra? A SWAYA beépített MPV lejátszót, fájlrendezőt és modern felületet biztosít törékeny kiegészítők nélkül.',
    heroTagline: 'Gyönyörű médiaélmény a 10 méteres felületek és törékeny pluginok nélkül.',
    heroSubtitle: 'A Kodi kiváló a nappaliban lévő TV-khez, de egérrel és billentyűzettel nehézkes a használata. A SWAYA kifejezetten modern Windows asztali munkára és fájlkezelésre lett tervezve.',
    competitorPricing: 'Ingyenes & Nyílt forráskódú',
    swayaPricing: '€39 bevezető ár (€79 normál ár)',
    whenToChooseCompetitor: [
      'Távirányítóval vezérelt házimozi PC-t üzemeltetsz a tévédre kötve.',
      'Egyedi IPTV vagy PVR bővítményekre van szükséged.',
      'Kifejezetten 10 méteres kanapé-felületet akarsz.',
    ],
    whenToChooseSwaya: [
      'Egérrel, billentyűzettel és modern ablakos felületen szeretnéd kezelni a gyűjteményedet.',
      'Automatikus fizikai fájlátnevezést és letöltés-rendezést szeretnél a merevlemezeden.',
      'Sziklaszilárd, könnyed programot akarsz, ami frissítések után sem omlik össze.',
      'Felnőtt médiát (StashDB) és fősodorbeli filmeket (TMDb) is egy helyen kezelnél.',
    ],
    matrix: [
      { feature: 'Modern Asztali Felület (Egérre és Billentyűzetre Optimalizálva)', swayaNote: 'Elegáns, gördülékeny ablakos felület', competitorNote: 'Távirányítóra tervezett TV felület' },
      { feature: 'Fizikai Fájlátnevezés és Mapparendszerezés', swayaNote: 'Átnevezi és rendezi a fájlokat a lemezen', competitorNote: 'Csak adatbázis, nem nevezi át a fájlokat' },
      { feature: 'Integrált 4K/HDR MPV Videómotor', swayaNote: 'Hardveres gyorsítás, akadozás nélkül', competitorNote: 'Belső lejátszómotor' },
      { feature: 'Felnőtt Média (StashDB) & Kettős Mód', swayaNote: 'Natív StashDB/FansDB integráció', competitorNote: 'Bizonytalan bővítményeket igényel' },
      { feature: 'Sziklaszilárd Stabilitás (Törött Pluginok Nélkül)', swayaNote: 'Megbízható, zárt architektúra', competitorNote: 'A kiegészítők gyakran elromlanak frissítéskor' },
      { feature: 'Próba-futtatás Ütközésvédelem', swayaNote: 'Biztonságos előnézet áthelyezés előtt', competitorNote: 'Nem alkalmazható' },
      { feature: 'Torrent Kliens Integráció (Seedelés Megtartása)', swayaNote: 'Közvetlen qBittorrent kapcsolat', competitorNote: 'Külső szkripteket igényel' },
    ],
    deepDives: [
      {
        title: 'Asztali Elsődlegesség a 10 Méteres TV Felület Helyett',
        description: 'A Kodi távirányítós vezérlésre lett tervezve, ami egérrel és többablakos asztali környezetben kényelmetlen. A SWAYA közvetlenül Windows asztali munkára készült.',
      },
      {
        title: 'Fizikai Fájlrendezés a Merevlemezen',
        description: 'A Kodi megköveteli a fájlok előzetes manuális elnevezését. A SWAYA elvégzi a nehéz munkát: átvizsgálja a letöltési mappákat és átnevezi a fájlokat.',
      },
      {
        title: 'Zéró Bővítmény-Karbantartási Fejfájás',
        description: 'A Kodi felhasználói jól ismerik az elromló kiegészítők problémáját. A SWAYA-ban minden alapvető funkció be van építve közvetlenül a programba.',
      },
    ],
    faqs: [
      {
        q: 'Használhatom a SWAYA-t a Kodi fájljaim előkészítésére?',
        a: 'Igen! A SWAYA tiszta, iparági szabványú elnevezésekbe szervezi a fájlokat, amelyeket a Kodi automatikusan és hiba nélkül felismer.',
      },
      {
        q: 'Egyszerűbb a SWAYA használata, mint a Kodié?',
        a: 'Sokkal egyszerűbb. A SWAYA nem igényel plugin-telepítést, repository-kezelést vagy bonyolult XML beállításokat-azonnal működik.',
      },
    ],
  },
};
