export const v0_7_0 = {
  version: '0.7.0',
  date: '2026-08-12',
  isLatest: false,
  title: 'Hardware Video Acceleration & SQLite Filmography Caching',
  description: 'Performance and stability update featuring automatic NVENC/QSV GPU video previews, remote filmography caching, and dynamic backend port allocation.',
  highlights: [
    'Hardware-accelerated FFmpeg video previews with NVENC/QSV/AMF detection',
    'Remote filmography caching for instant actor portfolio loading',
    'Dynamic TCP port allocation on backend startup eliminating port collisions',
  ],
  sections: [
    {
      type: 'added',
      title: 'New Features',
      items: [
        'GPU Hardware Acceleration: Automatic FFmpeg encoder detection for NVENC, QSV, and AMF.',
        'Remote Filmography Cache: Local SQLite cache for remote TMDb performer credits.',
        'Dynamic Port Allocation: Automatic TCP port discovery on backend boot.',
        'Recently Followed Studios Widget: Dashboard carousel tracking favorite studio releases.',
      ],
    },
    {
      type: 'changed',
      title: 'Improvements',
      items: [
        'Unified Known For credit cards on performer profiles with PosterCard component.',
        'Streamlined video playback end overlay with simplified rating and analytics dashboard.',
        'Replaced Unicode country flags with high-quality SVG flag badges.',
      ],
    },
    {
      type: 'fixed',
      title: 'Bug Fixes',
      items: [
        'Resolved React state lifecycle warning in metadata override modals.',
        'Fixed library monitoring cleanups to deactivate watch hooks for missing paths.',
        'Fixed play button triggers in studio grids for in-progress TV episodes.',
      ],
    },
  ],
};
