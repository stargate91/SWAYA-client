# SWAYA MPV Player Guide

The **Built-in MPV Player** is the media playback engine inside SWAYA. It plays movies, TV episodes, adult scenes, and custom videos directly inside the app with hardware acceleration, subtitle syncing, chapter navigation, and adult finish tracking.

---

## What Makes It Special

Unlike generic web video players, SWAYA runs a native **MPV** engine under the hood:

* **Plays Virtually Any Format:** MKV, MP4, AVI, WebM, TS, MOV with any audio (Dolby Atmos, DTS-HD, TrueHD, FLAC, AAC) and subtitle format (ASS, SRT, VTT, PGS).
* **Frame-Accurate Resuming:** Remembers your exact playback position across sessions and automatically syncs progress to the database every 5 seconds.
* **Smart Black-Bar Adapting:** Control overlays automatically detect the video aspect ratio and hug the edge of the actual video frame, so letterboxed movies never have floating awkward controls.
* **Picture-in-Picture & Fullscreen:** Double-click anywhere or press `F` to pop in and out of fullscreen.

---

## Dual Mode Support (SFW & NSFW)

The player adapts its interface based on the type of media you are playing:

* **Mainstream Media (Movies & TV Shows):** Focuses on chapter markers, multi-audio tracks, embedded and external subtitles, playback speed control, and end-of-video episode suggestions.
* **Adult Media (Scenes & Adult Movies):** Unlocks the **Finish Moment** system, allowing you to bookmark, snapshot, and track finish moments with a single keypress.

---

## Complete Keyboard & Mouse Shortcuts

You can control everything in the player without lifting your hands off the keyboard:

| Shortcut | Action | What It Does |
| :--- | :--- | :--- |
| **Space** / **Spacebar** | Play / Pause | Toggles video playback with on-screen confirmation |
| **Enter** | Record Finish *(Adult media only)* | Takes a snapshot and records the exact finish timestamp |
| **Left Arrow** | Seek Backward | Jumps back 10 seconds |
| **Right Arrow** | Seek Forward | Jumps forward 10 seconds |
| **Up Arrow** | Volume Up | Increases audio volume by 5% |
| **Down Arrow** | Volume Down | Decreases audio volume by 5% |
| **Mouse Wheel** | Volume Adjust | Scroll up to increase volume, scroll down to decrease |
| **Double Click** | Toggle Fullscreen | Switches between standard window and fullscreen |
| **M** | Toggle Mute | Silences or restores audio |
| **F** | Fullscreen / PiP | Enters or exits fullscreen mode |
| **G** | Subtitle Delay - | Shifts subtitles 100ms earlier (speeds them up) |
| **H** | Subtitle Delay + | Shifts subtitles 100ms later (slows them down) |
| **J** | Audio Delay - | Shifts audio 100ms earlier to fix out-of-sync audio |
| **K** | Audio Delay + | Shifts audio 100ms later to fix out-of-sync audio |

---

## Adult Finish Tracking & Saved Moments

When playing adult scenes or adult movies, SWAYA includes a finish tracking feature:

### 1. Recording a Finish with One Key (`Enter`)
Whenever a key moment happens during playback:
* Press the **`Enter`** key on your keyboard, OR click the **Finish button** (droplets icon) in the bottom control bar.
* SWAYA instantly takes a high-resolution screenshot of the exact video frame at that moment.
* The exact timestamp (e.g. `14:32`) and date are recorded to the database.
* The Finish button flashes green to confirm the save, and the total finish counter for that video increments.

### 2. Finding Your Saved Moments
All recorded finish moments appear in two places:
* **History Page (`/history?tab=peaks`):** A chronological gallery of all finish moments with their captured screenshot thumbnail, title, and exact time marker. Clicking **Play Moment** immediately launches the player at that exact second.
* **Media Detail Page:** The dedicated **Finish Moments** section on any scene or movie page shows all recorded moments for that specific title.

### 3. Removing or Undoing a Mark
If you pressed `Enter` by accident or want to clear a timestamp:
* Open the media detail page for that title.
* Scroll to the **Finish Moments** section.
* Click the **X** button on the moment you want to remove.
* The entry is deleted, the total finish counter is updated, and the mark is removed from your History and Statistics pages.

---

## On-Screen Controls & Menus

Hovering your mouse over the player reveals the control bar:

* **Timeline Slider & Chapters:** Shows chapter tick marks directly on the progress bar. Hovering shows preview times.
* **Clock & Remaining Time:** Displays the current local clock time alongside an estimated completion time (e.g., *"Ends at 10:45 PM"*).
* **Audio Track Switcher:** Lets you switch between embedded multi-language tracks and external audio files.
* **Subtitle Switcher:** Allows selecting embedded subtitles, loading external `.srt` / `.ass` files, or turning subtitles off.
* **Speed Control:** Step through playback speeds from 0.25x slow-motion up to 4x fast-forward.
* **Stop Button:** Saves your progress immediately, closes the player, and returns to your previous library view.
