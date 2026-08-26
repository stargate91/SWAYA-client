# SWAYA Organizer & File Management Guide

The **Organizer** is the sorting station of SWAYA. Think of it as an intelligent assistant that looks at your messy download folder, figures out what movie, show, or scene each file belongs to, finds posters and descriptions from the internet, and neatly puts everything away into clean folders.

---

## How It Works: The 2 Ways to Organize

When you are ready to process files, SWAYA offers two distinct paths:

### 1. Organize, Rename & Move (Default)
SWAYA takes your files, cleans up their messy filenames (e.g. converting `Inception.2010.1080p.BluRay.x264.mkv` into `Inception (2010) [1080p].mkv`), creates neat folder structures on your storage drive, and moves everything into your permanent library directory.

### 2. Import In-Place (Keep Files Untouched)
If you seed torrents, share files across other software, or simply prefer to keep your exact disk layout unchanged, you can import files **in-place**.
* SWAYA fetches all the rich metadata, posters, cast details, ratings, and backdrop artwork into your library.
* The physical files on your hard drive stay in their exact original folders and keep their exact original names.
* **How to use it:** Look at the main **Rename** button in the top right. Click the small arrow on the right edge of the split button and choose **Organize In-Place**.

---

## What You Need to Set Up First

Before running a scan, take a quick stop in **Settings** to tell SWAYA how you like your files arranged:

1. **Target Library Folders:** Where should your organized movies, shows, and scenes live? You can set one general library folder for mainstream content and a separate private folder for adult media, or have them share the same root folder.
2. **Folder Structures & Templates:** Choose how deep your folders go (e.g. `Movies/Inception (2010)/...` vs. flat lists), how editions are noted (e.g. `Director's Cut`), and how years or resolutions are formatted.
3. **Extra Files & Subtitles:** Decide what happens to trailers, sample clips, subtitles (.srt), and artwork (.nfo, .jpg). SWAYA can group them inside an `Extras/` subfolder or keep them alongside the main video.
4. **Collision Handling:** If a file with the same name already exists in your library, you can tell SWAYA to keep both files, skip the new one, overwrite it, or automatically replace the old file only if the new one is higher quality.

---

## Dual Mode Support & Available Scrapers

The Organizer adapts to whether you are in **Mainstream (SFW)** or **Adult (NSFW)** mode via the top bar toggle. The matching providers available to you depend on the API keys you have entered in **Settings > Scrapers**:

### Mainstream Mode (SFW)
* **Movies & TV Shows:** Powered by **TMDb** (The Movie Database). An API key enables automatic title lookups, episode listings, release dates, genres, and studio details.

### Adult Mode (NSFW)
* **Adult Movies:** Lookups powered by **TMDb** and **ThePornDB**.
* **Adult TV Shows / Series:** Lookups powered by **TMDb**.
* **Adult Scenes:** High-accuracy scene lookups powered by **StashDB**, **FansDB**, and **ThePornDB**, matching exact performers, studio labels, release dates, and high-res cover art.

### Video / Offline Mode (Both Modes)
* **No API Keys Needed:** Works straight out of the box without an internet connection or third-party accounts.
* **Best Used For:** Home videos, smartphone recordings, rare clips, or niche media that do not exist in online public databases.
* **How It Works:** Imports the video cleanly with basic technical stats (resolution, codecs, audio channels, duration). Manual metadata curation, custom detail pages, and tagging for offline videos will be supported in an upcoming update.

---

## The Power Tools in the Organizer

The Organizer gives you complete control before a single file gets moved or renamed:

| File on Disk | Identified Title | Match Type | Actions |
| :--- | :--- | :--- | :--- |
| `mov_01.mkv` | `Inception (2010)` | Movie | [Match] [Edit] [...] |
| `ep_s01e01.mp4` | `Breaking Bad - S01E01` | TV Episode | [Match] [Edit] [...] |

### 1. The Match Modal (Search & Browse)
If an automatic scan could not find a title or guessed the wrong movie:
* Click the **Match** button on any table row.
* A search dialog opens where you can adjust the search query, filter by release year, or change the provider on the fly.
* For TV shows, you can browse all seasons and episode lists with thumbnails and descriptions, then pick the exact episode with a single click.

### 2. The Override Modal (Custom Fine-Tuning)
Need to customize specific details before committing?
* Click the **Edit / Override** button on a row.
* Modify the resolved title, release year, season number, or episode number.
* Set media edition tags (e.g. `Theatrical Cut`, `Extended Edition`, `Remastered`).
* Specify audio formats (e.g. `Dual Audio`, `Surround Sound`, `Commentary`).
* Reclassify the item (e.g. switch a file from a standalone movie to a bonus feature, extra, or trailer).

### 3. Inline Row Actions & Right-Click Context Menu
Every file row has fast action icons:
* **Match:** Open the search and candidate browser.
* **Override:** Edit custom metadata and classification.
* **Inspect:** View raw media stream details (video bitrate, audio codecs, subtitle tracks).
* **Lock:** Lock a match in place so subsequent scans never alter it.
* **Skip / Remove:** Exclude this file from the current organization batch.
* **Right-Click Context Menu:** Right-clicking anywhere on a table row brings up a full desktop context menu with all available actions for rapid keyboard and mouse navigation.

### 4. Floating Action Bar & Bulk Operations
When you select multiple files using the checkboxes on the left:
* A sleek **Floating Action Bar** appears at the bottom of the screen.
* **Bulk Override:** Mass-edit multiple files at once. You can set the same show name, apply shared audio/edition tags, or renumber a sequential list of episodes with automatic drag-and-drop sorting.
* **Bulk Match:** Run batch lookups across all selected rows.
* **Bulk Skip & Remove:** Exclude large groups of files in one click.
