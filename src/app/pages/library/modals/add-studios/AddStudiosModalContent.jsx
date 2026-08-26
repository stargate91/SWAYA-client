import SearchInputCombo from '@/ui/SearchInputCombo';
import Stack from '@/ui/Stack';
import { useAddEntitySearch } from '../../hooks/useAddEntitySearch';
import AddStudiosLocal from './AddStudiosLocal';
import AddStudiosSearch from './AddStudiosSearch';

export default function AddStudiosModalContent({ isAdult, t }) {
  const {
    selectedOption,
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
  } = useAddEntitySearch({ type: 'studio', isAdult, t });

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
        <AddStudiosLocal
          isAdult={isAdult}
          t={t}
          optimisticStatus={optimisticStatus}
          loadingIds={loadingIds}
          queuedIds={queuedIds}
          enqueueToggleStatus={enqueueToggleStatus}
          searchQuery={searchQuery}
        />
      )}

      {activeMode === 'search' && (
        <AddStudiosSearch
          isAdult={isAdult}
          t={t}
          textKey={textKey}
          optimisticStatus={optimisticStatus}
          loadingIds={loadingIds}
          queuedIds={queuedIds}
          enqueueToggleStatus={enqueueToggleStatus}
          searchResults={searchResults}
          isSearching={isSearching}
          searchingError={searchingError}
          hasSearched={hasSearched}
        />
      )}
    </Stack>
  );
}

