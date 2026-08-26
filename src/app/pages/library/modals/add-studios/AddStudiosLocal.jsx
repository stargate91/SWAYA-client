import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import Dropdown from '@/ui/Dropdown';
import CompactCard from '@/ui/CompactCard';
import ActivationButton from '../add-people/ActivationButton';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import { useAddStudiosLocalState } from './useAddStudiosLocalState';

export default function AddStudiosLocal({
  isAdult,
  t,
  optimisticStatus,
  loadingIds,
  queuedIds,
  enqueueToggleStatus,
  searchQuery,
}) {
  const {
    listRef,
    statusFilter,
    setStatusFilter,
    relationType,
    setRelationType,
    sortBy,
    setSortBy,
    sortDirection,
    toggleSortDirection,
    isLoading,
    visibleStudios,
    hasSearchQuery,
    hasActiveFilters,
    statusOptions,
    sortOptions,
    typeOptions,
    handleScroll,
  } = useAddStudiosLocalState({ isAdult, searchQuery, optimisticStatus, t });

  return (
    <Stack gap="md" fill>
      <Inline justify="between" align="center" padding="xs" fullWidth>
        <Inline gap="md" align="center">
          <Dropdown
            width="9rem"
            variant="sorter"
            labelPlacement="inside"
            label={t('library.filter.statusLabel') || 'Status:'}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            themeColor="var(--color-accent)"
            options={statusOptions}
          />

          <Dropdown
            width="9rem"
            variant="sorter"
            labelPlacement="inside"
            label={t('library.sort.label') || 'Sort:'}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sortDirection={sortDirection}
            onSortDirectionToggle={toggleSortDirection}
            options={sortOptions}
          />
          {!isAdult && (
            <Dropdown
              width="9rem"
              variant="sorter"
              labelPlacement="inside"
              label={t('library.filter.typeLabel') || 'Type:'}
              value={relationType}
              onChange={(e) => setRelationType(e.target.value)}
              options={typeOptions}
            />
          )}
        </Inline>
      </Inline>

      {isLoading ? (
        <Stack gap="sm" scrollable padding="xs">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton.CompactCard key={idx} aspect="landscape" />
          ))}
        </Stack>
      ) : visibleStudios.length === 0 ? (
        <Stack fill justify="center">
          <EmptyState
            title={
              hasSearchQuery
                ? (t('library.addStudios.noSearchResultsTitle') || 'No matching studios found')
                : hasActiveFilters
                  ? (t('library.addStudios.noFilterResultsTitle') || 'Nothing fits these filters')
                  : (t('library.addStudios.noInactive') || 'No studios found.')
            }
            description={
              hasSearchQuery
                ? (t('library.addStudios.noSearchResultsDesc') || 'Try searching for another studio name.')
                : hasActiveFilters
                  ? (t('library.addStudios.noFilterResultsDesc') || 'Relax status filter to see more suggestions.')
                  : (t('library.addStudios.noInactiveDesc') || 'All discovered studios are already active.')
            }
            size="md"
            border="dashed"
            background="translucent"
            fillHeight={true}
          />
        </Stack>
      ) : (
        <Stack
          ref={listRef}
          gap="sm"
          scrollable
          padding="xs"
          onScroll={handleScroll}
        >
          {visibleStudios.map((studio) => {
            const imageUrl = studio.logo_path ? resolveMediaImageUrl(studio.logo_path, 'logo') : null;
            const isActive = optimisticStatus[studio.id] !== undefined
              ? optimisticStatus[studio.id]
              : studio.is_active;
            const isPendingForStudio = loadingIds.has(studio.id) || queuedIds.has(studio.id);

            return (
              <CompactCard
                key={studio.id}
                aspect="landscape"
                objectFit="contain"
                imageUrl={imageUrl}
                title={studio.name}
                meta={[
                  studio.type === 'studio'
                    ? (t('library.studios.typeStudio') || 'Studio')
                    : studio.type === 'network'
                      ? (t('library.studios.typeNetwork') || 'Network')
                      : (t('library.studios.typeCompany') || 'Company'),
                  t('library.tags.itemsCount', { count: studio.library_count ?? 0, defaultValue: `${studio.library_count ?? 0} items` })
                ].filter(Boolean).join(' • ')}
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

