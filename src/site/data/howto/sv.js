export const sv = {
  'getting-started': {
    name: 'Hur man installerar och konfigurerar SWAYA mediacenter',
    description: 'Steg-för-steg-guide för Windows-installation, val av mappar och skapande av ett offline-bibliotek.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Ladda ner och Installera',
        text: 'Installera och starta SWAYA skrivbordsapplikation på Windows 10 eller 11.',
      },
      {
        name: 'Välj Lagringsmappar',
        text: 'Ange dina nedladdningsmappar samt målmappar för mediebiblioteket i inställningarna.',
      },
      {
        name: 'Skanna och Matcha Medier',
        text: 'Öppna organisatören för att söka igenom filer och automatiskt hämta metadata och affischer.',
      },
    ],
  },
  'organizer': {
    name: 'Hur man automatiskt massbyter namn och organiserar filer',
    description: 'Automatisk matchning mot TMDb och StashDB för säker filorganisering utan dubbletter.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Välj Källmapp',
        text: 'Öppna SWAYA filorganisatör och välj mappen med oorganiserade nedladdningar.',
      },
      {
        name: 'Automatisk Metadatamatchning',
        text: 'Sök igenom TMDb, OMDb och StashDB för att automatiskt identifiera film- och serietitlar.',
      },
      {
        name: 'Manuell Finjustering',
        text: 'Justera vid behov titlar, versionsetiketter eller avsnittsnummer i åsidosättningspanelen.',
      },
      {
        name: 'Byt Namn eller In-Place-organisera',
        text: 'Välj Rename för att skapa en standardiserad Plex/Jellyfin-mappstruktur, eller Organize In-Place för att behålla filernas befintliga placering.',
      },
    ],
  },
  'dashboard': {
    name: 'Hur man använder Översikten för att återuppta och upptäcka',
    description: 'Återuppta uppspelning och utforska rekommenderat medieinnehåll.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Fortsätt Titta',
        text: 'Klicka på en titel under "Fortsätt titta" för att återuppta uppspelningen från exakt där du slutade.',
      },
      {
        name: 'Utforska Banners och Flöden',
        text: 'Upptäck utvalda banners, nyligen tillagda filer och högt rankade filmer.',
      },
    ],
  },
  'library': {
    name: 'Hur man bläddrar och filtrerar mediekatalogen i SWAYA',
    description: 'Använd det GPU-accelererade rutnätet och flersidiga filter för att utforska din samling.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Byt Vy och Rutnätsstorlek',
        text: 'Växla mellan affischrutnät och tabellvy samt justera kortstorleken.',
      },
      {
        name: 'Använd Filter',
        text: 'Filtrera efter 4K-upplösning, utgivningsår, betyg och taggar för att snabbt hitta rätt medier.',
      },
    ],
  },
  'details': {
    name: 'Hur man visar filmdetaljer, avsnitt och skådespelare',
    description: 'Bläddra bland 4K-bakgrunder, TV-säsonger och skådespelarfilmografier.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Öppna Mediedetaljer',
        text: 'Klicka på en affisch för att se 4K-bakgrunder, handlingsbeskrivning och tekniska parametrar för videoströmmen.',
      },
      {
        name: 'Utforska Skådespelare och Skapare',
        text: 'Klicka på en skådespelarprofil för att omedelbart lista andra filmer med samma person i ditt bibliotek.',
      },
    ],
  },
  'player': {
    name: 'Hur man spelar 4K HDR-video och ställer in undertexter i MPV',
    description: 'Dra nytta av GPU-hårdvaruacceleration, ljudspår och undertextsynkronisering.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Starta Uppspelning',
        text: 'Klicka på uppspelningsknappen vid valfri video för att starta den inbyggda MPV-spelaren.',
      },
      {
        name: 'Växla Ljud och Undertexter',
        text: 'Välj ljudspår och justera undertextsynkronisering och textstorlek med precision.',
      },
    ],
  },
  'search': {
    name: 'Hur man använder Universell Sökning med snabbkommandot (Ctrl+K)',
    description: 'Sök samtidigt i det lokala biblioteket och i onlinedatabaser.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Öppna Sökpanelen',
        text: 'Tryck på Ctrl+K på tangentbordet eller klicka på sökfältet.',
      },
      {
        name: 'Sök Titlar och Personer',
        text: 'Skriv en sökterm för att omedelbart hitta matchande filmer, serier och skådespelare.',
      },
    ],
  },
  'lists': {
    name: 'Hur man skapar anpassade listor och temasamlingar',
    description: 'Skapa samlingar med automatiska 4-affischers collageomslag.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Skapa Ny Lista',
        text: 'Gå till fliken Listor och skapa en ny samling med eget namn och beskrivning.',
      },
      {
        name: 'Lägg Till Titlar & Granska Omslag',
        text: 'Lägg till filmer och se det automatiskt genererade collageomslaget.',
      },
    ],
  },
  'ratings': {
    name: 'Hur man sätter 10-stjärniga betyg och skriver Markdown-recensioner',
    description: 'Spara helt privata betyg och formaterade recensioner.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Sätt Betyg och Favoritmarkera',
        text: 'Välj antal stjärnor på skalan 1-10 och klicka på hjärtikonen för att lägga till bland favoriter.',
      },
      {
        name: 'Skapa Markdown-recension',
        text: 'Öppna recensionspanelen och skriv privata anteckningar med full Markdown-formatering.',
      },
    ],
  },
  'history': {
    name: 'Hur man visar och hanterar tittarhistoriken',
    description: 'Följ uppspelningens tidslinje och hantera tittarstatus.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Visa Historik',
        text: 'Under fliken Historik kontrollerar du den kronologiska listan över uppspelningar och återupptagningspunkter.',
      },
    ],
  },
  'statistics': {
    name: 'Hur man analyserar biblioteksstatistik och diskutrymme',
    description: 'Få insikt i kodekar, genrer och total speltid.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Öppna Statistikpanelen',
        text: 'Under fliken Statistik analyserar du lagringsutrymmets fördelning, 4K HDR-andel och favoritgenrer.',
      },
    ],
  },
  'settings': {
    name: 'Hur man konfigurerar SWAYA och anger API-nycklar',
    description: 'Mappmallar, snabbkommandon för diskret valv och TMDb/StashDB-integrationer.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Ange API-nycklar',
        text: 'Under Inställningar > Scrapers anger du API-nycklar för automatisk sökning.',
      },
      {
        name: 'Anpassa Namnmallar',
        text: 'Under fliken Organization definierar du önskat format för mappar och filnamn.',
      },
    ],
  },
  'torrent': {
    name: 'Hur man ansluter qBittorrent för automatisk filbearbetning',
    description: 'Torrent-klientintegration och automatisk sökning vid slutförd nedladdning.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Anslut till WebUI',
        text: 'Under Inställningar > Torrent anger du anslutningsuppgifter till din torrent-klients WebUI.',
      },
      {
        name: 'Aktivera Automatisk Bearbetning',
        text: 'Konfigurera automatisk identifiering av slutförda nedladdningar via organisatören.',
      },
    ],
  },
};
