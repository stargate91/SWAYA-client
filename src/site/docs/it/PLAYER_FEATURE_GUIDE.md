# Guida al Player MPV di SWAYA

Il **Player MPV Integrato** è il motore di riproduzione multimediale di SWAYA. Riproduce film, episodi TV, scene per adulti e video personalizzati direttamente nell'applicazione con accelerazione hardware, sincronizzazione dei sottotitoli, navigazione per capitoli e tracciamento dei momenti salienti.

---

## Cosa lo Rende Speciale

A differenza dei lettori video web generici, SWAYA include un motore nativo **MPV**:

* **Riproduce Praticamente Qualsiasi Formato:** MKV, MP4, AVI, WebM, TS, MOV con qualsiasi codec audio (Dolby Atmos, DTS-HD, TrueHD, FLAC, AAC) e formato sottotitoli (ASS, SRT, VTT, PGS).
* **Ripresa Precisa al Singolo Frame:** Ricorda la posizione esatta tra le sessioni e sincronizza automaticamente il progresso nel database ogni 5 secondi.
* **Adattamento Intelligente alle Bande Nere:** I controlli a schermo rilevano le proporzioni del video e aderiscono al bordo effettivo del frame visibile.
* **Picture-in-Picture & Schermo Intero:** Fai doppio clic ovunque o premi `F` per entrare e uscire dalla modalità a schermo intero.

---

## Supporto Dual Mode (SFW & NSFW)

Il lettore adatta la propria interfaccia in base al tipo di contenuto in riproduzione:

* **Contenuti Mainstream (Film & Serie TV):** Focus sui marcatori di capitolo, selezione tracce audio multiple, sottotitoli incorporati ed esterni, velocità di riproduzione e suggerimenti per l'episodio successivo.
* **Contenuti per Adulti (Scene & Film):** Sblocca il sistema di **Marcatura dei Momenti Salienti**, consentendo di salvare istantanee e memorizzare i timestamp preferiti con un singolo tasto.

---

## Scorciatoie da Tastiera & Mouse

Puoi controllare ogni aspetto del player senza staccare le mani dalla tastiera:

| Scorciatoia | Azione | Descrizione |
| :--- | :--- | :--- |
| **Spazio** / **Spacebar** | Riproduci / Pausa | Alterna riproduzione e pausa con conferma a schermo |
| **Invio (Enter)** | Registra Momento *(Solo adulti)* | Scatta uno screenshot e salva il timestamp esatto |
| **Freccia Sinistra** | Riavvolgi | Salta indietro di 10 secondi |
| **Freccia Destra** | Avanza | Salta avanti di 10 secondi |
| **Freccia Su** | Alza Volume | Aumenta il volume del 5% |
| **Freccia Giù** | Abbassa Volume | Riduce il volume del 5% |
| **Rotella del Mouse** | Regola Volume | Scorri verso l'alto o il basso per regolare il volume |
| **Doppio Clic** | Schermo Intero | Alterna finestra standard e schermo intero |
| **M** | Muto | Silenzia o ripristina l'audio |
| **F** | Schermo Intero / PiP | Entra o esce dalla modalità a schermo intero |
| **G** | Ritardo Sottotitoli - | Anticipa i sottotitoli di 100ms |
| **H** | Ritardo Sottotitoli + | Posticipa i sottotitoli di 100ms |
| **J** | Ritardo Audio - | Anticipa l'audio di 100ms per correggere il disallineamento |
| **K** | Ritardo Audio + | Posticipa l'audio di 100ms per correggere il disallineamento |

---

## Tracciamento dei Momenti Salienti & Snapshot (Adulti)

Durante la riproduzione di scene o film per adulti, SWAYA offre una funzione di marcatura dei momenti preferiti:

### 1. Registrazione con un Solo Tasto (`Invio`)
Quando desideri salvare un momento importante durante la visione:
* Premi il tasto **`Invio`** sulla tastiera, oppure clicca sul pulsante **Momento Saliente** (icona gocce) nella barra di controllo.
* SWAYA scatta immediatamente uno screenshot in alta risoluzione dell'esatto fotogramma video.
* Il timestamp preciso (ad es. `14:32`) e la data vengono registrati nel database locale.
* Il pulsante lampeggia in verde per confermare il salvataggio.

### 2. Ritrovare i Momenti Salvati
Tutti i momenti salvati sono visibili in due posizioni:
* **Pagina Cronologia (`/history?tab=peaks`):** Una galleria cronologica di tutti gli snapshot con miniatura, titolo e marcatore temporale. Cliccando su **Riproduci Momento** il video parte direttamente da quel secondo esatto.
* **Pagina di Dettaglio del Media:** La sezione dedicata **Momenti Salienti** mostra tutti i timestamp salvati per quel titolo.

---

## Controlli a Schermo & Menu

Passando il mouse sul lettore compare la barra di controllo:

* **Timeline & Capitoli:** Marcatori di capitolo visibili sulla barra di avanzamento con anteprima al passaggio del mouse.
* **Orologio & Fine Prevista:** Mostra l'ora corrente e l'orario stimato di fine riproduzione (es. *"Finisce alle 22:45"*).
* **Selettore Traccia Audio:** Passa facilmente tra tracce audio multilingua incorporate e file audio esterni.
* **Selettore Sottotitoli:** Permette di scegliere sottotitoli incorporati, caricare file `.srt` / `.ass` esterni o disattivarli.
* **Controllo Velocità:** Velocità di riproduzione da 0.25x (slow-motion) fino a 4x (avanzamento rapido).
* **Pulsante Stop:** Salva immediatamente il progresso, chiude il lettore e torna alla vista precedente della libreria.
