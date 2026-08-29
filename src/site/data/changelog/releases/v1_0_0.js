export const v1_0_0 = {
  version: '1.0.0',
  date: '2026-08-16',
  isLatest: false,
  title: 'Torrent Client Integration, Granular Reviews & Bespoke Series Architecture',
  description: 'Major workstation release introducing full external torrent client dashboards, global torrent search, ratings drawer, bespoke TV season navigation, and optimized batch SQL logs.',
  highlights: [
    'External torrent client dashboard (qBittorrent & Transmission) with bandwidth counters',
    'Automated background torrent completion watcher with scan triggers',
    'Bespoke TV series episode breakdown and playback progression',
    'Unified media and adult discovery widgets across TMDb, StashDB, and FansDB',
    'Master-detail rename history with on-demand lazy log loading',
  ],
  sections: [
    {
      type: 'added',
      title: 'New Features',
      items: [
        'Torrent Management Dashboard: Real-time download monitoring, rate limiting, and pause/resume controls.',
        'In-App Torrent Search: Jackett tracker search modal with magnet parsing and 1-click dispatch.',
        'Automated Completion Watcher: Background service automatically scanning completed downloads.',
        'Ratings & Review Drawer: Sliding review editor with 10-star rating scale and private markdown notes.',
        'Bespoke TV Architecture: Multi-season hierarchy, episode progress tracking, and next episode playback.',
        'Global Toast & Modal Stores: Centralized Zustand stores supporting multi-level stacked dialogs.',
      ],
    },
    {
      type: 'performance',
      title: 'Performance & Architecture',
      items: [
        'Master-Detail Separation: Grouped SQL queries eliminate DOM freezes during batch expansion.',
        'TMDb Search Acceleration: Removed redundant HTTP roundtrips, reducing search latency from 4000ms to ~150ms.',
        'N+1 Query Elimination: Selective selectinload joins across library and history hierarchies.',
        'Company Metadata Seed Cache: Pre-seeds local company cache during multi-source search resolution.',
      ],
    },
    {
      type: 'fixed',
      title: 'Bug Fixes & Polish',
      items: [
        'Fixed UI freeze when viewing large rename history batches via virtualized rendering.',
        'Fixed file restoration confirmation in history panel with accurate affected file rollback counters.',
        'Fixed optimistic cache transitions for torrent pause, resume, and deletion actions.',
      ],
    },
  ],
};
