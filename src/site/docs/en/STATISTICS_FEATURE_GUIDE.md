# SWAYA Statistics & Insights Guide

The **Statistics & Insights** page is your central analytics dashboard in SWAYA. It provides a real-time overview of your entire media library, tracks your personal rating habits, and breaks down your collection across genres and release decades.

---

## Dual Mode Support (SFW & NSFW)

SWAYA separates your mainstream and adult collections into dedicated sessions. The Statistics dashboard updates immediately when switching modes via the top navigation bar:

* **Mainstream Mode (SFW):** Tracks Movies, TV Shows, Episodes, **Stars** (actors, directors, crew), and Production Studios.
* **Adult Mode (NSFW):** Tracks Scenes, Movies, **Adult Stars**, and Adult Studios/Networks.

All metrics, graphs, and rating summaries isolate data based on the active mode.

---

## Section 1: Overview

> **Data Source:** Populates automatically once media is scanned, matched, and imported into your library.

| Total Movies | Scenes / Videos | TV Shows | Storage Used | Review Needed |
| :--- | :--- | :--- | :--- | :--- |
| **253 Titles** | **142 Scenes** | **18 Shows** | **1.84 TB** | **12 Pending** |

The top metrics bar covers library volume, storage, and scanner status across 5 cards:

1. **Total Movies:** Exact number of recognized movie titles in your library.
2. **Scenes / Videos:** Total individual scenes (in Adult mode) or custom standalone videos (in Mainstream mode).
3. **TV Shows & Episodes:** Total television series along with the overall episode count across all seasons.
4. **Storage Usage:** Total disk footprint occupied by organized media, including the number of underlying storage drives (e.g., *"across 3 drives"*).
5. **Review Needed (Unmatched):** The count of files currently awaiting matching and renaming in the Organizer queue.

---

## Section 2: Ratings, Reviews & Distribution

> **Data Source:** Populates from your personal ratings, reviews, and favorited entities.

### Summary Cards (2x2 Grid)
Four cards summarize your rating activity and favorites:

* **Movies & TV Shows:** Displays your average rating score alongside rating completion progress (e.g., `8.4 / 10 · 142 rated · 18 unrated`).
* **Scenes & Videos (in Adult Mode):** Shows average scene scores and rating completion rates.
* **Talents:** Average rating score for followed stars/adult stars, plus your total favorited count.
* **Studios:** Average rating score across production studios, plus your total favorited studios count.

### Rating Distribution (20-Slot Histogram)
An interactive horizontal histogram mapping your rating patterns with half-star precision from **0.5 to 10**:

* **Translucent Glass Channels:** Each half-star increment (0.5, 1.0, 1.5 ... 10.0) features a dedicated glass track.
* **Dynamic Bar Heights:** Bars grow proportionally from the baseline based on your rating frequency.
* **Tooltips & Value Counts:** The exact count is displayed above active bars, while hovering shows a tooltip with full item details (e.g., `8 • 42 rated items`).
* **Entity Filtering:** Toggle between Movies, TV Shows, Scenes, Talents, and Studios using the filter pills in the card header.

---

## Section 3: Library Insights & Timeline

> **Data Source:** Unlocks progressively as you organize and match titles in your library.

To ensure visualizations reflect meaningful patterns, advanced charts require a minimum threshold of organized media before unlocking:

### 1. Genre Breakdown (Library DNA)
* **Unlock Threshold:** Requires at least **4 organized titles** (or scenes).
* **Visualization:** A multi-axis radar chart showing your top 5 genres alongside percentage breakdown tags.
* **Progress State:** If below 4 items, a locked overlay displays your current progress (e.g., *"2 of 4 titles organized"*).

### 2. Release Timeline (Time Travel)
* **Unlock Threshold:** Requires at least **5 organized titles** (or scenes).
* **Visualization:** A decade-by-decade bar chart displaying the historical distribution of your collection (from legacy releases to current-decade titles), highlighting your most populated era (e.g., *"Your most populated decade is the 2000s"*).
* **Progress State:** Displays a progress meter until 5 items are organized.

---

## Best Practices

* **Rate titles during playback or in Library view:** Rating items immediately feeds into the 20-slot distribution curve, helping you visualize your critical score tendencies over time.
* **Use Favorites for quick filtering:** Favoriting Stars and Studios keeps their individual average ratings tracked directly on this page.
* **Monitor the Unmatched metric:** Use the Overview Unmatched count as a quick check for newly downloaded files that need processing in the Organizer.
