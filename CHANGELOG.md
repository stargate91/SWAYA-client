All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.


## [1.1.0] - 2026-08-29

### Added
- **Interactive Titlebar Navigation & Sidebar Toggle**: Converted the **SWAYA** brand logo into an interactive link navigating to the Dashboard (with state reset and scroll-to-top), and added a dedicated sidebar collapse/expand toggle button (`PanelLeftOpen` / `PanelLeftClose`) directly to the window titlebar.
- **Filmography Scroll Restoration Engine (`usePersonFilmographyScrollRestoration`)**: Implemented robust anchor-aware scroll restoration for person detail pages, preserving exact viewport positions, anchor items, and paginated items across browser history (`POP`) navigation.
- **Automatic Alembic Database Migrations**: Added startup migration runner (`apply_alembic_migrations`) in `database.py` with automatic revision stamping for legacy databases and seamless execution of `alembic upgrade head`.
- **Adult Content Filtering for Torrents**: Enforced adult category (6000–6999) sanitization and keyword checks (`xxx`, `adult`, `porn`, `hentai`) in Jackett torrent search when adult content mode is disabled.
- **New UI Primitive (`ToggleIconButton`)**: Added reusable `ToggleIconButton` component for active/inactive toolbar states.

### Changed
- **Design System & Component Modularization**: Restructured frontend UI library into modular domain folders (`components/controls/`, `components/drawers/`, `components/media/`, `ui/navigation/`, `ui/overlays/`, `ui/primitives/`) with clean barrel index exports across 600+ components.
- **Adult PIN Modal Decomposition**: Refactored monolithic `AdultPinModal.jsx` (~870 lines) into dedicated step subcomponents (`AdultPinSetupStep`, `AdultPinVerifyStep`, `AdultPinRecoveryStep`, `AdultPinShowKeyStep`) and extracted form state/mutation handling into `useAdultPinForm`.
- **Jackett Configuration Relocation**: Moved `jackett_config` from application binary paths to persistent user data directory (`DATA_ROOT / "jackett_config"`) with automatic legacy cleanup and updated build exclusions.
- **Onboarding UX & Provider Credentials**: Improved onboarding folder step with disabled state styling for non-move modes, and reordered TMDB credentials to prioritize API Read Access Token (Bearer) over v3 API Key.
- **Recursive Sub-Studio Resolution**: Enhanced `get_all_sub_studio_ids` to accept string/external IDs and dynamically resolve descendant sub-studios via `StudioDetailService`.

### Performance & Optimization
- **Duplicate Scraping Safeguard**: Added `is_already_enriched` check in `ItemTracker` to skip redundant network scraping for items already containing localizations and media links.

### Fixed
- **Custom List Membership Resolution**: Rewrote identifier matching in `ListMembershipService` to reliably resolve external provider IDs (`provider:external_id`), clean IDs, and integer media IDs.
- **Database Schema Consistency**: Added Alembic migration `cc5cafc2ddba` to align `libraries.is_adult` to a non-nullable boolean default.
- **Picture-in-Picture (PiP) Styling**: Refactored PiP player drag handle and spacing to use standard CSS tokens (`--space-xs`).

## [1.0.0] - 2026-08-16

