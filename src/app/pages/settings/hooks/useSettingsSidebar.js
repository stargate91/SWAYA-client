import { useState, useMemo } from 'react';
import { SETTINGS_TAB_IDS } from '../config';
import {
  Settings2,
  Palette,
  FolderTree,
  Layers,
  Flame,
  KeyRound,
  Cpu,
  Wrench,
  Clapperboard,
  Download,
  Play,
} from '@/ui/icons';

const TAB_SEARCH_KEYWORDS = {
  [SETTINGS_TAB_IDS.GENERAL]: [
    'general', 'profile', 'nickname', 'avatar', 'picture', 'photo', 'image', 'user',
    'language', 'interface', 'close', 'behavior', 'tray', 'window', 'library', 'scan',
    'incoming', 'path', 'folder', 'directory', 'storage', 'hdd', 'source', 'target', 'dest', 'destination',
    'általános', 'profil', 'kép', 'nyelv', 'mappa', 'mentés'
  ],
  [SETTINGS_TAB_IDS.THEME]: [
    'theme', 'dark', 'color', 'look', 'style', 'appearance', 'palette', 'skin', 'ui', 'design',
    'mode', 'amoled', 'dracula', 'tokyo', 'matrix', 'cyberpunk', 'nord', 'rose', 'pine',
    'téma', 'szín', 'kinézet', 'stílus', 'megjelenés'
  ],
  [SETTINGS_TAB_IDS.PLAYER]: [
    'player', 'vlc', 'mpc', 'audio', 'sound', 'dub', 'voice', 'track', 'subtitle', 'sub',
    'caption', 'srt', 'language', 'playback', 'video', 'stream',
    'lejátszó', 'hang', 'felirat', 'nyelv', 'videó'
  ],
  [SETTINGS_TAB_IDS.ADULT_GENERAL]: [
    'adult', 'nsfw', 'safety', 'blacklist', 'block', 'filter', 'gender', '18+', 'xxx', 'porn',
    'stashdb', 'fansdb', 'theporndb', 'safety filters', 'adult library',
    'felnőtt', 'biztonság', 'tiltás', 'szűrő', 'feketalista'
  ],
  [SETTINGS_TAB_IDS.API_KEYS]: [
    'api', 'key', 'token', 'bearer', 'tmdb', 'omdb', 'themoviedb', 'scraper', 'metadata',
    'credentials', 'online', 'database', 'kulcs', 'adatbázis', 'metaadat'
  ],
  [SETTINGS_TAB_IDS.TORRENT]: [
    'torrent', 'qbittorrent', 'jackett', 'download', 'indexer', 'tracker', 'port', 'seed',
    'peer', 'p2p', 'bandwidth', 'webui', 'letöltés', 'megosztás'
  ],
  [SETTINGS_TAB_IDS.ADVANCED]: [
    'advanced', 'size', 'filesize', 'duration', 'length', 'time', 'limit', 'threshold',
    'rules', 'sample', 'trailer', 'extra', 'haladó', 'méret', 'hossz', 'szabályok'
  ],
  [SETTINGS_TAB_IDS.MAINTENANCE]: [
    'maintenance', 'backup', 'export', 'import', 'restore', 'save', 'json', 'wipe', 'delete',
    'clean', 'trash', 'clear', 'cache', 'database', 'db', 'reset', 'default', 'factory',
    'karbantartás', 'mentés', 'visszaállítás', 'törlés', 'gyári', 'alapértelmezett'
  ],
  [SETTINGS_TAB_IDS.PRESETS]: [
    'presets', 'plex', 'jellyfin', 'emby', 'kodi', 'minimal', 'structure', 'layout',
    'template', 'preset', 'sablon', 'struktúra', 'elrendezés'
  ],
  [SETTINGS_TAB_IDS.ORG_GENERAL]: [
    'organization', 'organize', 'casing', 'separator', 'folder', 'subfolder', 'directory',
    'path', 'structure', 'sort', 'destination', 'naming', 'rename', 'collision', 'duplicate',
    'replace', 'cleanup', 'clean', 'inplace', 'rendezés', 'átnevezés', 'mappaszerkezet', 'ütközés'
  ],
  [SETTINGS_TAB_IDS.MOVIES]: [
    'movies', 'movie', 'film', 'films', 'cinema', 'motion picture', 'boxset', 'collection',
    'franchise', 'threshold', 'template', 'naming', 'format', 'pattern', 'resolution', 'edition', 'year',
    'filmek', 'film', 'gyűjtemény', 'sablon', 'átnevezés'
  ],
  [SETTINGS_TAB_IDS.TV_SHOWS]: [
    'tv', 'shows', 'tv shows', 'series', 'show', 'television', 'episode', 'season', 'pilot',
    'template', 'naming', 'format', 'pattern', 'sorozat', 'sorozatok', 'epizód', 'évad', 'sablon'
  ],
  [SETTINGS_TAB_IDS.EXTRAS]: [
    'extras', 'bonus', 'featurette', 'sample', 'trailer', 'subtitles', 'sub', 'srt', 'artwork',
    'poster', 'fanart', 'backdrop', 'logo', 'banner', 'image', 'photo', 'audio', 'meta', 'nfo',
    'feliratok', 'képek', 'poszter', 'előzetes', 'extrák'
  ],
  [SETTINGS_TAB_IDS.SCENES]: [
    'scenes', 'scene', 'clip', 'video', 'adult video', 'nsfw video', 'studio', 'network',
    'producer', 'performer', 'star', 'talent', 'actor', 'actress', 'cast', 'tags', 'fansdb',
    'stashdb', 'naming', 'template', 'jelenetek', 'stúdió', 'szereplő', 'sztár'
  ],
  [SETTINGS_TAB_IDS.ADULT_MOVIES]: [
    'adult movies', 'adult movie', 'movies', 'movie', 'film', 'films', 'cinema', 'feature',
    '18+ movie', 'nsfw movie', 'porn movie', 'template', 'naming', 'format', '18+', 'xxx',
    'felnőtt film', 'film', 'filmek'
  ],
  [SETTINGS_TAB_IDS.ADULT_TV_SHOWS]: [
    'adult tv shows', 'adult tv', 'adult show', 'tv', 'shows', 'tv shows', 'series', 'show',
    'episode', 'season', '18+ series', 'nsfw series', 'porn series', 'template', 'naming', 'format',
    '18+', 'xxx', 'felnőtt sorozat', 'sorozat', 'sorozatok'
  ],
};

