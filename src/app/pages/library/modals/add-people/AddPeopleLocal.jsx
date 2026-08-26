import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import Dropdown from '@/ui/Dropdown';
import CompactCard from '@/ui/CompactCard';
import ActivationButton from './ActivationButton';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import { useAddPeopleLocalState } from './useAddPeopleLocalState';

export default function AddPeopleLocal({
  isAdult,
  t,
  resolveProfileUrl,
  optimisticStatus,
  loadingIds,
  queuedIds,
  enqueueToggleStatus,
  searchQuery,
}) {
  const {
    listRef,
    roleFilter,
    setRoleFilter,
    genderFilter,
    setGenderFilter,
    sortBy,
    setSortBy,
    sortDirection,
    toggleSortDirection,
    statusFilter,
    setStatusFilter,
    hideGenderFilter,
    isLoading,
    visiblePeople,
    hasSearchQuery,
    hasActiveFilters,
    sortOptions,
    roleOptions,
    genderOptions,
    statusOptions,
    handleScroll,
  } = useAddPeopleLocalState({
    isAdult,
    searchQuery,
    optimisticStatus,
    t,
  });

  return (
    <Stack gap="md" fill>
      <Inline gap="xs" align="center" wrap={false} fullWidth>
        <Dropdown
          flex={1.2}
          variant="sorter"
          labelPlacement="inside"
          label={t('library.sort.label') || 'Sort:'}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sortDirection={sortDirection}
          onSortDirectionToggle={toggleSortDirection}
          themeColor="var(--color-accent)"
          options={sortOptions}
        />

        <Dropdown
          flex={1}
          variant="sorter"
          labelPlacement="inside"
          label={t('library.filter.roleLabel') || 'Role:'}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          themeColor="var(--color-accent)"
          options={roleOptions}
        />

        {!hideGenderFilter && (
          <Dropdown
            flex={1}
            variant="sorter"
            labelPlacement="inside"
            label={t('library.filter.genderLabel') || 'Gender:'}
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            themeColor="var(--color-accent)"
            options={genderOptions}
          />
        )}

        <Dropdown
          flex={1}
          variant="sorter"
          labelPlacement="inside"
          label={t('library.filter.statusLabel') || 'Status:'}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          themeColor="var(--color-accent)"
          options={statusOptions}
        />
      </Inline>

      {isLoading ? (
        <Stack gap="sm" scrollable padding="xs">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton.CompactCard key={idx} aspect="circle" />
          ))}
        </Stack>
      ) : visiblePeople.length === 0 ? (
        <Stack fill justify="center">
          <EmptyState
            title={hasSearchQuery
              ? (isAdult
                  ? (t('library.addPeople.adultNoSearchResultsTitle') || 'No matching adult people found')
                  : (t('library.addPeople.noSearchResultsTitle') || 'No matching people found'))
              : hasActiveFilters
                ? (isAdult
                    ? (t('library.addPeople.adultNoFilterResultsTitle') || 'Nothing fits these filters')
                    : (t('library.addPeople.noFilterResultsTitle') || 'Nothing fits these filters'))
                : (isAdult
                    ? (t('library.addPeople.adultNoInactive') || 'All discovered adult people are already in your library.')
                    : (t('library.addPeople.noInactive') || 'No people found.'))
            }
            description={hasSearchQuery
              ? (isAdult
                  ? (t('library.addPeople.adultNoSearchResultsDesc') || 'No adult people in your local pack matched this search. Try another name.')
                  : (t('library.addPeople.noSearchResultsDesc') || 'No people in your local pack matched this search. Try another name.'))
              : hasActiveFilters
                ? (isAdult
                    ? (t('library.addPeople.adultNoFilterResultsDesc') || 'Try clearing or relaxing the local adult people filters to see more suggestions.')
                    : (t('library.addPeople.noFilterResultsDesc') || 'Try clearing or relaxing the local people filters to see more suggestions.'))
                : (isAdult
                    ? (t('library.addPeople.adultNoInactiveDesc') || 'Scan and organize new adult titles to find more cast and creator suggestions.')
                    : (t('library.addPeople.noInactiveDesc') || 'All people from organized items are already active.'))
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
          {visiblePeople.map((person) => {
            const isActive = optimisticStatus[person.id] !== undefined
              ? optimisticStatus[person.id]
              : person.is_active;
            const isPendingForPerson = loadingIds.has(person.id) || queuedIds.has(person.id);

            const roleName = person.known_for
              ? (t(`dynamic.roles.${person.known_for.toLowerCase()}`) || person.known_for)
              : '';
            const count = person.library_count ?? 0;
            const appearancesText = t('library.people.appearances', { count, defaultValue: `${count} ${count === 1 ? 'appearance' : 'appearances'}` });
            const metaContent = [roleName, appearancesText].filter(Boolean).join(' • ');

            return (
              <CompactCard
                key={person.id}
                aspect="circle"
                imageUrl={person.profile_path ? resolveProfileUrl(person.profile_path) : null}
                title={person.name}
                meta={metaContent}
                rightElement={
                  <ActivationButton
                    isActive={isActive}
                    onClick={(newActiveStatus) => enqueueToggleStatus({
                      personId: person.id,
                      newActiveStatus,
                      previousStatus: isActive,
                      source: 'local',
                    })}
                    disabled={isPendingForPerson}
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