### Added
- **Torrent Management Dashboard (`/torrents`)**: Integrated full external torrent client support (qBittorrent and Transmission) featuring a dedicated real-time dashboard with active download polling, bandwidth speed counters, progress metrics, pause/resume controls, seed ratio tracking, rate limit sliders, and torrent deletion options (client-only vs. client + disk files).
- **In-App Torrent Search & Dispatch**: Global torrent search modal with Jackett tracker integration, automatic magnet link parsing, category filtering (Movies, TV, Adult), and 1-click download client dispatch.
- **Automated Torrent Completion Watcher (`qbittorrent_watcher`)**: Background service monitoring torrent download completions with automatic scan and library import triggers.
- **Master-Detail Rename History Architecture**: Implemented on-demand lazy loading for batch logs via dedicated endpoint (`GET /api/v1/history/batches/{id}/logs`), reducing initial history payload size by over 95%.
- **Dedicated Ratings & Review Drawer (`RatingsReviewDrawer`)**: Centralized sliding drawer component for viewing and editing item ratings, reviews, and community review scores.
- **Unified Media & Adult Discovery Widgets**: Modular discovery system (`MediaDiscoveryWidget`, `AdultProviderDiscoveryWidget`) with dynamic provider feeds for TMDb, StashDB, and FansDB.
- **Global Modal Store & True Stacking (`useModalStore`)**: Replaced single `useState` modal handling with a centralized Zustand store supporting multi-level stacked dialogs with dynamic z-index layers.
- **Declarative `confirmDialog()` Helper**: Standardized destruction and confirmation prompts across the application (deletion, undo batches, cancellation, cache wipe), including automated loading states and async action handling.
- **User Prompt Preferences Store (`usePromptPreferencesStore`)**: Persists user confirmation prompt suppression preferences across sessions.
- **Global Toast Store & Tone Palette (`useToastStore`)**: Decoupled toast notifications from React context, enabling standalone `toast()` triggers from queries, mutations, and IPC events with full CSS tokens for `success`, `danger`/`error`, `warning`, `info`, and `default`.
- **Declarative React Query Toasts**: Automated toast notifications in `queryClient.js` `MutationCache` based on `meta.successToast` and `meta.errorToast`.
- **Bespoke TV Series Architecture**: Hierarchical season and episode navigation with dedicated detail views (`BespokeSeasonsSection.jsx`, `BespokeEpisodeDetail.jsx`), next episode playback, and per-episode progress tracking.
- **Player Audio Memory Store (`usePlayerAudioStore`)**: Persists audio and subtitle stream track preferences across video playback sessions.
- **Unified Entity Normalization Layer (`normalizeMediaEntity.js` & `entityIds.js`)**: Comprehensive metadata normalizer and parser for unified handling of movies, TV shows, episodes, adult scenes, performers, and studios.
- **Tag Management System**: Custom tag creation, color picker integration, edit modals, and cascaded tag deletion.
- **Vitest & Pytest Testing Suites**: Comprehensive unit and integration test coverage across frontend stores, query keys, optimistic updates, API layer, DOM scrolling, and backend resolvers.

### Changed
- **Centralized Formatters Library (`@/lib/formatters/`)**: Unified and modularized formatters across the application for byte sizes, dates, relative time, durations, media filenames, episode codes, person physical attributes, and subtitle statistics.
- **Centralized External Links Engine (`@/lib/externalLinks/`)**: Unified metadata provider URL builders supporting TMDb, IMDb, TVDb, StashDB, FansDB, ThePornDB, and IAFD.
- **Modularized Media Organizer**: Decomposed the monolithic organizer view into modular components (`components/matchModal/`, `components/overrideModal/`, `OrganizerResultsPanel`, `OrganizerScanSettingsPanel`).
- **Modularized Settings Architecture**: Refactored Settings sections into dedicated sub-modules (`advancedSections.jsx`, `librarySections.jsx`, `torrentSections.jsx`, `appearanceSections.jsx`, `storageSections.jsx`).
- **CSS Modules & Design System Strictness**: Migrated component stylesheets to isolated CSS Modules (`.module.css`) and strictly enforced design tokens across all components, removing hardcoded colors, pixel dimensions, and global specificity leaks.
- **React Query Migration**: Encapsulated 100% of legacy direct `api.*` calls into structured TanStack React Query hooks and query key factories (`libraryQueries.js`, `metadataQueries.js`, `torrentQueries.js`, `historyQueries.js`, `personMutations.js`, `mediaAssetMutations.js`).
- **Lists & Smart Collections UI**: Redesigned `ListsHeader.jsx` with search filter bars, custom color tags, dynamic list type isolation (Movie/TV vs. Video/Scene vs. People), and robust JSON import/export validation.
- **Modal & Dialog Upgrades**: Migrated all confirmation prompts in `MediaDetailPage`, `ListsPage`, `HistoryPage`, `PerformerLinkingTab`, `WindowTitlebar`, `useLibraryModals`, `useSettingsDangerZone`, and `useOrganizerRename` to `confirmDialog`.
- **TypeScript Localization Types**: Added `i18n.d.ts` for strict type-checking on translation keys.
- **Electron Multi-Window Cache Broadcasting**: Automated query cache invalidation synchronization across all open Electron browser windows via IPC broadcast events.

