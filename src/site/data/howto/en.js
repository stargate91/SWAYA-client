export const en = {
  'getting-started': {
    name: 'How to Set Up & Get Started with SWAYA Offline Media Center',
    description: 'Quick walkthrough to install SWAYA on Windows, configure storage directories, and build your offline media library.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Download & Launch SWAYA',
        text: 'Install the SWAYA desktop application on Windows 10 or 11.',
      },
      {
        name: 'Configure Storage Directories',
        text: 'Set your incoming downloads folder and target library directories in Settings.',
      },
      {
        name: 'Scan & Match Media',
        text: 'Open the Organizer to batch scan video files and fetch rich metadata and artwork.',
      },
    ],
  },
  'organizer': {
    name: 'How to Automatically Batch Rename and Organize Media Files on Disk',
    description: 'Learn how to automatically match metadata with TMDb/StashDB and batch rename media files into collision-safe folder structures.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Select Incoming Media Folder',
        text: 'Open SWAYA Organizer and choose the folder containing unsorted downloads or raw video files.',
      },
      {
        name: 'Run Automated Metadata Scraping',
        text: 'Trigger automated matching against TMDb, OMDb, and StashDB to identify movie and TV titles.',
      },
      {
        name: 'Fine-Tune with Match & Override',
        text: 'Use the Match and Override dialogs to adjust titles, edition tags, or season/episode numbers if needed.',
      },
      {
        name: 'Execute Batch Rename or Import In-Place',
        text: 'Click Rename to move files into clean Plex/Jellyfin folders, or use Organize In-Place to keep disk paths untouched.',
      },
    ],
  },
  'dashboard': {
    name: 'How to Navigate Discovery Feeds and Continue Watching on the Dashboard',
    description: 'Resume unfinished videos with exact timestamp sync and explore curated discovery feeds.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Resume from Continue Watching',
        text: 'Click on any in-progress title in the Continue Watching shelf to resume playback from the exact saved timestamp.',
      },
      {
        name: 'Explore Spotlight & Curated Feeds',
        text: 'Browse the spotlight banner, recently organized titles, top-rated movies, and studio spotlights.',
      },
    ],
  },
  'library': {
    name: 'How to Browse and Filter Your Media Catalog in SWAYA',
    description: 'Explore your media collection using multi-criteria filters, tags, performer profiles, and custom views.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Switch View Modes',
        text: 'Toggle between Grid, Table, and Studio/Performer browsing modes in the Library toolbar.',
      },
      {
        name: 'Apply Multi-Criteria Filters',
        text: 'Filter by 4K HDR resolution, genres, tags, or local disk storage status.',
      },
      {
        name: 'Use Quick Actions',
        text: 'Right-click any card or table row to play, rate, add to list, or view technical stream specifications.',
      },
    ],
  },
  'details': {
    name: 'How to Customize Media Artwork and TV Season Navigation in SWAYA',
    description: 'Inspect technical stream specs, pick alternative 4K posters and backdrops, and navigate TV show episodes.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Inspect Technical Media Specs',
        text: 'Open any media profile to view video codecs, bitrates, audio channels, release dates, and cast lists.',
      },
      {
        name: 'Pick Custom Posters & Backdrops',
        text: 'Open the visual artwork picker to choose high-resolution 4K posters and backdrop images from online scrapers.',
      },
      {
        name: 'Navigate TV Seasons & Episodes',
        text: 'Browse season breakdowns with dedicated episode cards, descriptions, and watch progress indicators.',
      },
    ],
  },
  'player': {
    name: 'How to Play 4K HDR Media with the MPV Engine in SWAYA',
    description: 'Play local media files with GPU-accelerated MPV playback, instant subtitle toggling, and multi-track audio switching.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Launch Hardware-Accelerated Player',
        text: 'Open any movie, episode, or scene to start instant MPV playback with zero server transcoding.',
      },
      {
        name: 'Switch Audio & Subtitles',
        text: 'Switch between multi-language audio streams and adjust subtitle delay in real time.',
      },
      {
        name: 'Use External Players',
        text: 'Optionally launch VLC or MPC-HC directly from the player context menu if preferred.',
      },
    ],
  },
  'search': {
    name: 'How to Use Universal Multi-Source Search in SWAYA',
    description: 'Perform instant global searches across movies, series, performers, and studio labels.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Open Global Search',
        text: 'Press Ctrl+K or click the search input in the navigation bar from any screen.',
      },
      {
        name: 'Search Across Libraries & Scrapers',
        text: 'Query movie titles, TV series, performer names, or studio labels with real-time grouping.',
      },
      {
        name: 'Apply Instant Filters',
        text: 'Narrow results by media category, resolution, release year, or tag.',
      },
    ],
  },
  'lists': {
    name: 'How to Create Themed Collections with 4-Poster Collage Artwork',
    description: 'Create custom playlists, curate movie collections, and automatically generate 4-poster collage art covers.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Create a New Collection',
        text: 'Open Lists and define the collection title, description, and custom ordering.',
      },
      {
        name: 'Add Media Titles',
        text: 'Append movies, series, or video scenes from any library card or detail profile.',
      },
      {
        name: 'Auto-Generate Collage Cover',
        text: 'SWAYA automatically creates a 4-poster mosaic cover from the items in the collection.',
      },
    ],
  },
  'ratings': {
    name: 'How to Rate Media and Write Private Markdown Reviews in SWAYA',
    description: 'Assign 10-star precision ratings, record private markdown notes, and bookmark favorite media titles.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Rate on 10-Star Scale',
        text: 'Assign half-star precision ratings to movies, series, and individual scenes.',
      },
      {
        name: 'Write Private Markdown Reviews',
        text: 'Record personal notes, critiques, and tags stored 100% locally on your machine.',
      },
      {
        name: 'Filter by Ratings & Favorites',
        text: 'Filter your library by star tiers or view your bookmarked favorite titles.',
      },
    ],
  },
  'history': {
    name: 'How to Track and Manage Watch History in SWAYA',
    description: 'Monitor chronologically logged playback sessions, resume timestamps, and watch logs.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'Open Watch History Log',
        text: 'Review chronologically ordered playback events with timestamps and completion percentages.',
      },
      {
        name: 'Resume Incomplete Titles',
        text: 'Click on any unfinished session to resume playback from the exact saved position.',
      },
      {
        name: 'Filter or Clear Playback Logs',
        text: 'Filter history by date range or remove individual playback records.',
      },
    ],
  },
  'statistics': {
    name: 'How to Inspect Storage Analytics and Library DNA in SWAYA',
    description: 'Analyze hard drive storage capacity, video codec breakdowns, and Library DNA genre distributions.',
    totalTime: 'PT2M',
    steps: [
      {
        name: 'View Storage Usage by Codec & Resolution',
        text: 'Check total disk space consumed across 4K UHD, 1080p FHD, HEVC, and AV1 video codecs.',
      },
      {
        name: 'Explore Library DNA Distributions',
        text: 'Inspect interactive charts displaying genre density, release decade timelines, and top performer stats.',
      },
    ],
  },
  'settings': {
    name: 'How to Configure File Naming Templates and Scraper Keys in SWAYA',
    description: 'Customize folder naming tokens, configure scraper API keys, and activate 1-click stealth mode.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Set Library Root Folders',
        text: 'Choose destination directories for mainstream movies, TV series, and private adult media.',
      },
      {
        name: 'Select Naming Presets & Templates',
        text: 'Configure Plex and Jellyfin folder structures with dynamic tokens like {title} ({year}).',
      },
      {
        name: 'Enter Scraper API Keys',
        text: 'Input TMDb or StashDB API keys for high-speed, unrestricted metadata matching.',
      },
      {
        name: 'Configure Stealth Vault Mode',
        text: 'Assign a quick keyboard shortcut to immediately conceal sensitive media libraries.',
      },
    ],
  },
  'torrent': {
    name: 'How to Integrate Torrent Clients with Auto-Matching in SWAYA',
    description: 'Connect qBittorrent, monitor active downloads in real time, and auto-import completed files into your library.',
    totalTime: 'PT3M',
    steps: [
      {
        name: 'Enable Torrent Integration',
        text: 'Enter your qBittorrent WebUI host, port, and authentication credentials in Settings.',
      },
      {
        name: 'Monitor Active Downloads',
        text: 'Track real-time transfer speeds, remaining time, and progress directly in SWAYA.',
      },
      {
        name: 'Auto-Match Completed Torrents',
        text: 'Automatically scrape metadata for finished downloads and move them into organized library folders.',
      },
    ],
  },
};
