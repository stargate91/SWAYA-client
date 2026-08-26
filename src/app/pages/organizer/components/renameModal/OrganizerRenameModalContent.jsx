import { Search } from '@/ui/icons';
import Input from '@/ui/Input';
import Checkbox from '@/ui/Checkbox';
import Table from '@/ui/Table';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import { useRenameModalViewModel } from './useRenameModalViewModel';

export default function OrganizerRenameModalContent({
  items = [],
  t,
  organizeInPlace,
  setOrganizeInPlace,
}) {
  const {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSortToggle,
    sortedItems,
    columns,
    showingCount,
    totalCount,
  } = useRenameModalViewModel({ items, t, organizeInPlace });

  return (
    <Stack gap="lg" fullWidth className="u-max-h-70vh">
      <Input
        type="text"
        placeholder={t('organizer.searchPlaceholder') || 'Search files...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftElement={<Search size={18} />}
        className="u-flex-shrink-0"
      />

      <Inline align="center" justify="between" className="u-flex-shrink-0">
        <Text variant="small" color="muted">
          {t('organizer.renameModal.showing')
            .replace('{count}', showingCount)
            .replace('{total}', totalCount)}
        </Text>
        <Checkbox
          checked={organizeInPlace}
          onChange={(e) => setOrganizeInPlace(e.target.checked)}
        >
          {t('organizer.renameModal.organizeInPlaceCheckbox') || 'Keep original filenames (Organize in Place)'}
        </Checkbox>
      </Inline>

      <Stack flex={1} fullHeight className="u-max-h-45vh u-min-h-0">
        <Card variant="soft" padding="none" fullHeight className="u-min-h-0">
          <Table
            variant="grid"
            virtualized
            columns={columns}
            rows={sortedItems}
            sortKey={sortConfig.key}
            sortDirection={sortConfig.direction}
            onSort={handleSortToggle}
            emptyText={t('organizer.renameModal.noMatching')}
            className="u-h-full u-min-h-0"
          />
        </Card>
      </Stack>
    </Stack>
  );
}