### Performance & Optimization
- **Rename History Master-Detail Separation & SQL Aggregations**: Replaced Python-side iteration over thousands of ORM instances with grouped SQL queries (`group_by(batch_id, status)`), eliminating frontend DOM thrashing and Virtualizer layout freezes during batch expansion.
- **Eliminated TMDb Per-Item HTTP Roundtrips**: Removed 20+ synchronous per-item `get_details` API network requests per search query in TV and Multi-search resolvers, reducing search latency from 3000–6000ms down to ~100–200ms.
- **Eliminated N+1 Database Queries**: Optimized relational queries across history, library item resolution, and studio hierarchies using selective `selectinload` joins.
- **Studio & Company Grid Layout**: Unified TMDb company search under the 4-column landscape scene grid (`variant="scene"`), preventing squashed 2:3 poster distortion.
- **Company Metadata Seed Cache**: Pre-seeds local company metadata cache during TMDb search resolution to make subsequent studio detail visits instantaneous.
- **Skeleton Loading States**: Enhanced skeleton layouts on card grids, lists, and detail views to eliminate layout shifts.

### Fixed
- **History Card Details Lag**: Fixed severe UI freeze when opening large rename history batches by moving file logs to on-demand querying with lightweight virtualized rendering.
- **Missing Toast Tone Styling**: Added complete CSS styling and theme variables for `warning`, `info`, and `error`/`danger` toasts in `ToastViewport.module.css` and `variables.css`.
- **Performer Linking Deletion Safeguard**: Added confirmation dialog and navigation redirect when unlinking the final external metadata source from a performer profile.
- **Organizer Batch Undo Reversion**: Fixed file restoration confirmation in history panel with accurate affected file counters and rollback protection.
- **Global Search Immediate Re-Trigger**: Fixed search query refetching behavior when toggling media type tabs with identical search terms.
- **Torrent Optimistic Updates & Rollbacks**: Fixed optimistic cache transitions for pause, resume, and delete actions with automated cache rollback on network errors.

## [0.7.0] - 2026-08-12

### Added
- **Dynamic Port Allocation**: Introduced automatic free TCP port discovery on backend startup, writing the selected port to `port.txt` to eliminate startup port collisions (e.g. `WinError 10048`).
- **Piped Backend Logs**: Piped the Python backend's stdout and stderr streams directly into Electron logs for easier production diagnostics.
- **Hardware-Accelerated Video Previews**: Implemented automatic FFmpeg encoder detection for hardware-accelerated H.264 rendering (NVENC, QSV, AMF), falling back to optimized CPU rendering if unavailable or if GPU encoding fails.
- **SQLite Filmography Caching**: Introduced a local `RemoteFilmographyCache` system to store remote TMDB performer credits, enabling instant loading of actor pages without remote API roundtrips.
- **Recently Followed Studios Widget**: Added a new dashboard carousel widget and backend paginated endpoint to display recently followed studios or parent networks.
- **FlagCDN SVG Integration**: Replaced system Unicode country flags with high-quality SVG flag badges from FlagCDN on performer cards, resolving emoji rendering limitations on Windows.
- **TV Episode Loading Skeletons**: Integrated modern skeleton loading states for episode lists and details on the TV Season detail view.

### Changed
- **Known For UI Consolidation**: Refactored the custom "Known For" credit cards on performer pages to use the unified `PosterCard` component.
- **Video Playback End Overlay**: Streamlined the ending video playback overlay by removing legacy recommendations, autoplay countdowns, and the sliding drawer in favor of a simplified rating and statistics dashboard.
- **Dynamic List Filtering**: Refactored the type filter dropdown on lists pages to dynamically adjust categories depending on the list's content type (Movies/TV vs. Scenes/Videos).
- **Studio Detail SFW Restrictions**: Automated page redirects to Dashboard if an adult studio is accessed while the app is in SFW session mode or `include_adult` is disabled.
- **Skeleton List Loaders**: Replaced spinning loaders with premium custom `Skeleton.Card` grids in List views.

