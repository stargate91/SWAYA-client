# SWAYA Settings & Configuration Guide

The **Settings** page is your central command center in SWAYA. It lets you customize how files are scanned, matched, named, and arranged on your storage drives, configure your preferred video player and audio tracks, customize the look with custom themes, and manage third-party metadata scrapers.

---

## The Big Picture (How Settings Power SWAYA)

Every part of SWAYA reads your settings in real time to automate your media library:

```
 ┌──────────────────────┐      ┌────────────────────────┐      ┌──────────────────────┐
 │   INCOMING MEDIA     │ ───► │      SWAYA ENGINE      │ ───► │  ORGANIZED LIBRARY   │
 │ Messy downloads and  │      │ Matches metadata,      │      │ Clean folders,       │
 │ raw video files      │      │ formats filenames,     │      │ perfect filenames,   │
 └──────────────────────┘      │ applies player rules   │      │ posters & subtitles  │
                               └───────────┬────────────┘      └──────────────────────┘
                                           │
                        Reads your customized rules from
                                    SETTINGS
```

---

## Section 1: The 3 Media Organization Modes

SWAYA supports three distinct ways to manage media on your hard drives:

| Mode | What It Does on Your Hard Drive |
| :--- | :--- |
| **1. Move & Organize** *(Library Mode)* | Moves files from your incoming scan folder into neat, structured library subfolders (e.g. `Movies/Inception (2010)/Inception (2010) [1080p].mkv`). |
| **2. Rename In-Place** | Renames files according to your template directly where they currently sit, without moving them across directories. |
| **3. Register Only** | Indexes media into the SWAYA database and fetches posters without modifying any filenames or folder paths on disk. |

---

## Section 2: Deep Dive: The Organization & Naming Engine

The **Organization Engine** transforms chaotic torrent folders and messy filenames into pristine, standardized media directories.

```
 [ Incoming Download ]
 └── Inception.2010.PROPER.1080p.BluRay.x264-SPARKS.mkv
 └── Inception.2010.srt
 └── sample.mp4
 └── torrent-release.nfo
                │
                ▼ (SWAYA Matching & Organization Rules)
 [ Clean Library ]
 └── Movies/
     └── Inception (2010)/
         ├── Inception (2010) [1080p].mkv
         ├── Inception (2010).en.srt
         └── Extras/
             └── sample.mp4
```

---

### 1. Ready-Made Presets vs. Custom Control

Under **Organization > Presets**, you can select industry-standard library layouts or build your own from scratch:

| Preset | Movie Folder & File Structure | TV Show Folder & File Structure |
| :--- | :--- | :--- |
| **Plex** | `Movies/Inception (2010)/`<br>└── `Inception (2010) [1080p].mkv` | `TV Shows/Breaking Bad/Season 01/`<br>└── `Breaking Bad - S01E01 - Pilot.mkv` |
| **Jellyfin / Emby** | `Movies/Inception (2010)/`<br>├── `Inception (2010).mkv`<br>└── `backdrop.jpg, logo.png` | `TV Shows/Breaking Bad/Season 1/`<br>└── `Breaking Bad - S01E01 - Pilot.mkv` |
| **Kodi** | `Movies/Inception.2010.1080p.mkv`<br>*(Flat with year & resolution markers)* | `TV Shows/Breaking Bad/Season 1/`<br>└── `1x01 - Pilot.mkv` |
| **Minimal** | `Inception (2010).mkv`<br>*(No subfolders, cleanest filename)* | `Breaking Bad - S01E01.mkv`<br>*(Flat seasonless structure)* |

> **Enabling Custom Mode:** Flipping the **"Customize folder and filename patterns"** switch unlocks full manual control over all template patterns, casing, separators, and extra file rules.

---

### 2. General Organization Rules (`Organization > General`)

Organized into three dedicated, clear cards:

* **Card 1: Organization Behavior & Cleanup**
  * `Enable Organization`: Master switch for file operations. When disabled, SWAYA only catalogues media in its database.
  * `Destination Folders`: Controls whether organized files are moved into your library folder or renamed in place.
  * `Cleanup Empty Folders`: Automatically deletes leftover empty directories in your scan folder after files are moved.
* **Card 2: Top-Level Directories (SFW)**
  * `Separate Top-Level Folders`: Groups media into dedicated root directories (`Movies`, `TV Shows`, `Videos`).
  * `Folder Names`: Customize exact folder names (e.g. change `Movies` to `Films` or `TV Shows` to `Series`).
* **Card 3: Adult Library Directories (NSFW)**
  * Dedicated subdirectories for adult media (`Scenes`, `Movies`, `Studios`, `Performers`).

