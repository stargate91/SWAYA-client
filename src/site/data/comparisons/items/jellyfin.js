export const jellyfinComparison = {
  slug: 'jellyfin',
  name: 'Jellyfin',
  category: 'Media Servers',
  shortCategory: 'Streaming Server',
  badge: 'Swaya vs Jellyfin',
  title: 'SWAYA vs Jellyfin: Zero-Setup Desktop Workstation',
  metaTitle: 'Jellyfin Alternative for Windows (No Server) - SWAYA',
  metaDescription:
    'Want a desktop media center without Docker or server maintenance? SWAYA organizes disk files and plays 4K HDR via native MPV with zero network setup.',
  heroTagline: 'Enjoy your hard drive collections without Docker containers or server configurations.',
  heroSubtitle:
    'Jellyfin is an excellent self-hosted media server for network streaming. But if you just want to manage and watch media on your Windows PC, SWAYA provides a zero-config, physical disk organizer and native MPV player.',
  competitorPricing: 'Free / Open Source (FOSS)',
  swayaPricing: '€39 launch lifetime (€79 regular)',
  whenToChooseCompetitor: [
    'You have a dedicated home server (Ubuntu/Docker/TrueNAS) and want to stream across multiple TV/mobile devices.',
    'You require multi-user accounts and parental controls across a home network.',
    'You are committed to 100% Free and Open Source software.',
  ],
  whenToChooseSwaya: [
    'You want a plug-and-play desktop app without configuring daemons, ports, or Docker containers.',
    'You want your physical files organized and renamed on your storage drives.',
    'You want instant, native 4K HDR MPV playback without server transcode delays.',
    'You want integrated adult media (StashDB) support alongside mainstream movies and shows.',
  ],
  matrix: [
    {
      feature: 'Zero Setup & Zero Server Maintenance',
      swaya: true,
      competitor: false,
      swayaNote: 'Launches instantly, no background daemon',
      competitorNote: 'Requires server installation & maintenance',
    },
    {
      feature: 'Physical Disk File Renaming & Organization',
      swaya: true,
      competitor: false,
      swayaNote: 'Renames & organizes actual files on disk',
      competitorNote: 'Read-only virtual library',
    },
    {
      feature: 'Native MPV Player (Hardware Accelerated)',
      swaya: true,
      competitor: 'Partial',
      swayaNote: 'Direct MPV engine built-in',
      competitorNote: 'Web/electron client wrapper',
    },
    {
      feature: 'Adult Media (StashDB) & Dual-Mode Support',
      swaya: true,
      competitor: false,
      swayaNote: 'Native StashDB/FansDB integration',
      competitorNote: 'Requires community plugins',
    },
    {
      feature: '100% Offline with Zero Network Ports',
      swaya: true,
      competitor: false,
      swayaNote: 'No open ports, 100% local operation',
      competitorNote: 'Requires local network server',
    },
    {
      feature: 'Interactive Dry-Run Batch Organizer',
      swaya: true,
      competitor: false,
      swayaNote: 'Full override, match & collision protection',
      competitorNote: 'Folder watching only',
    },
    {
      feature: 'Torrent Client Integration (Seeding Mode)',
      swaya: true,
      competitor: false,
      swayaNote: 'Direct qBittorrent integration',
      competitorNote: 'Not supported',
    },
    {
      feature: 'Finish Moment & Bookmark Tracking',
      swaya: true,
      competitor: false,
      swayaNote: 'One-key screenshot & bookmarking',
      competitorNote: 'Not available',
    },
  ],
  deepDives: [
    {
      title: 'Zero Server Setup vs Complex Configuration',
      description:
        'Setting up Jellyfin requires installing server binaries, configuring network ports, and managing background daemons. SWAYA is a single, self-contained desktop app that works immediately.',
    },
    {
      title: 'Physical File Organization on Your Drives',
      description:
        'Jellyfin relies on you manually organizing files before scanning. SWAYA actively sorts your messy download folders, renaming files and creating structured directories on your disk.',
    },
    {
      title: 'Native MPV Performance',
      description:
        'Enjoy instant seeking, flawless subtitle rendering, and zero-stutter 4K HDR video playback directly through SWAYA\'s integrated MPV playback engine.',
    },
  ],
  faqs: [
    {
      q: 'Can I use SWAYA together with Jellyfin?',
      a: 'Yes! You can use SWAYA to organize, rename, and clean up your physical disk folders according to standard naming conventions, which Jellyfin can then easily read for network streaming.',
    },
    {
      q: 'Does SWAYA use system resources in the background?',
      a: 'No. When you close SWAYA, no background services or server daemons remain running.',
    },
  ],
};

export default jellyfinComparison;