### Fixed
- **React Override Modal Warning**: Removed state-synchronizing effects in metadata override modals, resolving React lifecycle exceptions and potential render loops.
- **Library Consolidation on Boot**: Added automatic cleanups during monitoring initialization to consolidate sub-folder libraries and deactivate watch hooks for missing paths.
- **API Param Mapping**: Fixed provider mapping for external IDs inside media utility actions (ratings, favorites, poster/backdrop uploads).
- **Library TV Card Play Click**: Updated play button triggers in studio grids to play the next unplayed or in-progress episode for TV series.

## [0.6.0] - 2026-08-10


### Added
- **Global Search for Adult Providers**: Implemented support for searching "All" media types (scenes, performers, studios, and movies) globally on StashDB, FansDB, and ThePornDB.
- **Parent Process Monitor**: Introduced a background monitor in the Python backend to automatically detect parent Electron process termination and cleanly exit, preventing orphaned `swaya-backend.exe` processes.

### Fixed
- **API Token Verification in Production**: Resolved a critical sandbox context-isolation issue where `process.env.SWAYA_API_TOKEN` was undefined in the preload script in production, replacing it with a synchronous IPC request (`ipcRenderer.sendSync`) to the main process.
- **Double Proxying of Remote Images**: Fixed an issue where remote HTTPS image URLs were double-wrapped in the image proxy, causing 401 Unauthorized errors on the backend due to requests to itself lacking the API token header.
- **Studio Navigation Fallback**: Fixed an issue where navigating to studio detail pages from the scene page was blocked because of unlinked external studios having null local IDs. Added a fallback format (`provider:external_id`) that automatically resolves and imports the studio details.

## [0.5.0] - 2026-08-10

### Added
- **Dynamic Remote Studio Search**: Added a remote search tab to the studio activation modal, allowing users to search and discover studios/companies directly from TMDB, StashDB, FansDB, and ThePornDB.
- **Sub-Studio & Parent Network Mapping**: Implemented recursive parent resolution on studio activation, linking sub-studios automatically to their parent networks/studios.
- **Audio & Subtitle Track Autoselection**: Introduced player language rules in Settings to auto-select preferred audio and subtitle tracks in the native MPV player, complete with on-screen stream switching controls in the player toolbar.

### Changed
- **Modular Studio Detail Layout**: Refactored the monolithic `StudioDetailPage` layout into modular sub-components (`StudioHeroHeader`, `StudioLogoBlock`, `StudioRelationsBlock`, `StudioMediaGrid`, etc.).
- **Query Placeholder Migration**: Upgraded custom query identity placeholder functions to use TanStack Query v5's native `keepPreviousData` utility.

### Fixed
- **Startup Production React Crash #301**: Fixed a critical infinite loop crash on boot in production environments caused by loading-state reference changes on settings queries.
- **Studio Details Cache Merging**: Replaced cache overwrites with field merges in studio status mutation success callbacks, preserving metadata fields like name and logo path when updating ratings or favorites.

## [0.4.0] - 2026-08-09

### Added
- **Studio Detail Page & Hierarchical Profiles:** Introduced a dedicated studio detail page (`StudioDetailPage`), logo override/upload functionality, favorite and active status toggles, custom user ratings and reviews, and parent/sub-studio hierarchy navigation.
- **Paginated Adult Discovery (StashDB & FansDB):** Added infinite scroll pagination and dynamic sorting options (Trending / Popularity) to the StashDB and FansDB discovery widgets when filtering by tag focus.
- **String ID Support in Media & Playback API:** Enabled automatic resolution of external UUIDs and string-based IDs into internal media item IDs across playback info, video preview, and watch history endpoints.

