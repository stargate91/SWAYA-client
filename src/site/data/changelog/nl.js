export const nl = {
  sectionTitles: {
    added: 'Nieuwe functies',
    performance: 'Prestaties & Architectuur',
    changed: 'Verbeteringen',
    fixed: 'Opgeloste problemen & Verfijningen',
  },
  releases: {
    '1.1.0': {
      title: "Interactieve Navigatie, Scroll-Herstelmotor & Automatische Databasemigraties",
      description: "Grote update voor stabiliteit en gebruikerservaring met interactieve titelbalknavigatie, scrollpositieherstel voor filmografieën, automatische Alembic databasemigraties en een modulair ontwerpsysteem.",
      highlights: [
              "Interactieve titelbalknavigatie met startpagina-link en zijbalk-wisselknop",
              "Robuuste scroll-herstelmotor voor filmografie- en artiestenpagina’s bij navigatie",
              "Automatische Alembic databasemigraties bij het opstarten voor naadloze updates",
              "Filtering van volwassen inhoud en categorie-opschoning voor Jackett torrent-zoekopdrachten",
              "Volledige modularisering van het ontwerpsysteem met 600+ geïsoleerde componenten en CSS-tokens"
      ]
    },
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
