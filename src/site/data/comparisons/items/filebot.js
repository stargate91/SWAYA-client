export const filebotComparison = {
  slug: 'filebot',
  name: 'FileBot',
  category: 'File Renamers',
  shortCategory: 'Renamer',
  badge: 'Swaya vs FileBot',
  title: 'SWAYA vs FileBot: Modern Desktop Media Center & Renamer',
  metaTitle: 'FileBot Alternative for Windows - SWAYA Batch Renamer & Player',
  metaDescription:
    'Looking for a modern FileBot alternative? SWAYA renames files on disk with TMDb & StashDB, plus provides a full offline media library and 4K MPV player.',
  heroTagline: 'Why just rename your files when you can organize and play your entire collection?',
  heroSubtitle:
    'FileBot is great for renaming files, but SWAYA takes your local media to the next level: disk organization, beautiful offline library browsing, and a built-in 4K HDR MPV player in one modern desktop app.',
  competitorPricing: '$6/year or $48 lifetime',
  swayaPricing: '€39 launch lifetime (€79 regular)',
  whenToChooseCompetitor: [
    'You only need a lightweight command-line (CLI) tool for headless Linux or NAS scripts.',
    'You write custom Groovy renaming expressions and automated scripting hooks.',
    'You already use a separate media center (like Plex or Kodi) and never want an integrated player.',
  ],
  whenToChooseSwaya: [
    'You want an all-in-one desktop solution: rename files on disk AND instantly browse/play your library.',
    'You manage both mainstream movies/shows (TMDb) and adult scenes (StashDB, FansDB, ThePornDB).',
    'You want a built-in hardware-accelerated MPV player with frame-accurate resume and zero transcoding.',
    'You prefer a sleek, modern desktop interface with safe dry-run collision protection.',
  ],
  matrix: [
    {
      feature: 'Physical File Renaming on Disk',
      swaya: true,
      competitor: true,
      swayaNote: 'TMDb, ThePornDB, StashDB, FansDB',
      competitorNote: 'TheMovieDB, TVmaze, AniDB',
    },
    {
      feature: 'Dry-Run Preview & Collision Safety',
      swaya: true,
      competitor: true,
      swayaNote: 'Smart collision detection & replacement',
      competitorNote: 'Preview list',
    },
    {
      feature: 'Built-in 4K/HDR MPV Video Player',
      swaya: true,
      competitor: false,
      swayaNote: 'Hardware accelerated, subtitle & audio sync',
      competitorNote: 'No player built-in',
    },
    {
      feature: 'Visual Offline Media Library & Detail Pages',
      swaya: true,
      competitor: false,
      swayaNote: 'Posters, backdrops, cast, genres, ratings',
      competitorNote: 'No media library UI',
    },
    {
      feature: 'Adult Media & StashDB Scraper Support',
      swaya: true,
      competitor: false,
      swayaNote: 'Native StashDB, FansDB & performer index',
      competitorNote: 'Mainstream databases only',
    },
    {
      feature: 'Dual Mode (SFW / NSFW) with PIN Lock',
      swaya: true,
      competitor: false,
      swayaNote: 'Complete database isolation & locking',
      competitorNote: 'Not available',
    },
    {
      feature: 'Torrent Client Auto-Import (qBittorrent)',
      swaya: true,
      competitor: 'Partial',
      swayaNote: 'Built-in integration & in-place seeding',
      competitorNote: 'Via custom CLI scripts',
    },
    {
      feature: '100% Offline & Serverless (Zero Daemons)',
      swaya: true,
      competitor: true,
      swayaNote: 'Zero background services or ports',
      competitorNote: 'Local Java application',
    },
    {
      feature: 'Modern Windows Desktop UI (No Java Runtime)',
      swaya: true,
      competitor: false,
      swayaNote: 'Native desktop application',
      competitorNote: 'Java / Swing interface',
    },
    {
      feature: 'One-Time Lifetime License Available',
      swaya: true,
      competitor: true,
      swayaNote: '€39 launch / €79 lifetime',
      competitorNote: '$48 lifetime or $6/year',
    },
  ],
  deepDives: [
    {
      title: 'Beyond Just Renaming: An Entire Media Universe',
      description:
        'FileBot stops once files are renamed on disk. SWAYA seamlessly transitions your renamed files into a rich, visual media library with posters, cast bios, episode summaries, and custom watchlist filters.',
    },
    {
      title: 'Built-in 4K HDR MPV Player',
      description:
        'No need to launch third-party players or configure external apps. Click any video in SWAYA to immediately play high-bitrate MKV, HDR, Dolby Atmos, and multi-track subtitles with instant hardware acceleration.',
    },
    {
      title: 'Mainstream & Adult Media in One Place',
      description:
        'SWAYA is the first media workstation with dedicated Dual-Mode architecture. Seamlessly manage mainstream blockbusters via TMDb and adult scenes via StashDB, kept isolated behind an optional PIN lock.',
    },
  ],
  faqs: [
    {
      q: 'Can SWAYA replace FileBot for batch renaming TV shows and movies?',
      a: 'Yes. SWAYA scans your download folders, matches titles against TMDb, allows interactive override/episodes matching, and physically renames or moves files according to your custom folder structure.',
    },
    {
      q: 'Does SWAYA support seeding torrents while organizing?',
      a: 'Yes. SWAYA offers "Import In-Place" mode, which pulls all metadata, posters, and cast into your library while leaving physical disk filenames and folder structures untouched for active seeding.',
    },
    {
      q: 'Do I need Java installed to run SWAYA?',
      a: 'No. SWAYA is a standalone, native desktop application that does not require Java or external runtime dependencies.',
    },
  ],
};

export default filebotComparison;
