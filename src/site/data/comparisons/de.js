export const de = {
  filebot: {
    title: 'SWAYA vs FileBot: Moderne Medien-Workstation & Dateiumbenennung',
    metaTitle: 'FileBot Alternative für Windows - SWAYA Batch-Renamer & MPV Player',
    metaDescription: 'Suchen Sie eine moderne FileBot Alternative? SWAYA benennt Dateien via TMDb & StashDB um, bietet eine Offline-Mediathek und integrierten 4K MPV Player.',
    heroTagline: 'Warum Dateien nur umbenennen, wenn Sie Ihre gesamte Sammlung organisieren und direkt abspielen können?',
    heroSubtitle: 'FileBot ist hervorragend zum Umbenennen von Dateien, aber SWAYA bringt Ihre Medien auf das nächste Level: Festplattenorganisation, elegante Mediathek und integrierter 4K HDR MPV Player in einer modernen Windows-App.',
    competitorPricing: '6 $/Jahr oder 48 $ Lifetime',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie benötigen ausschließlich ein Befehlszeilen-Tool (CLI) für Headless-Linux oder NAS-Skripte.',
      'Sie schreiben komplexe Groovy-Ausdrücke und automatisierte Skripthooks.',
      'Sie nutzen bereits einen separaten Medienserver (Plex/Kodi) und benötigen keinen integrierten Player.',
    ],
    whenToChooseSwaya: [
      'Sie möchten eine Komplettlösung: Dateien auf der Festplatte umbenennen UND sofort in der Mediathek abspielen.',
      'Sie verwalten sowohl Filme/Serien (TMDb) als auch Adult-Szenen (StashDB, FansDB, ThePornDB).',
      'Sie möchten einen hardwarebeschleunigten MPV-Player mit bildgenauer Fortsetzung ohne Transcodierung.',
      'Sie bevorzugen eine elegante Windows-Oberfläche mit sicherem Testlauf und Kollisionsschutz.',
    ],
    matrix: [
      { feature: 'Physische Dateiumbenennung auf der Festplatte', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Testlauf-Vorschau & Kollisionsschutz', swayaNote: 'Intelligente Kollisionserkennung & Ersetzung', competitorNote: 'Vorschauliste' },
      { feature: 'Integrierter 4K/HDR MPV Player', swayaNote: 'Hardwarebeschleunigt, Untertitel- & Audiosynchronisation', competitorNote: 'Kein Player integriert' },
      { feature: 'Visuelle Offline-Mediathek & Detailseiten', swayaNote: 'Poster, Hintergründe, Besetzung, Genres, Bewertungen', competitorNote: 'Keine Mediathek-Oberfläche' },
      { feature: 'Adult-Medien & StashDB Scraper Support', swayaNote: 'Native StashDB, FansDB & Darsteller-Indexierung', competitorNote: 'Nur Mainstream-Datenbanken' },
      { feature: 'Dual-Modus (SFW / NSFW) mit PIN-Schutz', swayaNote: 'Vollständige Trennung & Sperrung', competitorNote: 'Nicht verfügbar' },
      { feature: 'Torrent Auto-Import (qBittorrent)', swayaNote: 'Integrierte Verwaltung & In-Place Seeding', competitorNote: 'Nur über eigene CLI-Skripte' },
      { feature: '100% Offline & Serverlos (0 Hintergrunddienste)', swayaNote: 'Keine Hintergrunddienste oder offenen Ports', competitorNote: 'Lokale Java-Anwendung' },
      { feature: 'Moderne Windows-Oberfläche (Ohne Java)', swayaNote: 'Native Desktop-Anwendung', competitorNote: 'Java / Swing Oberfläche' },
      { feature: 'Einmaliger Lifetime-Kauf', swayaNote: '39 € Einführung / 79 € regulär', competitorNote: '48 $ Lifetime oder 6 $/Jahr' },
    ],
    deepDives: [
      {
        title: 'Mehr als nur Umbenennen: Ein ganzes Medien-Universum',
        description: 'FileBot endet nach dem Umbenennen der Dateien. SWAYA verwandelt Ihre Dateien in eine reichhaltige Mediathek mit Postern, Cast-Biografien und Playlisten.',
      },
      {
        title: 'Integrierter 4K HDR MPV Player',
        description: 'Klicken Sie auf ein beliebiges Video in SWAYA für sofortige GPU-beschleunigte Wiedergabe von 4K HDR MKV-Dateien mit mehrsprachigen Untertiteln.',
      },
      {
        title: 'Mainstream- und Adult-Medien an einem Ort',
        description: 'SWAYA ist die erste Medien-Workstation mit dedizierter Dual-Mode-Architektur: Blockbuster via TMDb und Szenen via StashDB, geschützt hinter einer PIN.',
      },
    ],
    faqs: [
      {
        q: 'Kann SWAYA FileBot für Serien und Filme vollständig ersetzen?',
        a: 'Ja. SWAYA durchsucht Download-Ordner, gleicht Titel mit TMDb ab, ermöglicht Feinabstimmungen und benennt Dateien physisch auf der Festplatte um.',
      },
      {
        q: 'Unterstützt SWAYA Torrent-Seeding beim Organisieren?',
        a: 'Ja. Im Modus "In-Place Importieren" lädt SWAYA alle Metadaten herunter, während die physischen Dateien auf der Festplatte für aktives Seeding unberührt bleiben.',
      },
      {
        q: 'Muss Java installiert sein, um SWAYA auszuführen?',
        a: 'Nein. SWAYA ist eine native Desktop-Anwendung, die keine Java-Laufzeitumgebung benötigt.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: 100% Echte Offline-Medien-Workstation',
    metaTitle: 'Plex Alternative für Windows (Ohne Server) - SWAYA',
    metaDescription: 'Private, offline Plex Alternative ohne Server? SWAYA organisiert Festplatten, spielt 4K HDR via MPV und benötigt keine Cloud-Accounts.',
    heroTagline: 'Ihre Mediensammlung ohne Server, Cloud-Zwang oder Telemetrie.',
    heroSubtitle: 'Plex benötigt dauerhaft laufende Server-Dienste und Cloud-Konten. SWAYA liefert ein direktes, 100% offline Desktop-Erlebnis auf Ihrem Windows-PC.',
    competitorPricing: 'Kostenlos / 4,99 $/Monat / 119 $ Lifetime (Plex Pass)',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie möchten Medien auf Smart TVs und Smartphones außerhalb des Heimnetzwerks streamen.',
      'Sie betreiben ein NAS mit Multi-User-Transcoding.',
      'Sie benötigen geräteübergreifende Synchronisation zwischen iOS, Android und Apple TV.',
    ],
    whenToChooseSwaya: [
      'Sie schauen Filme und Serien direkt auf Ihrem Windows-PC oder Laptop.',
      'Sie möchten 100% Privatsphäre: keine Cloud-Accounts, keine Telemetrie, keine offenen Ports.',
      'Sie möchten, dass echte Dateien auf der Festplatte umbenannt und sauber strukturiert werden.',
      'Sie haben genug von Server-Konfigurationen und Transcoding-Problemen.',
    ],
    matrix: [
      { feature: '100% Offline & Null Server-Setup', swayaNote: 'Sofortige Desktop-App ohne Daemon', competitorNote: 'Erfordert Plex Media Server' },
      { feature: 'Physische Dateiumbenennung auf der Festplatte', swayaNote: 'Benennt echte Dateien um', competitorNote: 'Nur virtuelle Datenbank' },
      { feature: 'Keine Cloud-Konten / Volle Privatsphäre', swayaNote: 'Kein Login, lokale SQLite DB', competitorNote: 'Plex Cloud-Authentifizierung Pflicht' },
      { feature: 'Nativer MPV Player (Kein Transcoding nötig)', swayaNote: 'Spielt alle Codecs in 4K HDR direkt ab', competitorNote: 'Transcodiert oft unnötig bei der Wiedergabe' },
      { feature: 'Adult-Medien (StashDB) & Dual-Modus', swayaNote: 'Dedizierter Adult-Modus & StashDB', competitorNote: 'Erfordert fehlerhafte Drittanbieter-Plugins' },
      { feature: 'Interaktiver Testlauf-Organizer', swayaNote: 'Vorschau und Anpassung vor dem Verschieben', competitorNote: 'Nur passive Ordnerüberwachung' },
      { feature: 'Torrent-Client-Integration (In-Place Import)', swayaNote: 'Direkte qBittorrent-Integration', competitorNote: 'Nicht nativ unterstützt' },
      { feature: 'Einmaliger Lifetime-Kauf (Kein Abo)', swayaNote: '39 € Einmalzahlung', competitorNote: '119 $ Lifetime oder 4,99 $/Monat' },
      { feature: 'Bildgenaue Lesezeichen für Lieblingsmomente', swayaNote: 'Screenshot & Zeitstempel per Enter-Taste', competitorNote: 'Nicht verfügbar' },
      { feature: 'Null Hintergrund-CPU/RAM-Last', swayaNote: 'Nach dem Schließen läuft nichts weiter', competitorNote: 'Serverdienst läuft permanent im Hintergrund' },
    ],
    deepDives: [
      {
        title: 'Null Server, Null Hintergrundlast',
        description: 'Plex lässt Serverprozesse im Hintergrund laufen. SWAYA ist eine schlanke Desktop-App: Wenn Sie sie schließen, läuft nichts weiter.',
      },
      {
        title: 'Reale Ordnerstruktur statt virtueller Bibliotheken',
        description: 'Plex legt nur virtuelle Metadaten über unordentliche Ordner. SWAYA benennt die physischen Dateien auf Ihren Festplatten sauber um.',
      },
      {
        title: 'Nativer MPV statt Transcoding-Problemen',
        description: 'Keine Transcoding-Ruckler mehr bei 4K HDR oder PGS-Untertiteln: Der integrierte MPV-Player spielt alles reibungslos mit GPU-Beschleunigung ab.',
      },
    ],
    faqs: [
      {
        q: 'Kann ich SWAYA ohne Internetverbindung nutzen?',
        a: 'Ja! SWAYA funktioniert zu 100% offline. Nach dem Abruf von Metadaten und Postern wird keine Internetverbindung für Suche und Wiedergabe benötigt.',
      },
      {
        q: 'Streamt SWAYA auf Fernseher wie Plex?',
        a: 'SWAYA ist als persönliche Medien-Workstation für den PC konzipiert und fungiert nicht als Streaming-Server für Smart TVs.',
      },
      {
        q: 'Erfasst SWAYA Sehgewohnheiten oder verlangt ein Login?',
        a: 'Nein. SWAYA erfordert keine Registrierung, keine Logins und sendet keinerlei Telemetriedaten.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: Moderne Medienverwaltung & Player',
    metaTitle: 'tinyMediaManager Alternative für Windows - SWAYA',
    metaDescription: 'Moderne tinyMediaManager Alternative gesucht? SWAYA bietet Batch-Renaming, TMDb/StashDB Scraping und integrierten 4K MPV Player ohne Java.',
    heroTagline: 'Medien organisieren und direkt genießen ohne träge Java-Oberflächen.',
    heroSubtitle: 'tinyMediaManager generiert NFOs, benötigt aber Java und hat keinen integrierten Player. SWAYA kombiniert Dateiumbenennung mit einer modernen Mediathek und 4K MPV Player.',
    competitorPricing: '15 €/Jahr (v4/v5 Pro)',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie benötigen detaillierte .NFO-Dateien für ein bestehendes Kodi-Setup.',
      'Sie verwalten Medien gleichzeitig unter macOS, Linux und Windows.',
      'Sie benötigen komplexe XML/NFO-Tag-Bearbeitung.',
    ],
    whenToChooseSwaya: [
      'Sie möchten eine schnelle Windows-App ohne Java-Installation.',
      'Sie wollen einen All-in-One-Workflow: Organisieren, Durchsuchen und Abspielen in einem Klick.',
      'Sie verwalten Adult-Medien (StashDB, FansDB) neben Filmen und Serien.',
      'Sie bevorzugen eine einmalige Lifetime-Lizenz statt jährlicher Gebühren.',
    ],
    matrix: [
      { feature: 'Dateiumbenennung & Ordnerstrukturen', swayaNote: 'Intelligente Vorlagen & Kollisionsschutz', competitorNote: 'Musterbasierter Renamer' },
      { feature: 'Integrierter hardwarebeschleunigter Player', swayaNote: 'Nativer 4K HDR MPV Player', competitorNote: 'Kein Player enthalten' },
      { feature: 'Adult-Medien (StashDB / FansDB) Scraper', swayaNote: 'Native Scraper & Darsteller-Index', competitorNote: 'Nicht unterstützt' },
      { feature: 'Dual-Modus mit PIN-Schutz', swayaNote: 'Isolierte Datenbank & Schnellsperre', competitorNote: 'Kein Privatsphäre-Modus' },
      { feature: 'Moderne Desktop-App (Kein Java nötig)', swayaNote: 'Schlanke, schnelle native Anwendung', competitorNote: 'Java Swing Oberfläche' },
      { feature: 'Interaktive Abgleichs- und Bearbeitungsdialoge', swayaNote: 'Schnellsuche, Episodenwähler & Tag-Editor', competitorNote: 'Scraper-Dialoge' },
      { feature: 'Torrent-Client-Integration (Seeding)', swayaNote: 'In-Place Import & Seeding-Erhalt', competitorNote: 'Nicht verfügbar' },
      { feature: 'Wiedergabeverlauf & Moment-Tracking', swayaNote: 'Statistiken, Zeitstempel & Screenshots', competitorNote: 'Einfache Gesehen-Markierung' },
      { feature: 'Lizenzmodell', swayaNote: 'Einmaliger Lifetime-Kauf (39 €)', competitorNote: '15 € / Jahr Abo' },
    ],
    deepDives: [
      {
        title: 'All-in-One: Organisieren, Entdecken und Abspielen',
        description: 'Bei tinyMediaManager müssen Sie ständig zwischen tMM und einem externen Player wechseln. SWAYA bietet einen einheitlichen Desktop-Arbeitsplatz.',
      },
      {
        title: 'Einmalkauf statt jährlicher Abokosten',
        description: 'tMM verlangt jährliche Gebühren für Online-Scraper. SWAYA erhalten Sie mit einer einmaligen Zahlung inklusive lebenslanger Updates.',
      },
      {
        title: 'Mainstream- und Adult-Scraping aus einer Hand',
        description: 'Während tMM nur reguläre Medien unterstützt, bietet SWAYA erstklassige Integration für StashDB und FansDB.',
      },
    ],
    faqs: [
      {
        q: 'Erstellt SWAYA kompatible Dateien für Kodi/Jellyfin?',
        a: 'SWAYA organisiert Dateien nach Standard-Konventionen, sodass sie von Kodi, Jellyfin und Plex sofort fehlerfrei eingelesen werden können.',
      },
      {
        q: 'Startet SWAYA schneller als Java-Anwendungen?',
        a: 'Ja. SWAYA startet sofort mit geringem Speicherverbrauch ohne Verzögerungen durch eine Java Virtual Machine.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Native Medien-Workstation ohne Webserver',
    metaTitle: 'StashApp Alternative für Windows - SWAYA Desktop-Organizer',
    metaDescription: 'Native Windows-Alternative zu StashApp gesucht? SWAYA kombiniert StashDB, physische Dateiumbenennung und MPV Player ohne Server-Setup.',
    heroTagline: 'Die ultimative private Medien-Workstation ohne Localhost-Webserver oder Docker.',
    heroSubtitle: 'Stash ist ein hervorragender Webserver für Adult-Medien im Browser. SWAYA ist eine native Windows-App für TMDb- und StashDB-Medien mit integriertem MPV-Player.',
    competitorPricing: 'Kostenlos / Open Source',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie betreiben einen Linux-Server oder Docker-Container für Mehrbenutzer-Zugriff.',
      'Sie nutzen spezielle Community-Plugins für Nischenseiten.',
      'Sie suchen eine reine Webanwendung im Browser.',
    ],
    whenToChooseSwaya: [
      'Sie möchten eine eigenständige Desktop-App ohne Hintergrund-Webserver (`localhost:9999`).',
      'Sie möchten Filme (TMDb) und Szenen (StashDB) in einer gemeinsamen Anwendung verwalten.',
      'Sie möchten echte Dateien auf der Festplatte umbenennen und strukturieren.',
      'Sie wollen einen MPV-Player mit GPU-Beschleunigung ohne Browser-Player-Einschränkungen.',
    ],
    matrix: [
      { feature: 'Native Desktop-App (Kein Localhost-Server)', swayaNote: 'Einzelne EXE, 0 Hintergrunddienste', competitorNote: 'Startet Webserver auf localhost:9999' },
      { feature: 'Physische Dateiumbenennung auf Festplatte', swayaNote: 'Benennt & verschiebt echte Dateien', competitorNote: 'Belässt Dateien unverändert' },
      { feature: 'Dual-Modus: Mainstream (TMDb) + Adult (StashDB)', swayaNote: 'Sofortiger Wechsel zwischen SFW & NSFW', competitorNote: 'Nur Adult-Medien' },
      { feature: 'Nativer 4K MPV Player mit GPU-Beschleunigung', swayaNote: 'Spielt alle Codecs ruckelfrei ab', competitorNote: 'HTML5-Player im Browser' },
      { feature: 'Interaktive Abgleichs- und Massenbearbeitung', swayaNote: 'Sichere Testlauftabelle mit Gruppenaktionen', competitorNote: 'Tagger-Oberfläche' },
      { feature: 'Darsteller-Profile, Studio-Labels & Tags', swayaNote: 'Ausführliche Profile & Galerien', competitorNote: 'Detaillierte Darsteller-Datenbank' },
      { feature: 'Moment-Tracking & Screenshot-Pins per Enter', swayaNote: 'Screenshot & Zeitstempel auf Tastendruck', competitorNote: 'Szenen-Marker' },
      { feature: 'PIN-geschützte Privatsphäre-Sperre', swayaNote: 'Sofortige Sperre & versteckte Adult-DB', competitorNote: 'Einfaches Auth-Plugin' },
      { feature: 'Torrent-Client-Integration (qBittorrent)', swayaNote: 'Direkter Sync & Seeding-Support', competitorNote: 'Nur über Drittanbieter-Skripte' },
    ],
    deepDives: [
      {
        title: 'Nativer MPV Player statt Browser-Codecbeschränkungen',
        description: 'Stash nutzt HTML5-Video im Browser, was bei 4K HEVC 10-Bit oft Transcoding erfordert. Der integrierte MPV-Player in SWAYA spielt jedes Format mühelos ab.',
      },
      {
        title: 'Einheitliche Mediathek für alle Inhalte',
        description: 'Schluss mit getrennten Programmen: SWAYA ermöglicht den nahtlosen Wechsel zwischen Mainstream- und Adult-Modus mit vollständiger Datenisolation.',
      },
      {
        title: 'Echte Dateistruktur auf Ihren Festplatten',
        description: 'Anders als Stash, das Dateien nur in der Datenbank erfasst, bringt SWAYA echte Ordnung in Ihre Festplattenordner.',
      },
    ],
    faqs: [
      {
        q: 'Kann SWAYA direkt von StashDB Daten abrufen?',
        a: 'Ja! Tragen Sie Ihren StashDB API-Schlüssel in den Einstellungen ein, und SWAYA findet automatisch Titel, Darsteller, Studios und hochauflösende Cover.',
      },
      {
        q: 'Wie schützt SWAYA die Privatsphäre bei Adult-Inhalten?',
        a: 'SWAYA verfügt über eine PIN-Sperre: Im gesperrten Zustand sind Adult-Medien vollständig unsichtbar und nur nach PIN-Eingabe zugänglich.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Lokale Medien-Workstation vs Heimserver',
    metaTitle: 'Jellyfin Alternative für Windows ohne Server - SWAYA',
    metaDescription: 'Einfachere Jellyfin Alternative für den PC? SWAYA organisiert Festplattendateien und spielt 4K HDR via MPV ohne Server-Setup ab.',
    heroTagline: 'Ihre Festplattensammlung ohne Docker-Container oder Netzwerk-Setup.',
    heroSubtitle: 'Jellyfin ist ein hervorragender Streaming-Server für das Heimnetzwerk. Für das Verwalten und Ansehen von Medien auf dem PC bietet SWAYA eine direkte, serverlose Lösung.',
    competitorPricing: 'Kostenlos / Open Source (FOSS)',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie möchten Medien im gesamten Haus auf Smart TVs und Mobilgeräte streamen.',
      'Sie betreiben einen Linux/Docker-Server mit mehreren Benutzern.',
      'Sie bestehen auf 100% Open-Source-Serversoftware.',
    ],
    whenToChooseSwaya: [
      'Sie schauen Filme und organisieren Downloads direkt auf Ihrem Windows-PC.',
      'Sie möchten keine Ports freigeben oder Transcoding-Profile konfigurieren.',
      'Sie wollen physische Dateiumbenennung und native 4K MPV-Wiedergabe.',
      'Sie möchten integrierten Support für StashDB neben regulären Filmen.',
    ],
    matrix: [
      { feature: 'Null Server-Setup & Wartung', swayaNote: 'Startet sofort, keine Hintergrunddienste', competitorNote: 'Server-Installation erforderlich' },
      { feature: 'Physische Dateiumbenennung auf der Festplatte', swayaNote: 'Echtes Verschieben & Strukturieren', competitorNote: 'Nur schreibgeschützte Bibliothek' },
      { feature: 'Integrierter 4K HDR MPV Player', swayaNote: 'Native GPU-Beschleunigung ohne Lags', competitorNote: 'Web/HTML5 oder externe Clients' },
      { feature: 'Adult-Medien (StashDB) & Dual-Modus', swayaNote: 'Native StashDB/FansDB Integration', competitorNote: 'Erfordert Drittanbieter-Plugins' },
      { feature: '100% Offline ohne offene Ports', swayaNote: 'Keine offenen Ports, 100% lokal', competitorNote: 'Erfordert lokalen Netzwerkserver' },
      { feature: 'Interaktiver Testlauf-Organizer', swayaNote: 'Volle Kontrolle & Kollisionsschutz', competitorNote: 'Nur Ordnerüberwachung' },
      { feature: 'Torrent-Client-Integration (Seeding)', swayaNote: 'Direkte qBittorrent-Integration', competitorNote: 'Nicht unterstützt' },
      { feature: 'Lieblingsmoment- & Lesezeichen-Tracking', swayaNote: 'Screenshot & Markierung per Tastendruck', competitorNote: 'Nicht verfügbar' },
    ],
    deepDives: [
      {
        title: 'Desktop-Einfachheit statt Server-Komplexität',
        description: 'Jellyfin erfordert Serverdienste und Netzwerkkonfiguration. SWAYA ist eine eigenständige Desktop-App, die sofort funktioniert.',
      },
      {
        title: 'Physische Dateistruktur auf der Festplatte',
        description: 'Jellyfin setzt voraus, dass Sie Dateien vorab manuell sortieren. SWAYA übernimmt das Umbenennen und Strukturieren auf der Festplatte.',
      },
      {
        title: 'Nativer MPV-Performance-Vorteil',
        description: 'Genießen Sie verzögerungsfreies Spulen, perfekte Untertitel und flüssige 4K HDR Wiedergabe im integrierten MPV-Player.',
      },
    ],
    faqs: [
      {
        q: 'Kann ich SWAYA nutzen, um Ordner für Jellyfin vorzubereiten?',
        a: 'Ja! SWAYA bringt Dateien in Standard-Strukturen, die von Jellyfin problemlos erkannt werden.',
      },
      {
        q: 'Verbraucht SWAYA Systemressourcen im Hintergrund?',
        a: 'Nein. Wenn Sie SWAYA schließen, verbleiben keinerlei Hintergrunddienste im Speicher.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Moderne Medien-Workstation ohne kaputte Addons',
    metaTitle: 'Kodi Alternative für Windows PC - SWAYA',
    metaDescription: 'Moderne Kodi Alternative für Windows gesucht? SWAYA bietet MPV Player, Dateiumbenennung und eine moderne Oberfläche ohne fehlerhafte Plugins.',
    heroTagline: 'Ein modernes Medien-Erlebnis optimiert für Maus, Tastatur und Festplatten.',
    heroSubtitle: 'Kodi ist ideal für Fernseher mit Fernbedienung, aber umständlich am PC-Monitor. SWAYA wurde speziell für Windows-Desktop-Umgebungen mit direkter Festplattenorganisation entwickelt.',
    competitorPricing: 'Kostenlos / Open Source (FOSS)',
    swayaPricing: '39 € Einführungspreis (79 € regulär)',
    whenToChooseCompetitor: [
      'Sie betreiben einen HTPC am Fernseher mit Fernbedienung.',
      'Sie nutzen spezielle IPTV- oder PVR-Addons.',
      'Sie möchten eine 10-Fuß-Couch-Oberfläche.',
    ],
    whenToChooseSwaya: [
      'Sie nutzen einen Windows-PC mit Maus und Tastatur.',
      'Sie möchten sichere Dateiumbenennung und Ordnung auf Ihren Festplatten.',
      'Sie wollen eine stabile Software, die nach Updates nicht kaputtgeht.',
      'Sie möchten Adult-Medien (StashDB) und Filme (TMDb) an einem Ort.',
    ],
    matrix: [
      { feature: 'Moderne Desktop-UI (Maus & Tastatur)', swayaNote: 'Elegante Oberfläche für den PC', competitorNote: 'TV-Oberfläche für Fernbedienung' },
      { feature: 'Physische Dateiumbenennung auf Festplatte', swayaNote: 'Benennt & verschiebt Dateien real', competitorNote: 'Nur Datenbank, benennt nicht um' },
      { feature: 'Integrierter 4K/HDR MPV Player', swayaNote: 'Hardwarebeschleunigt, kein Ruckeln', competitorNote: 'Eigener interner Player' },
      { feature: 'Adult-Medien (StashDB) & Dual-Modus', swayaNote: 'Native StashDB/FansDB Integration', competitorNote: 'Erfordert instabile Addons' },
      { feature: 'Hohe Stabilität ohne fehlerhafte Plugins', swayaNote: 'Integrierte, verlässliche Architektur', competitorNote: 'Addons brechen oft nach Updates' },
      { feature: 'Testlauf mit Kollisionsschutz', swayaNote: 'Sichere Vorschau vor dem Verschieben', competitorNote: 'Nicht vorhanden' },
      { feature: 'Torrent-Client-Integration (Seeding)', swayaNote: 'Direkte qBittorrent-Integration', competitorNote: 'Erfordert Skripte' },
    ],
    deepDives: [
      {
        title: 'Desktop-Fokus statt 10-Fuß-TV-Menü',
        description: 'Kodi ist für Fernbedienungen ausgelegt. SWAYA ist für modernes Arbeiten mit Maus, Fenstern und Tastenkürzeln auf Windows optimiert.',
      },
      {
        title: 'Physische Dateiumbenennung auf der Festplatte',
        description: 'Kodi erwartet vorbereitete Dateinamen. SWAYA übernimmt die Arbeit und benennt Dateien direkt auf Ihren Festplatten um.',
      },
      {
        title: 'Kein Addon-Wartungsaufwand',
        description: 'Alle Kernfunktionen - Scraper, Mediathek und Player - sind in SWAYA fest und stabil integriert.',
      },
    ],
    faqs: [
      {
        q: 'Kann ich SWAYA nutzen, um Dateien für Kodi vorzubereiten?',
        a: 'Ja! SWAYA benennt Dateien nach sauberen Industriestandards, die Kodi sofort erkennt.',
      },
      {
        q: 'Ist SWAYA einfacher zu bedienen als Kodi?',
        a: 'Viel einfacher. SWAYA erfordert keine Repository-Verwaltung oder XML-Konfiguration - es funktioniert direkt ab Werk.',
      },
    ],
  },
};
