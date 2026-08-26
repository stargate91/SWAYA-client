import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import CompactCard from '@/ui/CompactCard';
import ActivationButton from '../add-people/ActivationButton';
import Stack from '@/ui/Stack';
import Alert from '@/ui/Alert';
import { resolveMediaImageUrl } from '@/lib/imageUrls';

export default function AddStudiosSearch({
  isAdult,
  t,
  textKey,
  optimisticStatus,
  loadingIds,
  queuedIds,
  enqueueToggleStatus,
  searchResults,
  isSearching,
  searchingError,
  hasSearched,
}) {
  return (
    <Stack gap="lg" fill>
      {isSearching ? (
        <Stack gap="sm" scrollable padding="xs">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton.CompactCard key={idx} aspect="landscape" />
          ))}
        </Stack>
      ) : searchingError ? (
        <Alert variant="danger">
          {searchingError}
        </Alert>
      ) : !hasSearched ? (
        <Stack fill justify="center">
          <EmptyState
            title={t(textKey('library.addStudios.adultSearchEmptyTitle', 'library.addStudios.searchEmptyTitle')) || 'Search for any studio'}
            description={t(textKey('library.addStudios.adultSearchEmptyDesc', 'library.addStudios.searchEmptyDesc')) || 'Find studios on the remote database and activate them.'}
            size="md"
            border="dashed"
            background="translucent"
            fillHeight={true}
          />
        </Stack>
      ) : searchResults.length === 0 ? (
        <Stack fill justify="center">
          <EmptyState
            title={t(textKey('library.addStudios.adultSearchNoResultsTitle', 'library.addStudios.searchNoResultsTitle')) || 'No matching studios found'}
            description={t(textKey('library.addStudios.adultSearchNoResultsDesc', 'library.addStudios.searchNoResultsDesc')) || 'No studios on the remote database matched this search. Try another name.'}
            size="md"
            border="dashed"
            background="translucent"
            fillHeight={true}
          />
        </Stack>
      ) : (
        <Stack gap="sm" scrollable padding="xs">
          {searchResults.map((studio) => {
            const isActive = optimisticStatus[studio.id] !== undefined
              ? optimisticStatus[studio.id]
              : studio.is_active;
            const isPendingForStudio = loadingIds.has(studio.id) || queuedIds.has(studio.id);

            const overviewText = studio.overview || (isAdult ? 'Adult Studio' : 'Studio / Company');
            const imageUrl = studio.logo_path ? resolveMediaImageUrl(studio.logo_path, 'logo') : null;

            return (
              <CompactCard
                key={studio.id}
                aspect="landscape"
                objectFit="contain"
                imageUrl={imageUrl}
                title={studio.title}
                meta={overviewText}
                rightElement={
                  <ActivationButton
                    isActive={isActive}
                    onClick={(newActiveStatus) => enqueueToggleStatus({
                      studioId: studio.id,
                      newActiveStatus,
                      previousStatus: isActive,
                    })}
                    disabled={isPendingForStudio}
                  />
                }
              />
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
