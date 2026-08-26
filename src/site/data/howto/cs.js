export const cs = {
  'getting-started': {
    name: 'Jak nainstalovat a nastavit mediální centrum SWAYA',
    description: 'Návod krok za krokem k instalaci ve Windows, výběru složek a vytvoření offline knihovny.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Stažení a Instalace',
        text: 'Nainstalujte a spusťte desktopovou aplikaci SWAYA v systému Windows 10 nebo 11.',
      },
      {
        name: 'Výběr Adresářů Úložiště',
        text: 'V nastavení zadejte složky stahování a cílové složky knihovny médií.',
      },
      {
        name: 'Skenování a Párování Médií',
        text: 'Otevřete Organizér pro prohledání souborů a automatické stažení metadat a plakátů.',
      },
    ],
  },
  'organizer': {
    name: 'Jak automaticky hromadně přejmenovávat a organizovat soubory',
    description: 'Automatické párování s TMDb a StashDB pro bezpečné uspořádání souborů bez duplicit.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Výběr Zdrojové Složky',
        text: 'Otevřete Organizér SWAYA a vyberte složku s neuspořádanými staženými soubory.',
      },
      {
        name: 'Automatické Párování Metadat',
        text: 'Prohledejte databáze TMDb, OMDb a StashDB pro automatické rozpoznání názvů filmů a seriálů.',
      },
      {
        name: 'Ruční Úprava Párování',
        text: 'V případě potřeby upravte názvy, štítky verzí nebo čísla epizod v panelu přepsání.',
      },
      {
        name: 'Přejmenování nebo Uspořádání In-Place',
        text: 'Zvolte Rename pro vytvoření struktury složek dle Plex/Jellyfin, nebo Organize In-Place pro ponechání souborů na stávajícím místě.',
      },
    ],
  },
  'dashboard': {
    name: 'Jak používat Ovládací Panel k pokračování ve sledování a objevování',
    description: 'Bleskové pokračování v přehrávání a procházení doporučeného obsahu.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Pokračovat ve Sledování',
        text: 'Klikněte na položku v řadě "Pokračovat ve sledování" pro obnovení přehrávání z přesného bodu zastavení.',
      },
      {
        name: 'Procházení Bannerů a Objevů',
        text: 'Objevujte vybrané bannery, nedávno uspořádané soubory a nejlépe hodnocené filmy.',
      },
    ],
  },
  'library': {
    name: 'Jak procházet a filtrovat katalog médií v aplikaci SWAYA',
    description: 'Využijte hardwarově akcelerovanou mřížku a vícerozměrné filtry k procházení sbírky.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Změna Zobrazení a Velikosti Mřížky',
        text: 'Přepínejte mezi mřížkou plakátů a tabulkovým zobrazením a upravte velikost karet.',
      },
      {
        name: 'Použití Filtrů',
        text: 'Filtrujte podle 4K rozlišení, roku vydání, hodnocení a štítků pro rychlé nalezení požadovaných médií.',
      },
    ],
  },
  'details': {
    name: 'Jak zobrazit detaily filmů, epizody a obsazení',
    description: 'Výběr obrázků na pozadí, procházení TV sezón a kontrola filmografií herců.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Otevření Detailu Média',
        text: 'Kliknutím na plakát zobrazíte 4K pozadí, synopsu děje a technické parametry video streamu.',
      },
      {
        name: 'Prohlížení Herců a Tvůrců',
        text: 'Kliknutím na profil herce okamžitě zobrazíte další filmy s jeho účastí ve vaší knihovně.',
      },
    ],
  },
  'player': {
    name: 'Jak přehrávat 4K HDR video a konfigurovat titulky v MPV',
    description: 'Využití hardwarové akcelerace GPU, zvukových stop a synchronizace titulků.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Spuštění Přehrávání',
        text: 'Klikněte na tlačítko přehrávání u libovolného videa pro spuštění integrovaného MPV přehrávače.',
      },
      {
        name: 'Přepínání Zvuku a Titulků',
        text: 'Vybírejte zvukové stopy a přesně upravujte synchronizaci a velikost písma titulků.',
      },
    ],
  },
  'search': {
    name: 'Jak používat Univerzální Vyhledávání se zkratkou (Ctrl+K)',
    description: 'Současné vyhledávání v lokální knihovně i online databázích.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Otevření Vyhledávacího Panelu',
        text: 'Stiskněte Ctrl+K na klávesnici nebo klikněte na vyhledávací pole.',
      },
      {
        name: 'Hledání Titulů a Osob',
        text: 'Zadejte dotaz pro okamžité nalezení odpovídajících filmů, seriálů i herců.',
      },
    ],
  },
  'lists': {
    name: 'Jak vytvářet vlastní seznamy a tematické sbírky',
    description: 'Vytváření sbírek s automatickými kolážemi ze 4 plakátů.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Vytvoření Nového Seznamu',
        text: 'Přejděte na záložku Seznamy a vytvořte novou sbírku s vlastním názvem a popisem.',
      },
      {
        name: 'Přidání Titulů a Náhled Koláže',
        text: 'Přidávejte filmy a zkontrolujte dynamicky vygenerovaný kolážový obal.',
      },
    ],
  },
  'ratings': {
    name: 'Jak udělovat 10hvězdičková hodnocení a psát Markdown recenze',
    description: 'Ukládání zcela soukromých hodnocení a formátovaných recenzí.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Udělení Hodnocení a Přidání k Oblíbeným',
        text: 'Zvolte počet hvězdiček na škále 1-10 a klikněte na ikonu srdce pro přidání k oblíbeným.',
      },
      {
        name: 'Psaní Markdown Recenze',
        text: 'Otevřete panel recenzí a uložte si soukromé poznámky s formátováním Markdown.',
      },
    ],
  },
  'history': {
    name: 'Jak prohlížet a spravovat historii sledování',
    description: 'Sledování časové osy přehrávání a správa stavu zhlédnutí.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Zobrazení Historie',
        text: 'V záložce Historie kontrolujte chronologický seznam přehrávání a body obnovení.',
      },
    ],
  },
  'statistics': {
    name: 'Jak analyzovat statistiky knihovny a využití disků',
    description: 'Přehled kodeků, žánrů a celkové doby sledování.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Otevření Panelu Statistik',
        text: 'V záložce Statistika analyzujte grafy úložiště, podíl 4K HDR a oblíbené žánry.',
      },
    ],
  },
  'settings': {
    name: 'Jak nakonfigurovat SWAYA a zadat API klíče',
    description: 'Šablony struktur složek, zkratky diskrétního trezoru a integrace TMDb/StashDB.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Zadání API Klíčů',
        text: 'V Nastavení > Scrapers zadejte API klíče pro automatické vyhledávání.',
      },
      {
        name: 'Přizpůsobení Šablony Názvů',
        text: 'V záložce Organization určete preferovaný formát složek a názvů souborů.',
      },
    ],
  },
  'torrent': {
    name: 'Jak propojit qBittorrent pro automatické zpracování souborů',
    description: 'Integrace s torrent klientem a automatické skenování po dokončení stahování.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Připojení k WebUI',
        text: 'V Nastavení > Torrent zadejte přístupové údaje k WebUI vašeho torrent klienta.',
      },
      {
        name: 'Povolení Automatického Zpracování',
        text: 'Nakonfigurujte automatickou detekci dokončených stahování správcem souborů.',
      },
    ],
  },
};
