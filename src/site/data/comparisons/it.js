export const it = {
  filebot: {
    title: 'SWAYA vs FileBot: Workstation Desktop Moderna e Rinomina File',
    metaTitle: 'Alternativa a FileBot per Windows - SWAYA Batch Renamer & Player',
    metaDescription: 'Cerchi un’alternativa moderna a FileBot? SWAYA rinomina i file su disco con TMDb & StashDB, offrendo una libreria multimediale offline e player 4K MPV.',
    heroTagline: 'Perché limitarsi a rinominare i file quando puoi organizzare e riprodurre l’intera collezione?',
    heroSubtitle: 'FileBot è ottimo per rinominare i file, ma SWAYA porta i tuoi media al livello successivo: organizzazione su disco, splendida libreria offline e lettore MPV 4K HDR integrato in una moderna app per Windows.',
    competitorPricing: '$6/anno o $48 licenza a vita',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Ti serve solo uno strumento a riga di comando (CLI) per Linux headless o script NAS.',
      'Scrivi espressioni Groovy personalizzate e hook di scripting automatizzati.',
      'Usi già un media center separato (come Plex o Kodi) e non desideri un lettore integrato.',
    ],
    whenToChooseSwaya: [
      'Vuoi una soluzione desktop completa: rinomina su disco E riproduzione istantanea nella libreria.',
      'Gestisci sia film/serie mainstream (TMDb) che scene per adulti (StashDB, FansDB, ThePornDB).',
      'Vuoi un player MPV accelerato via hardware con ripresa esatta al frame e zero transcodifica.',
      'Preferisci una moderna interfaccia desktop con simulazione sicura e protezione dalle collisioni.',
    ],
    matrix: [
      { feature: 'Rinomina fisica dei file su disco', swayaNote: 'TMDb, ThePornDB, StashDB, FansDB', competitorNote: 'TheMovieDB, TVmaze, AniDB' },
      { feature: 'Anteprima simulata e protezione collisioni', swayaNote: 'Rilevamento intelligente collisioni e sostituzione', competitorNote: 'Elenco anteprima' },
      { feature: 'Lettore video 4K/HDR MPV integrato', swayaNote: 'Accelerazione hardware, sync sottotitoli e audio', competitorNote: 'Nessun lettore integrato' },
      { feature: 'Libreria multimediale offline visiva e pagine di dettaglio', swayaNote: 'Locandine, sfondi, cast, generi, valutazioni', competitorNote: 'Nessuna interfaccia libreria' },
      { feature: 'Supporto media per adulti e scraper StashDB', swayaNote: 'Integrazione nativa StashDB, FansDB e indice attori', competitorNote: 'Solo database mainstream' },
      { feature: 'Modalità Dual Mode (SFW / NSFW) con PIN', swayaNote: 'Isolamento completo del database e blocco', competitorNote: 'Non disponibile' },
      { feature: 'Importazione automatica client torrent (qBittorrent)', swayaNote: 'Integrazione integrata e seeding sul posto', competitorNote: 'Solo tramite script CLI personalizzati' },
      { feature: '100% Offline e senza server (0 daemon in background)', swayaNote: 'Nessun servizio in background né porte aperte', competitorNote: 'Applicazione Java locale' },
      { feature: 'Interfaccia desktop Windows moderna (Senza Java)', swayaNote: 'Applicazione desktop nativa', competitorNote: 'Interfaccia Java / Swing' },
      { feature: 'Licenza a vita con pagamento unico', swayaNote: '€39 lancio / €79 a vita', competitorNote: '$48 a vita o $6/anno' },
    ],
    deepDives: [
      {
        title: 'Oltre la semplice rinomina: un intero universo multimediale',
        description: 'FileBot si ferma una volta rinominati i file su disco. SWAYA trasforma all’istante i tuoi file in una ricca libreria visiva con locandine, biografie degli attori, trame degli episodi e filtri personalizzati.',
      },
      {
        title: 'Player MPV 4K HDR integrato',
        description: 'Non c’è bisogno di avviare lettori esterni. Clicca su qualsiasi video in SWAYA per riprodurre immediatamente file MKV pesanti, HDR, Dolby Atmos e sottotitoli complessi con accelerazione GPU.',
      },
      {
        title: 'Media mainstream e per adulti in un unico posto',
        description: 'SWAYA è la prima workstation multimediale con architettura Dual-Mode: gestisci i film con TMDb e le scene per adulti con StashDB, protette da un PIN di sicurezza opzionale.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA può sostituire FileBot per rinominare film e serie TV?',
        a: 'Sì. SWAYA scansiona le tue cartelle di download, riconosce i titoli con TMDb, permette l’abbinamento interattivo degli episodi e rinomina fisicamente i file secondo la tua struttura personalizzata.',
      },
      {
        q: 'SWAYA supporta il seeding dei torrent durante l’organizzazione?',
        a: 'Sì. La modalità "Importa sul posto" scarica tutti i metadati e le locandine nella libreria lasciando i file e le cartelle fisiche intatti per il seeding continuo.',
      },
      {
        q: 'È necessario installare Java per eseguire SWAYA?',
        a: 'No. SWAYA è un’applicazione desktop autonoma e nativa che non richiede Java né runtime esterni.',
      },
    ],
  },
  plex: {
    title: 'SWAYA vs Plex: Workstation Multimediale 100% Offline Senza Server',
    metaTitle: 'Alternativa a Plex per Windows Senza Server - SWAYA',
    metaDescription: 'Cerchi un’alternativa privata a Plex senza configurare server? SWAYA organizza i file su disco, riproduce 4K HDR via MPV e non richiede account online.',
    heroTagline: 'La tua collezione personale senza server, account cloud o telemetria.',
    heroSubtitle: 'Plex è progettato per lo streaming su rete domestica ma richiede daemon sempre attivi, account cloud e abbonamenti Plex Pass. SWAYA offre un’esperienza desktop immediata e 100% offline direttamente sul tuo PC.',
    competitorPricing: 'Gratis / $4.99/mese / $119 a vita (Plex Pass)',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Vuoi trasmettere contenuti in streaming su Smart TV, smartphone e condividere con familiari fuori casa.',
      'Gestisci un NAS dedicato o server domestico con transcodifica multi-utente.',
      'Hai bisogno di sincronizzazione remota tra dispositivi iOS, Android e Apple TV.',
    ],
    whenToChooseSwaya: [
      'Guardi film e serie TV direttamente sul tuo PC Windows, laptop o monitor collegato.',
      'Vuoi il 100% di privacy: zero account cloud, zero telemetria e zero porte aperte.',
      'Vuoi che i file fisici sul disco rigido siano rinominati e strutturati in modo ordinato.',
      'Non vuoi configurare server, gestire processi in background o problemi di transcodifica.',
    ],
    matrix: [
      { feature: '100% Offline e zero configurazione server', swayaNote: 'App desktop immediata, nessun daemon', competitorNote: 'Richiede backend Plex Media Server' },
      { feature: 'Rinomina e organizzazione fisica dei file', swayaNote: 'Rinomina i file reali su disco', competitorNote: 'Solo database virtuale' },
      { feature: 'Zero account cloud / Privacy assoluta', swayaNote: 'Nessun login, database SQLite locale', competitorNote: 'Autenticazione online Plex obbligatoria' },
      { feature: 'Player MPV nativo (Senza transcodifica)', swayaNote: 'Riproduce qualsiasi codec in 4K HDR', competitorNote: 'Spesso transcodifica durante la visione' },
      { feature: 'Media per adulti (StashDB) e Dual Mode', swayaNote: 'Modalità adulti dedicata & StashDB/FansDB', competitorNote: 'Richiede plugin esterni instabili' },
      { feature: 'Organizzatore interattivo con anteprima', swayaNote: 'Verifica e modifica prima di rinominare', competitorNote: 'Solo scansione passiva delle cartelle' },
      { feature: 'Integrazione client torrent (Importa sul posto)', swayaNote: 'Integrazione diretta qBittorrent', competitorNote: 'Non supportato nativamente' },
      { feature: 'Prezzo unico a vita (Nessun canone mensile)', swayaNote: '€39 lancio pagamento unico', competitorNote: '$119 Plex Pass a vita o $4.99/mese' },
      { feature: 'Segnalibri precisi dei momenti salienti', swayaNote: 'Screenshot e timestamp con tasto Enter', competitorNote: 'Non disponibile' },
      { feature: 'Zero consumo di CPU/RAM in background', swayaNote: 'Nessun processo attivo dopo la chiusura', competitorNote: 'Il server gira costantemente in background' },
    ],
    deepDives: [
      {
        title: 'Zero server in background, zero porte aperte',
        description: 'Plex richiede daemon costantemente attivi. SWAYA è un’applicazione desktop leggera: quando la chiudi, non rimane nulla attivo in memoria.',
      },
      {
        title: 'Organizzazione reale su disco vs librerie virtuali',
        description: 'Plex mappa solo metadati su cartelle disordinate. SWAYA pulisce, rinomina e organizza fisicamente i file e le cartelle sul tuo disco.',
      },
      {
        title: 'Player MPV nativo senza problemi di transcodifica',
        description: 'Niente più blocchi dovuti alla transcodifica di 4K HDR o sottotitoli PGS: il motore MPV integrato in SWAYA riproduce tutto fluidamente con accelerazione GPU.',
      },
    ],
    faqs: [
      {
        q: 'Posso usare SWAYA senza connessione internet?',
        a: 'Sì! SWAYA funziona al 100% offline. Dopo il download di metadati e locandine, non richiede alcuna connessione attiva per navigare o riprodurre.',
      },
      {
        q: 'SWAYA trasmette su Smart TV come Plex?',
        a: 'SWAYA è concepita come workstation personale per PC e laptop e non include un server di streaming per TV o smartphone.',
      },
      {
        q: 'SWAYA raccoglie dati di utilizzo o richiede un login?',
        a: 'No. SWAYA non richiede alcun account online né invia telemetria. Tutti i dati restano esclusivamente sul tuo PC.',
      },
    ],
  },
  tinymediamanager: {
    title: 'SWAYA vs tinyMediaManager: Gestione Media & Player Desktop',
    metaTitle: 'Alternativa a tinyMediaManager per Windows - SWAYA',
    metaDescription: 'Cerchi un’alternativa a tinyMediaManager? SWAYA offre rinomina batch, scraping TMDb/StashDB e player 4K MPV senza Java.',
    heroTagline: 'Organizza e goditi subito i tuoi media senza pesanti interfacce Java.',
    heroSubtitle: 'tinyMediaManager è un ottimo generatore di NFO ma richiede Java e non ha un player integrato. SWAYA unisce rinomina su disco, libreria visiva e player MPV 4K.',
    competitorPricing: '€15/anno (v4/v5 Pro)',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Ti servono file .NFO dettagliati per una configurazione Kodi esistente.',
      'Gestisci media contemporaneamente su macOS, Linux e Windows.',
      'Hai bisogno di modifiche complesse a tag XML/NFO.',
    ],
    whenToChooseSwaya: [
      'Vuoi un’app desktop moderna e veloce senza installare Java.',
      'Vuoi un flusso unico: organizza, esplora e guarda con un solo clic.',
      'Gestisci media per adulti (StashDB, FansDB) accanto a film e serie TV.',
      'Preferisci una licenza a vita anziché un abbonamento annuale.',
    ],
    matrix: [
      { feature: 'Rinomina su disco e layout cartelle', swayaNote: 'Template intelligenti e protezione collisioni', competitorNote: 'Rinomina basata su pattern' },
      { feature: 'Lettore video accelerato via hardware', swayaNote: 'Player nativo 4K HDR MPV', competitorNote: 'Nessun motore di riproduzione integrato' },
      { feature: 'Scraper media per adulti (StashDB / FansDB)', swayaNote: 'Scraper dedicati e indice attori', competitorNote: 'Non supportato' },
      { feature: 'Modalità Dual Mode con protezione PIN', swayaNote: 'Database isolato e blocco rapido', competitorNote: 'Nessuna modalità privacy' },
      { feature: 'Interfaccia desktop moderna (Senza Java)', swayaNote: 'App nativa snella e reattiva', competitorNote: 'Interfaccia Java Swing' },
      { feature: 'Finestre interattive di abbinamento e modifica', swayaNote: 'Ricerca rapida, selettore episodi ed editor tag', competitorNote: 'Finestre di dialogo scraper' },
      { feature: 'Integrazione client torrent (Modalità seeding)', swayaNote: 'Importazione sul posto e mantenimento seed', competitorNote: 'Non disponibile' },
      { feature: 'Cronologia di visione e tracciamento momenti', swayaNote: 'Statistiche dettagliate, timestamp e screenshot', competitorNote: 'Semplici flag visto/non visto' },
      { feature: 'Modello di licenza', swayaNote: 'Licenza a vita con pagamento unico (€39)', competitorNote: 'Abbonamento ricorrente €15/anno' },
    ],
    deepDives: [
      {
        title: 'Tutto in uno: organizza, esplora e riproduci',
        description: 'Con tinyMediaManager devi continuamente alternare tMM e un lettore esterno. SWAYA offre un unico ambiente di lavoro elegante.',
      },
      {
        title: 'Pagamento unico a vita vs abbonamenti annuali',
        description: 'tMM v4/v5 richiede un canone annuale per gli scraper online. SWAYA si acquista una volta sola con aggiornamenti a vita inclusi.',
      },
      {
        title: 'Scraping completo mainstream e per adulti',
        description: 'Mentre tMM supporta solo film e serie, SWAYA include integrazione di primo livello per StashDB e FansDB.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA genera file compatibili con Kodi/Jellyfin?',
        a: 'SWAYA organizza cartelle e file secondo gli standard Plex/Jellyfin/Kodi, rendendoli leggibili da tutti gli altri software.',
      },
      {
        q: 'SWAYA si avvia più velocemente delle app Java?',
        a: 'Sì. SWAYA si apre all’istante con basso consumo di memoria, senza i rallentamenti della Java Virtual Machine.',
      },
    ],
  },
  stash: {
    title: 'SWAYA vs StashApp: Workstation Desktop Senza Web Server',
    metaTitle: 'Alternativa a StashApp per Windows - SWAYA Desktop Organizer',
    metaDescription: 'Cerchi un’alternativa nativa per Windows a StashApp? SWAYA unisce StashDB, rinomina su disco e player MPV senza server.',
    heroTagline: 'La workstation multimediale privata definitiva senza server localhost né Docker.',
    heroSubtitle: 'Stash è un ottimo server per adulti via browser. SWAYA è un’app desktop nativa per Windows per contenuti TMDb e StashDB con player MPV integrato.',
    competitorPricing: 'Gratuito / Open Source',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Gestisci un server Linux o container Docker per accessi da più client.',
      'Usi plugin specializzati della community per siti rari.',
      'Cerchi un’applicazione web fruibile esclusivamente nel browser.',
    ],
    whenToChooseSwaya: [
      'Vuoi un’unica app desktop senza server web in background (`localhost:9999`).',
      'Vuoi film mainstream (TMDb) e scene per adulti (StashDB) in un’unica app.',
      'Vuoi rinominare e strutturare i file reali sul disco con protezione dalle collisioni.',
      'Vuoi un player MPV accelerato da GPU senza i limiti dei browser.',
    ],
    matrix: [
      { feature: 'App desktop nativa (Nessun server localhost)', swayaNote: 'Singolo eseguibile, 0 daemon in background', competitorNote: 'Esegue web server su localhost:9999' },
      { feature: 'Rinomina e organizzazione file su disco', swayaNote: 'Rinomina e sposta i file fisici', competitorNote: 'Lascia i file inalterati nelle cartelle' },
      { feature: 'Dual Mode: Mainstream (TMDb) + Adulti (StashDB)', swayaNote: 'Passaggio istantaneo tra librerie SFW e NSFW', competitorNote: 'Solo media per adulti' },
      { feature: 'Player MPV 4K nativo con accelerazione GPU', swayaNote: 'Riproduce qualsiasi codec senza scatti', competitorNote: 'Player HTML5 nel browser (limiti codec)' },
      { feature: 'Tabelle interattive di abbinamento e modifica', swayaNote: 'Simulazione sicura con azioni di gruppo', competitorNote: 'Interfaccia tagger' },
      { feature: 'Profili attori, label degli studi e tag', swayaNote: 'Profili ricchi e gallerie fotografiche', competitorNote: 'Database dettagliato attori' },
      { feature: 'Tracciamento momenti salienti e screenshot', swayaNote: 'Screenshot e timestamp con tasto Enter', competitorNote: 'Marcatori di scena' },
      { feature: 'Blocco privacy protetto da PIN', swayaNote: 'Blocco immediato e database adulti nascosto', competitorNote: 'Plugin di autenticazione base' },
      { feature: 'Integrazione client torrent (qBittorrent)', swayaNote: 'Sincronizzazione diretta e supporto seeding', competitorNote: 'Solo tramite script esterni' },
    ],
    deepDives: [
      {
        title: 'Player MPV nativo vs limiti dei codec del browser',
        description: 'Stash usa HTML5 nel browser, che richiede transcodifica per 4K HEVC 10-bit. Il player MPV integrato in SWAYA gestisce qualsiasi formato senza pesare sulla CPU.',
      },
      {
        title: 'Libreria unificata per tutti i contenuti',
        description: 'Basta app separate: SWAYA offre un passaggio immediato tra modalità Mainstream e Adulti con totale isolamento del database.',
      },
      {
        title: 'Organizzazione fisica dei file sul disco',
        description: 'A differenza di Stash, che indicizza solo i file nel database, SWAYA organizza e rinomina fisicamente i file nelle tue cartelle.',
      },
    ],
    faqs: [
      {
        q: 'SWAYA supporta il download diretto da StashDB?',
        a: 'Sì! Basta inserire la chiave API StashDB nelle Impostazioni per identificare automaticamente titoli, attori, studi e copertine HD.',
      },
      {
        q: 'Come protegge SWAYA la privacy dei contenuti per adulti?',
        a: 'SWAYA include un blocco con PIN: quando è bloccato, il profilo adulti è completamente invisibile.',
      },
    ],
  },
  jellyfin: {
    title: 'SWAYA vs Jellyfin: Workstation Locale vs Media Server Domestico',
    metaTitle: 'Alternativa a Jellyfin per Windows Senza Server - SWAYA',
    metaDescription: 'Cerchi un’alternativa più semplice a Jellyfin per PC? SWAYA organizza i file su disco e riproduce 4K HDR via MPV senza configurazioni di rete.',
    heroTagline: 'La tua collezione su disco senza container Docker né configurazioni di server.',
    heroSubtitle: 'Jellyfin è un eccellente server di streaming domestico. Ma se vuoi solo organizzare e guardare media sul tuo PC, SWAYA offre una soluzione desktop immediata.',
    competitorPricing: 'Gratuito / Open Source (FOSS)',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Vuoi trasmettere media in streaming su Smart TV e smartphone in tutta la casa.',
      'Gestisci un server Linux/Docker con più utenti.',
      'Vuoi un software server rigorosamente open source.',
    ],
    whenToChooseSwaya: [
      'Guardi film e organizzi i download direttamente sul tuo PC Windows.',
      'Non vuoi aprire porte, configurare daemon o profili di transcodifica.',
      'Vuoi rinomina fisica dei file e riproduzione MPV 4K nativa.',
      'Vuoi supporto integrato per StashDB accanto ai film tradizionali.',
    ],
    matrix: [
      { feature: 'Zero configurazione server e zero manutenzione', swayaNote: 'Avvio immediato, nessun daemon', competitorNote: 'Installazione server richiesta' },
      { feature: 'Rinomina e organizzazione fisica dei file su disco', swayaNote: 'Spostamento e struttura reali', competitorNote: 'Libreria virtuale di sola lettura' },
      { feature: 'Player 4K HDR MPV integrato', swayaNote: 'Accelerazione GPU nativa senza lag', competitorNote: 'Client web/HTML5 o wrapper' },
      { feature: 'Media per adulti (StashDB) e Dual Mode', swayaNote: 'Integrazione nativa StashDB/FansDB', competitorNote: 'Richiede plugin esterni' },
      { feature: '100% Offline senza porte di rete aperte', swayaNote: 'Nessuna porta aperta, 100% locale', competitorNote: 'Richiede server locale' },
      { feature: 'Organizzatore interattivo con simulazione', swayaNote: 'Pieno controllo e protezione collisioni', competitorNote: 'Solo monitoraggio cartelle' },
      { feature: 'Integrazione client torrent (Seeding)', swayaNote: 'Integrazione diretta qBittorrent', competitorNote: 'Non supportato' },
      { feature: 'Tracciamento momenti salienti e segnalibri', swayaNote: 'Screenshot e marcatura in 1 tasto', competitorNote: 'Non disponibile' },
    ],
    deepDives: [
      {
        title: 'Semplicità desktop vs complessità dei server',
        description: 'Jellyfin richiede la configurazione di porte di rete e servizi. SWAYA è un’app desktop autonoma che funziona subito.',
      },
      {
        title: 'Struttura reale dei file sul disco',
        description: 'Jellyfin presuppone che i file siano già ordinati. SWAYA organizza attivamente le tue cartelle di download sul disco.',
      },
      {
        title: 'Prestazioni MPV native',
        description: 'Goditi riproduzione fluida in 4K HDR, sottotitoli perfetti e avanzamento istantaneo con il motore MPV integrato.',
      },
    ],
    faqs: [
      {
        q: 'Posso usare SWAYA per preparare cartelle per Jellyfin?',
        a: 'Sì! SWAYA organizza i file secondo gli standard convenzionali, rendendoli pronti per essere letti da Jellyfin.',
      },
      {
        q: 'SWAYA consuma risorse in background?',
        a: 'No. Quando chiudi SWAYA, nessun servizio rimane attivo nel sistema.',
      },
    ],
  },
  kodi: {
    title: 'SWAYA vs Kodi: Media Center Moderno Senza Plugin Difettosi',
    metaTitle: 'Alternativa a Kodi per PC Windows - SWAYA',
    metaDescription: 'Cerchi un’alternativa moderna a Kodi per PC? SWAYA offre player MPV, rinomina file e un’interfaccia moderna senza componenti fragili.',
    heroTagline: 'Un’esperienza multimediale moderna progettata per mouse, tastiera e dischi.',
    heroSubtitle: 'Kodi è perfetto per i televisori con telecomando ma scomodo sui monitor PC. SWAYA è progettata appositamente per ambienti desktop Windows.',
    competitorPricing: 'Gratuito / Open Source (FOSS)',
    swayaPricing: '€39 offerta lancio (€79 prezzo normale)',
    whenToChooseCompetitor: [
      'Usi un PC home theater collegato alla TV controllato da telecomando.',
      'Usi plugin specifici per IPTV o PVR.',
      'Vuoi un’interfaccia da 10 piedi per il divano.',
    ],
    whenToChooseSwaya: [
      'Usi un PC Windows con mouse e tastiera.',
      'Vuoi rinomina sicura dei file e ordine sui tuoi dischi rigidi.',
      'Vuoi un programma stabile che non si rompa dopo gli aggiornamenti.',
      'Vuoi gestire film (TMDb) e contenuti per adulti (StashDB) in un solo posto.',
    ],
    matrix: [
      { feature: 'Interfaccia desktop moderna (Mouse e Tastiera)', swayaNote: 'Elegante interfaccia per PC', competitorNote: 'Interfaccia TV per telecomando' },
      { feature: 'Rinomina e organizzazione fisica dei file', swayaNote: 'Rinomina e sposta realmente i file', competitorNote: 'Solo database, non rinomina i file' },
      { feature: 'Motore video MPV 4K/HDR integrato', swayaNote: 'Accelerazione hardware senza scatti', competitorNote: 'Player interno' },
      { feature: 'Media per adulti (StashDB) e Dual Mode', swayaNote: 'Integrazione nativa StashDB/FansDB', competitorNote: 'Richiede plugin instabili' },
      { feature: 'Stabilità assoluta senza addon difettosi', swayaNote: 'Architettura solida e integrata', competitorNote: 'I plugin spesso si rompono con gli update' },
      { feature: 'Simulazione con protezione collisioni', swayaNote: 'Anteprima sicura prima dello spostamento', competitorNote: 'Non disponibile' },
      { feature: 'Integrazione client torrent (Seeding)', swayaNote: 'Collegamento diretto qBittorrent', competitorNote: 'Richiede script esterni' },
    ],
    deepDives: [
      {
        title: 'Priorità al desktop invece che all’interfaccia TV',
        description: 'Kodi è pensato per il telecomando. SWAYA è ottimizzata per l’uso moderno con mouse, finestre e scorciatoie su Windows.',
      },
      {
        title: 'Rinomina fisica dei file su disco',
        description: 'Kodi richiede file già denominati correttamente. SWAYA svolge il lavoro per te, scansionando e rinominando i file sul disco.',
      },
      {
        title: 'Nessun mal di testa per la manutenzione dei plugin',
        description: 'Tutte le funzionalità essenziali - scraper, libreria e player - sono incorporate direttamente nel programma in SWAYA.',
      },
    ],
    faqs: [
      {
        q: 'Posso usare SWAYA per preparare i file per Kodi?',
        a: 'Sì! SWAYA organizza i file secondo convenzioni pulite che Kodi riconosce automaticamente.',
      },
      {
        q: 'SWAYA è più facile da usare rispetto a Kodi?',
        a: 'Molto più facile. Non richiede repository, configurazioni XML complesse o installazione di plugin: funziona subito.',
      },
    ],
  },
};
