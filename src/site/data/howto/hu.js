export const hu = {
  'getting-started': {
    name: 'Hogyan állítsd be és kezd el használni a SWAYA Offline Médiatárat',
    description: 'Rövid útmutató a SWAYA Windowsos telepítéséhez, a merevlemezek csatlakoztatásához és a privát könyvtár beállításához.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Letöltés és Indítás',
        text: 'Telepítsd a SWAYA asztali alkalmazást Windows 10 vagy 11 rendszerre.',
      },
      {
        name: 'Könyvtármappák Beállítása',
        text: 'Állítsd be a letöltési forrásmappát és a célkönyvtárakat a Beállításokban.',
      },
      {
        name: 'Média Beolvasása és Párosítása',
        text: 'Nyisd meg a Rendezőt a videófájlok beolvasásához és a metaadatok, poszterek letöltéséhez.',
      },
    ],
  },
  'organizer': {
    name: 'Hogyan nevezz át és rendezz kötegelten médiafájlokat a merevlemezen',
    description: 'Útmutató a TMDb/StashDB metaadatok automatikus lekéréséhez és a fájlok ütközésmentes mappastruktúrába rendezéséhez.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Forrásmappa Kiválasztása',
        text: 'Nyisd meg a SWAYA Rendezőt és válaszd ki a letöltéseket vagy rendezetlen videókat tartalmazó mappát.',
      },
      {
        name: 'Automatikus Metaadat-lekérés Futtatása',
        text: 'Indítsd el az automatikus keresést a TMDb, OMDb és StashDB adatbázisokban a filmek és sorozatok azonosításához.',
      },
      {
        name: 'Finomhangolás Párosítással és Felülbírálással',
        text: 'Használd a Keresés és Felülbírálás ablakokat a címek, kiadási címkék vagy évad/epizód számok pontosításához.',
      },
      {
        name: 'Kötegelt Átnevezés vagy Helyben Importálás',
        text: 'Kattints az Átnevezés gombra a Plex/Jellyfin struktúrába mozgatáshoz, vagy válaszd a Helyben Rendszerezést a lemezfájlok érintetlenül hagyásához.',
      },
    ],
  },
  'dashboard': {
    name: 'Hogyan navigálj az ajánlókban és folytasd a lejátszást a Kezdőlapon',
    description: 'Folytasd a lejátszást másodpercre pontosan és fedezd fel a kurált ajánlókat a kezdőlapon.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Lejátszás Folytatása',
        text: 'Kattints bármelyik folyamatban lévő videóra a Folytatás polcon a mentett időbélyegtől való visszatéréshez.',
      },
      {
        name: 'Kiemelt Sáv és Ajánlók Böngészése',
        text: 'Böngéssz a kiemelt banner, a legutóbb rendezett tartalmak, a népszerű filmek és a stúdió-összeállítások között.',
      },
    ],
  },
  'library': {
    name: 'Hogyan böngészd és szűrd a médiakatalógusodat a SWAYA-ban',
    description: 'Böngéssz a gyűjteményedben többkritériumos szűrőkkel, címkékkel, színészprofilokkal és egyedi nézetekkel.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Nézetmód Váltása',
        text: 'Válts a rácsnézet, táblázat és stúdió/színész módok között az eszköztáron.',
      },
      {
        name: 'Többkritériumos Szűrők Alkalmazása',
        text: 'Szűrj 4K HDR felbontás, műfajok, egyedi címkék vagy merevlemezes tárolási állapot szerint.',
      },
      {
        name: 'Gyorsműveletek Használata',
        text: 'Kattints jobb gombbal bármelyik kártyára a lejátszáshoz, értékeléshez, listához adáshoz vagy technikai adatok megtekintéséhez.',
      },
    ],
  },
  'details': {
    name: 'Hogyan szabd testre a borítóképeket és TV-évadokat a SWAYA-ban',
    description: 'Ellenőrizd a technikai adatokat, válassz 4K posztereket és háttereket, és lapozd át a sorozatok epizódjait.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Technikai Adatok Megtekintése',
        text: 'Nyisd meg a médiaadatlapot a videokódolás, bitráta, hangsávok, feliratok és stáblista megtekintéséhez.',
      },
      {
        name: 'Egyedi Poszterek és Hátterek Kiválasztása',
        text: 'Nyisd meg a vizuális grafikaválasztót és válassz nagyfelbontású 4K posztereket és háttérképeket az online forrásokból.',
      },
      {
        name: 'TV Évadok és Epizódok Böngészése',
        text: 'Lapozd át az évadokat az egyedi epizódkártyákkal, leírásokkal és megtekintési státuszokkal.',
      },
    ],
  },
  'player': {
    name: 'Hogyan játssz le 4K HDR videókat az MPV motorral a SWAYA-ban',
    description: 'Játssz le helyi médiafájlokat közvetlen MPV hardveres gyorsítással, azonnali felirat- és hangsávváltással.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Hardveresen Gyorsított Lejátszó Indítása',
        text: 'Indíts el bármilyen filmet vagy epizódot azonnal, szerveroldali átkódolási késleltetés nélkül.',
      },
      {
        name: 'Hangsávok és Feliratok Állítása',
        text: 'Válts többnyelvű hangsávok között és állítsd be a felirat időzítését valós időben.',
      },
      {
        name: 'Külső Lejátszó Használata',
        text: 'Igény esetén indítsd el a VLC-t vagy az MPC-HC-t közvetlenül a lejátszó helyi menüjéből.',
      },
    ],
  },
  'search': {
    name: 'Hogyan keress filmek, sorozatok és szereplők között valós időben',
    description: 'Végezz globális többforrásos keresést azonnali szűréssel a teljes médiakönyvtáradban.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Globális Kereső Megnyitása',
        text: 'Nyomd meg a Ctrl+K billentyűkombinációt vagy kattints a felső keresősávra bármelyik nézetből.',
      },
      {
        name: 'Keresés Könyvtárak és Források Között',
        text: 'Gépeld be a film címét, rendezőjét, színészét vagy stúdióját a csoportosított találatok azonnali megtekintéséhez.',
      },
      {
        name: 'Azonnali Szűrők Alkalmazása',
        text: 'Szűkítsd a találatokat médiatípus, felbontás, megjelenési év vagy címke szerint.',
      },
    ],
  },
  'lists': {
    name: 'Hogyan hozz létre tematikus gyűjteményeket 4-poszteres montázsborítóval',
    description: 'Készíts egyedi lejátszási listákat, kurálj tematikus gyűjteményeket és generálj 4-poszteres montázsborítókat.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Új Gyűjtemény Létrehozása',
        text: 'Nyisd meg a Listák menüpontot és add meg a gyűjtemény nevét, tematikus leírását és a rendezést.',
      },
      {
        name: 'Médiaelemek Hozzáadása',
        text: 'Csatolj filmeket vagy sorozatokat a listához a kártyákról vagy az adatlapokról.',
      },
      {
        name: '4-Poszteres Borító Generálása',
        text: 'A SWAYA automatikusan elkészíti a 4-poszteres mozaikborítót a gyűjtemény elemeiből.',
      },
    ],
  },
  'ratings': {
    name: 'Hogyan értékelj és írj privát Markdown véleményeket a SWAYA-ban',
    description: 'Használj 10-csillagos pontosságú értékelést, írj személyes Markdown recenziókat és szűrj kedvenceidre.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Értékelés 10-Csillagos Skálán',
        text: 'Értékeld a filmeket és jeleneteket félcsillagos felbontással.',
      },
      {
        name: 'Privát Markdown Értékelés Írása',
        text: 'Rögzítsd saját gondolataidat, jegyzeteidet és címkéidet 100%-ban helyben tárolva.',
      },
      {
        name: 'Szűrés Értékelések és Kedvencek Alapján',
        text: 'Szűrd a könyvtáradat csillagszintek szerint, vagy nézd meg a megcsillagozott kedvenceidet.',
      },
    ],
  },
  'history': {
    name: 'Hogyan kövesd nyomon és kezeld a megtekintési előzményeket a SWAYA-ban',
    description: 'Kövesd nyomon az időrendi lejátszási előzményeket, a mentett időbélyegeket és a nézési naplókat.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Megtekintési Előzmények Megnyitása',
        text: 'Tekintsd át az időrendbe szedett lejátszási eseményeket pontos időbélyegekkel és befejezési arányokkal.',
      },
      {
        name: 'Félbehagyott Videók Folytatása',
        text: 'Kattints bármelyik befejezetlen elemre a lejátszás azonnali folytatásához a mentett pozícióból.',
      },
      {
        name: 'Előzmények Szűrése vagy Törlése',
        text: 'Szűrd a naplókat dátum szerint, vagy távolíts el egyedi megtekintési bejegyzéseket.',
      },
    ],
  },
  'statistics': {
    name: 'Hogyan elemezd a tárhelyet és a Könyvtár DNA-t a SWAYA-ban',
    description: 'Vizsgáld meg a merevlemez-kapacitást, a kodek-megoszlási diagramokat és a műfaji összetételt.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Tárhely-megoszlás Elemzése Kodekek és Felbontás Alapján',
        text: 'Ellenőrizd a gigabájtok megoszlását 4K UHD, 1080p, HEVC és AV1 videokodekek szerint.',
      },
      {
        name: 'Könyvtár DNA Eloszlások Felfedezése',
        text: 'Böngéssz az interaktív grafikonok között a műfajok, megjelenési évtizedek és stúdiók arányairól.',
      },
    ],
  },
  'settings': {
    name: 'Hogyan konfiguráld a mappasablonokat és az API kulcsokat a SWAYA-ban',
    description: 'Szabd testre az elnevezési mintákat, állítsd be az API kulcsokat és kapcsold be a gyorsbillentyűs álcázást.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Célkönyvtárak Beállítása',
        text: 'Add meg a filmek, TV sorozatok és privát felnőtt tartalmak célmappáit.',
      },
      {
        name: 'Mappasablonok Testreszabása',
        text: 'Állíts be Plex és Jellyfin mappamintákat dinamikus tokenekkel (pl. {title} ({year})).',
      },
      {
        name: 'API Kulcsok Megadása',
        text: 'Add meg a TMDb vagy StashDB kulcsaidat a korlátlan, nagysebességű metaadat-lekéréshez.',
      },
      {
        name: 'Lopakodó Mód Beállítása',
        text: 'Állíts be egy gyorsbillentyűt az érzékeny könyvtárak azonnali elrejtéséhez.',
      },
    ],
  },
  'torrent': {
    name: 'Hogyan integrálj torrent-klienst automatikus könyvtárba rendezéssel a SWAYA-ban',
    description: 'Kapcsold össze a qBittorrentet, kövesd az aktív letöltéseket valós időben, és importáld automatikusan a kész fájlokat.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Torrent Integráció Bekapcsolása',
        text: 'Add meg a qBittorrent WebUI címet, portot és hitelesítési adatokat a Beállításokban.',
      },
      {
        name: 'Aktív Letöltések Nyomon Követése',
        text: 'Kövesd a letöltési sebességet, hátralévő időt és állapotot közvetlenül a SWAYA-ban.',
      },
      {
        name: 'Kész Letöltések Automatikus Rendezése',
        text: 'A szoftver automatikusan letölti a metaadatokat a kész fájlokhoz és a célkönyvtárba mozgatja őket.',
      },
    ],
  },
};
