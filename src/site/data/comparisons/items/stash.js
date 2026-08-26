export const stashComparison = {
  slug: 'stash',
  name: 'Stash (StashApp)',
  category: 'Adult Organizers',
  shortCategory: 'Adult Media Organizer',
  badge: 'Swaya vs StashApp',
  title: 'SWAYA vs StashApp: Native Desktop Media Workstation',
  metaTitle: 'StashApp Alternative for Windows - SWAYA Desktop Organizer',
  metaDescription:
    'Looking for a native Windows alternative to StashApp? SWAYA combines StashDB scraping, physical file renaming, and an integrated MPV player with zero server setup.',
  heroTagline: 'The ultimate private media workstation without localhost web servers or Docker.',
  heroSubtitle:
    'Stash is a great open-source adult media server, but runs as a local web daemon in your browser. SWAYA is a native Windows desktop app that handles both mainstream TMDb and adult StashDB media with a built-in MPV player.',
  competitorPricing: 'Free / Open Source',
  swayaPricing: '€39 launch lifetime (€79 regular)',
  whenToChooseCompetitor: [
    'You run a headless Linux server or Docker container for multi-client web access.',
    'You use specialized community plugins or scrapers from obscure sites.',
    'You want a community-maintained 100% open-source web application.',
  ],
  whenToChooseSwaya: [
    'You want a clean, single desktop application without running a background web server (`localhost:9999`).',
    'You want both mainstream movies/shows (TMDb) and adult scenes (StashDB) in one unified app.',
    'You want physical disk file renaming and folder structuring with collision protection.',
    'You want a native hardware-accelerated MPV player that handles heavy 4K 60fps/VR codecs without browser player lag.',
  ],
  matrix: [
    {
      feature: 'Native Desktop App (No Localhost Web Server)',
      swaya: true,
      competitor: false,
      swayaNote: 'Single executable, zero background daemons',
      competitorNote: 'Runs Go web server on localhost:9999',
    },
    {
      feature: 'Physical Disk Renaming & Folder Organizing',
      swaya: true,
      competitor: false,
      swayaNote: 'Renames & moves physical files on disk',
      competitorNote: 'Keeps files as-is in watched folders',
    },
    {
      feature: 'Dual Mode: Mainstream (TMDb) + Adult (StashDB)',
      swaya: true,
      competitor: false,
      swayaNote: 'Switch between SFW & NSFW libraries instantly',
      competitorNote: 'Adult media only',
    },
    {
      feature: 'Native Hardware-Accelerated 4K MPV Player',
      swaya: true,
      competitor: false,
      swayaNote: 'Plays any video/audio codec with zero stutter',
      competitorNote: 'Browser HTML5 player (codec limitations)',
    },
    {
      feature: 'Interactive Match & Bulk Override Modals',
      swaya: true,
      competitor: true,
      swayaNote: 'Safe dry-run table with batch actions',
      competitorNote: 'Tagger interface',
    },
    {
      feature: 'Performer Profiles, Studio Labels & Tags',
      swaya: true,
      competitor: true,
      swayaNote: 'Rich performer details & galleries',
      competitorNote: 'Detailed performer database',
    },
    {
      feature: 'Finish Moment Tracking & Screenshot Pins',
      swaya: true,
      competitor: true,
      swayaNote: 'One-key Enter shortcut, gallery & timeline',
      competitorNote: 'Markers & O-meter',
    },
    {
      feature: 'PIN-Protected Privacy Lock',
      swaya: true,
      competitor: 'Partial',
      swayaNote: 'Instant lock shortcut & hidden adult database',
      competitorNote: 'Basic authentication plugin',
    },
    {
      feature: 'Torrent Client Integration (qBittorrent)',
      swaya: true,
      competitor: false,
      swayaNote: 'Direct sync & seeding support',
      competitorNote: 'Requires third-party scripts',
    },
  ],
  deepDives: [
    {
      title: 'Native MPV Player vs Browser Codec Limits',
      description:
        'Stash plays media through your web browser using HTML5 video tags, which struggle with HEVC/H.265 10-bit, high-bitrate 4K, or non-standard audio formats unless transcoded. SWAYA embeds an optimized MPV player that effortlessly plays any format with zero CPU strain.',
    },
    {
      title: 'Unified Mainstream & Adult Media Library',
      description:
        'Why maintain multiple disjointed apps for your movies and adult scenes? SWAYA gives you a seamless toggle between Mainstream (TMDb) and Adult (StashDB, FansDB, ThePornDB) modes with total database isolation.',
    },
    {
      title: 'Physical Disk Organizing on Your Storage Drives',
      description:
        'Unlike Stash, which only indexes files inside a database while leaving your actual storage drive a disorganized mess, SWAYA renames and structures your physical files according to clean studio and performer templates.',
    },
  ],
  faqs: [
    {
      q: 'Can SWAYA scrape from StashDB directly?',
      a: 'Yes! Simply enter your StashDB API key in Settings > Scrapers, and SWAYA will automatically match titles, performers, studios, release dates, and high-resolution cover art.',
    },
    {
      q: 'How does SWAYA protect adult media privacy?',
      a: 'SWAYA includes a dedicated PIN lock feature. When locked, adult media is completely hidden, requiring your PIN to access.',
    },
  ],
};

export default stashComparison;
