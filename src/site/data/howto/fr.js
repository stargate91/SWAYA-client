export const fr = {
  'getting-started': {
    name: 'Comment configurer et démarrer avec le Media Center SWAYA',
    description: 'Guide rapide pour installer SWAYA sur Windows & Linux, configurer vos dossiers de stockage et organiser votre médiathèque hors ligne.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Téléchargement et Lancement',
        text: 'Installez l’application SWAYA sur votre ordinateur sous Windows ou Linux.',
      },
      {
        name: 'Configurer les Dossiers de Stockage',
        text: 'Définissez votre dossier de téléchargements entrants et vos répertoires cibles dans les Paramètres.',
      },
      {
        name: 'Scanner et Associer les Médias',
        text: 'Ouvrez l’Organizer pour scanner vos fichiers vidéo et récupérer les métadonnées et jaquettes.',
      },
    ],
  },
  'organizer': {
    name: 'Comment renommer et organiser automatiquement vos fichiers multimédias sur disque',
    description: 'Associez automatiquement les métadonnées TMDb/StashDB et renommez vos fichiers par lots sans conflit.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Sélection du Dossier Entrant',
        text: 'Ouvrez SWAYA Organizer et sélectionnez le dossier contenant vos téléchargements non triés.',
      },
      {
        name: 'Lancement du Scraping Automatique',
        text: 'Déclenchez la recherche automatique sur TMDb, OMDb et StashDB pour identifier vos médias.',
      },
      {
        name: 'Ajustement avec Recherche & Remplacement',
        text: 'Utilisez les fenêtres de recherche et d’ajustement pour corriger titres, éditions ou numéros d’épisodes.',
      },
      {
        name: 'Renommer ou Organiser sur Place',
        text: 'Cliquez sur Renommer pour ranger vos médias dans des dossiers Plex/Jellyfin, ou choisissez l’organisation sur place pour ne pas modifier vos disques.',
      },
    ],
  },
  'dashboard': {
    name: 'Comment naviguer dans les flux de découverte et reprendre la lecture sur le Tableau de Bord',
    description: 'Reprenez vos vidéos en cours à la seconde près et explorez les sélections personnalisées.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Reprendre la Lecture',
        text: 'Cliquez sur n’importe quel titre dans la section Continuer la lecture pour reprendre au minutage exact.',
      },
      {
        name: 'Explorer la Bannière & les Sélections',
        text: 'Découvrez les médias à la une, les derniers ajouts organisés, les films les mieux notés et les studios.',
      },
    ],
  },
  'library': {
    name: 'Comment parcourir et filtrer votre catalogue multimédia dans SWAYA',
    description: 'Explorez votre collection à l’aide de filtres multicritères, tags, profils d’acteurs et modes d’affichage sur mesure.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Changer de Mode d’Affichage',
        text: 'Basculez entre l’affichage Grille, Tableau et Studios/Acteurs dans la barre d’outils de la Médiathèque.',
      },
      {
        name: 'Appliquer des Filtres Multicritères',
        text: 'Filtrez par résolution 4K HDR, genres, tags personnalisés ou présence physique sur le disque.',
      },
      {
        name: 'Utiliser les Actions Rapides',
        text: 'Faites un clic droit sur une carte pour lire, noter, ajouter à une liste ou voir les caractéristiques techniques.',
      },
    ],
  },
  'details': {
    name: 'Comment personnaliser les jaquettes et la navigation des saisons TV dans SWAYA',
    description: 'Consultez les caractéristiques vidéo, choisissez des affiches et arrière-plans 4K et parcourez les épisodes.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Consulter les Détails Techniques',
        text: 'Ouvrez une fiche pour vérifier les codecs vidéo, débits, pistes audio, sous-titres et acteurs.',
      },
      {
        name: 'Choisir des Affiches Personnalisées',
        text: 'Ouvrez le sélecteur d’artworks pour choisir des affiches 4K et des arrière-plans alternatifs.',
      },
      {
        name: 'Parcourir les Saisons & Épisodes',
        text: 'Naviguez dans le découpage des saisons avec cartes d’épisodes, résumés et statuts de visionnage.',
      },
    ],
  },
  'player': {
    name: 'Comment lire des médias 4K HDR avec le moteur MPV dans SWAYA',
    description: 'Lisez vos fichiers locaux avec accélération matérielle MPV, changement instantané de sous-titres et de pistes audio.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Lancer le Lecteur Matériel',
        text: 'Ouvrez n’importe quel film ou épisode pour une lecture MPV directe sans transcodage.',
      },
      {
        name: 'Changer Audio & Sous-titres',
        text: 'Basculez entre les pistes audio multilingues et ajustez le délai des sous-titres en temps réel.',
      },
      {
        name: 'Utiliser des Lecteurs Externes',
        text: 'Lancez au besoin VLC ou MPC-HC directement depuis le menu contextuel du lecteur.',
      },
    ],
  },
  'search': {
    name: 'Comment utiliser la recherche universelle multi-sources dans SWAYA',
    description: 'Effectuez des recherches globales instantanées parmi les films, séries, acteurs et labels de studios.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Ouvrir la Recherche Globale',
        text: 'Appuyez sur Ctrl+K ou cliquez sur la barre de recherche dans la barre de navigation.',
      },
      {
        name: 'Rechercher dans les Bibliothèques & Scrapers',
        text: 'Saisissez des titres de films, séries, noms d’acteurs ou studios avec regroupement en direct.',
      },
      {
        name: 'Appliquer des Filtres Instantanés',
        text: 'Affinez les résultats par catégorie, résolution, année de sortie ou tag.',
      },
    ],
  },
  'lists': {
    name: 'Comment créer des collections thématiques avec jaquette mosaïque 4 affiches',
    description: 'Créez vos listes de lecture, organisez vos collections et générez automatiquement des jaquettes en mosaïque.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Créer une Nouvelle Collection',
        text: 'Ouvrez les Listes et définissez le titre, la description thématique et l’ordre des éléments.',
      },
      {
        name: 'Ajouter des Titres Multimédias',
        text: 'Ajoutez des films ou des séries depuis les cartes ou les pages de détails.',
      },
      {
        name: 'Générer la Jaquette 4 Affiches',
        text: 'SWAYA crée automatiquement une jaquette mosaïque à partir des titres de la collection.',
      },
    ],
  },
  'ratings': {
    name: 'Comment noter des médias et rédiger des avis privés en Markdown dans SWAYA',
    description: 'Attribuez des notes sur 10 étoiles, enregistrez des notes privées en Markdown et filtrez vos favoris.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Noter sur une Échelle de 10 Étoiles',
        text: 'Notez vos films, séries et scènes avec une précision par demi-étoile.',
      },
      {
        name: 'Rédiger des Avis Privés en Markdown',
        text: 'Consignez vos impressions et tags personnels stockés 100 % hors ligne sur votre poste.',
      },
      {
        name: 'Filtrer par Notes & Favoris',
        text: 'Filtrez votre médiathèque par échelon de notes ou consultez vos titres favoris.',
      },
    ],
  },
  'history': {
    name: 'Comment suivre et gérer l’historique de visionnage dans SWAYA',
    description: 'Consultez vos sessions de lecture horodatées, vos points de reprise et vos journaux de visionnage.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Ouvrir le Journal d’Historique',
        text: 'Consultez les sessions de lecture chronologiques avec horodatages et pourcentages complétés.',
      },
      {
        name: 'Reprendre les Titres Inachevés',
        text: 'Cliquez sur une session inachevée pour relancer la lecture à l’endroit exact.',
      },
      {
        name: 'Filtrer ou Vider l’Historique',
        text: 'Filtrez par plage de dates ou supprimez des entrées individuelles de lecture.',
      },
    ],
  },
  'statistics': {
    name: 'Comment analyser l’espace disque et l’ADN de votre médiathèque dans SWAYA',
    description: 'Analysez la capacité de vos disques, la répartition des codecs vidéo et l’ADN des genres.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Vérifier l’Espace par Codec & Résolution',
        text: 'Consultez l’espace occupé par les codecs 4K UHD, 1080p FHD, HEVC et AV1.',
      },
      {
        name: 'Explorer les Répartitions de l’ADN',
        text: 'Explorez des graphiques interactifs sur la densité des genres, les décennies et les studios.',
      },
    ],
  },
  'settings': {
    name: 'Comment configurer les modèles de dossiers et clés de scrapers dans SWAYA',
    description: 'Personnalisez vos modèles de dossiers, renseignez vos clés API et activez le mode furtif.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Définir les Dossiers Cibles',
        text: 'Choisissez les dossiers de destination pour les films, séries et médias privés.',
      },
      {
        name: 'Sélectionner Modèles & Présélections',
        text: 'Configurez des règles de structure Plex/Jellyfin avec des balises dynamiques comme {title} ({year}).',
      },
      {
        name: 'Renseigner les Clés API des Scrapers',
        text: 'Ajoutez vos clés TMDb ou StashDB pour un enrichissement rapide des métadonnées.',
      },
      {
        name: 'Configurer le Mode Furtif',
        text: 'Définissez une touche rapide pour masquer instantanément vos collections sensibles.',
      },
    ],
  },
  'torrent': {
    name: 'Comment intégrer un client torrent avec auto-organisation dans SWAYA',
    description: 'Connectez qBittorrent, suivez vos téléchargements en direct et importez automatiquement les fichiers terminés.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Activer l’Intégration Torrent',
        text: 'Renseignez l’adresse WebUI, le port et les identifiants qBittorrent dans les Paramètres.',
      },
      {
        name: 'Surveiller les Téléchargements Actifs',
        text: 'Suivez la vitesse de transfert, le temps restant et l’avancement directement dans SWAYA.',
      },
      {
        name: 'Organisation Automatique des Fichiers Finis',
        text: 'SWAYA récupère automatiquement les métadonnées et range les fichiers terminés dans vos dossiers.',
      },
    ],
  },
};
