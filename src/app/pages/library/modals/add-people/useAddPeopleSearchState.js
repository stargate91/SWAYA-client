import { useMemo } from 'react';
import { useSettingsQuery } from '@/queries';

export function useAddPeopleSearchState({
  isAdult,
  tmdbResults = [],
  optimisticStatus = {},
  loadingIds = new Set(),
  queuedIds = new Set(),
  enqueueToggleStatus,
  resolveProfileUrl,
  t,
}) {
  const { data: settings } = useSettingsQuery();

  const filteredTmdbResults = useMemo(() => {
    if (!isAdult || !settings?.adult_gender_preference || settings.adult_gender_preference === 'all') {
      return tmdbResults;
    }
    const pref = settings.adult_gender_preference;
    return tmdbResults.filter((person) => {
      const g = person.gender;
      if (pref === 'female') return g === 1 || g === '1';
      if (pref === 'male') return g === 2 || g === '2';
      return true;
    });
  }, [tmdbResults, isAdult, settings?.adult_gender_preference]);

  const items = useMemo(() => {
    return filteredTmdbResults.map((person) => {
      const isActive = optimisticStatus[person.id] !== undefined
        ? optimisticStatus[person.id]
        : person.is_active;
      const isPending = loadingIds.has(person.id) || queuedIds.has(person.id);

      const roleName = person.known_for_department
        ? (t(`dynamic.roles.${person.known_for_department.toLowerCase()}`) || person.known_for_department)
        : '';
      const count = person.library_count;
      const appearancesText = typeof count === 'number' && count > 0
        ? t('library.people.appearances', { count, defaultValue: `${count} ${count === 1 ? 'appearance' : 'appearances'}` })
        : null;
      const knownForTitles = Array.isArray(person.known_for) && person.known_for.length > 0
        ? `Known for: ${person.known_for.map((k) => k.title || k.name).filter(Boolean).slice(0, 3).join(', ')}`
        : null;
      const metaContent = [roleName, appearancesText, knownForTitles].filter(Boolean).join(' • ');

      const handleToggle = (newActiveStatus) => {
        if (enqueueToggleStatus) {
          enqueueToggleStatus({
            personId: person.id,
            newActiveStatus,
            previousStatus: isActive,
            source: 'search',
          });
        }
      };

      return {
        id: person.id,
        name: person.name,
        imageUrl: person.profile_path && resolveProfileUrl ? resolveProfileUrl(person.profile_path) : null,
        meta: metaContent,
        isActive,
        isPending,
        handleToggle,
      };
    });
  }, [
    filteredTmdbResults,
    optimisticStatus,
    loadingIds,
    queuedIds,
    resolveProfileUrl,
    enqueueToggleStatus,
    t,
  ]);

  return {
    items,
    hasResults: items.length > 0,
  };
}

export default useAddPeopleSearchState;
