export const it = {
  'getting-started': {
    name: 'Come configurare e iniziare a usare il Media Center SWAYA',
    description: 'Guida rapida per installare SWAYA su Windows, configurare le cartelle di archiviazione e creare la tua libreria offline.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Download e Avvio',
        text: 'Installa l’applicazione desktop SWAYA su Windows 10 o 11.',
      },
      {
        name: 'Configura le Cartelle di Archiviazione',
        text: 'Imposta la cartella dei download in entrata e le directory di destinazione nelle Impostazioni.',
      },
      {
        name: 'Scansiona e Abbina i File Multimediali',
        text: 'Apri l’Organizer per scansionare i file video e scaricare automaticamente metadati e locandine.',
      },
    ],
  },
  'organizer': {
    name: 'Come rinominare e organizzare automaticamente file multimediali su disco',
    description: 'Recupera metadati da TMDb/StashDB e rinomina in blocco i file multimediali senza collisioni.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Seleziona Cartella in Entrata',
        text: 'Apri SWAYA Organizer e seleziona la cartella contenente file scaricati o non catalogati.',
      },
      {
        name: 'Avvia lo Scraping Automatico',
        text: 'Avvia la ricerca automatica su TMDb, OMDb e StashDB per abbinare film e serie.',
      },
      {
        name: 'Perfeziona con Match e Override',
        text: 'Usa le finestre di ricerca e modifica per correggere titoli, edizioni o numeri di episodio.',
      },
      {
        name: 'Rinomina o Organizza sul Posto',
        text: 'Fai clic su Rinomina per spostare i file in cartelle Plex/Jellyfin, oppure usa Organizza sul Posto per non alterare i percorsi.',
      },
    ],
  },
  'dashboard': {
    name: 'Come navigare nei feed di scoperta e continuare la visione nella Dashboard',
    description: 'Riprendi i video in corso con timestamp esatto ed esplora le selezioni personalizzate.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Riprendi la Visione',
        text: 'Fai clic su un video in corso nella sezione Continua a guardare per riprendere dal secondo esatto salvato.',
      },
      {
        name: 'Esplora Banner e Feed',
        text: 'Scopri il banner in evidenza, gli ultimi titoli organizzati, i film più votati e le selezioni degli studi.',
      },
    ],
  },
  'library': {
    name: 'Come esplorare e filtrare il catalogo multimediale in SWAYA',
    description: 'Organizza la tua collezione con filtri multicriterio, tag, profili degli interpreti e viste personalizzate.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Cambia Modalità di Visualizzazione',
        text: 'Passa dalla visualizzazione a griglia, tabella e studi/attori nella barra degli strumenti della libreria.',
      },
      {
        name: 'Applica Filtri Multicriterio',
        text: 'Filtra per risoluzione 4K HDR, generi, tag personalizzati o stato su disco locale.',
      },
      {
        name: 'Usa le Azioni Rapide',
        text: 'Fai clic con il tasto destro su qualsiasi scheda per riprodurre, votare, aggiungere a una lista o vedere i dettagli tecnici.',
      },
    ],
  },
  'details': {
    name: 'Come personalizzare locandine e navigazione delle stagioni in SWAYA',
    description: 'Esamina specifiche tecniche, scegli poster e sfondi alternativi in 4K e naviga tra gli episodi delle serie.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Consulta le Specifiche Tecniche',
        text: 'Apri la scheda per esaminare codec video, bitrate, tracce audio, sottotitoli e cast.',
      },
      {
        name: 'Scegli Poster e Sfondi Personalizzati',
        text: 'Apri il selettore visuale per scegliere poster 4K e immagini di sfondo alternative dai database online.',
      },
      {
        name: 'Naviga tra Stagioni ed Episodi',
        text: 'Sfoglia gli episodi con schede dedicate, trame e indicatori di completamento visione.',
      },
    ],
  },
  'player': {
    name: 'Come riprodurre contenuti 4K HDR con il motore MPV in SWAYA',
    description: 'Riproduci file locali con accelerazione MPV via GPU, cambio istantaneo di sottotitoli e tracce audio.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Avvia il Lettore ad Accelerazione Hardware',
        text: 'Apri qualsiasi film o episodio per una riproduzione immediata con MPV senza transcodifica.',
      },
      {
        name: 'Cambia Audio e Sottotitoli',
        text: 'Passa da una traccia audio all’altra e regola il ritardo dei sottotitoli in tempo reale.',
      },
      {
        name: 'Usa Lettori Esterni',
        text: 'Se preferisci, avvia VLC o MPC-HC direttamente dal menu contestuale del lettore.',
      },
    ],
  },
  'search': {
    name: 'Come usare la ricerca universale multi-sorgente in SWAYA',
    description: 'Esegui ricerche globali istantanee tra film, serie, attori e case di produzione.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Apri la Ricerca Globale',
        text: 'Premi Ctrl+K o fai clic sulla barra di ricerca in alto da qualsiasi schermata.',
      },
      {
        name: 'Cerca tra Librerie e Scraper',
        text: 'Digita titoli di film, serie, nomi di attori o studi per visualizzare i risultati raggruppati.',
      },
      {
        name: 'Applica Filtri Istantanei',
        text: 'Restringi i risultati per categoria, risoluzione, anno di uscita o tag.',
      },
    ],
  },
  'lists': {
    name: 'Come creare collezioni a tema con copertina a mosaico di 4 poster',
    description: 'Crea playlist personalizzate, organizza collezioni e genera copertine a collage di 4 poster.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Crea una Nuova Collezione',
        text: 'Apri Liste e definisci il titolo della collezione, la descrizione tematica e i criteri di ordinamento.',
      },
      {
        name: 'Aggiungi Titoli Multimediali',
        text: 'Aggiungi film o serie dalle schede della libreria o dalle pagine dei dettagli.',
      },
      {
        name: 'Genera la Copertina a 4 Poster',
        text: 'SWAYA compone automaticamente una copertina a mosaico con 4 poster della raccolta.',
      },
    ],
  },
  'ratings': {
    name: 'Come votare e scrivere recensioni private in Markdown in SWAYA',
    description: 'Assegna voti su scala a 10 stelle, scrivi recensioni in Markdown e filtra i tuoi titoli preferiti.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Vota su Scala a 10 Stelle',
        text: 'Vota film, serie e scene con precisione a passi di mezza stella.',
      },
      {
        name: 'Scrivi Recensioni Private in Markdown',
        text: 'Conserva impressioni e tag personali salvati al 100% offline sul tuo computer.',
      },
      {
        name: 'Filtra per Voti e Preferiti',
        text: 'Filtra la tua libreria per fasce di stelle o visualizza i titoli contrassegnati come preferiti.',
      },
    ],
  },
  'history': {
    name: 'Come monitorare e gestire la cronologia di visione in SWAYA',
    description: 'Controlla sessioni di riproduzione temporali, punti di ripresa esatti e registri.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Apri il Registro Cronologia',
        text: 'Visualizza gli eventi di riproduzione in ordine cronologico con timestamp e percentuali.',
      },
      {
        name: 'Riprendi Titoli Incompleti',
        text: 'Fai clic su qualsiasi elemento non terminato per continuare la riproduzione al punto esatto.',
      },
      {
        name: 'Filtra o Svuota la Cronologia',
        text: 'Filtra per intervallo di date o rimuovi singoli elementi registrati.',
      },
    ],
  },
  'statistics': {
    name: 'Come analizzare lo spazio su disco e il DNA della libreria in SWAYA',
    description: 'Controlla la capacità dei dischi, i grafici di distribuzione dei codec e la varietà di generi.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Verifica lo Spazio per Codec e Risoluzione',
        text: 'Controlla i gigabyte occupati da codec 4K UHD, 1080p FHD, HEVC e AV1.',
      },
      {
        name: 'Esplora le Distribuzioni del DNA',
        text: 'Consulta grafici interattivi su generi, decenni di uscita e case di produzione.',
      },
    ],
  },
  'settings': {
    name: 'Come configurare modelli di cartella e chiavi scraper in SWAYA',
    description: 'Personalizza i pattern di denominazione, inserisci chiavi API e attiva la modalità stealth in 1 clic.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Imposta le Cartelle Principali',
        text: 'Scegli le cartelle di destinazione per film, serie TV e contenuti privati.',
      },
      {
        name: 'Seleziona Modelli di Cartella',
        text: 'Definisci regole Plex/Jellyfin usando token dinamici come {title} ({year}).',
      },
      {
        name: 'Inserisci le Chiavi API per Scraper',
        text: 'Aggiungi chiavi TMDb o StashDB per un download rapido dei metadati senza limiti.',
      },
      {
        name: 'Configura la Modalità Stealth',
        text: 'Imposta una combinazione di tasti per nascondere all’istante librerie riservate.',
      },
    ],
  },
  'torrent': {
    name: 'Come collegare un client torrent con catalogazione automatica in SWAYA',
    description: 'Collega qBittorrent, monitora i download in tempo reale e sposta automaticamente i file completati.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Abilita l’Integrazione Torrent',
        text: 'Inserisci host, porta e credenziali della WebUI di qBittorrent nelle Impostazioni.',
      },
      {
        name: 'Monitora i Download Attivi',
        text: 'Controlla velocità di trasferimento, tempo stimato e avanzamento direttamente in SWAYA.',
      },
      {
        name: 'Catalogazione Automatica al Termine',
        text: 'SWAYA scarica automaticamente i metadati per i torrent completati e li organizza nelle cartelle.',
      },
    ],
  },
};
