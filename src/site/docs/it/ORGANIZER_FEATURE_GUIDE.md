# Guida all'Organizer e alla Gestione File di SWAYA

L'**Organizer** è la stazione di smistamento di SWAYA. Immaginalo come un assistente intelligente che esamina la tua cartella di download disordinata, identifica a quale film, serie o scena appartiene ciascun file, recupera poster e descrizioni da Internet e organizza tutto in cartelle pulite e ordinate sul tuo disco.

---

## Come Funziona: I 2 Metodi di Organizzazione

Quando sei pronto a elaborare i tuoi file, SWAYA offre due percorsi distinti:

### 1. Organizza, Rinomina e Sposta (Predefinito)
SWAYA prende i tuoi file, pulisce i nomi caotici (ad es. convertendo `Inception.2010.1080p.BluRay.x264.mkv` in `Inception (2010) [1080p].mkv`), crea strutture di cartelle ordinate sul tuo disco e sposta tutto nella tua libreria multimediale permanente.

### 2. Importa sul Posto (File Intatti sul Disco)
Se fai seeding di torrent, condividi file con altri software o preferisci semplicemente non toccare l'esatta struttura dei tuoi file, puoi importare i contenuti **sul posto (In-Place)**:
* SWAYA recupera tutti i ricchi metadati, poster, dettagli del cast, valutazioni e artwork nella tua libreria.
* I file fisici sul tuo hard disk rimangono nelle loro cartelle originali e mantengono i loro nomi originali.
* **Come usarlo:** Fai clic sulla freccetta sul bordo destro del pulsante **Rinomina** in alto a destra e seleziona **Organizza sul Posto (Organize In-Place)**.

---

## Cosa Configurare Prima di Iniziare

Prima di avviare una scansione, fai un salto in **Impostazioni** per definire come organizzare i tuoi file:

1. **Cartelle di Destinazione della Libreria:** Dove archiviare i film, le serie e le scene organizzate? Puoi impostare una cartella generale per i contenuti mainstream e una cartella privata separata per i media per adulti, oppure condividere la stessa radice.
2. **Strutture Cartelle & Template:** Scegli la profondità delle cartelle (ad es. `Film/Inception (2010)/...` rispetto a elenchi piatti), come annotare le edizioni (es. `Director's Cut`) e il formato per anni e risoluzioni.
3. **File Extra & Sottotitoli:** Decidi cosa fare con trailer, clip di esempio, sottotitoli (.srt) e artwork (.nfo, .jpg). SWAYA può raggrupparli in una sottocartella `Extras/` o mantenerli accanto al video principale.
4. **Gestione Collisioni:** Se un file con lo stesso nome esiste già nella libreria, puoi indicare a SWAYA di mantenere entrambi i file, ignorare il nuovo, sovrascrivere o sostituire il vecchio solo se il nuovo è di qualità superiore.

---

## Supporto Dual Mode & Scraper Disponibili

L'Organizer si adatta alla modalità **Mainstream (SFW)** o **Adulti (NSFW)** tramite lo switch nella barra superiore:

### Modalità Mainstream (SFW)
* **Film & Serie TV:** Basato su **TMDb** (The Movie Database). Una chiave API consente il recupero automatico di titoli, elenchi episodi, date di rilascio, generi e dettagli dello studio.

### Modalità Adulti (NSFW)
* **Film per Adulti:** Ricerche basate su **TMDb** e **ThePornDB**.
* **Serie TV per Adulti:** Ricerche basate su **TMDb**.
* **Scene per Adulti:** Ricerche ad altissima precisione basate su **StashDB**, **FansDB** e **ThePornDB**, con corrispondenza esatta di attori, etichette dello studio, date e cover art ad alta risoluzione.

### Modalità Video / Offline (Entrambe le modalità)
* **Nessuna Chiave API Richiesta:** Funziona immediatamente senza connessione Internet o account di terze parti.
* **Ideale per:** Video personali, registrazioni da smartphone, clip rare o media di nicchia non presenti nei database pubblici online.
* **Funzionamento:** Importa il video con le statistiche tecniche di base (risoluzione, codec, canali audio, durata).

---

## Gli Strumenti Avanzati nell'Organizer

L'Organizer ti offre il controllo completo prima che un singolo file venga spostato o rinominato:

| File sul Disco | Titolo Riconosciuto | Tipo Corrispondenza | Azioni |
| :--- | :--- | :--- | :--- |
| `mov_01.mkv` | `Inception (2010)` | Film | [Abbina] [Modifica] [...] |
| `ep_s01e01.mp4` | `Breaking Bad - S01E01` | Episodio TV | [Abbina] [Modifica] [...] |

### 1. Modal di Abbinamento (Match Modal)
Se la scansione automatica non ha trovato il titolo o ha selezionato il film sbagliato:
* Fai clic sul pulsante **Abbina (Match)** su qualsiasi riga della tabella.
* Si apre una finestra di dialogo in cui puoi modificare la query di ricerca, filtrare per anno o cambiare provider al volo.
* Per le serie TV, puoi esplorare tutte le stagioni e gli elenchi degli episodi con miniature e descrizioni, selezionando l'episodio esatto con un solo clic.

### 2. Modal di Override (Personalizzazione Dettagli)
Vuoi personalizzare dettagli specifici prima di applicare le modifiche?
* Fai clic sul pulsante **Modifica / Override** su una riga.
* Modifica il titolo risolto, l'anno di uscita, il numero della stagione o dell'episodio.
* Imposta tag di edizione multimediale (ad es. `Theatrical Cut`, `Extended Edition`, `Remastered`).
* Specifica i formati audio (ad es. `Dual Audio`, `Surround Sound`, `Commentary`).
* Riclassifica l'elemento (ad esempio, trasforma un file da film autonomo a contenuto extra, speciale o trailer).

### 3. Azioni Dirette & Menu Contestuale del Tasto Destro
Ogni riga di file include icone di azione rapida:
* **Abbina:** Apre la ricerca e il browser dei candidati.
* **Override:** Modifica metadati personalizzati e classificazione.
* **Ispeziona:** Visualizza i dettagli dei flussi multimediali (bitrate video, codec audio, tracce sottotitoli).
* **Blocca:** Blocca un abbinamento in modo che le scansioni successive non lo modifichino.
* **Ignora / Rimuovi:** Esclude il file dal batch di organizzazione corrente.
* **Menu Contestuale con Tasto Destro:** Cliccando con il tasto destro su qualsiasi riga compare un menu contestuale desktop completo con tutte le azioni disponibili.

### 4. Barra delle Azioni Fluttuante & Operazioni di Massa
Selezionando più file tramite le caselle di controllo a sinistra:
* Una moderna **Floating Action Bar** appare nella parte inferiore dello schermo.
* **Override di Massa:** Modifica più file contemporaneamente (stesso nome serie, tag audio o rinumerazione sequenziale degli episodi con drag-and-drop).
* **Abbina in Massa:** Esegue ricerche batch su tutte le righe selezionate.
* **Ignora & Rimuovi in Massa:** Esclude gruppi di file con un solo clic.
