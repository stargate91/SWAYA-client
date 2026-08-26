# SWAYA Ratings & Reviews Guide

The **Ratings & Reviews** page is your central command center for grading, reviewing, and favoriting everything in your SWAYA collection. Whether you want to quickly score a marathon of new movies, write personal notes about a favorite TV season, or curate your favorite actors and studios, everything is organized in one fast and responsive table.

---

## How It Works (The Golden Rule of What Shows Up)

To keep your lists super clean and relevant, SWAYA doesn't dump the entire internet into this view. Instead, it only shows the things you actually care about:

> [!IMPORTANT]
> ### What Appears in Your Ratings Queue?
> * **Movies, TV Shows, Scenes & Videos:** Only items that are in your **local library** OR marked as **tracked** appear here.
> * **Stars & Studios:** Only actors, performers, and studios that you explicitly **follow** (starred/added to your library) appear here.
>
> If you haven't added a movie to your disk or followed an actor yet, they won't clutter your ratings list!

---

## Dual Mode Support (SFW & NSFW)

Just like the rest of SWAYA, the Ratings page seamlessly adapts to your active session mode via the top navigation bar:

* **Mainstream Mode (SFW):** Browse and rate your **Movies**, **TV Shows**, standalone **Videos**, **Stars** (actors, directors, crew), and **Studios & Networks**.
* **Adult Mode (NSFW):** Focus on **Scenes**, **Adult Movies**, standalone **Videos**, **Adult Stars**, and **Adult Studios**.

Switching modes instantly updates the media tabs, table content, and rating stats with zero reloading.

---

## Unrated vs. Rated & Reviewed Tabs

At the very top of the page, two primary tabs split your workflow:

1. **To Be Rated (Unrated):** Your backlog of watched or owned items that don't have a personal score yet. Use this tab to rapidly grade new additions without digging through folders.
2. **Rated & Reviewed (Rated):** Your graded collection. Review previous ratings, refine your written reviews, or tweak your scores as your tastes evolve.

---

## Media Type Tabs

Filter your queue by specific entity with a single click:

| Tab | SFW Mode Label | NSFW Mode Label | What It Contains |
| :--- | :--- | :--- | :--- |
| **Movies** | Movies | Movies | Feature films in your library or tracked list |
| **TV Shows** | TV Shows | TV Shows | Television series in your collection |
| **Scenes** | *(Hidden in SFW)* | Scenes | Individual adult scenes and video clips |
| **Videos** | Videos | Videos | Standalone local videos and clips |
| **People** | Stars | Adult Stars | Actors, directors, and performers you follow |
| **Studios** | Studios | Adult Studios | Production companies, networks, and adult studios you follow |

---

## Quick Actions on Every Row

Everything in the table is designed for speed and zero friction:

### 1. Instant Navigation
Clicking on any title or name instantly navigates to its full detail page (`/library/movie/:id`, `/library/people/:id`, `/library/studio/:id`, etc.).

### 2. Hover Image Preview
Hover your cursor over any title, person, or studio to see an instant floating preview of their poster, still backdrop, or studio logo. Move your mouse away, and the preview disappears without a trace.

### 3. Segmented Rating (1 to 10)
Rate any item in half a second using the interactive 1-10 rating pill selector. Clicking a number immediately saves your rating in the database and updates your analytics.

### 4. Favorite Toggle (Stars & Studios)
For Stars and Studios, click the heart button to mark them as your all-time favorites. The button lights up in theme-adaptive pink with a smooth burst animation.

### 5. Review Drawer (Personal Notes)
Click the **Add** or **Edit** review button next to any item to open the slide-out Review Drawer. Write your personal notes, plot thoughts, or tags, and hit **Save Review** (or press `Ctrl+Enter` / `ESC` to close).

---

## Search, Sorting & URL Sync

* **Instant Search:** Type any keyword in the search bar to filter your current tab by name or title with real-time debouncing.
* **Column Sorting:** Click column headers (**Name / Title**, **Review**, **My Rating**) to sort ascending or descending.
* **Full URL Persistence:** The active tab, selected media type, search query, page number, and sort order are saved in your browser URL (`?tab=unrated&type=movies&q=matrix`). You can bookmark specific queues, refresh the page with `F5`, or use the browser back/forward buttons without losing your spot.
