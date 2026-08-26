# SWAYA Letöltés és Torrent Útmutató

A filmek és sorozatok beszerzése a SWAYA-ban rendkívül egyszerű. Ez az útmutató bemutatja, hogyan állíthatod be a letöltéseket 3 gyors lépésben, és hogyan kezelheted a letöltési folyamatokat anélkül, hogy elhagynád az alkalmazást.

---

## Hogyan Működik a Rendszer?

1. **Te** kiválasztasz egy filmet vagy sorozatot a SWAYA-ban és megnyomod a **Letöltés** gombot.
2. A beépített **Jackett** átvizsgálja a kedvenc tracker oldalaidat a megfelelő kiadásokért.
3. A **qBittorrent** fogadja a kiválasztott torrentet és elvégzi a tényleges letöltést.
4. A **SWAYA** valós időben mutatja a folyamatot és a sebességeket.

---

## 3 Lépéses Gyors Beállítás

Ezt a beállítást csak egyszer kell elvégezni:

### 1. Letöltések Engedélyezése
* Nyisd meg a **Beállítások** > **Torrent Integráció** menüt.
* Kapcsold be a **Letöltési Automatizálás Engedélyezése** kapcsolót.

### 2. qBittorrent Csatlakoztatása
* A qBittorrentben kapcsold be a **Webes Felület (Web UI)** funkciót (alapértelmezett port: `8080`).
* Add meg a csatlakozási adatokat a SWAYA beállításaiban.

### 3. Trackerek Hozzáadása a Jackettben
* A SWAYA-ban kattints a **Jackett Vezérlőpult Megnyitása** gombra.
* Add hozzá a kedvenc nyilvános vagy privát trackereidet (pl. *nCore*, *1337x* stb.).

---

## Média Keresése és Letöltése

* **Keresés Indítása:** Bármely film vagy sorozat részletes oldalán kattints a felhő/letöltés ikonra. A SWAYA automatikusan kitölti a pontos címet és évszámot.
* **Kiadás Kiválasztása:** A felugró ablakban azonnal láthatod az összes tracker találatát minőségi szűrőkkel (1080p, 4K, x265/HEVC).
* **Letöltések Kezelése:** A bal oldali sáv **Letöltések** menüjében szüneteltetheted, folytathatod vagy elindíthatod a seedelést.
