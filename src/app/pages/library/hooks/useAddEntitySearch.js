import { useState, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useUpdatePersonStatusMutation,
  useAddPersonTmdbMutation,
  useUpdateStudioStatusMutation,
  useSettingsQuery,
} from '@/queries';
import { fetchPeopleTmdbSearch, fetchGlobalSearch } from '@/queries/metadataQueries';
import { hasProviderCredential } from '@/lib/providerAvailability';
import { useEntityBatchToggleQueue } from './useEntityBatchToggleQueue';

export function useAddEntitySearch({ type = 'people', isAdult, t }) {
  const queryClient = useQueryClient();
  const { data: settings } = useSettingsQuery();
  const [selectedOption, setSelectedOption] = useState('local');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchingError, setSearchingError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const options = useMemo(() => [
    { value: 'local', label: t('library.addPeople.modes.local') || 'Local Pack' },
    ...((!isAdult || type === 'people') && hasProviderCredential(settings, 'tmdb') ? [{ value: 'tmdb', label: 'TMDb' }] : []),
    ...(isAdult ? [
      ...(hasProviderCredential(settings, 'stashdb') ? [{ value: 'stashdb', label: 'StashDB' }] : []),
      ...(hasProviderCredential(settings, 'fansdb') ? [{ value: 'fansdb', label: 'FansDB' }] : []),
      ...(hasProviderCredential(settings, 'theporndb') ? [{ value: 'theporndb', label: 'ThePornDB' }] : []),
    ] : []),
  ], [isAdult, type, settings, t]);

  const resolvedOption = options.some((opt) => opt.value === selectedOption)
    ? selectedOption
    : 'local';

  const textKey = useCallback((adultKey, defaultKey) => (isAdult ? adultKey : defaultKey), [isAdult]);

  const addPersonMutation = useAddPersonTmdbMutation();
  const updatePersonStatusMutation = useUpdatePersonStatusMutation();
  const updateStudioStatusMutation = useUpdateStudioStatusMutation();

  const handleProcessItem = useCallback(async (task) => {
    const entityId = task.id || task.personId || task.studioId;

    if (type === 'people') {
      if (task.source === 'search' && task.newActiveStatus) {
        const searchPerson = searchResults.find((p) => p.id === entityId);
        if (searchPerson) {
          await addPersonMutation.mutateAsync({
            tmdb_id: entityId,
            name: searchPerson.name,
            profile_path: searchPerson.profile_path,
            gender: searchPerson.gender,
            is_adult: searchPerson.is_adult !== undefined ? searchPerson.is_adult : (searchPerson.adult !== undefined ? searchPerson.adult : isAdult),
          });
        } else {
          await addPersonMutation.mutateAsync(entityId);
        }
      } else {
        const searchPerson = searchResults.find((p) => p.id === entityId || p.person_id === entityId);
        const resolvedPersonId = searchPerson?.person_id || entityId;
        await updatePersonStatusMutation.mutateAsync({
          personId: resolvedPersonId,
          payload: { is_active: task.newActiveStatus },
        });
      }
    } else if (type === 'studio') {
      await updateStudioStatusMutation.mutateAsync({
        studioId: entityId,
        isActive: task.newActiveStatus,
        isAdult,
      });
    }
  }, [type, searchResults, addPersonMutation, updatePersonStatusMutation, updateStudioStatusMutation, isAdult]);

  const {
    optimisticStatus,
    loadingIds,
    queuedIds,
    enqueueToggleStatus: enqueueRaw,
  } = useEntityBatchToggleQueue({ onProcessItem: handleProcessItem });

  const enqueueToggleStatus = useCallback(({ personId, studioId, id, ...rest }) => {
    const cleanId = id || personId || studioId;
    enqueueRaw({
      id: cleanId,
      personId: cleanId,
      studioId: cleanId,
      ...rest,
    });
  }, [enqueueRaw]);

  const handleSearchSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchingError('');
    try {
      if (type === 'people') {
        const results = await fetchPeopleTmdbSearch(queryClient, {
          query: searchQuery.trim(),
          adultOnly: isAdult,
          source: resolvedOption,
        });
        setSearchResults(results || []);
      } else {
        const results = await fetchGlobalSearch(queryClient, {
          query: searchQuery.trim(),
          source: resolvedOption,
          type: 'studio',
          includeAdult: isAdult,
        });
        setSearchResults(results || []);
      }
      setHasSearched(true);
    } catch (err) {
      setSearchingError(err.message || 'Failed to search');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, type, isAdult, resolvedOption, queryClient]);

  const handleOptionChange = useCallback((val) => {
    setSelectedOption(val);
    setSearchQuery('');
    setHasSearched(false);
    setSearchResults([]);
  }, []);

  const activeMode = resolvedOption === 'local' ? 'local' : 'search';

  const placeholderText = useMemo(() => {
    if (type === 'people') {
      return resolvedOption === 'local'
        ? t(textKey('library.addPeople.adultSearchPlaceholder', 'library.addPeople.searchPlaceholder'))
        : t(textKey('library.addPeople.adultTmdbSearchPlaceholder', 'library.addPeople.tmdbSearchPlaceholder'));
    }
    return resolvedOption === 'local'
      ? t(textKey('library.addStudios.adultSearchPlaceholder', 'library.addStudios.searchPlaceholder'))
      : (t(textKey('library.addStudios.adultTmdbSearchPlaceholder', 'library.addStudios.tmdbSearchPlaceholder')) || 'Search online...');
  }, [type, resolvedOption, t, textKey]);

  return {
    selectedOption: resolvedOption,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    searchingError,
    hasSearched,
    options,
    activeMode,
    placeholderText,
    optimisticStatus,
    loadingIds,
    queuedIds,
    enqueueToggleStatus,
    handleSearchSubmit,
    handleOptionChange,
    textKey,
  };
}

export default useAddEntitySearch;