### Changed
- **Studio Persister & Resolution:** Refactored `StudioPersister` logic for accurate external ID resolution, canonical studio name preservation, and cleaner parent-child studio relation mapping.
- **UI & Widget Skeleton States:** Upgraded skeleton card components with structured title/subtitle placeholders and refined `WidgetShell` loading row states.
- **Global Fetch Token Injection:** Decoupled API token validation and header injection in frontend `fetch` calls from strict Electron runtime checks.

### Fixed
- **UI Focus Outlines:** Removed unwanted focus outlines on tag selection buttons and added automatic element blur on `AppShell` mount.
- **Linter & Code Cleanup:** Removed unused SQLAlchemy imports (`select`, `and_`) and redundant code across organizer queries and library listing builders.

## [0.3.0] - 2026-08-08

### Added
- **Electron IPC Security (Context Bridge):** Implemented secure context bridge `window.electronAPI` in `preload.js` with whitelisted channels, removing direct Electron/Node imports from the renderer process.
- **Electron API Token Authentication:** Added API token validation middleware to the backend, generated secure `SWAYA_API_TOKEN` in the main process, and automatically injected it into all frontend fetch requests targeting the API.
- **TypeScript Declarations:** Added `electron.d.ts` containing interface definitions for the secure Electron IPC API.

### Changed
- **Database Model Refactoring:** Extracted unified image expression helper `_user_custom_image_expr` to clean up and simplify image hybrid properties across all main models (PlaybackLog, Collection, MetadataMatch, Studio, Person, UserList, UserOverride, Tag, User).
- **Changelog Path Lookup:** Improved flexibility of the changelog service to locate `CHANGELOG.md` in both dev and packaged production builds.
- **Adult Dashboard Tag Selector:** Allowed the tag focus selector to display all matching options instead of limiting to the first 10.
- **Role Translation Key:** Fallback key mapping for performer and artist roles to use dynamic translations.

### Fixed
- **Adult Image Enrichment:** Ignored site performer relations when extracting image URLs to prevent incorrect image associations in adult enricher and ThePornDB provider.
- **Performer Image Preloading:** Verified performer profile and thumbnail images resolve correctly before triggering the save callback.
- **Person Backdrop Layout:** Centered the scene source segmented control in the performer backdrop picker.

## [0.2.0-beta.1] - 2026-08-07

### Added
- **Multi-Provider Scrapers:** Support for TMDB, OMDB, ThePornDB, StashDB, and FansDB metadata pipelines.
- **Unified Organizer Panel:** Added dynamic media organizer settings (Scan Mode selection: Movies, TV, Scenes, Offline).
- **Torrent Integration:** qBittorrent client integration for auto-identifying and tracking downloaded media assets.
- **External Player Sync & Playback Tracking:** Real-time playback status sync for local VLC and MPC-HC players.
- **Peak Moments & Video Bookmarks:** Playback hot-spots and timeline bookmark logging, complete with automatic dynamic video still extraction.
- **Reversible Action Batches:** Standardized file operations (Rename, Move, Copy, Delete) with built-in rollback (Undo) system.
- **Custom Lists & Watchlists:** Smart filter lists categorized by content type (Movie/TV, Video/Scene, Person).
- **Media Overrides:** Custom title, overview, tag, and rating override options per user profile.
- **Extended History Stats Preparation:** Added `duration_watched_seconds` to `PlaybackLog` for robust screen-time statistics.

### Changed
- Refactored `user_settings` and `system_settings` configuration logic to support extensible key-value serialization.
- Optimized SQLite concurrency management utilizing Python process-level write locks and WAL journal mode.

### Fixed
- Fixed React attribute warning on Organizer panel for non-boolean `block` prop by converting the underlying container to a standard `div` wrapper.
- Fixed metadata fallback routing issues during bulk title scans.

## [0.1.0] - 2026-07-05

### Added
- Initial project release.
- FastAPI backend for media scanning, metadata enrichment, and library organization.
- React and Electron frontend for desktop library management.
- TMDB integration, FFprobe-based media analysis, and SQLite persistence.
