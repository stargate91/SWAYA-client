# SWAYA Fájlrendező és Menedzsment Útmutató

A **Fájlrendező (Organizer)** a SWAYA válogatóállomása. Tekints rá úgy, mint egy intelligens asszisztensre, amely átvizsgálja a rendezetlen letöltési mappádat, felismeri, hogy az egyes fájlok melyik filmhez, sorozathoz vagy jelenethez tartoznak, letölti a posztereket és leírásokat az internetről, és mindent szépen elrendez a merevlemezed mappáiban.

---

## Hogyan Működik: A Rendszerezés 2 Módja

Amikor készen állsz a fájlok feldolgozására, a SWAYA két különálló utat kínál:

### 1. Rendszerezés, Átnevezés és Áthelyezés (Alapértelmezett)
A SWAYA megtisztítja a kaotikus fájlneveket (pl. a `Matrix.1999.1080p.BluRay.x264.mkv`-ból `The Matrix (1999) [1080p].mkv` lesz), áttekinthető mappastruktúrát hoz létre a meghajtódon, és mindent átmozgat a végleges médiatáradba.

### 2. Helyben Importálás (Fájlok Érintetlenül Hagyása)
Ha torrenteket seedelsz, megosztod a fájlokat más szoftverekkel, vagy egyszerűen szeretnéd változatlanul hagyni a lemezstruktúrát, importálhatod a fájlokat **helyben**:
* A SWAYA letölti az összes gazdag metaadatot, posztert, szereplőlistát, értékelést és háttérképet a médiatárba.
* A merevlemezeden lévő fizikai fájlok az eredeti mappáikban maradnak és megőrzik eredeti nevüket.
* **Használat:** Kattints a jobb felső **Átnevezés** gomb jobb szélén lévő kis nyílra, és válaszd a **Helyben Rendszerezés (Organize In-Place)** opciót.

---

## Mit Kell Előzetesen Beállítani?

A vizsgálat futtatása előtt érdemes a **Beállítások** oldalon megadni a kívánt preferenciákat:

1. **Cél Médiatár Mappák:** Hová kerüljenek a rendszerezett filmek, sorozatok és jelenetek? Beállíthatsz egy általános mappát a fősodorbeli tartalmakhoz, és egy külön privát mappát a felnőtt médiához, vagy használhatnak közös gyökérmappát is.
2. **Mappastruktúrák és Sablonok:** Válaszd ki a mappák mélységét (pl. `Filmek/Inception (2010)/...` vs. lapos lista), a kiadások jelölését (pl. `Director's Cut`), valamint az évszámok és felbontások formátumát.
3. **Extra Fájlok és Feliratok:** Döntsd el, mi történjen az előzetesekkel, mintaklipekkel, feliratokkal (.srt) és borítóképekkel (.nfo, .jpg). A SWAYA elhelyezheti őket egy `Extras/` almappában, vagy a főkötettel együtt tarthatja őket.
4. **Ütközéskezelés:** Ha egy azonos nevű fájl már létezik a médiatáradban, megadhatod, hogy a SWAYA mindkettőt megtartsa, kihagyja az újat, felülírja, vagy csak akkor cserélje le a régit, ha az új jobb minőségű.

---

## Kettős Mód Támogatás és Elérhető Lekérdezők

A Rendszer automatikusan alkalmazkodik ahhoz, hogy a felső sávban a **Fősodor (SFW)** vagy a **Felnőtt (NSFW)** mód van kiválasztva:

### Fősodor Mód (SFW)
* **Filmek és Sorozatok:** A **TMDb** (The Movie Database) motorja hajtja. Egy ingyenes API kulcs lehetővé teszi az automatikus címkeresést, epizódfelismerést, műfajokat és stúdióadatokat.

### Felnőtt Mód (NSFW)
* **Felnőtt Filmek:** Keresés a **TMDb** és a **ThePornDB** segítségével.
* **Felnőtt Sorozatok:** Keresés a **TMDb** adatbázisában.
* **Felnőtt Jelenetek:** Kiemelkedő pontosságú jelenetkeresés a **StashDB**, **FansDB** és **ThePornDB** segítségével, pontos szereplőkkel, stúdiókkal, dátumokkal és borítókkal.

### Videó / Offline Mód (Mindkét Módban)
* **Nincs szükség API kulcsra:** Azonnal működik internetkapcsolat és fiókok nélkül.
* **Ideális:** Családi videókhoz, okostelefonos felvételekhez vagy olyan ritka klipekhez, amelyek nincsenek fent a nyilvános online adatbázisokban.

---

## Hatékony Eszközök a Rendszerben

A Rendszer teljes irányítást biztosít, mielőtt egyetlen fájl is áthelyezésre vagy átnevezésre kerülne:

| Fájl a Lemezről | Azonosított Cím | Típus | Műveletek |
| :--- | :--- | :--- | :--- |
| `film_01.mkv` | `Inception (2010)` | Film | [Párosítás] [Szerkesztés] [...] |
| `ep_s01e01.mp4` | `Breaking Bad - S01E01` | TV Epizód | [Párosítás] [Szerkesztés] [...] |

### 1. A Párosítás Ablak (Keresés & Böngészés)
Ha az automatikus felismerés nem talált címet, vagy tévesen ismert fel egy filmet:
* Kattints a **Párosítás (Match)** gombra bármelyik sorban.
* Megnyílik egy keresőablak, ahol módosíthatod a keresőkifejezést, szűrhetsz évszámra, vagy szolgáltatót válthatsz.
* TV sorozatoknál végigböngészheted az összes évadot és epizódot indexképekkel, és egyetlen kattintással kiválaszthatod a pontos részt.

### 2. A Felülbírálás Ablak (Finomhangolás)
Egyedi részleteket szeretnél megadni a véglegesítés előtt?
* Kattints a sorban a **Szerkesztés / Felülbírálás** gombra.
* Módosítsd a címet, megjelenési évet, évadszámot vagy epizódszámot.
* Állíts be kiadási címkéket (pl. `Theatrical Cut`, `Extended Edition`, `Remastered`).
* Add meg a hangformátumot (pl. `Dual Audio`, `Surround Sound`, `Szinkronos`).

### 3. Lebegő Műveletsáv és Tömeges Műveletek
Ha a bal oldali jelölőnégyzetekkel több fájlt is kijelölsz:
* Megjelenik egy letisztult **Lebegő Műveletsáv** a képernyő alján.
* **Tömeges Felülbírálás:** Egyszerre több fájl szerkesztése (pl. azonos sorozatnév, címkék beállítása, epizódok automatikus sorszámozása).
* **Tömeges Párosítás:** Lekérdezések indítása az összes kijelölt elemre.
* **Tömeges Kihagyás:** Nagy fájlcsoportok kizárása egyetlen kattintással.
