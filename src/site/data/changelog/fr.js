export const fr = {
  sectionTitles: {
    added: 'Nouvelles fonctionnalités',
    performance: 'Performances & Architecture',
    changed: 'Améliorations',
    fixed: 'Corrections de bugs & Finitions',
  },
  releases: {
    '1.0.0': {
      title: 'Intégration Client Torrent, Avis Détaillés & Architecture Séries TV',
      description: 'Mise à jour majeure de la station de travail intégrant des tableaux de bord pour clients torrent externes, recherche globale, panneau d\'avis, navigation par saisons TV et logs SQL optimisés.',
      highlights: [
        'Tableau de bord pour clients torrent externes (qBittorrent & Transmission) avec compteurs de bande passante',
        'Surveillance automatique des téléchargements terminés avec déclenchement d\'analyse',
        'Hiérarchie détaillée des épisodes de séries TV et progression de lecture',
        'Widgets de découverte unifiés sur TMDb, StashDB et FansDB',
        'Historique de renommage maître-détail avec chargement différé des logs',
      ],
    },
    '0.7.0': {
      title: 'Accélération Vidéo Matérielle & Cache de Filmographie SQLite',
      description: 'Mise à jour de performance avec aperçus vidéo accélérés par GPU NVENC/QSV, cache local de filmographies et allocation dynamique des ports.',
      highlights: [
        'Aperçus vidéo FFmpeg avec accélération matérielle NVENC/QSV/AMF',
        'Cache SQLite local pour le chargement instantané des profils d\'acteurs',
        'Allocation dynamique des ports TCP au démarrage pour éviter les conflits',
      ],
    },
    '0.6.0': {
      title: 'Recherche Multi-Sources Universelle & Surveillance des Processus',
      description: 'Capacités de recherche globale étendues et gestion renforcée des processus en arrière-plan.',
      highlights: [
        'Recherche universelle unifiée parmi films, scènes, acteurs et studios',
        'Moniteur de processus parent empêchant les tâches orphelines en arrière-plan',
      ],
    },
  },
};
