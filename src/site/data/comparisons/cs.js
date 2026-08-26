export const cs = {
  filebot: {
    title: 'SWAYA vs FileBot: Moderní Mediální Centrum & Hromadný Přejmenovávač Souborů',
    metaTitle: 'Nejlepší Alternativa k FileBot pro Windows - SWAYA Hromadné Přejmenování & MPV',
    metaDescription: 'Hledáte moderní alternativu k FileBot? SWAYA přejmenovává soubory přes TMDb/StashDB, integruje offline knihovnu a 4K MPV přehrávač.',
    heroTagline: 'Více než pouhé přejmenování souborů: spravujte a užívejte si celou svou sbírku ve 4K.',
    heroSubtitle: 'FileBot exceluje v přejmenování souborů, ale SWAYA posouvá správu lokálních médií na novou úroveň. Organizace pevných disků, vizuální katalog a vestavěný 4K HDR MPV přehrávač v jedné aplikaci pro Windows.',
    competitorPricing: '$6/rok nebo $48 doživotní licence',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Potřebujete výhradně lehký nástroj příkazového řádku (CLI) pro skripty na Linuxu nebo NAS.',
      'Chcete psát pokročilé výrazy v Groovy a vlastní automatizační skripty.',
      'Již používáte externí mediální server (např. Plex nebo Kodi) a nepotřebujete vestavěný přehrávač.',
    ],
    whenToChooseSwaya: [
      'Chcete organizovat soubory na disku a okamžitě je procházet a přehrávat v jedné aplikaci.',
      'Chcete spravovat jak běžné filmy/seriály (TMDb), tak obsah pro dospělé (StashDB, FansDB).',
      'Požadujete výkonný přehrávač MPV s hardwarovou akcelerací bez nutnosti překódování.',
      'Oceňujete moderní rozhraní pro Windows s bezpečným zkušebním náhledem a ochranou před konflikty.',
    ],
    matrix: [
      { feature: 'Hromadné přejmenování a organizace souborů na disku', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Zkušební náhled (dry-run) a ochrana před konflikty', swayaNote: 'Chytrá detekce kolizí a bezpečné přepsání', competitorNote: 'Jednoduchý seznam náhledu' },
      { feature: 'Vestavěný 4K/HDR MPV video přehrávač', swayaNote: 'GPU hardwarová akcelerace, okamžité titulky a zvuk', competitorNote: 'Bez přehrávače' },
      { feature: 'Vizuální offline knihovna & detailní stránky', swayaNote: 'Plakáty, pozadí, herci, žánry, hodnocení', competitorNote: 'Bez rozhraní knihovny' },
      { feature: 'Média pro dospělé & podpora StashDB', swayaNote: 'Nativní integrace StashDB/FansDB s profily tvůrců', competitorNote: 'Pouze standardní mediální databáze' },
      { feature: 'Duální režim s PIN zámkem (SFW / NSFW)', swayaNote: 'Úplné oddělení databází a okamžitý diskrétní trezor', competitorNote: 'Nepodporováno' },
      { feature: 'Integrace torrent klienta (qBittorrent)', swayaNote: 'Automatické zpracování po stažení se zachováním seedování', competitorNote: 'Pouze přes externí CLI skripty' },
      { feature: '100% Offline & Bez nutnosti serveru', swayaNote: 'Nulové služby na pozadí, nulové otevřené porty', competitorNote: 'Lokální aplikace v Javě' },
      { feature: 'Moderní Windows UI (Bez nutnosti Javy)', swayaNote: 'Bleskurychlá nativní desktopová aplikace', competitorNote: 'Java / Swing rozhraní' },
      { feature: 'Jednorázový nákup navždy (Doživotní licence)', swayaNote: 'Zaváděcí cena €39 / €79 standardní', competitorNote: '$48 doživotně nebo $6/rok' },
    ],
    deepDives: [
      {
        title: 'Více než přejmenování: kompletní mediální zážitek',
        description: 'FileBot končí svou práci v momentě přejmenování. SWAYA okamžitě promění uspořádané soubory v bohatou knihovnu s plakáty, popisy a herci.',
      },
      {
        title: 'Vestavěný 4K HDR MPV přehrávač',
        description: 'Nepotřebujete externí přehrávače. Přehrávejte náročné soubory MKV, HDR video a vícejazyčné stopy s plnou hardwarovou akcelerací GPU.',
      },
      {
        title: 'Bezpečné sloučení běžných médií a obsahu pro dospělé',
        description: 'Díky unikátní architektuře duálního režimu můžete bezpečně a diskrétně spravovat všechny své sbírky v jedné aplikaci.',
      },
    ],
    faqs: [
      {
        q: 'Může SWAYA zcela nahradit FileBot pro filmy a anime?',
        a: 'Ano. SWAYA skenuje složky, páruje tituly přes TMDb a automaticky přejmenovává soubory podle zvolené šablony.',
      },
      {
        q: 'Mohu během organizace pokračovat v seedování torrentů?',
        a: 'Ano. Funkce "In-Place" umožňuje stáhnout metadata a obaly bez změny fyzických názvů nebo cest k souborům na disku.',
      },
      {
        q: 'Je pro běh SWAYA vyžadována Java?',
        a: 'Ne. SWAYA je samostatná aplikace pro Windows a nevyžaduje instalaci prostředí Java.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Bezzserverové 100% Offline Mediální Centrum pro Windows',
    metaTitle: 'Alternativa k Plex pro Windows (Bez Serveru, 100% Offline) - SWAYA',
    metaDescription: 'Hledáte soukromou alternativu k Plex bez nutnosti konfigurace serveru? SWAYA organizuje disky a přehrává 4K HDR v MPV bez účtů a cloudu.',
    heroTagline: 'Vaše sbírka, osvobozená od serverů, cloudových přihlašování a telemetrie.',
    heroSubtitle: 'Plex se zaměřuje na síťové streamování, ale vyžaduje trvale běžící server, cloudové účty a předplatné. SWAYA poskytuje okamžitý, 100% lokální zážitek bez zbytečné konfigurace.',
    competitorPricing: 'Zdarma / $4.99 měsíčně / $119 doživotně (Plex Pass)',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Chcete streamovat média do chytrých televizí, telefonů nebo sdílet s rodinou mimo domov.',
      'Vlastníte dedikovaný NAS server s překódováním v reálném čase pro více uživatelů.',
      'Potřebujete vzdáleně synchronizovat průběh sledování mezi zařízeními iOS, Android a Apple TV.',
    ],
    whenToChooseSwaya: [
      'Sledujete média přímo na svém počítači s Windows, notebooku nebo připojeném monitoru.',
      'Požadujete 100% soukromí (žádné účty, žádná telemetrie, žádné otevřené síťové porty).',
      'Chcete skutečně uspořádat a strukturovat fyzické soubory a složky na discích.',
      'Chcete se vyhnout problémům s načítáním, překódováním a údržbou serveru.',
    ],
    matrix: [
      { feature: '100% Offline & Bez konfigurace serveru', swayaNote: 'Bleskově spouštěná aplikace, žádné procesy na pozadí', competitorNote: 'Vyžaduje trvalý běh Plex Media Server' },
      { feature: 'Fyzická organizace souborů na discích', swayaNote: 'Skutečně uspořádá složky a názvy souborů', competitorNote: 'Pouze virtuální databáze (soubory zůstávají beze změny)' },
      { feature: 'Bez cloudových účtů / Plné soukromí', swayaNote: 'Žádná registrace, lokální SQLite databáze', competitorNote: 'Vyžaduje přihlášení k Plexu a telemetrii' },
      { feature: 'Nativní přehrávač MPV (Bez překódování)', swayaNote: 'Přehrává každý kodek v originální 4K HDR kvalitě', competitorNote: 'Časté vynucené překódování snižující kvalitu' },
      { feature: 'Média pro dospělé (StashDB) & Duální režim', swayaNote: 'Vyhrazený režim & podpora StashDB/FansDB', competitorNote: 'Vyžaduje nestabilní komunitní pluginy' },
      { feature: 'Interaktivní zkušební náhled organizéru', swayaNote: 'Náhled a úprava před fyzickým přesunem', competitorNote: 'Pouze pasivní sledování složek' },
      { feature: 'Integrace torrent klienta (Zachování seedování)', swayaNote: 'Přímé propojení s qBittorrent / Transmission', competitorNote: 'Bez vestavěné integrace' },
      { feature: 'Bez měsíčních poplatků (Doživotní licence)', swayaNote: 'Zaváděcí cena €39 jednorázově', competitorNote: 'Plex Pass $119 doživotně nebo $4.99/měsíc' },
      { feature: 'Přesné záložky & snímky snímek po snímku', swayaNote: 'Stiskněte Enter pro uložení snímku obrazovky s časem', competitorNote: 'Nepodporováno' },
      { feature: 'Nulová spotřeba prostředků po zavření', swayaNote: 'Zavření znamená 0% využití CPU a RAM', competitorNote: 'Server neustále běží na pozadí' },
    ],
    deepDives: [
      {
        title: 'Bez zátěže serverem a bez otevřených portů',
        description: 'Plex vyžaduje neustále běžící služby na pozadí. SWAYA startuje za 1 sekundu a po zavření okna nespotřebovává žádné systémové prostředky.',
      },
      {
        title: 'Skutečné uspořádání disků, nejen virtuální vrstva',
        description: 'Plex pouze překrývá chaos ve složkách virtuální vrstvou. SWAYA uspořádá soubory a složky přímo na vašem pevném disku.',
      },
    ],
    faqs: [
      {
        q: 'Proč zvolit SWAYA místo Plexu?',
        a: 'Vyhnete se instalaci serverů, nemusíte si zakládat účet, přehráváte 4K bez záseků a uspořádáte fyzické soubory na discích.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager (tmm): Moderní Správce Médií & 4K Přehrávač',
    metaTitle: 'Alternativa k tinyMediaManager (tmm) pro Windows - SWAYA',
    metaDescription: 'Hledáte alternativu k tinyMediaManager? SWAYA nabízí moderní rozhraní bez Javy, rychlé přejmenování a 4K MPV přehrávač.',
    heroTagline: 'Místo těžkopádných nástrojů v Javě — moderní pracovní stanice s GPU akcelerací.',
    heroSubtitle: 'tinyMediaManager je výkonný generátor NFO souborů, ale chybí mu vestavěný video přehrávač a má zastaralé rozhraní. SWAYA kombinuje intuitivní správu, přejmenování a 4K přehrávání.',
    competitorPricing: '€10 ročně (PRO)',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Hlavním cílem je generování komplexních XML/NFO souborů pro Kodi nebo mediální servery.',
      'Potřebujete nástroj běžící identicky na Linuxu a macOS prostřednictvím Javy.',
    ],
    whenToChooseSwaya: [
      'Chcete rychlé, moderní rozhraní pro Windows s plynulými animacemi.',
      'Chcete ihned přehrávat organizovaná média ve 4K HDR bez externích programů.',
      'Chcete bezpečně a odděleně spravovat běžná média a obsah pro dospělé.',
    ],
    matrix: [
      { feature: 'Moderní rozhraní & GPU akcelerace', swayaNote: 'Plynulé, responzivní desktopové prostředí', competitorNote: 'Klasické Java Swing rozhraní' },
      { feature: 'Vestavěný video přehrávač', swayaNote: 'MPV 4K HDR přehrávač s GPU akcelerací', competitorNote: 'Bez přehrávače' },
      { feature: 'Média pro dospělé (StashDB, FansDB)', swayaNote: 'Vyhrazený režim a specializované databáze', competitorNote: 'Bez vestavěné podpory' },
      { feature: 'Licenční model', swayaNote: '€39 jednorázový nákup navždy', competitorNote: '€10/rok předplatné' },
    ],
    deepDives: [
      {
        title: 'Od generátoru NFO ke kompletnímu mediálnímu centru',
        description: 'tinyMediaManager se zaměřuje především na soubory metadat. SWAYA je soběstačné řešení od organizace souborů až po sledování a recenze.',
      },
    ],
    faqs: [
      {
        q: 'Může SWAYA organizovat složky podle standardů Plex/Jellyfin?',
        a: 'Ano. SWAYA automaticky ukládá soubory do oficiální struktury složek vyžadované Plexem a Jellyfinem.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Soukromé Mediální Centrum & 4K Přehrávač',
    metaTitle: 'Alternativa k StashApp pro Windows (Bez Serveru) - SWAYA',
    metaDescription: 'Alternativa k StashApp bez lokálního webového serveru. SWAYA nabízí integraci StashDB, profily herců, 4K MPV přehrávání a diskrétní trezor.',
    heroTagline: 'Bez lokálních webových serverů: jedna samostatná desktopová aplikace.',
    heroSubtitle: 'StashApp je skvělý open-source nástroj, ale vyžaduje spuštěný lokální server na pozadí a prohlížeč. SWAYA je 100% samostatná aplikace pro Windows s maximálním soukromím.',
    competitorPricing: 'Zdarma (Open Source)',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Instalujete software na domácí Linux server pro přístup přes webový prohlížeč.',
      'Chcete sami upravovat a kompilovat zdrojový kód.',
    ],
    whenToChooseSwaya: [
      'Dáváte přednost rychlé aplikaci pro Windows, která startuje za 1 sekundu bez služeb na pozadí.',
      'Potřebujete diskrétní klávesovou zkratku pro okamžité skrytí soukromých sbírek.',
      'Chcete spravovat filmy (TMDb) i média pro dospělé (StashDB) v jednom nástroji.',
    ],
    matrix: [
      { feature: 'Architektura', swayaNote: '100% samostatná desktopová aplikace (0 serverů)', competitorNote: 'Lokální webový server + prohlížeč' },
      { feature: 'Duální režim (Mainstream & Adult)', swayaNote: 'TMDb i StashDB v jedné aplikaci', competitorNote: 'Pouze obsah pro dospělé' },
      { feature: 'Diskrétní Trezor Soukromí', swayaNote: 'Zkratka (Ctrl+Alt+H/Esc) pro okamžité skrytí', competitorNote: 'Pouze ochrana heslem' },
      { feature: 'Vestavěný přehrávač', swayaNote: 'MPV přehrávač s hardwarovou akcelerací', competitorNote: 'Standardní HTML5 přehrávač v prohlížeči' },
    ],
    deepDives: [
      {
        title: 'Maximální soukromí na ploše bez serverů',
        description: 'Se SWAYA nemusíte otevírat prohlížeč ani konfigurovat porty. Vše zůstává bezpečné a izolované v nativním prostředí Windows.',
      },
    ],
    faqs: [
      {
        q: 'Mohu v aplikaci SWAYA použít svůj API klíč StashDB?',
        a: 'Ano. V nastavení na záložce Scrapers můžete zadat klíče pro StashDB, FansDB i ThePornDB.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: 100% Offline Mediální Centrum pro Windows',
    metaTitle: 'Alternativa k Jellyfin pro Windows (Offline Přístup) - SWAYA',
    metaDescription: 'Bezzserverová alternativa k Jellyfin. Organizujte soubory na discích, procházejte offline katalog a přehrávejte 4K HDR v MPV.',
    heroTagline: 'Místo streamovacích serverů — nejlepší offline zážitek pro vaše PC.',
    heroSubtitle: 'Jellyfin je vynikající streamovací server, ale pro uživatele sledující filmy přímo na počítači přináší zbytečnou složitost. SWAYA je optimalizována pro lokální přehrávání.',
    competitorPricing: 'Zdarma (Open Source)',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Chcete streamovat média do televizí nebo mobilních zařízení v domácí síti.',
      'Sdílíte svou knihovnu s více členy domácnosti.',
    ],
    whenToChooseSwaya: [
      'Sledujete filmy a seriály přímo na svém počítači nebo připojené obrazovce v nejvyšší kvalitě.',
      'Chcete uspořádat názvy fyzických souborů na discích.',
      'Nechcete se zabývat údržbou serveru ani síťovými nastaveními.',
    ],
    matrix: [
      { feature: 'Účel použití', swayaNote: 'Samostatná offline desktopová aplikace', competitorNote: 'Klientsko-serverová streamovací platforma' },
      { feature: 'Přejmenování souborů', swayaNote: 'Automatický hromadný organizér založený na TMDb', competitorNote: 'Bez funkce přejmenování souborů' },
      { feature: 'Kvalita přehrávání', swayaNote: 'Nativní MPV přehrávání s hardwarovou akcelerací', competitorNote: 'Závislé na síti a překódování' },
    ],
    deepDives: [
      {
        title: 'Optimalizováno pro uživatele stolních PC',
        description: 'Když sledujete filmy přímo na monitoru, nativní aplikace s přímým přístupem k GPU je mnohem rychlejší a stabilnější než webový mediální server.',
      },
    ],
    faqs: [
      {
        q: 'Budou složky uspořádané aplikací SWAYA fungovat v Jellyfinu?',
        a: 'Ano. SWAYA používá oficiální strukturu složek Plex/Jellyfin, takže je zajištěna 100% kompatibilita.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Moderní Mediální Centrum & Správce Souborů pro Windows',
    metaTitle: 'Alternativa k Kodi pro Windows - SWAYA Mediální Centrum',
    metaDescription: 'Hledáte moderní desktopové mediální centrum místo televizního rozhraní? SWAYA je optimalizována pro myš a klávesnici.',
    heroTagline: 'Místo rozhraní pro dálkový ovladač — moderní pracovní stanice pro myš a klávesnici.',
    heroSubtitle: 'Kodi bylo navrženo pro televizní obrazovky a dálkové ovladače, což na počítači bývá nepohodlné. SWAYA nabízí moderní a přehledné rozhraní vytvořené speciálně pro uživatele PC.',
    competitorPricing: 'Zdarma (Open Source)',
    swayaPricing: 'Zaváděcí cena €39 doživotní licence (standardně €79)',
    whenToChooseCompetitor: [
      'Používáte Raspberry Pi nebo HTPC připojené k televizi s dálkovým ovladačem.',
      'Chcete konfigurovat řadu doplňků a vlastních vzhledů od komunity.',
    ],
    whenToChooseSwaya: [
      'Používáte počítač s myší a klávesnicí a záleží vám na rychlém a čistém rozhraní.',
      'Chcete hromadně přejmenovávat soubory a okamžitě přehrávat 4K MPV v jedné aplikaci.',
    ],
    matrix: [
      { feature: 'Uživatelské rozhraní', swayaNote: 'Optimalizováno pro myš a klávesnici', competitorNote: '10-foot rozhraní pro televizní ovladač' },
      { feature: 'Fyzické přejmenování souborů', swayaNote: 'Vestavěný inteligentní hromadný organizér', competitorNote: 'Bez funkce správy souborů' },
      { feature: 'Snadnost konfigurace', swayaNote: 'Připraveno k práci za 1 sekundu po instalaci', competitorNote: 'Komplikované nastavení doplňků a scraperů' },
    ],
    deepDives: [
      {
        title: 'Vytvořeno pro pokročilé uživatele počítačů',
        description: 'Místo procházení složitých televizních nabídek využijte plynulé posouvání, klávesové zkratky a přetahování myší.',
      },
    ],
    faqs: [
      {
        q: 'Je nastavení SWAYA jednodušší než u Kodi?',
        a: 'Ano. SWAYA nevyžaduje složité doplňky ani XML soubory a funguje ihned po instalaci.',
      },
    ],
  },
};
