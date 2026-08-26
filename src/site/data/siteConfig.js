export const STRIPE_CHECKOUT_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STRIPE_CHECKOUT_URL) ||
  'https://buy.stripe.com/aFaaEXaIOb64dhT4YmcjS00';
export const DISCORD_INVITE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DISCORD_INVITE_URL) ||
  'https://discord.gg/g34ZcJScj';
export const DEV_EMAIL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_DEV_EMAIL) ||
  'levicore@proton.me';
export const TWITTER_HANDLE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TWITTER_HANDLE) ||
  '@swaya_official';
export const GITHUB_REPO_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GITHUB_REPO_URL) ||
  'https://github.com/zsakfoso/SWAYA';
export const TWITTER_PROFILE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TWITTER_PROFILE_URL) ||
  'https://x.com/swaya_official';
export const INSTAGRAM_PROFILE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INSTAGRAM_PROFILE_URL) ||
  'https://www.instagram.com/swayaxyz';

export const LATEST_SOFTWARE_VERSION =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_VERSION) ||
  '1.0.0';

export const DEFAULT_SAME_AS = [
  DISCORD_INVITE_URL,
  GITHUB_REPO_URL,
  TWITTER_PROFILE_URL,
  INSTAGRAM_PROFILE_URL,
];

export {
  SUPPORTED_LANGUAGES,
  VALID_LOCALES,
  SUPPORTED_LOCALES,
  LANGUAGE_OPTIONS,
  OG_LOCALE_MAP,
} from './localesConfig.js';


export const FEATURED_DOC_SLUGS = [
  'getting-started',
  'organizer',
  'dashboard',
  'player',
  'settings',
];

export const FEATURED_COMPARISONS = [
  { slug: 'filebot', label: 'vs FileBot' },
  { slug: 'plex', label: 'vs Plex' },
  { slug: 'tinymediamanager', label: 'vs tinyMediaManager' },
  { slug: 'stash', label: 'vs StashApp' },
  { slug: 'jellyfin', label: 'vs Jellyfin' },
  { slug: 'kodi', label: 'vs Kodi' },
];
