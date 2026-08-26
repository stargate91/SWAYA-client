import { useMemo } from 'react';
import { toDecade } from '@/lib/formatters';

export function useLibraryFilterOptions({
  filterData,
  peopleRoleFilter,
  genderFilter,
  activeSessionMode,
  settings,
  t,
}) {
  const years = filterData?.years;
  const roles = filterData?.roles;
  const genders = filterData?.genders;
  const genres = filterData?.genres;
  const performers = filterData?.performers;
  const studios = filterData?.studios;
  const networks = filterData?.networks;
  const tags = filterData?.tags;

  const decades = useMemo(() => {
    if (!years) return [];
    const set = new Set(years.map((y) => toDecade(y)).filter(Boolean));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [years]);

  const studioTypeOptions = useMemo(() => [
    { value: '', label: t('library.filter.all') || 'All' },
    { value: 'studio', label: t('library.studios.typeCompanies') || 'Companies' },
    { value: 'network', label: t('library.studios.typeNetworks') || 'Networks' },
  ], [t]);

  const collectionStatusOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All' },
    { value: 'complete', label: t('library.filter.complete') || 'Complete' },
    { value: 'in_progress', label: t('library.filter.inProgress') || 'In Progress' },
  ], [t]);

  const roleOptions = useMemo(() => {
    const allRoles = [
      { value: 'all', label: t('library.filter.all') || 'All' },
      { value: 'actor', label: t('dynamic.roles.actor') || 'Actor' },
      { value: 'director', label: t('dynamic.roles.director') || 'Director' },
      { value: 'writer', label: t('dynamic.roles.writer') || 'Writer' },
      { value: 'sound', label: t('dynamic.roles.sound') || 'Composer' },
    ];
    return allRoles.filter((opt) => {
      if (opt.value === 'all') return true;
      if (peopleRoleFilter === opt.value) return true;
      return roles && roles.includes(opt.value);
    });
  }, [roles, peopleRoleFilter, t]);

  const shouldShowGenderFilter =
    activeSessionMode !== 'nsfw' ||
    !settings?.adult_gender_preference ||
    settings.adult_gender_preference === 'all';

  const genderOptions = useMemo(() => {
    const allGenders = [
      { value: 'all', label: t('library.filter.all') || 'All' },
      { value: 'female', label: t('library.filter.female') || 'Female' },
      { value: 'male', label: t('library.filter.male') || 'Male' },
    ];
    return allGenders.filter((opt) => {
      if (opt.value === 'all') return true;
      if (genderFilter === opt.value) return true;
      return genders && genders.includes(opt.value);
    });
  }, [genders, genderFilter, t]);

  const watchedOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.all') || 'All' },
    { value: 'watched', label: t('library.filter.watched') || 'Watched' },
    { value: 'unwatched', label: t('library.filter.unwatched') || 'Unwatched' },
  ], [t]);

  const genreOptions = useMemo(() => [
    { value: '', label: t('library.filter.allGenres') || 'All Genres' },
    ...(genres || []).map((g) => ({
      value: g,
      label: t(`dynamic.genres.${g}`, { defaultValue: g }),
    })),
  ], [genres, t]);

  const performerOptions = useMemo(() => [
    { value: '', label: t('library.filter.allPerformers') || 'All Performers' },
    ...(performers || []).map((p) => ({
      value: String(p.id),
      label: p.name,
    })),
  ], [performers, t]);

  const studioOptions = useMemo(() => [
    {
      value: '',
      label: activeSessionMode === 'nsfw'
        ? (t('library.filter.allStudios') || 'All Studios')
        : (t('library.filter.allCompanies') || 'All Companies'),
    },
    ...(studios || []).map((s) => ({
      value: String(s.id),
      label: s.name,
    })),
  ], [activeSessionMode, studios, t]);

  const networkOptions = useMemo(() => [
    { value: '', label: t('library.filter.allNetworks') || 'All Networks' },
    ...(networks || []).map((n) => ({
      value: String(n.id),
      label: n.name,
    })),
  ], [networks, t]);

  const tagOptions = useMemo(() => {
    return (tags || []).map((tag) => ({
      value: tag.name,
      label: tag.name,
      color: tag.color,
    }));
  }, [tags]);

  const decadeOptions = useMemo(() => [
    { value: 'all', label: t('library.filter.allDecades') || 'All Decades' },
    ...decades.map((d) => ({ value: d, label: d })),
  ], [decades, t]);

  const yearOptions = useMemo(() => [
    { value: '', label: t('library.filter.allYears') || 'All Years' },
    ...(years || []).map((y) => ({
      value: String(y),
      label: String(y),
    })),
  ], [years, t]);

  return {
    decades,
    studioTypeOptions,
    collectionStatusOptions,
    roleOptions,
    shouldShowGenderFilter,
    genderOptions,
    watchedOptions,
    genreOptions,
    performerOptions,
    studioOptions,
    networkOptions,
    tagOptions,
    decadeOptions,
    yearOptions,
  };
}

export default useLibraryFilterOptions;
