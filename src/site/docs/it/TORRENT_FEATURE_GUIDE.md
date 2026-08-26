# Guida a Download & Torrent di SWAYA

Scaricare film e serie TV in SWAYA è estremamente semplice. Questa guida ti accompagna nell'integrazione, nella configurazione in tre passaggi e nella gestione dei download direttamente dall'applicazione.

---

## Come Funziona (La Visione d'Insieme)

Tre componenti lavorano in perfetta sinergia:
1. **Tu** trovi un film o una serie in SWAYA e clicchi su **Download**.
2. **Jackett** (integrato in SWAYA) cerca nei tuoi tracker preferiti le release corrispondenti.
3. **qBittorrent** riceve il torrent e gestisce il download effettivo dei file.
4. **SWAYA** mostra i progressi in tempo reale con velocità, pausa, ripresa e seeding.

---

## Configurazione Rapida in 3 Passaggi

1. **Attiva i Download in SWAYA:**
   * Vai su **Impostazioni** > **Integrazione Torrent** e attiva **Abilita Automazione Download**.
2. **Collega qBittorrent:**
   * In qBittorrent: **Strumenti** > **Opzioni** > **Interfaccia Web (Web UI)**.
   * Attiva l'interfaccia remota (porta `8080`, utente e password).
   * Inserisci i dati nelle impostazioni di SWAYA e seleziona la cartella di download.
3. **Aggiungi i Tracker in Jackett:**
   * Nelle impostazioni di SWAYA, clicca su **Apri Dashboard Jackett**.
   * Clicca su **Aggiungi indexer** e seleziona i tuoi siti tracker preferiti.

---

## Trovare e Scaricare Contenuti

* **Ricerca da Qualsiasi Titolo:** Clicca sull'icona **Download** (nuvola con freccia giù) su qualsiasi scheda o pagina di dettaglio. SWAYA compila automaticamente titolo, anno o numero di episodio.
* **Seleziona la Release Migliore:** Filtra i risultati per qualità (*1080p*, *4K*), codec (*x264*, *HEVC*) o sorgente. Clicca su **Download** per inviare il compito a qBittorrent con 1 clic.
* **Gestione nella Pagina Download:** Monitora velocità in tempo reale, metti in pausa, riprendi o gestisci il seeding con filtri dedicati (`Tutti`, `In Download`, `Completati`, `In Pausa`).
