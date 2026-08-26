export const de = {
  'getting-started': {
    name: 'Einrichtung und erste Schritte mit dem SWAYA Offline Media Center',
    description: 'Kurzanleitung zur Installation von SWAYA unter Windows & Linux, zum Einrichten von Speicherpfaden und zur Medienverwaltung.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Herunterladen & Starten',
        text: 'Installieren Sie die SWAYA-Desktopanwendung unter Windows oder Linux.',
      },
      {
        name: 'Speicherverzeichnisse konfigurieren',
        text: 'Legen Sie Ihren Download-Eingangsordner und die Zielverzeichnisse in den Einstellungen fest.',
      },
      {
        name: 'Medien scannen & abgleichen',
        text: 'Öffnen Sie den Organizer, um Videodateien im Stapel zu scannen und Metadaten sowie Cover abzurufen.',
      },
    ],
  },
  'organizer': {
    name: 'Automatische Stapelumbenennung und Dateiorganisation auf Festplatten',
    description: 'Erfahren Sie, wie Sie Metadaten via TMDb/StashDB abrufen und Mediendateien kollisionssicher strukturieren.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Eingangsordner auswählen',
        text: 'Öffnen Sie den SWAYA Organizer und wählen Sie Ihren Download- oder Medienordner aus.',
      },
      {
        name: 'Automatisches Metadaten-Scraping',
        text: 'Starten Sie den automatischen Abgleich über TMDb, OMDb und StashDB für Filme und Serien.',
      },
      {
        name: 'Feinabstimmung mit Match & Override',
        text: 'Nutzen Sie die Such- und Überschreiben-Dialoge, um Titel, Editions-Tags oder Episodennummern anzupassen.',
      },
      {
        name: 'Umbenennen oder In-Place organisieren',
        text: 'Klicken Sie auf Umbenennen für saubere Plex/Jellyfin-Ordner oder nutzen Sie In-Place, um Pfade unverändert zu lassen.',
      },
    ],
  },
  'dashboard': {
    name: 'Discovery-Feeds durchsuchen und Wiedergabe im Dashboard fortsetzen',
    description: 'Setzen Sie unvollständige Videos sekundengenau fort und entdecken Sie kuratierte Feeds.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Wiedergabe fortsetzen',
        text: 'Klicken Sie auf ein beliebiges Video in der Weiterschauen-Leiste, um an der exakt gespeicherten Position fortzusetzen.',
      },
      {
        name: 'Spotlight & Feeds erkunden',
        text: 'Durchstöbern Sie das Spotlight-Banner, kürzlich organisierte Titel, top-bewertete Filme und Studios.',
      },
    ],
  },
  'library': {
    name: 'Medienkatalog in SWAYA durchsuchen und filtern',
    description: 'Organisieren Sie Filme, Serien und Videos mit Mehrkriterienfiltern, Tags, Darstellerprofilen und benutzerdefinierten Ansichten.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Ansichtsmodus wechseln',
        text: 'Wechseln Sie in der Bibliotheks-Symbolleiste zwischen Raster-, Tabellen- und Studio-/Darstelleransicht.',
      },
      {
        name: 'Mehrkriterienfilter anwenden',
        text: 'Filtern Sie nach 4K-HDR-Auflösung, Genres, Tags oder lokalem Speicherstatus.',
      },
      {
        name: 'Schnellaktionen nutzen',
        text: 'Klicken Sie mit der rechten Maustaste auf Karten, um abzuspielen, zu bewerten, zu Listen hinzuzufügen oder Spezifikationen einzusehen.',
      },
    ],
  },
  'details': {
    name: 'Coverbilder und TV-Staffelnavigation in SWAYA anpassen',
    description: 'Prüfen Sie Stream-Spezifikationen, wählen Sie alternative 4K-Poster und Hintergründe und navigieren Sie durch Episoden.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Technische Medien-Spezifikationen einsehen',
        text: 'Öffnen Sie Profile, um Videocodecs, Bitraten, Tonspuren, Untertitel und Darstellerlisten zu prüfen.',
      },
      {
        name: 'Hochauflösende Poster auswählen',
        text: 'Öffnen Sie die visuelle Bildauswahl für alternative 4K-Poster und Hintergrundbilder aus Scraper-Quellen.',
      },
      {
        name: 'TV-Staffeln & Episoden navigieren',
        text: 'Durchsuchen Sie Episodenkarten mit Beschreibungen und individuellem Wiedergabestatus.',
      },
    ],
  },
  'player': {
    name: '4K-HDR-Medien mit der MPV-Engine in SWAYA abspielen',
    description: 'Lokale Mediendateien mit GPU-beschleunigter MPV-Wiedergabe, schnellem Untertitel- und Tonspurwechsel wiedergeben.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Hardwarebeschleunigten Player starten',
        text: 'Öffnen Sie Filme oder Episoden für sofortige MPV-Wiedergabe ohne Server-Transkodierung.',
      },
      {
        name: 'Tonspuren & Untertitel anpassen',
        text: 'Wechseln Sie zwischen Audiospuren und justieren Sie die Untertitelverzögerung in Echtzeit.',
      },
      {
        name: 'Externe Player nutzen',
        text: 'Starten Sie bei Bedarf VLC oder MPC-HC direkt aus dem Kontextmenü des Players.',
      },
    ],
  },
  'search': {
    name: 'Universelle Mehrquellen-Suche in SWAYA nutzen',
    description: 'Führen Sie globale Echtzeitsuchen über Filme, Serien, Darsteller und Studios durch.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Globale Suche öffnen',
        text: 'Drücken Sie Strg+K oder klicken Sie in der Navigationsleiste auf das Suchfeld.',
      },
      {
        name: 'Bibliotheken & Scraper durchsuchen',
        text: 'Geben Sie Filmtitel, Serien, Darsteller oder Studios ein, um gruppierte Ergebnisse sofort zu sehen.',
      },
      {
        name: 'Sofortfilter anwenden',
        text: 'Grenzen Sie Treffer nach Medienkategorie, Auflösung, Erscheinungsjahr oder Tags ein.',
      },
    ],
  },
  'lists': {
    name: 'Themensammlungen mit 4-Poster-Collage-Covern erstellen',
    description: 'Erstellen Sie eigene Playlists, kuratieren Sie Filmsammlungen und generieren Sie 4-Poster-Mosaikcover.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Neue Sammlung anlegen',
        text: 'Öffnen Sie Listen und legen Sie Titel, Beschreibung und Sortierkriterien fest.',
      },
      {
        name: 'Medientitel hinzufügen',
        text: 'Fügen Sie Filme oder Serien aus Bibliothekskarten oder Detailseiten hinzu.',
      },
      {
        name: '4-Poster-Cover generieren',
        text: 'SWAYA erstellt automatisch ein 4-Poster-Mosaikcover aus den Titeln der Sammlung.',
      },
    ],
  },
  'ratings': {
    name: 'Medien bewerten und private Markdown-Kritiken in SWAYA verfassen',
    description: 'Vergeben Sie 10-Sterne-Bewertungen, schreiben Sie lokale Markdown-Reviews und filtern Sie Favoriten.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Auf 10-Sterne-Skala bewerten',
        text: 'Bewerten Sie Filme, Serien und Szenen mit präzisen Halbstern-Schritten.',
      },
      {
        name: 'Private Markdown-Kritiken schreiben',
        text: 'Speichern Sie persönliche Notizen, Kritiken und Tags vollständig offline.',
      },
      {
        name: 'Nach Bewertungen & Favoriten filtern',
        text: 'Filtern Sie Ihre Bibliothek nach Bewertungsstufen oder markierten Favoriten.',
      },
    ],
  },
  'history': {
    name: 'Wiedergabeverlauf in SWAYA verfolgen und verwalten',
    description: 'Überwachen Sie chronologische Wiedergabesitzungen, Zeitstempel und Verlaufsprotokolle.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Verlaufsprotokoll öffnen',
        text: 'Überprüfen Sie chronologische Abspieldaten mit Zeitstempeln und Fortschrittswerten.',
      },
      {
        name: 'Wiedergabe unvollständiger Titel fortsetzen',
        text: 'Klicken Sie auf unfertige Einträge, um die Wiedergabe an der gespeicherten Position fortzusetzen.',
      },
      {
        name: 'Verlauf filtern oder leeren',
        text: 'Filtern Sie Logs nach Datum oder löschen Sie einzelne Einträge.',
      },
    ],
  },
  'statistics': {
    name: 'Speicheranalyse und Library-DNA in SWAYA untersuchen',
    description: 'Analysieren Sie Festplattenkapazitäten, Videocodec-Aufteilungen und Genre-Verteilungen.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Speicherverbrauch nach Codec & Auflösung prüfen',
        text: 'Sehen Sie Datenmengen aufgeteilt nach 4K UHD, 1080p FHD, HEVC und AV1 Codecs.',
      },
      {
        name: 'Library-DNA erkunden',
        text: 'Interaktive Diagramme für Genres, Jahrzehnte und Produktionsstudios analysieren.',
      },
    ],
  },
  'settings': {
    name: 'Dateibenennungs-Vorlagen und Scraper-Schlüssel in SWAYA konfigurieren',
    description: 'Benennungsmuster anpassen, API-Schlüssel hinterlegen und den 1-Klick-Stealth-Modus aktivieren.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Bibliotheks-Stammordner festlegen',
        text: 'Wählen Sie Zielverzeichnisse für Filme, Serien und private Medien.',
      },
      {
        name: 'Plex/Jellyfin-Vorlagen anpassen',
        text: 'Definieren Sie Pfadstrukturen mit Platzhaltern wie {title} ({year}).',
      },
      {
        name: 'Scraper-API-Schlüssel eintragen',
        text: 'Tragen Sie TMDb- oder StashDB-Schlüssel für schnellen, unbegrenzten Metadatenabruf ein.',
      },
      {
        name: 'Stealth-Modus konfigurieren',
        text: 'Aktivieren Sie ein Tastenkürzel zum sofortigen Ausblenden sensibler Sammlungen.',
      },
    ],
  },
  'torrent': {
    name: 'Torrent-Client mit automatischer Einordnung in SWAYA verbinden',
    description: 'Verbinden Sie qBittorrent, überwachen Sie Downloads in Echtzeit und importieren Sie fertige Dateien automatisch.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Torrent-Integration aktivieren',
        text: 'Geben Sie qBittorrent-Host, Port und Anmeldedaten in den Einstellungen ein.',
      },
      {
        name: 'Aktive Downloads überwachen',
        text: 'Verfolgen Sie Download-Geschwindigkeit, Restzeit und Status direkt in SWAYA.',
      },
      {
        name: 'Fertige Torrents automatisch organisieren',
        text: 'Metadaten für abgeschlossene Downloads werden automatisch geladen und in Zielordner verschoben.',
      },
    ],
  },
};
