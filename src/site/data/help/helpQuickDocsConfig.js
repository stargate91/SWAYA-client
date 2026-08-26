import { BookOpen, FolderSync, Film, Sliders, Download } from 'lucide-react';
import { getDocPath } from '../../lib/urlUtils.js';

export const HELP_QUICK_DOCS_CONFIG = [
  {
    slug: 'getting-started',
    titleKey: 'docs.items.getting-started.title',
    titleDefault: 'Introduction & Overview',
    icon: BookOpen,
  },
  {
    slug: 'organizer',
    titleKey: 'docs.items.organizer.title',
    titleDefault: 'Smart File Organizer',
    icon: FolderSync,
  },
  {
    slug: 'player',
    titleKey: 'docs.items.player.title',
    titleDefault: 'Playback Engine',
    icon: Film,
  },
  {
    slug: 'settings',
    titleKey: 'docs.items.settings.title',
    titleDefault: 'Settings & Configuration',
    icon: Sliders,
  },
  {
    slug: 'torrent',
    titleKey: 'docs.items.torrent.title',
    titleDefault: 'Torrent Integration',
    icon: Download,
  },
];

/**
 * Resolves localized quick documentation links for the help page.
 * @param {Function} t
 * @param {string} [prefix]
 * @returns {Array<object>}
 */
export function getHelpQuickDocs(t = (k, opts) => opts?.defaultValue || k, prefix = '') {
  return HELP_QUICK_DOCS_CONFIG.map((doc) => ({
    title: t(doc.titleKey, { defaultValue: doc.titleDefault }),
    slug: doc.slug,
    path: getDocPath(doc.slug, prefix),
    icon: doc.icon,
  }));
}
