export const v1_1_0 = {
  version: '1.1.0',
  date: '2026-08-29',
  isLatest: true,
  title: 'Interactive Navigation, Scroll Restoration Engine & Automatic Database Migrations',
  description: 'Major stability and user experience update featuring interactive titlebar navigation, person filmography scroll position restoration, automatic Alembic database schema migrations, and modularized design system architecture.',
  highlights: [
    'Interactive window titlebar navigation with home link and quick sidebar toggle button',
    'Robust anchor-aware scroll restoration engine for actor and talent filmography pages',
    'Automatic Alembic database migration runner executing schema updates on startup',
    'Adult content sanitization and tracker filtering for Jackett torrent queries',
    'Comprehensive design system modularization with 600+ isolated components and tokens',
  ],
  sections: [
    {
      type: 'added',
      title: 'New Features',
      items: [
        'Interactive Titlebar Navigation: SWAYA logo now routes directly to Dashboard with state reset, and a dedicated sidebar toggle button was added to the titlebar.',
        'Filmography Scroll Restoration: Preserves exact scroll position, anchor items, and paginated lists across browser history navigation.',
        'Automatic Database Migrations: Startup migration engine with automatic Alembic revision stamping and upgrade execution.',
        'Adult Content Filtering: Category and keyword sanitization for Jackett torrent queries when adult mode is disabled.',
        'ToggleIconButton Primitive: Reusable toolbar button for active and toggled state indicators.',
      ],
    },
    {
      type: 'changed',
      title: 'Improvements',
      items: [
        'Design System Modularization: Reorganized UI into clean domain barrels across controls, drawers, media, navigation, overlays, and primitives.',
        'Adult PIN Modal Decomposition: Refactored monolithic PIN dialog into isolated step subcomponents and form state hooks.',
        'Jackett Config Relocation: Relocated jackett configuration to persistent user data directory with automatic legacy cleanup.',
        'Onboarding UX Enhancements: Improved folder selection step styling and prioritized TMDb Bearer tokens.',
        'Recursive Sub-Studio Resolution: Dynamic resolution of descendant sub-studios via studio detail service.',
      ],
    },
    {
      type: 'performance',
      title: 'Performance & Architecture',
      items: [
        'Duplicate Scraping Safeguard: Automatic tracker checks skip redundant network requests for already enriched items.',
      ],
    },
    {
      type: 'fixed',
      title: 'Bug Fixes & Polish',
      items: [
        'Fixed custom list membership identifier matching for external provider IDs and numeric media IDs.',
        'Fixed database schema consistency for non-nullable boolean defaults via Alembic migration cc5cafc2ddba.',
        'Fixed Picture-in-Picture (PiP) drag handle and spacing using standard CSS tokens.',
      ],
    },
  ],
};
