import { useState, useMemo, createElement } from 'react';
import Tooltip from '@/ui/Tooltip';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { compareOrganizerValues } from '@/lib/mappers';
import { useOrganizerSort } from '../../hooks/useOrganizerSort';
import { useLocalListSearch } from '@/hooks/useLocalListSearch';

const RENAME_SEARCH_KEYS = ['source', 'target', 'type'];
const WARNING_ICON = '⚠️';

export function useRenameModalViewModel({ items = [], t, organizeInPlace }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { sortConfig, handleSortToggle } = useOrganizerSort('target', 'asc');

  const filteredItems = useLocalListSearch(items, searchQuery, RENAME_SEARCH_KEYS);

  const sortedItems = useMemo(() => {
    const result = [...filteredItems];
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key] || '';
        const valB = b[sortConfig.key] || '';
        const comp = compareOrganizerValues(valA, valB);
        return sortConfig.direction === 'asc' ? comp : -comp;
      });
    }
    return result;
  }, [filteredItems, sortConfig]);

  const columns = useMemo(() => [
    {
      key: 'source',
      label: t('organizer.renameModal.currentFilename') || 'Current Filename',
      sortable: true,
      width: '45%',
      render: (value, row) => createElement(
        Tooltip,
        { content: row.sourcePath, side: 'top', align: 'start', fullWidth: true, triggerClassName: 'u-min-w-0' },
        createElement(Text, { color: 'secondary', truncate: true }, row.source)
      ),
    },
    {
      key: 'target',
      label: t('organizer.renameModal.newFilename') || 'New Filename',
      sortable: true,
      width: '45%',
      render: (value, row) => {
        const tooltipBody = createElement(
          Stack,
          { gap: '2xs' },
          createElement(Text, { variant: 'small' }, organizeInPlace ? row.sourcePath : row.targetPath),
          row.warnings && row.warnings.length > 0 && createElement(
            Stack,
            { gap: '2xs' },
            row.warnings.map((w, idx) => createElement(
              Text,
              { key: idx, color: 'warning', variant: 'xsmall' },
              `${WARNING_ICON} ${w}`
            ))
          )
        );

        const hasWarnings = row.warnings && row.warnings.length > 0;
        return createElement(
          Tooltip,
          { content: tooltipBody, side: 'top', align: 'start', fullWidth: true, triggerClassName: 'u-min-w-0' },
          createElement(
            Text,
            {
              color: hasWarnings ? 'warning' : (organizeInPlace ? 'faint' : 'accent'),
              weight: organizeInPlace ? undefined : 'medium',
              italic: organizeInPlace,
              truncate: true,
            },
            hasWarnings && `${WARNING_ICON} `,
            organizeInPlace ? row.source : row.target
          )
        );
      },
    },
    {
      key: 'type',
      label: t('organizer.table.type') || 'Type',
      sortable: true,
      width: '10%',
      align: 'center',
    },
  ], [t, organizeInPlace]);

  return {
    searchQuery,
    setSearchQuery,
    sortConfig,
    handleSortToggle,
    sortedItems,
    columns,
    showingCount: sortedItems.length,
    totalCount: items.length,
  };
}

export default useRenameModalViewModel;
