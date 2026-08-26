export const nl = {
  'getting-started': {
    name: 'SWAYA Mediacenter Installeren en Configureren',
    description: 'Stappenplan voor installatie op Windows & Linux, mapselectie en het opzetten van uw offline mediabibliotheek.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Downloaden en Installeren',
        text: 'Installeer de SWAYA desktopapplicatie op Windows of Linux.',
      },
      {
        name: 'Opslagmappen Selecteren',
        text: 'Stel in de instellingen uw downloadmappen en permanente bibliotheekmappen in.',
      },
      {
        name: 'Media Scannen en Koppelen',
        text: 'Open de Organizer om bestanden te scannen en automatisch metadata en artwork op te halen.',
      },
    ],
  },
  'organizer': {
    name: 'Mediabestanden Automatisch Batch Hernoemen en Organiseren',
    description: 'Automatische koppeling met TMDb en StashDB om bestanden veilig te hernoemen zonder duplicaten.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Bronmap Selecteren',
        text: 'Open de SWAYA Organizer en kies de map met ongeorganiseerde downloads.',
      },
      {
        name: 'Automatische Metadata Matching',
        text: 'Scan TMDb, OMDb en StashDB om titels van films en series automatisch te herkennen.',
      },
      {
        name: 'Handmatig Fijnafstellen',
        text: 'Pas indien gewenst titels, editietags of seizoensnummers handmatig aan via het override-venster.',
      },
      {
        name: 'Hernoemen of In-Place Organiseren',
        text: 'Kies Rename om mappen volgens Plex/Jellyfin standaarden te structureren, of Organize In-Place om bestanden op hun plek te laten.',
      },
    ],
  },
  'dashboard': {
    name: 'Dashboard Gebruiken voor Hervatten en Ontdekken',
    description: 'Direct verder kijken en bladeren door aanbevolen media.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Verder Kijken',
        text: 'Klik op een item in de rij "Verder kijken" om direct te hervatten vanaf het laatste kijkpunt.',
      },
      {
        name: 'Spotlight en Feeds Verkennen',
        text: 'Bekijk uitgelichte banners, recent georganiseerde media en topfilms.',
      },
    ],
  },
  'library': {
    name: 'Mediacatalogus Doorzoeken en Filteren',
    description: 'Gebruik het GPU-versnelde raster en filters om uw collectie te verkennen.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Weergavemodus Aanpassen',
        text: 'Wissel tussen posterraster en tabelweergave en pas de grootte van de kaarten aan.',
      },
      {
        name: 'Filters Toepassen',
        text: 'Filter op 4K-resolutie, jaar, beoordeling en tags om specifieke media te vinden.',
      },
    ],
  },
  'details': {
    name: 'Filmdetails, Afleveringen en Cast Bekijken',
    description: 'Achtergronden kiezen, tv-seizoenen doorbladeren en filmografieën bekijken.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Mediadetails Openen',
        text: 'Klik op een poster voor samenvattingen, technische mediagegevens en streamkwaliteit.',
      },
      {
        name: 'Cast & Crew Bekijken',
        text: 'Klik op een acteur om direct andere films met dezelfde acteur in uw collectie te zien.',
      },
    ],
  },
  'player': {
    name: '4K HDR Video Afspelen en Ondertitels Instellen met MPV',
    description: 'Hardwareversnelling benutten en ondertitels en audiotracks afstellen.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Afspelen Starten',
        text: 'Klik op de afspeelknop van een video om de interne MPV-speler met hardwareversnelling te starten.',
      },
      {
        name: 'Audio en Ondertitels Wisselen',
        text: 'Schakel direct tussen beschikbare talen en pas de synchronisatie van ondertitels aan.',
      },
    ],
  },
  'search': {
    name: 'Universeel Zoeken met Sneltoets (Ctrl+K)',
    description: 'Gelijktijdig lokaal en online zoeken naar media en personen.',
    totalTime: 'PT1M',
    steps: [
      {
        name: 'Zoekvenster Openen',
        text: 'Druk op Ctrl+K op uw toetsenbord of klik op de zoekbalk.',
      },
      {
        name: 'Titels en Personen Zoeken',
        text: 'Typ een zoekopdracht om direct overeenkomende films, series en acteurs te vinden.',
      },
    ],
  },
  'lists': {
    name: 'Aangepaste Lijsten en Themacollecties Aanmaken',
    description: 'Collecties samenstellen met automatische 4-poster collage covers.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Nieuwe Lijst Maken',
        text: 'Ga naar het tabblad Lijsten en maak een nieuwe collectie aan met een eigen naam.',
      },
      {
        name: 'Media Toevoegen',
        text: 'Voeg films toe en bekijk de automatisch gegenereerde collage cover.',
      },
    ],
  },
  'ratings': {
    name: '10-Punts Beoordelingen en Privénotities Vastleggen',
    description: 'Volledig afgeschermde beoordelingen en markdown recensies opslaan.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Score Geven en Favoriet Maken',
        text: 'Geef een sterrenscore en markeer uw favorieten met het hart-icoon.',
      },
      {
        name: 'Recensie Schrijven',
        text: 'Open het notitiepaneel en schrijf een persoonlijke beoordeling in markdown.',
      },
    ],
  },
  'history': {
    name: 'Kijkgeschiedenis Bekijken en Beheren',
    description: 'Tijdlijn van bekeken video\'s en bekeken-status beheren.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Geschiedenis Inzien',
        text: 'Bekijk in het tabblad Geschiedenis uw chronologische kijkoverzicht en hervatpunten.',
      },
    ],
  },
  'statistics': {
    name: 'Bibliotheekstatistieken en Schijfruimte Analyseren',
    description: 'Inzicht in codecs, genres en totale kijktijd.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Statistieken Openen',
        text: 'Bekijk grafieken over schijfgebruik, 4K HDR verhoudingen en favoriete genres.',
      },
    ],
  },
  'settings': {
    name: 'SWAYA Configureren en API-sleutels Instellen',
    description: 'Mapstructuursjablonen, privacy-sneltoetsen en TMDb/StashDB API-koppeling.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'API-sleutels Invoeren',
        text: 'Voer in Instellingen > Scrapers uw API-sleutels in voor automatische herkenning.',
      },
      {
        name: 'Mappenstructuur Aanpassen',
        text: 'Kies hoe mappen en bestandsnamen automatisch geformatteerd moeten worden.',
      },
    ],
  },
  'torrent': {
    name: 'qBittorrent Koppelen voor Automatische Verwerking',
    description: 'Torrent-client integratie en automatische bibliotheekverwerking.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'WebUI Koppelen',
        text: 'Verbind SWAYA met de WebUI-poort van uw torrent-client.',
      },
      {
        name: 'Automatische Inname Activeren',
        text: 'Laat SWAYA voltooide downloads automatisch detecteren en verwerken.',
      },
    ],
  },
};
