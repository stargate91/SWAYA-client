export const en = {
  "sectionTitles": {
    "added": "New Features",
    "performance": "Performance & Architecture",
    "changed": "Improvements",
    "fixed": "Bug Fixes & Polish"
  },
  "releases": {
    "1.0.0": {
      "title": "Torrent Client Integration, Granular Reviews & Bespoke Series Architecture",
      "description": "Major workstation release introducing full external torrent client dashboards, global torrent search, ratings drawer, bespoke TV season navigation, and optimized batch SQL logs.",
      "highlights": [
        "External torrent client dashboard (qBittorrent & Transmission) with bandwidth counters",
        "Automated background torrent completion watcher with scan triggers",
        "Bespoke TV series episode breakdown and playback progression",
        "Unified media and adult discovery widgets across TMDb, StashDB, and FansDB",
        "Master-detail rename history with on-demand lazy log loading"
      ]
    },
    "0.7.0": {
      "title": "Hardware Video Acceleration & SQLite Filmography Caching",
      "description": "Performance and stability update featuring automatic NVENC/QSV GPU video previews, remote filmography caching, and dynamic backend port allocation.",
      "highlights": [
        "Hardware-accelerated FFmpeg video previews with NVENC/QSV/AMF detection",
        "Remote filmography caching for instant actor portfolio loading",
        "Dynamic TCP port allocation on backend startup eliminating port collisions"
      ]
    },
    "0.6.0": {
      "title": "Universal Multi-Source Search & Process Lifecycle Watcher",
      "description": "Expanded search capabilities across global databases and hardened backend process management.",
      "highlights": [
        "Unified global search across movies, scenes, performers, and studios",
        "Parent process monitor preventing orphaned background tasks"
      ]
    }
  }
};
