# SWAYA Download & Torrent Guide

Getting movies and TV shows into SWAYA is super easy. This guide walks you through how everything connects, how to set it up in three quick steps, and how to find and manage your downloads without ever leaving the app.

---

## How It Works (The Big Picture)

Think of it as a friendly team working together behind the scenes:
1. **You** find a movie or show you want in SWAYA and hit **Download**.
2. **Jackett** (bundled right inside SWAYA) searches your favorite tracker websites to find matching releases.
3. **qBittorrent** receives your pick and handles the actual file downloading.
4. **SWAYA** keeps you updated in real-time so you can track speeds, pause, resume, or start seeding when it's done.

```
 [ You click Download in SWAYA ]
               │
               ▼
   [ Jackett finds releases ]
               │
               ▼
 [ qBittorrent downloads files ]
               │
               ▼
 [ SWAYA shows live progress & lets you organize ]
```

---

## Quick 3-Step Setup

You only need to do this setup once!

### 1. Turn on Downloads in SWAYA
* Open SWAYA and go to **Settings** > **Torrent Integration** (or **Downloads**).
* Flip the **Enable Download Automation** switch to **ON**.

---

### 2. Connect qBittorrent
SWAYA needs permission to send download jobs to qBittorrent:
1. Open **qBittorrent** on your computer.
2. Go to **Tools** > **Options** > **Web UI**.
3. Turn on **Web User Interface (Remote control)**.
4. Check the port (usually `8080`), username, and password (default is often `admin` / `adminadmin`).
5. Type those same details into SWAYA's **Settings** > **qBittorrent WebUI Connection** section.
6. Pick your **Download Directory** (where you want finished movies to land) and you're good to go!

---

### 3. Add Your Favorite Sites in Jackett
Jackett comes pre-installed and starts automatically with SWAYA. You don't need to install or configure any complex server URLs:
1. In SWAYA **Settings**, click the **Open Jackett Dashboard** button.
2. In the web page that pops up, click **Add indexer**.
3. Search for and add your favorite public or private tracker sites (like *nCore*, *1337x*, etc.).
4. That's all! SWAYA can now search across all those sites at once.

---

## How to Find and Download Media

### Step 4: Start a Search from Any Movie or Show
* Whenever you're browsing your library, viewing a movie/show details page, or looking at a poster card, just click the **Download** (cloud/down-arrow) icon.
* SWAYA automatically fills in the exact title, release year, or episode info so you don't have to type anything.

---

### Step 5: Pick the Best Version in the Search Popup
A clean search popup will appear showing all available torrents:
* **All Your Sites at Once:** See results from every tracker you added in Jackett.
* **Smart Badges:** If you already downloaded or are currently downloading a release, SWAYA marks it as `Downloaded / Seeding` so you never grab duplicates by mistake.
* **Easy Filters:** Tap quick chips to filter by **Quality** (*1080p*, *4K*), **Codec** (*x264*, *x265/HEVC*), or **Source**.
* **1-Click Download:** Just hit the **Download** button on the release you like. SWAYA immediately sends it to qBittorrent!

---

### Step 6: Track & Manage Everything on the Downloads Page
Head over to the **Downloads** page from the left sidebar to see all your active and finished downloads:
* **Live Stats at a Glance:** See your total download speed, how many items are currently active, and how many are seeding.
* **Instant Filter Tabs:** Switch between `All`, `Downloading`, `Completed`, and `Paused` (your choice stays saved in the URL so you can jump right back).
* **Click-to-Sort:** Tap column headers (*Name*, *Size*, *Progress*, *Status*) to sort your list however you like.
* **Instant Button Controls:**
  * **Pause / Resume:** Instantly pause an active download or resume it whenever you're ready.
  * **Start / Stop Seeding:** When a movie finishes, tap to start sharing with other peers, or stop seeding if you just want to keep the file.
  * **Safe Removal:** Clicking the trash icon lets you choose whether to just remove the task from your list or delete the downloaded video file permanently.
