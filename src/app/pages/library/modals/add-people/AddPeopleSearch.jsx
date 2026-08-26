import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import CompactCard from '@/ui/CompactCard';
import ActivationButton from './ActivationButton';
import Stack from '@/ui/Stack';
import Alert from '@/ui/Alert';
import { useAddPeopleSearchState } from './useAddPeopleSearchState';

export default function AddPeopleSearch({
  isAdult,
  t,
  textKey,
  resolveProfileUrl,
  optimisticStatus,
  loadingIds,
  queuedIds,
  enqueueToggleStatus,
  tmdbResults,
  isSearching,
  searchingError,
  hasSearched,
}) {
  const { items, hasResults } = useAddPeopleSearchState({
    isAdult,
    tmdbResults,
    optimisticStatus,
    loadingIds,
    queuedIds,
    enqueueToggleStatus,
    resolveProfileUrl,
    t,
  });

  return (
    <Stack gap="lg" fill>
      {isSearching ? (
        <Stack gap="sm" scrollable padding="xs">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton.CompactCard key={idx} aspect="circle" />
          ))}
        </Stack>
      ) : searchingError ? (
        <Alert variant="danger">
          {searchingError}
        </Alert>
      ) : !hasSearched ? (
        <Stack fill justify="center">
          <EmptyState
            title={t(textKey('library.addPeople.adultSearchEmptyTitle', 'library.addPeople.searchEmptyTitle'))}
            description={t(textKey('library.addPeople.adultSearchEmptyDesc', 'library.addPeople.searchEmptyDesc'))}
            size="md"
            border="dashed"
            background="translucent"
            fillHeight={true}
          />
        </Stack>
      ) : !hasResults ? (
        <Stack fill justify="center">
          <EmptyState
            title={t(textKey('library.addPeople.adultSearchNoResultsTitle', 'library.addPeople.searchNoResultsTitle'))}
            description={t(textKey('library.addPeople.adultSearchNoResultsDesc', 'library.addPeople.searchNoResultsDesc'))}
            size="md"
            border="dashed"
            background="translucent"
            fillHeight={true}
          />
        </Stack>
      ) : (
        <Stack gap="sm" scrollable padding="xs">
          {items.map((person) => (
            <CompactCard
              key={person.id}
              aspect="circle"
              imageUrl={person.imageUrl}
              title={person.name}
              meta={person.meta}
              rightElement={
                <ActivationButton
                  isActive={person.isActive}
                  onClick={person.handleToggle}
                  disabled={person.isPending}
                />
              }
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
