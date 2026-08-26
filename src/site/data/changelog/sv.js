export const sv = {
  sectionTitles: {
    added: 'Nya funktioner',
    performance: 'Prestanda & Arkitektur',
    changed: 'Förbättringar',
    fixed: 'Buggfixar & Justeringar',
  },
  releases: {
    '1.0.0': {
      title: 'Torrent-integration, Djupgående Recensioner & TV-seriehierarki',
      description: 'Större lansering med översiktspanel för externa torrent-klienter, universell sökning, recensionspanel, säsongshierarki för TV-serier och optimerade SQL-loggar.',
      highlights: [
        'Översiktspanel för externa torrent-klienter (qBittorrent och Transmission) med bandbreddsövervakning',
        'Automatisk bakgrundsidentifiering och biblioteksgenomsökning vid slutförd nedladdning',
        'Säsongshierarki för TV-serier och spårning av tittarstatus per avsnitt',
        'Integrerad upptäcktskomponent över TMDb, StashDB och FansDB',
        'Namnändringshistorik med asynkron laddning av detaljerade loggar',
      ],
    },
    '0.7.0': {
      title: 'GPU-hårdvaruacceleration & SQLite Filmograficache',
      description: 'Prestandauppdatering med NVENC/QSV GPU-videoförhandsgranskning, fjärrfilmograficache och dynamisk porttilldelning för backend.',
      highlights: [
        'Hårdvaruaccelererade FFmpeg-videoförhandsgranskningar med automatisk identifiering av NVENC/QSV/AMF',
        'Lokal SQLite-cache för filmografier som möjliggör omedelbar laddning av skådespelarprofiler',
        'Automatisk dynamisk TCP-porttilldelning vid start för att undvika nätverkskonflikter',
      ],
    },
    '0.6.0': {
      title: 'Universell Sökning över Flera Källor & Processövervakning',
      description: 'Utökad sökning över alla databaser och robust processhantering i bakgrunden.',
      highlights: [
        'Konsoliderad sökning efter filmer, scener, skådespelare och producenter',
        'Övervakare av föräldraprocesser som förhindrar herrelösa bakgrundsprocesser',
      ],
    },
  },
};
