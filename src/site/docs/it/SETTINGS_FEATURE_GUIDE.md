# Guida alle Impostazioni & Configurazione di SWAYA

La pagina **Impostazioni** è il centro di controllo di SWAYA. Ti consente di personalizzare le modalità di scansione, abbinamento, rinomina e organizzazione dei file sui tuoi dischi, configurare il lettore video, personalizzare l'aspetto con oltre 30 temi e gestire gli scraper di metadati.

---

## Panoramica del Sistema

Ogni modulo di SWAYA fa riferimento alle impostazioni in tempo reale:

```
 ┌──────────────────────┐      ┌────────────────────────┐      ┌──────────────────────┐
 │    MEDIA IN ENTRATA  │ ───► │      MOTORE SWAYA      │ ───► │  LIBRERIA ORDINATA   │
 │ Download caotici e   │      │ Abbina metadati,       │      │ Cartelle pulite,     │
 │ file video grezzi    │      │ formatta i nomi file   │      │ poster & sottotitoli │
 └──────────────────────┘      └───────────┬────────────┘      └──────────────────────┘
                                           │
                        Legge le regole personalizzate da
                                   IMPOSTAZIONI
```

---

## Sezione 1: Le 3 Modalità di Organizzazione

SWAYA supporta tre modalità distinte di gestione dei media su disco:

| Modalità | Cosa fa sul tuo Hard Disk |
| :--- | :--- |
| **1. Sposta & Organizza** *(Libreria)* | Sposta i file dalla cartella di download in sottocartelle ordinate (es. `Film/Inception (2010)/Inception (2010) [1080p].mkv`). |
| **2. Rinomina sul Posto** | Rinomina i file secondo il template direttamente nella loro posizione attuale, senza spostarli. |
| **3. Solo Registrazione** | Indicizza i media nel database SWAYA e recupera i poster senza modificare nomi o percorsi su disco. |

---

## Sezione 2: Il Motore di Rinomina e Organizzazione

### 1. Preset Pronti all'Uso vs Controllo Personalizzato

In **Organizzazione > Preset**, puoi selezionare strutture standard del settore:

* **Plex:** `Film/Inception (2010)/Inception (2010) [1080p].mkv` & `Serie TV/Breaking Bad/Season 01/Breaking Bad - S01E01.mkv`
* **Jellyfin / Emby:** `Film/Inception (2010)/Inception (2010).mkv` con file `backdrop.jpg` e `logo.png`
* **Kodi:** Struttura con marcatori di anno e risoluzione.
* **Minimale:** Nomi file puliti senza sottocartelle annidate.

### 2. Gestione Conflitti e Collisioni (`Strategia Duplicati`)
* `Sostituisci se migliore` *(Consigliato)*: Confronta risoluzione (4K > 1080p > 720p), bitrate e canali audio, verificando la durata per non sostituire un film con un sample.
* `Mantieni entrambi`: Rinomina il nuovo file con un numero progressivo (es. `Inception (2010) [1].mkv`).
* `Sovrascrivi`: Sovrascrive incondizionatamente il file esistente.
* `Salta`: Lascia il file intatto e non esegue lo spostamento.

### 3. Tag Dinamici nei Template
* `{title}`: Titolo ufficiale abbinato
* `{year}`: Anno di uscita a 4 cifre
* `{resolution}`: Tag di qualità (`1080p`, `2160p (4K)`)
* `{edition}`: Edizione speciale (`Director's Cut`, `Extended`)
* `{show}`, `{season}`, `{episode}`: Serie TV, stagione ed episodio (`S01E01`)
* `{studio}`, `{performers}`, `{date}`: Studio, attori e data di rilascio

---

## Sezione 3: Impostazioni Principali dell'App

1. **Generale:** Profilo utente, cartella di download in entrata, cartella di destinazione della libreria e lingua dell'interfaccia.
2. **Aspetto & Temi:** Oltre 30 temi visivi (Dark Classico, Tokyo Night, Dracula, AMOLED Modern, Synthwave, Cyberpunk, Nord).
3. **Player & Lingue:** Scelta tra player integrato, VLC o MPC-HC; selezione intelligente delle tracce audio e gestione automatica dei sottotitoli.
4. **Contenuto per Adulti & Filtri:** Cartella isolata per adulti, preferenza di genere per gli attori e blacklist di tag per i consigli.
5. **Integrazioni API:** Collegamento chiavi per TMDb, OMDb, StashDB, FansDB e ThePornDB.
6. **Automazione Torrent:** Integrazione con qBittorrent e Jackett per cercare e scaricare direttamente dall'app.
7. **Manutenzione & Backup:** Esportazione/importazione configurazioni in file `.json`, pulizia cache metadati e ripristino valori predefiniti.

---

## Scorciatoie Rapide
* **`Ctrl + S` / `Cmd + S`:** Salva istantaneamente tutte le impostazioni.
* **Ricerca nella barra laterale:** Filtra al volo le schede digitando parole chiave (es. *"tmdb"*, *"vlc"*, *"sottotitoli"*).
