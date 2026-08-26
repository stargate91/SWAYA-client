export const kodiComparison = {
  slug: 'kodi',
  name: 'Kodi',
  category: 'Home Theater',
  shortCategory: 'Home Theater PC',
  badge: 'Swaya vs Kodi',
  title: 'SWAYA vs Kodi: Modern Desktop Media Center',
  metaTitle: 'Kodi Alternative for Windows Desktop - SWAYA Media Center',
  metaDescription:
    'Searching for a modern Kodi alternative designed for desktop PCs? SWAYA renames disk files, organizes libraries, and plays 4K HDR without broken plugins.',
  heroTagline: 'A modern desktop media workstation designed for mouse, keyboard, and disks.',
  heroSubtitle:
    'Kodi is legendary for 10-foot TV interfaces, but clumsy on desktop monitors and vulnerable to broken addons. SWAYA is purpose-built for Windows desktops with direct disk organizing and native MPV playback.',
  competitorPricing: 'Free / Open Source (FOSS)',
  swayaPricing: '€39 launch lifetime (€79 regular)',
  whenToChooseCompetitor: [
    'You are building a dedicated Home Theater PC (HTPC) connected to a TV and controlled by an IR remote.',
    'You rely on third-party streaming addons and community builds.',
    'You want a 10-foot couch interface.',
  ],
  whenToChooseSwaya: [
    'You use a Windows desktop PC or laptop with a mouse and keyboard.',
    'You want safe, physical batch file renaming and directory restructuring on your hard drives.',
    'You want a rock-solid, lightweight app that never breaks after updates.',
    'You want adult media (StashDB) and mainstream media (TMDb) in one unified workstation.',
  ],
  matrix: [
    {
      feature: 'Modern Desktop UI (Optimized for Mouse & Keyboard)',
      swaya: true,
      competitor: false,
      swayaNote: 'Sleek, fluid desktop interface',
      competitorNote: '10-foot TV remote interface',
    },
    {
      feature: 'Physical Disk Renaming & Folder Organizing',
      swaya: true,
      competitor: false,
      swayaNote: 'Batch renames & moves files on disk',
      competitorNote: 'Database only, does not rename disk files',
    },
    {
      feature: 'Integrated 4K/HDR MPV Video Engine',
      swaya: true,
      competitor: true,
      swayaNote: 'Hardware accelerated, zero lag',
      competitorNote: 'Internal player engine',
    },
    {
      feature: 'Adult Media (StashDB) & Dual-Mode Support',
      swaya: true,
      competitor: false,
      swayaNote: 'Native StashDB/FansDB integration',
      competitorNote: 'Requires unstable addons',
    },
    {
      feature: 'Rock-Solid Stability (No Broken Addons)',
      swaya: true,
      competitor: false,
      swayaNote: 'Self-contained, reliable architecture',
      competitorNote: 'Addons often break between major releases',
    },
    {
      feature: 'Dry-Run Collision Protection',
      swaya: true,
      competitor: false,
      swayaNote: 'Safe preview before moving files',
      competitorNote: 'Not applicable',
    },
    {
      feature: 'Torrent Client Integration (Seeding Mode)',
      swaya: true,
      competitor: false,
      swayaNote: 'Direct qBittorrent integration',
      competitorNote: 'Requires third-party scripts',
    },
  ],
  deepDives: [
    {
      title: 'Desktop First vs 10-Foot Couch Interface',
      description:
        'Kodi is designed for TV remotes on a couch, making mouse navigation and window multitasking awkward. SWAYA is crafted specifically for Windows desktop environments with fluid keyboard shortcuts and mouse interactions.',
    },
    {
      title: 'Physical File Organization on Disk',
      description:
        'Kodi expects you to manually format and rename your files before importing. SWAYA does the heavy lifting for you by scanning messy download folders, identifying titles via TMDb/StashDB, and renaming files directly on your hard drive.',
    },
    {
      title: 'Zero Addon Maintenance Headache',
      description:
        'Kodi users know the pain of addons breaking after software updates. SWAYA has all core features-scrapers, library curation, player, and finish tracking-built directly into the core application.',
    },
  ],
  faqs: [
    {
      q: 'Can I use SWAYA to prepare files for Kodi?',
      a: 'Yes! SWAYA organizes your folders and files into clean, industry-standard naming schemes that Kodi automatically recognizes without scraping errors.',
    },
    {
      q: 'Is SWAYA easier to use than Kodi?',
      a: 'Much easier. SWAYA requires zero addon installation, repository management, or complex XML skin tweaking-it works right out of the box.',
    },
  ],
};

export default kodiComparison;
