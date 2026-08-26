export const it = {
  sectionTitles: {
    added: 'Nuove Funzionalità',
    performance: 'Prestazioni & Architettura',
    changed: 'Miglioramenti',
    fixed: 'Correzioni & Ottimizzazioni',
  },
  releases: {
    '1.0.0': {
      title: 'Integrazione Client Torrent, Recensioni Granulari & Architettura Serie TV',
      description: 'Importante aggiornamento della workstation che introduce dashboard per client torrent esterni, ricerca torrent globale, drawer recensioni, navigazione stagioni TV e log SQL ottimizzati.',
      highlights: [
        'Dashboard per client torrent esterni (qBittorrent & Transmission) con contatori di banda',
        'Monitoraggio automatico dei download completati con scansione immediata',
        'Navigazione dettagliata per stagioni/episodi TV e stato di avanzamento',
        'Widget unificati per la scoperta di contenuti su TMDb, StashDB e FansDB',
        'Cronologia rinomina master-detail con caricamento lazy dei log',
      ],
    },
    '0.7.0': {
      title: 'Accelerazione Video Hardware & Caching Filmografie SQLite',
      description: 'Aggiornamento di prestazioni e stabilità con anteprime video GPU NVENC/QSV, cache filmografie remote e allocazione dinamica delle porte.',
      highlights: [
        'Anteprime video FFmpeg con accelerazione hardware NVENC/QSV/AMF',
        'Cache locale SQLite per il caricamento istantaneo dei profili attori',
        'Allocazione dinamica delle porte TCP all\'avvio per evitare conflitti',
      ],
    },
    '0.6.0': {
      title: 'Ricerca Multi-Sorgente Universale & Monitoraggio Processi',
      description: 'Funzionalità di ricerca globale ampliate e gestione avanzata del ciclo di vita dei processi in background.',
      highlights: [
        'Ricerca globale unificata tra film, scene, performer e studi',
        'Monitor del processo genitore per prevenire task orfani',
      ],
    },
  },
};
