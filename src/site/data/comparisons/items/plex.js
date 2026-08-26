export const plexComparison = {
  slug: 'plex',
  name: 'Plex',
  category: 'Media Servers',
  shortCategory: 'Media Server',
  badge: 'Swaya vs Plex',
  title: 'SWAYA vs Plex: True 100% Offline Media Workstation',
  metaTitle: 'Plex Alternative for Windows (No Server Needed) - SWAYA',
  metaDescription:
    'Need a private, offline Plex alternative with no server setup? SWAYA organizes files on your hard drive, plays 4K HDR via MPV, and requires zero cloud accounts.',
  heroTagline: 'Your personal media collection without servers, cloud accounts, or telemetry.',
  heroSubtitle:
    'Plex is designed for streaming over home networks, but requires always-on server daemons, cloud accounts, and Plex Pass subscriptions. SWAYA gives you a zero-config, 100% offline desktop experience directly on your PC.',
  competitorPricing: 'Free / $4.99/mo / $119 lifetime (Plex Pass)',
  swayaPricing: '€39 launch lifetime (€79 regular)',
  whenToChooseCompetitor: [
    'You want to stream your media to Smart TVs, phones, and remote family members outside your home.',
    'You run a dedicated NAS or home server with multi-user transcode capabilities.',
    'You need remote multi-device sync across iOS, Android, and Apple TV.',
  ],
  whenToChooseSwaya: [
    'You watch movies and series directly on your Windows PC, laptop, or connected monitor/TV.',
    'You want 100% privacy: zero cloud accounts, zero telemetry, and zero open network ports.',
    'You want physical files on your hard drives renamed and organized cleanly.',
    'You hate server setup, background daemon overhead, and transcoding glitches.',
  ],
  matrix: [
    {
      feature: '100% Offline & Zero Server Setup',
      swaya: true,
      competitor: false,
      swayaNote: 'Instant desktop app, no server daemon',
      competitorNote: 'Requires Plex Media Server backend',
    },
    {
      feature: 'Physical Disk File Renaming & Organization',
      swaya: true,
      competitor: false,
      swayaNote: 'Renames actual files on disk',
      competitorNote: 'Virtual database only; does not rename disk files',
    },
    {
      feature: 'Zero Cloud Accounts / Total Privacy',
      swaya: true,
      competitor: false,
      swayaNote: 'No login, no cloud telemetry, local DB',
      competitorNote: 'Requires Plex online authentication & telemetry',
    },
    {
      feature: 'Native MPV Player (No Transcoding Needed)',
      swaya: true,
      competitor: 'Partial',
      swayaNote: 'Plays any codec/container directly at 4K HDR',
      competitorNote: 'Often transcodes audio/video on playback',
    },
    {
      feature: 'Adult Media (StashDB) Scraper & Dual Mode',
      swaya: true,
      competitor: false,
      swayaNote: 'Dedicated adult mode & StashDB/FansDB',
      competitorNote: 'Requires broken third-party plugins',
    },
    {
      feature: 'Interactive Dry-Run Batch Organizer',
      swaya: true,
      competitor: false,
      swayaNote: 'Review, edit, match before renaming',
      competitorNote: 'Passive folder scanning only',
    },
    {
      feature: 'Torrent Client Integration (In-Place Import)',
      swaya: true,
      competitor: false,
      swayaNote: 'qBittorrent/Transmission integration',
      competitorNote: 'Not supported natively',
    },
    {
      feature: 'One-Time Lifetime Price (No Monthly Fee)',
      swaya: true,
      competitor: 'Partial',
      swayaNote: '€39 launch special one-time',
      competitorNote: '$119 Plex Pass lifetime or $4.99/mo',
    },
    {
      feature: 'Frame-Accurate Finish Moment Bookmarks',
      swaya: true,
      competitor: false,
      swayaNote: 'One-key screenshot & timestamp tagging',
      competitorNote: 'Not available',
    },
    {
      feature: 'Zero Background CPU / Memory Overhead',
      swaya: true,
      competitor: false,
      swayaNote: 'Zero resources when app is closed',
      competitorNote: 'Server daemon runs continuously',
    },
  ],
  deepDives: [
    {
      title: 'Zero Server Overhead, Zero Port Forwarding',
      description:
        'Plex requires setting up Plex Media Server, configuring port forwarding, handling NAT traversal, and dealing with online Plex account outages. SWAYA is a standalone desktop workstation that boots in 1 second and never touches the network without your command.',
    },
    {
      title: 'Actual Disk Organization vs Virtual Libraries',
      description:
        'Plex only maps virtual metadata over messy folders. If you open Windows Explorer, your files remain chaotic. SWAYA cleans, renames, and structures the actual physical files and folders on your storage drives.',
    },
    {
      title: 'Native MPV vs Transcoding Frustration',
      description:
        'Tired of Plex transcoding 4K HDR videos or failing to render PGS/ASS subtitles? SWAYA embeds an optimized native MPV engine that plays any video codec, audio track, or complex subtitle with flawless hardware acceleration.',
    },
  ],
  faqs: [
    {
      q: 'Can I use SWAYA without an internet connection?',
      a: 'Yes! SWAYA works 100% offline. Once metadata and posters are fetched (or for home videos requiring no online match), SWAYA never needs an active internet connection to browse, search, or play your media.',
    },
    {
      q: 'Does SWAYA stream to my phone or Smart TV like Plex?',
      a: 'SWAYA is built specifically as a high-performance personal desktop workstation for your PC or laptop. It does not run a streaming server for remote mobile or Smart TV devices.',
    },
    {
      q: 'Does SWAYA collect viewing telemetry or require a login?',
      a: 'No. SWAYA requires zero accounts, zero cloud logins, and transmits zero viewing history. All your library databases and watch logs remain strictly on your local computer.',
    },
  ],
};

export default plexComparison;
