import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const BASE_URL = 'https://swaya.xyz';
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export const BUILD_DIR = path.resolve(__dirname, '../../build');
export const PUBLIC_DIR = path.resolve(__dirname, '../../public');
export const DOCS_BASE_DIR = path.resolve(__dirname, '../../src/site/docs');
export const DOCS_DIR = path.resolve(__dirname, '../../src/site/docs/en');

export const LOCALES = ['en', 'de', 'ja', 'hu', 'fr', 'es', 'zh', 'it', 'ru', 'pt', 'ko', 'nl', 'pl', 'zh-tw', 'sv', 'tr', 'cs'];

export const LANDING_LOCALES = {
  en: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/en/landing.json'), 'utf-8')),
  de: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/de/landing.json'), 'utf-8')),
  ja: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ja/landing.json'), 'utf-8')),
  hu: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/hu/landing.json'), 'utf-8')),
  fr: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/fr/landing.json'), 'utf-8')),
  es: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/es/landing.json'), 'utf-8')),
  zh: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/zh/landing.json'), 'utf-8')),
  it: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/it/landing.json'), 'utf-8')),
  ru: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ru/landing.json'), 'utf-8')),
  pt: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/pt/landing.json'), 'utf-8')),
  ko: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ko/landing.json'), 'utf-8')),
  nl: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/nl/landing.json'), 'utf-8')),
  pl: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/pl/landing.json'), 'utf-8')),
  'zh-tw': JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/zh-tw/landing.json'), 'utf-8')),
  sv: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/sv/landing.json'), 'utf-8')),
  tr: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/tr/landing.json'), 'utf-8')),
  cs: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/cs/landing.json'), 'utf-8')),
};

export const DOCS_LOCALES = {
  en: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/en/docs.json'), 'utf-8')),
  de: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/de/docs.json'), 'utf-8')),
  ja: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ja/docs.json'), 'utf-8')),
  hu: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/hu/docs.json'), 'utf-8')),
  fr: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/fr/docs.json'), 'utf-8')),
  es: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/es/docs.json'), 'utf-8')),
  zh: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/zh/docs.json'), 'utf-8')),
  it: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/it/docs.json'), 'utf-8')),
  ru: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ru/docs.json'), 'utf-8')),
  pt: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/pt/docs.json'), 'utf-8')),
  ko: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/ko/docs.json'), 'utf-8')),
  nl: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/nl/docs.json'), 'utf-8')),
  pl: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/pl/docs.json'), 'utf-8')),
  'zh-tw': JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/zh-tw/docs.json'), 'utf-8')),
  sv: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/sv/docs.json'), 'utf-8')),
  tr: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/tr/docs.json'), 'utf-8')),
  cs: JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/site/locales/cs/docs.json'), 'utf-8')),
};

export const SLUG_TO_FILE_MAP = {
  'getting-started': 'GETTING_STARTED.md',
  'organizer': 'ORGANIZER_FEATURE_GUIDE.md',
  'dashboard': 'DASHBOARD_FEATURE_GUIDE.md',
  'library': 'LIBRARY_FEATURE_GUIDE.md',
  'details': 'DETAILS_FEATURE_GUIDE.md',
  'player': 'PLAYER_FEATURE_GUIDE.md',
  'search': 'SEARCH_FEATURE_GUIDE.md',
  'lists': 'LISTS_FEATURE_GUIDE.md',
  'ratings': 'RATINGS_FEATURE_GUIDE.md',
  'history': 'HISTORY_FEATURE_GUIDE.md',
  'statistics': 'STATISTICS_FEATURE_GUIDE.md',
  'settings': 'SETTINGS_FEATURE_GUIDE.md',
  'torrent': 'TORRENT_FEATURE_GUIDE.md',
};

import { RELATED_DOCS_MAP } from '../../src/site/data/docRelations.js';
export { RELATED_DOCS_MAP };

export const DOC_METADATA = {
  'getting-started': {
    title: 'Introduction & Overview',
    description: 'Understand SWAYA architecture, offline storage, features, and core pillars.',
    category: 'Getting Started',
  },
  'organizer': {
    title: 'Smart File Organizer',
    description: 'Automated TMDb & StashDB matching, batch movie and episode renaming, and collision-safe folder routing.',
    category: 'Core Workflows',
  },
  'dashboard': {
    title: 'Dashboard & Discovery',
    description: 'Spotlight banner, continue watching, discovery feeds, and quick jump navigation.',
    category: 'Core Workflows',
  },
  'library': {
    title: 'Library & Media Catalog',
    description: 'Grid browsing, dual mode, advanced filtering, tags, and local hard drive vs. tracked status.',
    category: 'Core Workflows',
  },
  'details': {
    title: 'Detail Pages & Profiles',
    description: 'Hero artwork pickers, action buttons, TV season breakdowns, and artist filmographies.',
    category: 'Core Workflows',
  },
  'player': {
    title: 'Playback Engine',
    description: 'Hardware-accelerated 4K HDR playback engine powered by MPV, multi-track audio/subtitles, and instant resume.',
    category: 'Core Workflows',
  },
  'search': {
    title: 'Universal Search & Filter',
    description: 'Global multi-source search, real-time filters across movies, series, performers, and scenes.',
    category: 'Core Workflows',
  },
  'lists': {
    title: 'Custom Lists & Collections',
    description: 'Themed collections, 4-poster collage art, import/export, and playlist curation.',
    category: 'Library & Curation',
  },
  'ratings': {
    title: 'Ratings & Reviews',
    description: '10-star rating scale, markdown reviews, favorites, and tier ranking.',
    category: 'Library & Curation',
  },
  'history': {
    title: 'Watch History & Logs',
    description: 'Resume tracking, granular playback history, and device watch logs.',
    category: 'Library & Curation',
  },
  'statistics': {
    title: 'Library Analytics (DNA)',
    description: 'Storage charts, Library DNA genre breakdown, resolution stats, and timelines.',
    category: 'Library & Curation',
  },
  'settings': {
    title: 'Settings & Configuration',
    description: 'Folder naming templates, collision policies, themes, TMDb/StashDB API keys, and stealth hotkeys.',
    category: 'System & Automation',
  },
  'torrent': {
    title: 'Torrent Integration',
    description: 'Download monitoring, smart matching, library auto-import, and qBittorrent integration.',
    category: 'System & Automation',
  },
};