---

### 3. File Collision & Conflict Handling (`Duplicate Strategy`)

When organizing a file that already exists at the destination, SWAYA resolves conflicts according to your chosen strategy:

* `Replace if better` *(Recommended)*:
  * Compares video resolution: `2160p (4K)` > `1080p` > `720p` > `SD`.
  * Compares video bitrate and audio channels: `7.1 Surround` > `5.1 Surround` > `Stereo`.
  * **Duration Tolerance:** Verifies the new file duration matches within a tolerance window (default: 10s) to prevent replacing a full movie with a short sample clip.
* `Keep both`: Automatically renames the incoming file with an incremental number (e.g. `Inception (2010) [1].mkv`).
* `Overwrite`: Unconditionally overwrites the existing file.
* `Skip`: Leaves the destination untouched and skips moving the file.

---

### 4. Media-Specific Template Rules

#### A. Movies (`Organization > Movies`)
* `Movie Subdirectories`: Choose whether movies get their own dedicated folder (e.g., `Movies/Inception (2010)/...`) or stay flat inside the `Movies/` root.
* `Movie Folder Template`: Customize the folder name pattern (e.g. `{title} ({year})`).
* `Movie Filename Template`: Customize the movie file name (e.g. `{title} ({year}) {resolution} {edition}`).
* `Collection / Boxset Folders`:
  * `Collection Mode`: Automatically group movie franchises (e.g. *The Lord of the Rings Collection*, *Marvel Cinematic Universe*).
  * `Threshold`: Set the minimum number of movies owned in a franchise before creating a collection folder (default: 3 titles).

#### B. TV Shows (`Organization > TV Shows`)
* `Series Folder Template`: e.g. `{show} ({year})`
* `Season Folder Template`: e.g. `Season {season}` or `Series {season}`
* `Episode Filename Template`: e.g. `{show} - S{season}E{episode} - {title}`

#### C. Adult Scenes & Movies (`Adult > Scenes & Movies`)
* `Studio Subfolders`: Group adult scenes into dedicated studio/network folders (e.g. `Studios/Brazzers/Scene Title.mp4`).
* `Performers & Cast`: Organize by lead talent or star names.
* `Scene Filename Template`: e.g. `{studio} - {date} - {title} [{performers}]`.

---

### 5. Extras, Subtitles & Accompanying Files (`Organization > Extras`)

When organizing a video file, SWAYA automatically detects and pairs all accompanying files:

| File Type | Extensions / Patterns | Available Action Rules |
| :--- | :--- | :--- |
| **Subtitles** | `.srt`, `.sub`, `.idx`, `.vtt`, `.ass` | Rename to match video (e.g. `movie.en.srt`), Keep original name, or Delete |
| **Trailers & Extras** | `-trailer.mp4`, `-featurette.mp4`, `-behindthescenes.mp4`, `sample.mkv` | Move to `/Extras/` subfolder, Rename with tag suffix, or Delete |
| **Artwork & Images** | `poster.jpg`, `fanart.jpg`, `banner.png`, `backdrop.png`, `folder.jpg` | Rename to match Plex/Jellyfin standards, Move to folder, or Delete |
| **Audio Tracks** | `.mka`, `.ac3`, `.dts`, `commentary.mp3` | Rename with audio language tag, or Keep |
| **Metadata & NFOs** | `.nfo`, `movie.nfo`, `tvshow.nfo` | Keep and pair with video, or Delete |

---

### 6. Dynamic Tags & Syntax Reference

Use dynamic tags inside template fields to format your files:

| Tag | What It Inserts | Example Output |
| :--- | :--- | :--- |
| `{title}` | Official matched title | `Inception` |
| `{year}` | 4-digit release year | `2010` |
| `{resolution}` | Video quality tag | `1080p`, `2160p (4K)`, `720p` |
| `{edition}` | Special edition modifier | `Director's Cut`, `Extended` |
| `{show}` | TV Show series title | `Breaking Bad` |
| `{season}` | 2-digit season number | `S01`, `S02` |
| `{episode}` | 2-digit episode number | `E05`, `E06` |
| `{studio}` | Production studio/network | `Warner Bros.`, `HBO` |
| `{performers}` | Lead actors or stars | `Leonardo DiCaprio` |
| `{date}` | Exact release date | `2024-05-12` |
| `{custom}` | Custom static or group tag | `[SWAYA-ARCHIVE]` |

