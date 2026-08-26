import SearchInputCombo from '@/ui/SearchInputCombo';
import Stack from '@/ui/Stack';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { useAddEntitySearch } from '../../hooks/useAddEntitySearch';
import AddPeopleLocal from './AddPeopleLocal';
import AddPeopleSearch from './AddPeopleSearch';

export default function AddPeopleModalContent({ isAdult, t }) {
  const {
    selectedOption,
    searchQuery,
    setSearchQuery,
    searchResults: tmdbResults,
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
  } = useAddEntitySearch({ type: 'people', isAdult, t });

  const resolveProfileUrl = (path) => {
    return resolveMediaImageUrl(path, 'personThumb');
  };

  return (
    <Stack gap="lg" fullWidth fill>
      {activeMode === 'search' ? (
        <form onSubmit={handleSearchSubmit}>
          <SearchInputCombo
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholderText}
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
            options={options}
          />
        </form>
      ) : (
        <SearchInputCombo
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholderText}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          options={options}
        />
      )}

      {activeMode === 'local' && (
        <AddPeopleLocal
          isAdult={isAdult}
          t={t}
          textKey={textKey}
          resolveProfileUrl={resolveProfileUrl}
          optimisticStatus={optimisticStatus}
          loadingIds={loadingIds}
          queuedIds={queuedIds}
          enqueueToggleStatus={enqueueToggleStatus}
          searchQuery={searchQuery}
        />
      )}

      {activeMode === 'search' && (
        <AddPeopleSearch
          isAdult={isAdult}
          t={t}
          textKey={textKey}
          resolveProfileUrl={resolveProfileUrl}
          optimisticStatus={optimisticStatus}
          loadingIds={loadingIds}
          queuedIds={queuedIds}
          enqueueToggleStatus={enqueueToggleStatus}
          tmdbResults={tmdbResults}
          isSearching={isSearching}
          searchingError={searchingError}
          hasSearched={hasSearched}
        />
      )}
    </Stack>
  );
}

