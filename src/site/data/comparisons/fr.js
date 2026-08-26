export const fr = {
  filebot: {
    title: 'SWAYA vs FileBot : Station Multimédia Moderne & Renommage de Fichiers',
    metaTitle: 'Alternative à FileBot pour Windows - SWAYA Batch Renamer & Lecteur MPV',
    metaDescription: 'Vous cherchez une alternative moderne à FileBot ? SWAYA renomme les fichiers sur disque via TMDb & StashDB, avec bibliothèque hors ligne et lecteur 4K MPV.',
    heroTagline: 'Pourquoi simplement renommer vos fichiers quand vous pouvez organiser et lire toute votre collection ?',
    heroSubtitle: 'FileBot est excellent pour renommer les fichiers, mais SWAYA propulse vos médias locaux au niveau supérieur : organisation sur disque, superbe médiathèque hors ligne et lecteur 4K HDR MPV intégré.',
    competitorPricing: '6 $/an ou 48 $ à vie',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous avez uniquement besoin d\'un outil en ligne de commande (CLI) pour Linux headless ou scripts NAS.',
      'Vous écrivez des expressions de renommage personnalisées en Groovy.',
      'Vous utilisez déjà un media center séparé (comme Plex ou Kodi) et ne voulez pas de lecteur intégré.',
    ],
    whenToChooseSwaya: [
      'Vous voulez une solution desktop tout-en-un : renommer sur disque ET explorer/lire instantanément votre bibliothèque.',
      'Vous gérez à la fois des films/séries grand public (TMDb) et des scènes pour adultes (StashDB, FansDB, ThePornDB).',
      'Vous voulez un lecteur MPV avec accélération matérielle, reprise au millième de seconde et sans transcodage.',
      'Vous préférez une interface moderne pour Windows avec simulation sécurisée et protection contre les collisions.',
    ],
    matrix: [
      { feature: 'Renommage physique des fichiers sur disque', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Aperçu simulé & protection contre les collisions', swayaNote: 'Détection intelligente et remplacement', competitorNote: 'Liste d\'aperçu simple' },
      { feature: 'Lecteur vidéo MPV 4K/HDR intégré', swayaNote: 'Accélération matérielle, synchronisation audio et sous-titres', competitorNote: 'Aucun lecteur intégré' },
      { feature: 'Médiathèque visuelle hors ligne & pages détaillées', swayaNote: 'Affiches, arrière-plans, casting, genres, notes', competitorNote: 'Aucune interface de médiathèque' },
      { feature: 'Médias pour adultes & support scrapers StashDB', swayaNote: 'Intégration native StashDB, FansDB & index des acteurs', competitorNote: 'Bases de données grand public uniquement' },
      { feature: 'Mode double (SFW / NSFW) avec code PIN', swayaNote: 'Isolation totale de la base de données et verrouillage', competitorNote: 'Non disponible' },
      { feature: 'Import automatique client torrent (qBittorrent)', swayaNote: 'Intégration directe et seeding sur place', competitorNote: 'Uniquement via scripts CLI' },
      { feature: '100% Hors ligne et sans serveur (0 démon)', swayaNote: 'Aucun service en arrière-plan ni port ouvert', competitorNote: 'Application Java locale' },
      { feature: 'Interface Windows moderne (Sans Java)', swayaNote: 'Application de bureau native', competitorNote: 'Interface Java / Swing' },
      { feature: 'Licence à vie en achat unique', swayaNote: '39 € lancement / 79 € à vie', competitorNote: '48 $ à vie ou 6 $/an' },
    ],
    deepDives: [
      {
        title: 'Bien plus qu’un simple renommage : un univers multimédia complet',
        description: 'FileBot s’arrête une fois les fichiers renommés. SWAYA transforme immédiatement vos fichiers en une riche bibliothèque visuelle avec affiches, biographies d\'acteurs, résumés d\'épisodes et listes personnalisées.',
      },
      {
        title: 'Lecteur 4K HDR MPV intégré',
        description: 'Inutile de lancer un lecteur tiers. Cliquez sur n\'importe quelle vidéo dans SWAYA pour lire instantanément des fichiers MKV volumineux, du HDR et du Dolby Atmos avec accélération GPU fluide.',
      },
      {
        title: 'Médias grand public et adultes au même endroit',
        description: 'SWAYA est la première station multimédia dotée d\'une architecture Dual-Mode : gérez vos blockbusters avec TMDb et vos scènes avec StashDB, isolées derrière un code PIN sécurisé.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA peut-il remplacer FileBot pour renommer des films et séries ?',
        a: 'Oui. SWAYA analyse vos dossiers de téléchargement, associe les titres via TMDb, permet des ajustements interactifs et renomme physiquement vos fichiers sur le disque.',
      },
      {
        q: 'SWAYA permet-il de continuer le seeding torrent pendant l’organisation ?',
        a: 'Oui. Le mode "Importer sur place" récupère toutes les métadonnées et affiches dans la médiathèque tout en laissant les fichiers physiques intacts pour le seeding.',
      },
      {
        q: 'Faut-il installer Java pour exécuter SWAYA ?',
        a: 'Non. SWAYA est une application native autonome pour Windows qui ne nécessite aucun environnement d\'exécution Java.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex : Station Multimédia 100% Hors Ligne Sans Serveur',
    metaTitle: 'Alternative à Plex pour Windows Sans Serveur - SWAYA',
    metaDescription: 'Vous cherchez une alternative privée à Plex sans serveur ? SWAYA organise les fichiers sur disque, lit la 4K HDR via MPV et ne nécessite aucun compte cloud.',
    heroTagline: 'Votre collection personnelle sans serveurs, comptes cloud ni télémétrie.',
    heroSubtitle: 'Plex est conçu pour le streaming réseau mais requiert des services permanents en arrière-plan et des abonnements. SWAYA offre une expérience de bureau directe et 100% hors ligne sur votre PC.',
    competitorPricing: 'Gratuit / 4,99 $/mois / 119 $ à vie (Plex Pass)',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous voulez diffuser des médias sur Smart TV, smartphones et partager avec des proches hors du domicile.',
      'Vous gérez un NAS dédié ou serveur domestique avec transcodage multi-utilisateurs.',
      'Vous avez besoin d\'une synchronisation distante sur iOS, Android et Apple TV.',
    ],
    whenToChooseSwaya: [
      'Vous regardez vos films et séries directement sur votre PC Windows, ordinateur portable ou écran dédié.',
      'Vous voulez 100% de confidentialité : zéro compte cloud, zéro télémétrie et aucun port ouvert.',
      'Vous voulez que les fichiers réels sur vos disques durs soient proprement renommés et classés.',
      'Vous refusez la complexité des serveurs et les bugs de transcodage.',
    ],
    matrix: [
      { feature: '100% Hors ligne et zéro configuration de serveur', swayaNote: 'App de bureau directe, aucun démon', competitorNote: 'Nécessite le backend Plex Media Server' },
      { feature: 'Renommage physique et organisation sur disque', swayaNote: 'Renomme les fichiers réels', competitorNote: 'Base virtuelle uniquement' },
      { feature: 'Sans compte cloud / Confidentialité totale', swayaNote: 'Aucun login, base SQLite locale', competitorNote: 'Authentification en ligne obligatoire' },
      { feature: 'Lecteur MPV natif (Sans transcodage)', swayaNote: 'Lit tous les codecs en 4K HDR directement', competitorNote: 'Transcode souvent inutilement' },
      { feature: 'Médias pour adultes (StashDB) & Mode double', swayaNote: 'Mode adulte dédié & StashDB/FansDB', competitorNote: 'Requiert des plugins instables' },
      { feature: 'Organisateur interactif avec simulation', swayaNote: 'Contrôle et modification avant transfert', competitorNote: 'Surveillance passive des dossiers uniquement' },
      { feature: 'Intégration client torrent (Import sur place)', swayaNote: 'Intégration directe qBittorrent', competitorNote: 'Non supporté nativement' },
      { feature: 'Prix unique à vie (Sans abonnement mensuel)', swayaNote: '39 € paiement unique', competitorNote: '119 $ à vie ou 4,99 $/mois' },
      { feature: 'Signets précis des moments favoris', swayaNote: 'Capture d\'écran et timestamp via la touche Entrée', competitorNote: 'Non disponible' },
      { feature: 'Zéro consommation CPU/RAM en arrière-plan', swayaNote: 'Rien ne tourne une fois l\'app fermée', competitorNote: 'Le serveur tourne en permanence' },
    ],
    deepDives: [
      {
        title: 'Zéro serveur, zéro port ouvert',
        description: 'Plex nécessite des démons actifs en continu. SWAYA est une application de bureau légère : dès que vous la fermez, aucun processus ne subsiste.',
      },
      {
        title: 'Organisation réelle sur disque vs bibliothèques virtuelles',
        description: 'Plex applique simplement des métadonnées sur des dossiers désordonnés. SWAYA nettoie, renomme et structure les fichiers physiques sur vos disques.',
      },
      {
        title: 'Lecteur MPV natif sans transcodage',
        description: 'Fini les lenteurs de transcodage sur la 4K HDR ou les sous-titres PGS : le moteur MPV intégré dans SWAYA lit tout avec une accélération GPU optimale.',
      },
    ],
    faqs: [
      {
        q: 'Puis-je utiliser SWAYA sans connexion Internet ?',
        a: 'Oui ! SWAYA fonctionne à 100% hors ligne. Une fois les métadonnées et affiches téléchargées, aucune connexion n\'est requise pour naviguer ou regarder.',
      },
      {
        q: 'SWAYA diffuse-t-il sur Smart TV comme Plex ?',
        a: 'SWAYA est conçu spécifiquement comme une station de travail pour PC et ordinateurs portables et n\'intègre pas de serveur de streaming pour TV.',
      },
      {
        q: 'SWAYA collecte-t-il des données de visionnage ?',
        a: 'Non. SWAYA n\'exige aucun compte en ligne, ne recueille aucune télémétrie et conserve toutes vos données localement sur votre machine.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager : Gestionnaire de Médias & Lecteur Desktop',
    metaTitle: 'Alternative à tinyMediaManager pour Windows - SWAYA',
    metaDescription: 'Vous cherchez une alternative à tinyMediaManager ? SWAYA propose le renommage par lot, le scraping TMDb/StashDB et un lecteur 4K MPV sans Java.',
    heroTagline: 'Organisez et profitez immédiatement de vos médias sans interfaces Java lourdes.',
    heroSubtitle: 'tinyMediaManager est un excellent générateur de fichiers NFO, mais requiert Java et n\'a pas de lecteur intégré. SWAYA réunit renommage sur disque, médiathèque élégante et lecteur 4K MPV.',
    competitorPricing: '15 €/an (v4/v5 Pro)',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous avez impérativement besoin de fichiers .NFO pour une configuration Kodi existante.',
      'Vous gérez vos médias simultanément sur macOS, Linux et Windows.',
      'Vous recherchez une édition avancée de balises XML/NFO.',
    ],
    whenToChooseSwaya: [
      'Vous voulez une application de bureau moderne et réactive sans installer Java.',
      'Vous voulez un flux unifié : organiser, explorer et regarder en un clic.',
      'Vous gérez des médias pour adultes (StashDB, FansDB) aux côtés de films et séries.',
      'Vous préférez une licence à vie unique plutôt qu\'un abonnement annuel.',
    ],
    matrix: [
      { feature: 'Renommage sur disque et structure des dossiers', swayaNote: 'Modèles intelligents et protection anti-collision', competitorNote: 'Renommage par motif' },
      { feature: 'Lecteur vidéo avec accélération matérielle', swayaNote: 'Lecteur MPV 4K HDR natif', competitorNote: 'Aucun moteur de lecture intégré' },
      { feature: 'Scrapers médias adultes (StashDB / FansDB)', swayaNote: 'Scrapers dédiés et index des acteurs', competitorNote: 'Non pris en charge' },
      { feature: 'Mode double avec protection par code PIN', swayaNote: 'Base de données isolée et verrouillage rapide', competitorNote: 'Aucun mode de confidentialité' },
      { feature: 'Interface de bureau moderne (Sans Java)', swayaNote: 'Application native légère et rapide', competitorNote: 'Interface Java Swing' },
      { feature: 'Fenêtres interactives d\'association et d\'édition', swayaNote: 'Recherche rapide, sélecteur d\'épisodes & tags', competitorNote: 'Boîtes de dialogue scraper' },
      { feature: 'Intégration client torrent (Mode Seeding)', swayaNote: 'Import sur place et maintien du seeding', competitorNote: 'Non disponible' },
      { feature: 'Historique de lecture et suivi des moments', swayaNote: 'Statistiques détaillées, timestamps et captures', competitorNote: 'Marqueurs simples vu/non vu' },
      { feature: 'Modèle de licence', swayaNote: 'Achat unique à vie (39 €)', competitorNote: 'Abonnement récurrent 15 €/an' },
    ],
    deepDives: [
      {
        title: 'Tout-en-un : organiser, explorer et lire',
        description: 'Avec tinyMediaManager, vous devez sans cesse basculer entre tMM et un lecteur externe. SWAYA offre un espace de travail unifié et élégant.',
      },
      {
        title: 'Achat unique à vie vs abonnements annuels',
        description: 'tMM v4/v5 facture un abonnement annuel pour les scrapers en ligne. SWAYA est accessible en paiement unique avec toutes les mises à jour futures.',
      },
      {
        title: 'Scraping complet grand public et adultes',
        description: 'Alors que tMM se limite aux films et séries, SWAYA intègre nativement StashDB et FansDB pour gérer toute votre collection.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA génère-t-il des fichiers lisibles par Kodi/Jellyfin ?',
        a: 'SWAYA organise vos dossiers et fichiers selon les normes universelles Plex/Jellyfin/Kodi, garantissant une compatibilité totale avec les autres logiciels.',
      },
      {
        q: 'SWAYA démarre-t-il plus vite que les applications Java ?',
        a: 'Oui. SWAYA s\'ouvre instantanément avec une faible empreinte mémoire, sans les lenteurs de la machine virtuelle Java.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp : Station Multimédia de Bureau Sans Serveur Web',
    metaTitle: 'Alternative à StashApp pour Windows - SWAYA Desktop Organizer',
    metaDescription: 'Vous cherchez une alternative native à StashApp sur Windows ? SWAYA réunit StashDB, renommage sur disque et lecteur MPV sans serveur.',
    heroTagline: 'La station multimédia privée ultime sans serveurs localhost ni Docker.',
    heroSubtitle: 'Stash est un bon serveur web pour médias adultes dans le navigateur. SWAYA est une application native pour Windows gérant TMDb et StashDB avec lecteur MPV intégré.',
    competitorPricing: 'Gratuit / Open Source',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous gérez un serveur Linux ou des conteneurs Docker pour un accès multi-clients.',
      'Vous utilisez des plugins communautaires spécialisés.',
      'Vous cherchez une application web accessible uniquement dans le navigateur.',
    ],
    whenToChooseSwaya: [
      'Vous voulez une application de bureau unique sans serveur web en arrière-plan (`localhost:9999`).',
      'Vous voulez des films grand public (TMDb) et des scènes adultes (StashDB) dans une seule application.',
      'Vous voulez renommer et structurer les fichiers réels sur le disque avec protection anti-collision.',
      'Vous voulez un lecteur MPV avec accélération GPU sans les limites des navigateurs.',
    ],
    matrix: [
      { feature: 'App de bureau native (Sans serveur localhost)', swayaNote: 'Exécutable unique, 0 démon en arrière-plan', competitorNote: 'Lance un serveur Go sur localhost:9999' },
      { feature: 'Renommage et organisation des fichiers sur disque', swayaNote: 'Renomme et déplace les fichiers réels', competitorNote: 'Laisse les fichiers inchangés dans les dossiers' },
      { feature: 'Mode double : Grand public (TMDb) + Adultes (StashDB)', swayaNote: 'Bascule instantanée entre profils SFW et NSFW', competitorNote: 'Médias adultes uniquement' },
      { feature: 'Lecteur 4K MPV natif avec accélération GPU', swayaNote: 'Lit tous les codecs avec une fluidité absolue', competitorNote: 'Lecteur HTML5 dans le navigateur' },
      { feature: 'Tableaux interactifs d\'association et d\'édition', swayaNote: 'Simulation sécurisée avec actions de groupe', competitorNote: 'Interface tagger' },
      { feature: 'Profils d\'acteurs, labels de studios et tags', swayaNote: 'Profils complets et galeries d\'images', competitorNote: 'Base de données d\'acteurs détaillée' },
      { feature: 'Enregistrement des moments clés et captures', swayaNote: 'Capture d\'écran et timestamp via la touche Entrée', competitorNote: 'Marqueurs de scènes' },
      { feature: 'Verrouillage de confidentialité avec code PIN', swayaNote: 'Verrouillage immédiat et base adulte masquée', competitorNote: 'Plugin d\'authentification basique' },
      { feature: 'Intégration client torrent (qBittorrent)', swayaNote: 'Synchronisation directe et maintien du seeding', competitorNote: 'Uniquement via scripts externes' },
    ],
    deepDives: [
      {
        title: 'Lecteur MPV natif vs limites des codecs de navigateur',
        description: 'Stash utilise HTML5 dans le navigateur, nécessitant du transcodage pour les vidéos lourdes 4K HEVC 10-bit. Le lecteur MPV intégré dans SWAYA lit tous les formats sans surcharger le processeur.',
      },
      {
        title: 'Médiathèque unifiée pour tous vos contenus',
        description: 'Fini les logiciels séparés : SWAYA propose une bascule instantanée entre les modes Grand Public et Adulte avec une isolation complète des données.',
      },
      {
        title: 'Organisation réelle des fichiers sur vos disques',
        description: 'Contrairement à Stash qui ne fait qu\'indexer les fichiers en base, SWAYA renomme et classe vos téléchargements dans des dossiers propres sur votre disque.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA peut-il récupérer les données directement depuis StashDB ?',
        a: 'Oui ! Entrez votre clé API StashDB dans les Paramètres pour que SWAYA identifie automatiquement titres, acteurs, studios et couvertures HD.',
      },
      {
        q: 'Comment SWAYA protège-t-il la confidentialité des contenus adultes ?',
        a: 'SWAYA intègre un verrouillage par code PIN : lorsqu\'il est verrouillé, le profil adulte est totalement masqué.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin : Station de Bureau Locale vs Serveur Domestique',
    metaTitle: 'Alternative à Jellyfin pour Windows Sans Serveur - SWAYA',
    metaDescription: 'Vous cherchez une alternative simple à Jellyfin pour PC ? SWAYA organise vos disques et lit la 4K HDR via MPV sans configuration réseau.',
    heroTagline: 'Votre collection sur disque sans conteneurs Docker ni serveurs.',
    heroSubtitle: 'Jellyfin est un formidable serveur de streaming domestique. Mais si vous voulez simplement organiser et regarder des vidéos sur votre PC, SWAYA offre une solution directe.',
    competitorPricing: 'Gratuit / Open Source (FOSS)',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous voulez diffuser des médias sur des téléviseurs et smartphones dans toute la maison.',
      'Vous gérez un serveur Linux/Docker avec de multiples utilisateurs.',
      'Vous exigez un logiciel serveur exclusivement open-source.',
    ],
    whenToChooseSwaya: [
      'Vous regardez vos films et organisez vos téléchargements directement sur votre PC Windows.',
      'Vous ne voulez pas ouvrir de ports ni configurer de profils de transcodage.',
      'Vous voulez un renommage physique des fichiers et une lecture MPV 4K fluide.',
      'Vous voulez un support intégré de StashDB aux côtés de vos films habituels.',
    ],
    matrix: [
      { feature: 'Zéro configuration et maintenance de serveur', swayaNote: 'Démarrage instantané, aucun démon', competitorNote: 'Installation de serveur requise' },
      { feature: 'Renommage et organisation physique des fichiers', swayaNote: 'Déplacement et structure réels sur disque', competitorNote: 'Bibliothèque virtuelle en lecture seule' },
      { feature: 'Lecteur MPV 4K HDR intégré', swayaNote: 'Accélération GPU native sans latence', competitorNote: 'Clients web/HTML5 ou wrappers' },
      { feature: 'Médias pour adultes (StashDB) & Mode double', swayaNote: 'Intégration native StashDB/FansDB', competitorNote: 'Requiert des plugins tiers' },
      { feature: '100% Hors ligne sans ports réseau ouverts', swayaNote: 'Aucun port ouvert, 100% local', competitorNote: 'Requiert un serveur sur réseau local' },
      { feature: 'Organisateur interactif avec simulation', swayaNote: 'Contrôle complet et protection anti-collision', competitorNote: 'Surveillance de dossiers uniquement' },
      { feature: 'Intégration client torrent (Mode Seeding)', swayaNote: 'Intégration directe qBittorrent', competitorNote: 'Non pris en charge' },
      { feature: 'Suivi des moments clés et signets', swayaNote: 'Capture d\'écran et marqueur en 1 touche', competitorNote: 'Non disponible' },
    ],
    deepDives: [
      {
        title: 'Simplicité de bureau vs complexité des serveurs',
        description: 'Jellyfin implique la gestion de ports et de services. SWAYA est une application de bureau autonome qui fonctionne immédiatement.',
      },
      {
        title: 'Structure réelle des fichiers sur le disque',
        description: 'Jellyfin suppose que vos fichiers soient déjà triés. SWAYA prend en charge l\'organisation active de vos dossiers de téléchargement.',
      },
      {
        title: 'Performances MPV natives',
        description: 'Profitez d\'un défilement instantané, de sous-titres impeccables et d\'une lecture fluide en 4K HDR grâce au moteur MPV intégré.',
      },
    ],
    faqs: [
      {
        q: 'Puis-je utiliser SWAYA pour préparer des dossiers pour Jellyfin ?',
        a: 'Oui ! SWAYA formate vos fichiers selon les conventions standards reconnues sans erreur par Jellyfin.',
      },
      {
        q: 'SWAYA consomme-t-il des ressources en arrière-plan ?',
        a: 'Non. Dès que vous fermez SWAYA, aucun processus ou service ne reste actif.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi : Media Center Moderne Sans Extensions Fragiles',
    metaTitle: 'Alternative à Kodi pour PC Windows - SWAYA',
    metaDescription: 'Vous cherchez une alternative moderne à Kodi pour PC ? SWAYA intègre un lecteur MPV, le renommage de fichiers et une interface fluide sans plugins instables.',
    heroTagline: 'Une expérience multimédia moderne pensée pour la souris, le clavier et les disques.',
    heroSubtitle: 'Kodi est parfait pour la télévision avec télécommande mais peu pratique sur un écran de PC. SWAYA est taillé sur mesure pour le bureau Windows.',
    competitorPricing: 'Gratuit / Open Source (FOSS)',
    swayaPricing: '39 € offre de lancement (79 € prix standard)',
    whenToChooseCompetitor: [
      'Vous utilisez un PC home cinéma relié au téléviseur avec télécommande.',
      'Vous utilisez des extensions spécialisées pour IPTV ou PVR.',
      'Vous voulez une interface canapé de 10 pieds.',
    ],
    whenToChooseSwaya: [
      'Vous utilisez un PC Windows avec souris et clavier.',
      'Vous voulez un renommage sécurisé et de l\'ordre sur vos disques durs.',
      'Vous voulez un logiciel stable qui ne plante pas après les mises à jour.',
      'Vous voulez gérer films (TMDb) et contenus adultes (StashDB) au même endroit.',
    ],
    matrix: [
      { feature: 'Interface de bureau moderne (Souris & Clavier)', swayaNote: 'Interface fluide pour PC', competitorNote: 'Interface TV pour télécommande' },
      { feature: 'Renommage et organisation physique des fichiers', swayaNote: 'Renomme et déplace réellement les fichiers', competitorNote: 'Base de données uniquement, ne renomme pas' },
      { feature: 'Moteur vidéo MPV 4K/HDR intégré', swayaNote: 'Accélération matérielle sans saccades', competitorNote: 'Lecteur interne de Kodi' },
      { feature: 'Médias pour adultes (StashDB) & Mode double', swayaNote: 'Intégration native StashDB/FansDB', competitorNote: 'Requiert des extensions instables' },
      { feature: 'Stabilité absolue sans extensions défectueuses', swayaNote: 'Architecture intégrée et fiable', competitorNote: 'Les extensions cassent souvent aux mises à jour' },
      { feature: 'Simulation avec protection anti-collision', swayaNote: 'Aperçu sécurisé avant transfert', competitorNote: 'Non disponible' },
      { feature: 'Intégration client torrent (Mode Seeding)', swayaNote: 'Connexion directe à qBittorrent', competitorNote: 'Requiert des scripts externes' },
    ],
    deepDives: [
      {
        title: 'Priorité au bureau plutôt qu’à l’interface TV',
        description: 'Kodi est conçu pour la télécommande. SWAYA est optimisé pour un usage fluide avec souris, fenêtres et raccourcis sur Windows.',
      },
      {
        title: 'Renommage physique des fichiers sur disque',
        description: 'Kodi attend des fichiers déjà bien nommés. SWAYA accomplit la tâche pour vous en analysant et renommant les fichiers sur disque.',
      },
      {
        title: 'Zéro casse-tête de maintenance d’extensions',
        description: 'Toutes les fonctionnalités essentielles - scrapers, médiathèque et lecteur - sont intégrées au cœur de SWAYA.',
      },
    ],
    faqs: [
      {
        q: 'Puis-je utiliser SWAYA pour préparer des fichiers pour Kodi ?',
        a: 'Oui ! SWAYA classe vos fichiers selon des conventions claires que Kodi reconnaît automatiquement.',
      },
      {
        q: 'SWAYA est-il plus simple à utiliser que Kodi ?',
        a: 'Beaucoup plus simple. Il ne requiert aucun dépôt, configuration XML complexe ni installation d\'extensions : il fonctionne directement.',
      },
    ],
  },
};