* **Casing Styles:** `default` (Original Title Case), `lowercase`, `UPPERCASE`, or `Title Case`.
* **Word Separators:** `Space` (*Inception 2010*), `Dot` (*Inception.2010*), `Hyphen` (*Inception-2010*), or `Underscore` (*Inception_2010*).

---

## Section 3: Core App Settings

### 1. General Settings (`General`)
* **User Profile:** Set your display name and upload a custom avatar picture.
* **Incoming / Scan Folder:** The folder where new, unorganized downloads arrive. SWAYA watches this folder for new media.
* **Organized Library Folder:** The root destination folder where organized movies, shows, and scenes will live.
* **Interface Language:** Change the display language of the app.
* **Window Close Action:** Choose whether clicking the `X` button minimizes SWAYA to the system tray (keeping background scans and downloads running) or quits the app completely.

---

### 2. Appearance & Themes (`Theme`)
* Choose from over 30 hand-crafted visual themes (including *Classic Dark*, *Tokyo Night*, *Dracula*, *AMOLED Modern*, *Matrix Code*, *Synthwave Outrun*, *Cyberpunk*, *Nord*, and *Rose Pine*).
* **Instant Live Preview:** Clicking a theme immediately applies the color scheme across the entire interface.

---

### 3. Video Player & Language Rules (`Player`)
* **Default Media Player:** Choose between SWAYA's modern built-in player, **VLC Media Player**, or **MPC-HC**.
* **Smart Audio Track Selection:** Set your preferred language (e.g., *English*, *Hungarian*, *Japanese*). SWAYA automatically picks the matching audio stream when playback starts.
* **Smart Subtitle Selection:**
  * `Always on`: Automatically activates subtitles whenever a video starts.
  * `Smart mode`: Keeps subtitles off if the audio already matches your preferred language, but turns them on for foreign speech.
  * `Always off`: Starts videos without subtitles.

---

### 4. Adult Content & Safety Filters (`Adult`)
* **Separate Adult Library:** Set a dedicated folder for adult content, completely isolated from your mainstream movie and TV library.
* **Performer Gender Preference:** Choose which performers to focus on across the app (`Female`, `Male`, or `All`). When set, SWAYA automatically filters and prioritizes stars matching your preference on cards, credits, and search.
* **Tag Safety Filters (Recommendation Blacklist):** Add keyword and tag blocks (or pick from one-click presets). Any adult scene matching blacklisted tags is automatically excluded from Dashboard recommendation widgets, Spotlight banners, and provider discovery carousels.

---

### 5. Online API Integrations (`API Keys`)
Connect free community metadata scrapers for richer posters, descriptions, and cast lists:
* **TMDb (The Movie Database):** Primary scraper for mainstream movies, TV series, actors, and episode artwork.
* **OMDb:** High-accuracy ratings from IMDb, Rotten Tomatoes, and Metacritic.
* **StashDB / FansDB / ThePornDB:** Specialized scrapers for adult scenes, performers, and studios.

---

### 6. Download Automation (`Torrent`)
* Connect **qBittorrent** and **Jackett** directly to search, download, and seed releases from within SWAYA without switching windows.
* Configure incoming download folders, seeding ratios, and port connections.

---

### 7. Advanced Rules & Detection Limits (`Advanced`)
* **Minimum Video Size (MB):** Files smaller than this threshold (default: 50MB) are automatically treated as bonus clips/samples rather than full movies.
* **Minimum Duration (minutes):** Videos shorter than this duration (default: 12 min) are categorized as trailers or deleted scenes.

---

### 8. Maintenance & Backup (`Maintenance`)
* **Backup & Restore:** Export all your customized naming patterns and settings to a portable `.json` file, or restore them onto another PC.
* **Reset to Defaults:** One-click reset to restore all naming patterns and configuration options back to factory defaults (your media files and database remain completely safe).
* **Clear Metadata Cache:** Clears cached poster thumbnails and scraper results to free up disk space and re-fetch fresh metadata.
* **Danger Zone (Wipe Database):** Completely resets the internal media library database for a clean start.

---

## Power-User Shortcuts & Ergonomics

* **`Ctrl + S` / `Cmd + S` Quick Save:** Press `Ctrl + S` anywhere in Settings to immediately save changes.
* **Instant Sidebar Search:** Type keywords (like *"tmdb"*, *"vlc"*, *"subtitle"*, *"torrent"*, *"casing"*) into the search box at the top of the sidebar to instantly filter tabs.
* **Real-time Live Preview:** Visual feedback on all naming and folder templates before you apply them to your real files.
* **Safety Confirmation:** If you modify settings and attempt to close the window without saving, SWAYA prompts you with a confirmation modal so you never lose work.
