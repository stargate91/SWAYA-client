export const sv = {
  filebot: {
    title: 'SWAYA vs FileBot: Modernt Mediacenter & Smart Massnamnändrare',
    metaTitle: 'Bästa FileBot-alternativet för Windows - SWAYA Massnamnändring & MPV',
    metaDescription: 'Letar du efter ett modernt alternativ till FileBot? SWAYA byter namn på filer via TMDb/StashDB och kombinerar offline-bibliotek med 4K MPV-spelare.',
    heroTagline: 'Mer än bara filnamnändring: hantera och njut av hela din samling i 4K.',
    heroSubtitle: 'FileBot är utmärkt för namnändring, men SWAYA tar lokal mediehantering till nästa nivå. Diskorganisering, visuell katalog och inbyggd 4K HDR MPV-spelare i ett och samma Windows-program.',
    competitorPricing: '$6/år eller $48 livstidslicens',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Du behöver uteslutande ett lättviktigt kommandoradsverktyg (CLI) för skript på Linux eller NAS.',
      'Du vill skriva avancerade Groovy-uttryck och egna automatiseringsskript.',
      'Du använder redan en extern medieserver (t.ex. Plex eller Kodi) och behöver ingen inbyggd videospelare.',
    ],
    whenToChooseSwaya: [
      'Du vill organisera filer på hårddisken och omedelbart kunna bläddra och spela upp i samma app.',
      'Du vill hantera både vanliga filmer/serier (TMDb) och vuxeninnehåll (StashDB, FansDB).',
      'Du vill ha en högpresterande MPV-spelare med hårdvaruacceleration utan omkodning.',
      'Du uppskattar ett modernt Windows-gränssnitt med säker förhandsgranskning och filkonfliktskydd.',
    ],
    matrix: [
      { feature: 'Massnamnändring och filorganisering på disk', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Förhandsgranskning (dry-run) & konfliktskydd', swayaNote: 'Smart kollisionsdetektering och säker ersättning', competitorNote: 'Enkel förhandsgranskningslista' },
      { feature: 'Inbyggd 4K/HDR MPV-videospelare', swayaNote: 'GPU-hårdvaruacceleration, omedelbara undertexter och ljud', competitorNote: 'Ingen videospelare' },
      { feature: 'Visuellt offline-bibliotek & detaljsidor', swayaNote: 'Affischer, bakgrunder, skådespelare, genrer, betyg', competitorNote: 'Inget biblioteksgränssnitt' },
      { feature: 'Vuxenmedier & StashDB-stöd', swayaNote: 'Nativ integration med StashDB/FansDB och skådespelarprofiler', competitorNote: 'Endast standardmediedatabaser' },
      { feature: 'Dubbelläge med PIN-lås (SFW / NSFW)', swayaNote: 'Total databasseparation och omedelbart diskret valv', competitorNote: 'Stöds inte' },
      { feature: 'Torrent-klientintegration (qBittorrent)', swayaNote: 'Automatisk bearbetning efter nedladdning med bevarad seedning', competitorNote: 'Endast via externa CLI-skript' },
      { feature: '100% Offline & Inget serverkrav', swayaNote: 'Noll bakgrundstjänster, noll öppna portar', competitorNote: 'Lokalt Java-program' },
      { feature: 'Modernt Windows-gränssnitt (Inget Java krävs)', swayaNote: 'Blixtsnabbt nativt skrivbordsprogram', competitorNote: 'Java / Swing-gränssnitt' },
      { feature: 'Engångsköp för alltid (Livstidslicens)', swayaNote: 'Lanseringspris €39 / ordinarie €79', competitorNote: '$48 livstid eller $6/år' },
    ],
    deepDives: [
      {
        title: 'Mer än namnändring: en komplett medieupplevelse',
        description: 'FileBot avslutar sitt jobb när filerna bytt namn. SWAYA förvandlar omedelbart de organiserade filerna till ett rikt bibliotek med affischer, beskrivningar och skådespelare.',
      },
      {
        title: 'Inbyggd 4K HDR MPV-spelare',
        description: 'Du behöver inga externa spelare. Spela upp krävande MKV-filer, HDR-videor och flerspråkiga spår med full GPU-hårdvaruacceleration.',
      },
      {
        title: 'Säker hantering av allmänna medier och vuxeninnehåll',
        description: 'Tack vare den unika dubbellägesarkitekturen kan du hantera alla dina samlingar tryggt och diskret i ett och samma program.',
      },
    ],
    faqs: [
      {
        q: 'Kan SWAYA helt ersätta FileBot för filmer och anime?',
        a: 'Ja. SWAYA söker igenom mappar, matchar titlar via TMDb och byter automatiskt namn på filerna enligt din valda mall.',
      },
      {
        q: 'Kan jag fortsätta seeda torrents under organiseringen?',
        a: 'Ja. Funktionen "In-Place" låter dig hämta metadata och omslag utan att ändra fysiska filnamn eller sökvägar på hårddisken.',
      },
      {
        q: 'Krävs Java för att köra SWAYA?',
        a: 'Nej. SWAYA är ett fristående Windows-program och kräver ingen Java-installation.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Serverlöst 100% Offline Mediacenter för Windows',
    metaTitle: 'Plex-alternativ för Windows (Serverlöst, 100% Offline) - SWAYA',
    metaDescription: 'Letar du efter ett privat Plex-alternativ utan serverkonfiguration? SWAYA organiserar dina hårddiskar och spelar 4K HDR i MPV utan konton eller moln.',
    heroTagline: 'Din samling, fri från servrar, molninloggningar och telemetri.',
    heroSubtitle: 'Plex fokuserar på nätverksströmning, men kräver en permanent server, molnkonton och prenumerationer. SWAYA ger en omedelbar, 100% lokal upplevelse utan onödig konfiguration.',
    competitorPricing: 'Gratis / $4.99 per månad / $119 livstid (Plex Pass)',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Du vill strömma medier till smart-TV, telefoner eller dela med familj utanför hemmet.',
      'Du har en dedikerad NAS-server med realtidsomkodning för flera användare.',
      'Du behöver synkronisera uppspelningsframsteg mellan iOS, Android och Apple TV.',
    ],
    whenToChooseSwaya: [
      'Du tittar på medier direkt på din Windows-dator, bärbara dator eller anslutna bildskärm.',
      'Du kräver 100% integritet (inga konton, ingen telemetri, inga öppna nätverksportar).',
      'Du vill faktiskt organisera och strukturera de fysiska filerna och mapparna på hårddiskarna.',
      'Du vill slippa problem med buffring, omkodning och serverunderhåll.',
    ],
    matrix: [
      { feature: '100% Offline & Ingen serverkonfiguration', swayaNote: 'Blixtsnabb appstart, inga bakgrundsprocesser', competitorNote: 'Kräver att Plex Media Server körs kontinuerligt' },
      { feature: 'Fysisk filorganisering på hårddiskar', swayaNote: 'Strukturerar faktiskt mappar och filnamn', competitorNote: 'Endast virtuell databas (filer förblir orörda)' },
      { feature: 'Inga molnkonton / Total integritet', swayaNote: 'Ingen registrering, lokal SQLite-databas', competitorNote: 'Kräver Plex-inloggning och telemetri' },
      { feature: 'Nativ MPV-spelare (Ingen omkodning)', swayaNote: 'Spelar alla kodekar i 4K HDR originalkvalitet', competitorNote: 'Ofta påtvingad omkodning som försämrar kvaliteten' },
      { feature: 'Vuxenmedier (StashDB) & Dubbelläge', swayaNote: 'Dedikerat läge & stöd för StashDB/FansDB', competitorNote: 'Kräver instabila tredjeparts-plugins' },
      { feature: 'Interaktiv förhandsgranskning (dry-run)', swayaNote: 'Granska och justera innan fysisk flytt', competitorNote: 'Endast passiv mappövervakning' },
      { feature: 'Torrent-integration (Bevarad seedning)', swayaNote: 'Direktanslutning till qBittorrent / Transmission', competitorNote: 'Ingen inbyggd integration' },
      { feature: 'Inga månadsavgifter (Livstidslicens)', swayaNote: 'Lanseringspris €39 som engångsköp', competitorNote: 'Plex Pass $119 livstid eller $4.99/mån' },
      { feature: 'Exakta bokmärken & bildrute-skärmdumpar', swayaNote: 'Tryck Enter för att spara skärmdump med tidsstämpel', competitorNote: 'Stöds inte' },
      { feature: 'Noll resursförbrukning när appen stängs', swayaNote: 'Stängning innebär 0% CPU- och RAM-användning', competitorNote: 'Servern körs ständigt i bakgrunden' },
    ],
    deepDives: [
      {
        title: 'Ingen serverbelastning och inga öppna portar',
        description: 'Plex kräver ständiga bakgrundstjänster. SWAYA startar på 1 sekund och förbrukar inga systemresurser när fönstret stängs.',
      },
      {
        title: 'Verklig filorganisering, inte bara ett virtuellt lager',
        description: 'Plex lägger bara ett virtuellt lager över en rörig mappstruktur. SWAYA organiserar filerna och mapparna direkt på din hårddisk.',
      },
    ],
    faqs: [
      {
        q: 'Varför välja SWAYA istället för Plex?',
        a: 'Du slipper installera servrar, behöver inte skapa konto, spelar upp 4K utan lagg och organiserar fysiska filer på dina diskar.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager (tmm): Modern Medieorganisatör & 4K-spelare',
    metaTitle: 'Alternativ till tinyMediaManager (tmm) för Windows - SWAYA',
    metaDescription: 'Letar du efter ett alternativ till tinyMediaManager? SWAYA erbjuder ett modernt gränssnitt utan Java, snabb namnändring och 4K MPV-spelare.',
    heroTagline: 'Istället för tunga Java-verktyg — en modern arbetsstation med GPU-acceleration.',
    heroSubtitle: 'tinyMediaManager är en kraftfull NFO-skapare, men saknar inbyggd videospelare och har ett föråldrat gränssnitt. SWAYA kombinerar intuitiv hantering, namnändring och 4K-uppspelning.',
    competitorPricing: '€10 årligen (PRO)',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Huvudsyftet är att generera komplexa XML/NFO-filer för Kodi eller medieservrar.',
      'Du behöver ett verktyg som körs identiskt på Linux och macOS via Java.',
    ],
    whenToChooseSwaya: [
      'Du vill ha ett snabbt, modernt Windows-gränssnitt med mjuka animationer.',
      'Du vill spela upp organiserade medier direkt i 4K HDR utan externa program.',
      'Du vill hantera allmänna medier och vuxeninnehåll säkert och separat.',
    ],
    matrix: [
      { feature: 'Modernt gränssnitt & GPU-acceleration', swayaNote: 'Snabbt, responsivt skrivbordsgränssnitt', competitorNote: 'Klassiskt Java Swing-gränssnitt' },
      { feature: 'Inbyggd videospelare', swayaNote: 'MPV 4K HDR-spelare med GPU-acceleration', competitorNote: 'Ingen videospelare' },
      { feature: 'Vuxenmedier (StashDB, FansDB)', swayaNote: 'Dedikerat läge och specialiserade databaser', competitorNote: 'Inget inbyggt stöd' },
      { feature: 'Licensmodell', swayaNote: '€39 engångsköp för alltid', competitorNote: '€10/år prenumeration' },
    ],
    deepDives: [
      {
        title: 'Från NFO-generator till komplett mediecenter',
        description: 'tinyMediaManager fokuserar främst på metadatafiler. SWAYA är en komplett lösning från filorganisering till visning och recensioner.',
      },
    ],
    faqs: [
      {
        q: 'Kan SWAYA organisera mappar enligt Plex/Jellyfin-standard?',
        a: 'Ja. SWAYA strukturerar automatiskt filer i den officiella mappstruktur som krävs av Plex och Jellyfin.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Privat Mediecenter & 4K-spelare för Windows',
    metaTitle: 'Alternativ till StashApp för Windows (Serverlöst) - SWAYA',
    metaDescription: 'Ett alternativ till StashApp utan lokal webbserver. SWAYA erbjuder StashDB-integration, skådespelarprofiler, 4K MPV-uppspelning och diskret valv.',
    heroTagline: 'Inga lokala webbservrar: ett enda självständigt skrivbordsprogram.',
    heroSubtitle: 'StashApp är ett utmärkt öppen källkod-verktyg, men kräver en lokal server i bakgrunden och en webbläsare. SWAYA är ett 100% självständigt Windows-program med maximal integritet.',
    competitorPricing: 'Gratis (Öppen källkod)',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Du installerar programmet på en Linux-hemmaserver för åtkomst via webbläsare.',
      'Du vill modifiera och kompilera källkoden själv.',
    ],
    whenToChooseSwaya: [
      'Du föredrar en snabb Windows-app som startar på 1 sekund utan bakgrundstjänster.',
      'Du behöver ett diskret snabbkommando för att omedelbart dölja privata samlingar.',
      'Du vill hantera filmer (TMDb) och vuxenmedier (StashDB) i ett och samma verktyg.',
    ],
    matrix: [
      { feature: 'Arkitektur', swayaNote: '100% självständigt skrivbordsprogram (0 servrar)', competitorNote: 'Lokal webbserver + webbläsare' },
      { feature: 'Dubbelläge (Mainstream & Adult)', swayaNote: 'TMDb och StashDB i samma program', competitorNote: 'Endast vuxeninnehåll' },
      { feature: 'Diskret Valv', swayaNote: 'Snabbkommando (Ctrl+Alt+H/Esc) för omedelbar döljning', competitorNote: 'Endast lösenordsskydd' },
      { feature: 'Inbyggd spelare', swayaNote: 'MPV-spelare med hårdvaruacceleration', competitorNote: 'Standard HTML5-spelare i webbläsare' },
    ],
    deepDives: [
      {
        title: 'Maximal integritet på skrivbordet utan servrar',
        description: 'Med SWAYA slipper du öppna webbläsaren eller konfigurera portar. Allt förblir säkert och isolerat i den nativa Windows-miljön.',
      },
    ],
    faqs: [
      {
        q: 'Kan jag använda min StashDB API-nyckel i SWAYA?',
        a: 'Ja. I inställningarna under fliken Scrapers kan du ange API-nycklar för StashDB, FansDB och ThePornDB.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: 100% Offline Mediacenter för Windows',
    metaTitle: 'Alternativ till Jellyfin för Windows (Offline-fokus) - SWAYA',
    metaDescription: 'Serverlöst alternativ till Jellyfin. Organisera filer på diskarna, bläddra i offline-katalogen och spela 4K HDR i MPV.',
    heroTagline: 'Istället för strömningsservrar — den bästa offline-upplevelsen för din PC.',
    heroSubtitle: 'Jellyfin är en fantastisk strömningsserver, men för användare som tittar direkt på datorn medför den onödig komplexitet. SWAYA är optimerat för lokal uppspelning.',
    competitorPricing: 'Gratis (Öppen källkod)',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Du vill strömma medier till TV-apparater eller mobila enheter i hemnätverket.',
      'Du delar ditt bibliotek med flera personer i hushållet.',
    ],
    whenToChooseSwaya: [
      'Du tittar på filmer och serier direkt på din dator eller anslutna bildskärm i högsta kvalitet.',
      'Du vill organisera fysiska filnamn på dina hårddiskar.',
      'Du vill slippa serverunderhåll och nätverksinställningar.',
    ],
    matrix: [
      { feature: 'Användningsområde', swayaNote: 'Fristående offline-skrivbordsprogram', competitorNote: 'Klient-server strömningsplattform' },
      { feature: 'Filnamnändring', swayaNote: 'Automatisk massorganisatör baserad på TMDb', competitorNote: 'Ingen funktion för filnamnändring' },
      { feature: 'Uppspelningskvalitet', swayaNote: 'Nativ MPV-uppspelning med hårdvaruacceleration', competitorNote: 'Beroende av nätverk och omkodning' },
    ],
    deepDives: [
      {
        title: 'Optimerat för PC-användare',
        description: 'När du tittar direkt på bildskärmen ger ett nativt program med direkt GPU-åtkomst en betydligt snabbare och stabilare upplevelse än en webbaserad server.',
      },
    ],
    faqs: [
      {
        q: 'Fungerar mappar organiserade av SWAYA i Jellyfin?',
        a: 'Ja. SWAYA använder den officiella mappstrukturen för Plex/Jellyfin, vilket garanterar 100% kompatibilitet.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Modernt Mediacenter & Filorganisatör för Windows',
    metaTitle: 'Alternativ till Kodi för Windows - SWAYA Mediacenter',
    metaDescription: 'Letar du efter ett modernt skrivbordsmediacenter istället för ett TV-gränssnitt? SWAYA är optimerat för mus och tangentbord.',
    heroTagline: 'Istället för fjärrkontrollsgränssnitt — en modern arbetsstation för mus och tangentbord.',
    heroSubtitle: 'Kodi är designat för TV-skärmar och fjärrkontroller, vilket kan vara osmidigt på en PC. SWAYA erbjuder ett modernt, avskalat gränssnitt skapat specifikt för datoranvändare.',
    competitorPricing: 'Gratis (Öppen källkod)',
    swayaPricing: 'Lanseringspris €39 livstidslicens (ordinarie €79)',
    whenToChooseCompetitor: [
      'Du använder en Raspberry Pi eller HTPC ansluten till en TV med fjärrkontroll.',
      'Du vill konfigurera många tillägg och anpassade teman från communityn.',
    ],
    whenToChooseSwaya: [
      'Du använder en dator med mus och tangentbord och vill ha ett snabbt, rent gränssnitt.',
      'Du vill massbyta namn på filer och omedelbart spela 4K MPV i samma app.',
    ],
    matrix: [
      { feature: 'Användargränssnitt', swayaNote: 'Optimerat för mus och tangentbord', competitorNote: '10-foot TV-gränssnitt för fjärrkontroll' },
      { feature: 'Fysisk filnamnändring', swayaNote: 'Inbyggd smart massorganisatör', competitorNote: 'Ingen filhanteringsfunktion' },
      { feature: 'Enkel konfiguration', swayaNote: 'Körklart på 1 sekund efter installation', competitorNote: 'Komplex konfigurering av tillägg och skrapor' },
    ],
    deepDives: [
      {
        title: 'Skapat för avancerade datoranvändare',
        description: 'Istället för att navigera genom krångliga TV-menyer drar du nytta av mjuk skrollning, snabbkommandon och dra-och-släpp.',
      },
    ],
    faqs: [
      {
        q: 'Är SWAYA enklare att konfigurera än Kodi?',
        a: 'Ja. SWAYA kräver inga komplicerade tillägg eller XML-filer och fungerar direkt från start.',
      },
    ],
  },
};
