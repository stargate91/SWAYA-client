import { Film, Tv, Video, Clapperboard } from '@/ui/icons';

export const SOURCES = [
  { id: 'tmdb', name: 'TMDb', labelKey: 'search.sources.tmdb', adult: false },
  { id: 'stashdb', name: 'StashDB', labelKey: 'search.sources.stashdb', adult: true },
  { id: 'fansdb', name: 'FansDB', labelKey: 'search.sources.fansdb', adult: true },
  { id: 'theporndb', name: 'ThePornDB', labelKey: 'search.sources.theporndb', adult: true },
];

export const TYPES_BY_SOURCE = {
  tmdb: [
    { id: 'all', name: 'All', labelKey: 'search.types.all', icon: Film },
    { id: 'movie', name: 'Movies', labelKey: 'search.types.movie', icon: Film },
    { id: 'tv', name: 'TV Shows', labelKey: 'search.types.tv', icon: Tv },
    { id: 'person', name: 'Stars', labelKey: 'search.types.person', icon: Clapperboard },
    { id: 'collection', name: 'Collections', labelKey: 'search.types.collection', icon: Film },
    { id: 'company', name: 'Studios', labelKey: 'search.types.company', icon: Film },
  ],
  stashdb: [
    { id: 'scene', name: 'Scenes', labelKey: 'search.types.scene', icon: Video },
    { id: 'person', name: 'Adult Stars', labelKey: 'search.types.adult_person', icon: Clapperboard },
    { id: 'studio', name: 'Studios', labelKey: 'search.types.studio', icon: Film },
  ],
  fansdb: [
    { id: 'scene', name: 'Scenes', labelKey: 'search.types.scene', icon: Video },
    { id: 'person', name: 'Adult Stars', labelKey: 'search.types.adult_person', icon: Clapperboard },
    { id: 'studio', name: 'Studios', labelKey: 'search.types.studio', icon: Film },
  ],
  theporndb: [
    { id: 'scene', name: 'Scenes', labelKey: 'search.types.scene', icon: Video },
    { id: 'movie', name: 'Movies', labelKey: 'search.types.movie', icon: Film },
    { id: 'person', name: 'Adult Stars', labelKey: 'search.types.adult_person', icon: Clapperboard },
    { id: 'studio', name: 'Studios', labelKey: 'search.types.studio', icon: Film },
  ],
};
