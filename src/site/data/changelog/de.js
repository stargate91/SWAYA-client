export const de = {
  sectionTitles: {
    added: 'Neue Funktionen',
    performance: 'Leistung & Architektur',
    changed: 'Verbesserungen',
    fixed: 'Fehlerbehebungen & Feinschliff',
  },
  releases: {
    '1.0.0': {
      title: 'Torrent-Client-Integration, Detaillierte Bewertungen & TV-Serien-Architektur',
      description: 'Großes Workstation-Release mit integriertem Dashboard für externe Torrent-Clients, globaler Torrent-Suche, Bewertungs-Drawer, TV-Staffelnavigation und optimierten Batch-SQL-Logs.',
      highlights: [
        'Externes Torrent-Client-Dashboard (qBittorrent & Transmission) mit Bandbreitenzählern',
        'Automatisierter Download-Watcher mit automatischem Bibliotheks-Scan',
        'Maßgeschneiderte TV-Episoden-Hierarchie und Fortschrittsverfolgung',
        'Einheitliche Entdeckungs-Widgets über TMDb, StashDB und FansDB',
        'Master-Detail Umbenennungshistorie mit bedarfsweisem Lazy-Log-Loading',
      ],
    },
    '0.7.0': {
      title: 'Hardware-Videobeschleunigung & SQLite Filmografie-Caching',
      description: 'Performance- und Stabilitätsupdate mit automatischer NVENC/QSV GPU-Videovorschau, Remote-Filmografie-Caching und dynamischer Backend-Portzuweisung.',
      highlights: [
        'Hardwarebeschleunigte FFmpeg-Videovorschau mit NVENC/QSV/AMF-Erkennung',
        'Remote-Filmografie-Caching für sofortiges Laden von Schauspielerprofilen',
        'Dynamische TCP-Portzuweisung beim Start verhindert Portkollisionen',
      ],
    },
    '0.6.0': {
      title: 'Universelle Multi-Source-Suche & Prozess-Lifecycle-Watcher',
      description: 'Erweiterte globale Suchfunktionen und gehärtetes Hintergrundprozess-Management.',
      highlights: [
        'Universelle globale Suche über Filme, Szenen, Darsteller und Studios',
        'Parent-Prozess-Monitor verhindert verwaiste Hintergrundprozesse',
      ],
    },
  },
};