export function useSettingsSidebar({
  t,
  visibleOrganizationTabs = [],
  visibleAdultTabs = [],
  activeTab,
  onTabSelect,
  includeAdult = false,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [manualTemplatesExpanded, setManualTemplatesExpanded] = useState(null);
  const [manualAdultTemplatesExpanded, setManualAdultTemplatesExpanded] = useState(null);

  const isTemplatesExpanded = manualTemplatesExpanded !== null
    ? manualTemplatesExpanded
    : (activeTab === SETTINGS_TAB_IDS.MOVIES || activeTab === SETTINGS_TAB_IDS.TV_SHOWS);

  const isAdultTemplatesExpanded = manualAdultTemplatesExpanded !== null
    ? manualAdultTemplatesExpanded
    : (activeTab === SETTINGS_TAB_IDS.ADULT_MOVIES ||
       activeTab === SETTINGS_TAB_IDS.ADULT_TV_SHOWS ||
       activeTab === SETTINGS_TAB_IDS.SCENES);

  const query = searchQuery.trim().toLowerCase();
  const searchWords = useMemo(() => query.split(/\s+/).filter(Boolean), [query]);

  const sidebarGroups = useMemo(() => {
    const matchesTab = (tabId, label) => {
      if (searchWords.length === 0) return true;
      const lowerLabel = label ? label.toLowerCase() : '';
      const keywords = TAB_SEARCH_KEYWORDS[tabId] || [];

      return searchWords.every((word) =>
        lowerLabel.includes(word) ||
        keywords.some((kw) => kw.includes(word) || word.includes(kw))
      );
    };

    const rawGroups = [];

    // Group 1: General Settings (Flat)
    const flatTabs = [
      { id: SETTINGS_TAB_IDS.GENERAL, label: t('settingsPage.sidebar.general'), icon: Settings2 },
      { id: SETTINGS_TAB_IDS.THEME, label: t('settingsPage.sidebar.theme'), icon: Palette },
      { id: SETTINGS_TAB_IDS.PLAYER, label: t('settingsPage.sidebar.player') || 'Player', icon: Play },
      { id: SETTINGS_TAB_IDS.ADULT_GENERAL, label: t('settingsPage.sidebar.adult'), icon: Flame },
      { id: SETTINGS_TAB_IDS.API_KEYS, label: t('settingsPage.sidebar.apiKeys'), icon: KeyRound },
      { id: SETTINGS_TAB_IDS.TORRENT, label: t('settingsPage.sidebar.torrent') || 'Torrent', icon: Download },
      { id: SETTINGS_TAB_IDS.ADVANCED, label: t('settingsPage.sidebar.advanced'), icon: Cpu },
      { id: SETTINGS_TAB_IDS.MAINTENANCE, label: t('settingsPage.sidebar.maintenance'), icon: Wrench },
    ];

    flatTabs.forEach((tab) => {
      if (matchesTab(tab.id, tab.label)) {
        rawGroups.push({
          id: tab.id,
          label: tab.label,
          icon: tab.icon,
          isActive: activeTab === tab.id,
        });
      }
    });

    // Group 2: Organization Section Header & Items
    const orgIcons = {
      [SETTINGS_TAB_IDS.PRESETS]: Settings2,
      [SETTINGS_TAB_IDS.ORG_GENERAL]: FolderTree,
      [SETTINGS_TAB_IDS.EXTRAS]: Layers,
    };

    const orgItems = [];
    const templateSubItems = [];

    visibleOrganizationTabs.forEach((tab) => {
      if (!tab.isCurrentlyVisible) return;

      if (tab.id === SETTINGS_TAB_IDS.MOVIES || tab.id === SETTINGS_TAB_IDS.TV_SHOWS) {
        if (matchesTab(tab.id, t(tab.labelKey))) {
          templateSubItems.push({
            id: tab.id,
            label: t(tab.labelKey),
            isActive: activeTab === tab.id,
          });
        }
        return;
      }

      if (matchesTab(tab.id, t(tab.labelKey))) {
        orgItems.push({
          id: tab.id,
          label: t(tab.labelKey),
          icon: orgIcons[tab.id] || FolderTree,
          isActive: activeTab === tab.id,
        });
      }
    });

    if (templateSubItems.length > 0) {
      const templatesGroup = {
        id: 'group-templates',
        label: t('settingsPage.sidebar.templates'),
        icon: Clapperboard,
        isActive: activeTab === SETTINGS_TAB_IDS.MOVIES || activeTab === SETTINGS_TAB_IDS.TV_SHOWS,
        isExpanded: searchWords.length > 0 ? true : isTemplatesExpanded,
        onToggle: () => {
          const nextExpanded = !isTemplatesExpanded;
          setManualTemplatesExpanded(nextExpanded);
          if (nextExpanded && activeTab !== SETTINGS_TAB_IDS.MOVIES && activeTab !== SETTINGS_TAB_IDS.TV_SHOWS) {
            onTabSelect(SETTINGS_TAB_IDS.MOVIES);
          }
        },
        subItems: templateSubItems,
      };

      const extrasIndex = orgItems.findIndex((g) => g.id === SETTINGS_TAB_IDS.EXTRAS);
      if (extrasIndex !== -1) {
        orgItems.splice(extrasIndex, 0, templatesGroup);
      } else {
        orgItems.push(templatesGroup);
      }
    }

    const adultTemplateSubItems = [];
    if (includeAdult) {
      visibleAdultTabs.forEach((tab) => {
        if (tab.id !== SETTINGS_TAB_IDS.ADULT_GENERAL && tab.isCurrentlyVisible) {
          if (matchesTab(tab.id, t(tab.labelKey))) {
            adultTemplateSubItems.push({
              id: tab.id,
              label: t(tab.labelKey),
              isActive: activeTab === tab.id,
            });
          }
        }
      });
    }

    if (includeAdult && adultTemplateSubItems.length > 0) {
      const adultTemplatesGroup = {
        id: 'group-adult-templates',
        label: t('settingsPage.sidebar.adultTemplates'),
        icon: Flame,
        isActive: activeTab === SETTINGS_TAB_IDS.ADULT_MOVIES ||
                  activeTab === SETTINGS_TAB_IDS.ADULT_TV_SHOWS ||
                  activeTab === SETTINGS_TAB_IDS.SCENES,
        isExpanded: searchWords.length > 0 ? true : isAdultTemplatesExpanded,
        onToggle: () => {
          const nextExpanded = !isAdultTemplatesExpanded;
          setManualAdultTemplatesExpanded(nextExpanded);
          if (nextExpanded &&
              activeTab !== SETTINGS_TAB_IDS.ADULT_MOVIES &&
              activeTab !== SETTINGS_TAB_IDS.ADULT_TV_SHOWS &&
              activeTab !== SETTINGS_TAB_IDS.SCENES) {
            onTabSelect(SETTINGS_TAB_IDS.ADULT_MOVIES);
          }
        },
        subItems: adultTemplateSubItems,
      };

      const extrasIndex = orgItems.findIndex((g) => g.id === SETTINGS_TAB_IDS.EXTRAS);
      if (extrasIndex !== -1) {
        orgItems.splice(extrasIndex, 0, adultTemplatesGroup);
      } else {
        orgItems.push(adultTemplatesGroup);
      }
    }

    if (orgItems.length > 0) {
      rawGroups.push({
        id: 'sec-org',
        type: 'section-header',
        label: t('settingsPage.sidebar.organization'),
      });
      rawGroups.push(...orgItems);
    }

    return rawGroups;
  }, [
    t,
    searchWords,
    activeTab,
    includeAdult,
    visibleOrganizationTabs,
    visibleAdultTabs,
    isTemplatesExpanded,
    isAdultTemplatesExpanded,
    onTabSelect,
  ]);

  return {
    searchQuery,
    setSearchQuery,
    sidebarGroups,
  };
}
