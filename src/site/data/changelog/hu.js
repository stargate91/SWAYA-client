export const hu = {
  sectionTitles: {
    added: 'Új Funkciók',
    performance: 'Teljesítmény & Architektúra',
    changed: 'Fejlesztések',
    fixed: 'Hibajavítások & Finomhangolás',
  },
  releases: {
    '1.1.0': {
      title: "Interaktív Navigáció, Görgetés-Helyreállító Motor & Automatikus Adatbázis-Migrációk",
      description: "Jelentős stabilitási és felhasználói élmény frissítés interaktív címsor navigációval, filmográfia görgetési pozíció megőrzéssel, automatikus Alembic adatbázis-migrációkkal és moduláris dizájnrendszerrel.",
      highlights: [
              "Interaktív ablak címsor navigáció kezdőlap hivatkozással és oldalsáv kapcsoló gombbal",
              "Robusztus horgony-alapú görgetés-helyreállító motor a színész- és közreműködő-oldalakhoz",
              "Automatikus Alembic adatbázis-migráció futtató az adatbázis-séma indításkori frissítéséhez",
              "Felnőtt tartalom szűrés és kategória-tisztítás a Jackett torrent keresésekhez",
              "Átfogó dizájnrendszer modularizálás több mint 600 elkülönített komponenssel és CSS tokennel"
      ]
    },
    '1.0.0': {
      title: 'Torrent Kliens Integráció, Részletes Értékelések & Egyedi Sorozat Architektúra',
      description: 'Mérföldkőnek számító kiadás: beépített külső torrent kliens vezérlőpult, globális torrent keresés, értékelő fiók, egyedi TV évad-navigáció és optimalizált kötegelt SQL naplózás.',
      highlights: [
        'Külső torrent kliens vezérlőpult (qBittorrent & Transmission) valós idejű sávszélesség-mérőkkel',
        'Automatizált háttérbeli letöltés-figyelő és automatikus könyvtár-beolvasás',
        'Egyedi TV sorozat epizód-bontás és megtekintési folyamatjelzők',
        'Egységes média és felnőtt felfedező widgetek TMDb, StashDB és FansDB forrásokból',
        'Fő-részlet (master-detail) átnevezési előzmények igény szerinti lusta naplóbetöltéssel',
      ],
    },
    '0.7.0': {
      title: 'Hardveres Videógyorsítás & SQLite Filmográfia Gyorsítótárazás',
      description: 'Teljesítmény- és stabilitási frissítés automatikus NVENC/QSV GPU videó előnézetekkel, távoli filmográfia gyorsítótárazással és dinamikus háttérfolyamat-portkiosztással.',
      highlights: [
        'Hardveresen gyorsított FFmpeg videó előnézetek NVENC/QSV/AMF automatikus felismeréssel',
        'Távoli filmográfia gyorsítótárazás a színészprofilok azonnali betöltéséhez',
        'Dinamikus TCP portkiosztás indításkor, megelőzve a portütközéseket',
      ],
    },
    '0.6.0': {
      title: 'Univerzális Többforrásos Keresés & Folyamat Életciklus Figyelő',
      description: 'Kiterjesztett globális keresési képességek és megerősített háttérfolyamat-kezelés.',
      highlights: [
        'Egységes univerzális keresés filmek, jelenetek, színészek és stúdiók között',
        'Szülőfolyamat-figyelő, amely megakadályozza a háttérben maradt árva feladatokat',
      ],
    },
  },
};
