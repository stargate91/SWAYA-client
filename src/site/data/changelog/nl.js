export const nl = {
  sectionTitles: {
    added: 'Nieuwe functies',
    performance: 'Prestaties & Architectuur',
    changed: 'Verbeteringen',
    fixed: 'Opgeloste problemen & Verfijningen',
  },
  releases: {
    '1.0.0': {
      title: 'Torrent-integratie, Uitgebreide Recensies & TV-serie Architectuur',
      description: 'Grote release met externe torrent-client dashboards, universeel zoeken, recensiepaneel, tv-seizoensnavigatie en geoptimaliseerde batch SQL-logging.',
      highlights: [
        'Dashboard voor externe torrent-clients (qBittorrent en Transmission) met bandbreedtemonitor',
        'Automatische achtergronddetectie en bibliotheekscan bij voltooide downloads',
        'TV-serie seizoenshiërarchie en tracking van kijkvoortgang per aflevering',
        'Geïntegreerde ontdekkingswidget over TMDb, StashDB en FansDB',
        'Master-detail hernoemingsgeschiedenis met on-demand logboekweergave',
      ],
    },
    '0.7.0': {
      title: 'GPU Hardwareversnelling & SQLite Filmografie-caching',
      description: 'Prestatie-update met NVENC/QSV GPU videopreviews, externe filmografie-caching en dynamische poorttoewijzing.',
      highlights: [
        'Hardwareversnelde FFmpeg videopreviews via NVENC/QSV/AMF-detectie',
        'Lokale SQLite filmografie-cache voor direct openen van acteursprofielen',
        'Automatische dynamische TCP-poorttoewijzing bij opstarten ter voorkoming van poortconflicten',
      ],
    },
    '0.6.0': {
      title: 'Universeel Zoeken over Meerdere Bronnen & Procesbewaking',
      description: 'Verbeterde zoekfunctionaliteit over alle databases en robuust procesbeheer op de achtergrond.',
      highlights: [
        'Geconsolideerd zoeken over films, scènes, acteurs en studio\'s',
        'Procesbewaking om achterblijvende achtergrondtaken te voorkomen',
      ],
    },
  },
};
