export const cs = {
  sectionTitles: {
    added: 'Nové funkce',
    performance: 'Výkon & Architektura',
    changed: 'Vylepšení',
    fixed: 'Opravy chyb & Ladění',
  },
  releases: {
    '1.1.0': {
      title: "Interaktivní Navigace, Obnova Pozice Posunu & Automatické Migrace Databáze",
      description: "Velká aktualizace stability a uživatelského rozhraní s interaktivní navigací v záhlaví okna, obnovou pozice posunu ve filmografiích, automatickými migracemi Alembic a modulárním design systémem.",
      highlights: [
              "Interaktivní navigace v záhlaví okna s odkazem na domovskou stránku a přepínačem postranního panelu",
              "Spolehlivý modul pro obnovu pozice posunu na stránkách filmografií a profilů osobností",
              "Automatické provádění migrací databáze Alembic při spuštění aplikace",
              "Filtrování obsahu pro dospělé a čištění kategorií při vyhledávání torrentů přes Jackett",
              "Komplexní modularizace design systému s více než 600 izolovanými komponentami a CSS tokeny"
      ]
    },
    '1.0.0': {
      title: 'Integrace Torrentu, Hloubkový Panel Recenzí & Architektura TV Sezón',
      description: 'Hlavní vydání přinášející ovládací panel pro externí torrent klienty, univerzální vyhledávání, zásuvný panel recenzí, hierarchii TV sezón a optimalizované SQL logy.',
      highlights: [
        'Ovládací panel pro externí torrent klienty (qBittorrent a Transmission) s monitorem šířky pásma',
        'Automatická detekce na pozadí a skenování knihovny po dokončení stahování',
        'Hierarchie sezón TV seriálů a sledování průběhu pro každou epizodu',
        'Integrovaná komponenta objevování napříč TMDb, StashDB a FansDB',
        'Historie operací přejmenování s líným načítáním podrobných logů',
      ],
    },
    '0.7.0': {
      title: 'GPU Hardwarová Akcelerace & SQLite Vyrovnávací Paměť Filmografií',
      description: 'Aktualizace výkonu s GPU video náhledy NVENC/QSV, vzdálenou mezipamětí filmografií a dynamickým přidělováním portů backendu.',
      highlights: [
        'Hardwarově akcelerované FFmpeg video náhledy s automatickou detekcí NVENC/QSV/AMF',
        'Lokální SQLite mezipaměť filmografií zajišťující okamžité načítání profilů herců',
        'Automatické dynamické přidělování TCP portu při spuštění pro zamezení konfliktům',
      ],
    },
    '0.6.0': {
      title: 'Univerzální Vyhledávání v Více Zdrojích & Dohled nad Procesy',
      description: 'Rozšířené vyhledávání ve všech databázích a spolehlivá správa procesů na pozadí.',
      highlights: [
        'Konsolidované vyhledávání filmů, scén, účinkujících i studií',
        'Monitor nadřazených procesů zabraňující zanechávání osiřelých procesů na pozadí',
      ],
    },
  },
};
