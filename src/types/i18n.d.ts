import type enAbout from '../app/locales/en/about.json';
import type enCommon from '../app/locales/en/common.json';
import type enDashboard from '../app/locales/en/dashboard.json';
import type enDynamic from '../app/locales/en/dynamic.json';
import type enHistory from '../app/locales/en/history.json';
import type enLibrary from '../app/locales/en/library.json';
import type enLists from '../app/locales/en/lists.json';
import type enOnboarding from '../app/locales/en/onboarding.json';
import type enOrganizer from '../app/locales/en/organizer.json';
import type enRatings from '../app/locales/en/ratings.json';
import type enSearch from '../app/locales/en/search.json';
import type enSettings from '../app/locales/en/settings.json';
import type enStatistics from '../app/locales/en/statistics.json';
import type enTorrent from '../app/locales/en/torrent.json';
import type enLanding from '../site/locales/en/landing.json';
import type enDocs from '../site/locales/en/docs.json';

export interface TranslationSchema {
  dynamic: typeof enDynamic;
  common: typeof enCommon.common;
  sidebar: typeof enCommon.sidebar;
  dashboard: typeof enDashboard;
  settings: typeof enSettings;
  settingsPage: typeof enSettings;
  organizer: typeof enOrganizer;
  library: typeof enLibrary;
  performer: typeof enLibrary.performerEdit;
  performerEdit: typeof enLibrary.performerEdit;
  history: typeof enHistory;
  historyPage: typeof enHistory;
  onboarding: typeof enOnboarding;
  ratings: typeof enRatings;
  lists: typeof enLists;
  search: typeof enSearch;
  about: typeof enAbout;
  statistics: typeof enStatistics;
  torrent: typeof enTorrent;
  landing: typeof enLanding;
  docs: typeof enDocs;
  [key: string]: any;
}

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8];

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Leaves<T, D extends number = 6> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : '';

export type TranslationKey = Leaves<TranslationSchema> | (string & {});

export interface TranslationOptions {
  count?: number;
  defaultValue?: string;
  [key: string]: any;
}

export type TranslateFunction = (key: TranslationKey, options?: TranslationOptions) => string;

export interface LanguageContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: TranslateFunction;
}

declare module '@/providers/LanguageContext' {
  export function useTranslation(): LanguageContextValue;
}
