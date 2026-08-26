import { createElement } from 'react';
import tableStyles from '@/ui/Table.module.css';
import {
  OrganizerSelectHeader,
  OrganizerSelectCell,
  OrganizerSortableHeader,
  OrganizerArrowCell,
  OrganizerProposedFilenameCell,
  OrganizerStatusCell,
} from '../components/OrganizerTableCells';

const renderSelectColumn = (handleToggleAll, handleToggleRow) => ({
  key: 'select',
  label: (allSelected) => createElement(OrganizerSelectHeader, {
    allSelected,
    onChange: handleToggleAll,
  }),
  width: '48px',
  align: 'center',
  render: (value, row, selected) => createElement(OrganizerSelectCell, {
    selected,
    onChange: () => handleToggleRow(row.id),
  }),
});

export function buildOrganizerColumns({
  activeExtrasTab,
  activeMainTab,
  collisionStrategy,
  handleToggleAll,
  handleToggleRow,
  normalizeStatusTone,
  renderSortableLabel: customRenderSortableLabel,
  sortConfig,
  handleSortToggle,
  t,
  onOpenMatch,
  onOpenOverride,
  onMouseEnterSource,
  onMouseMoveSource,
  onMouseLeaveSource,
}) {
  const renderSortableLabel = customRenderSortableLabel || ((label, key) => createElement(OrganizerSortableHeader, {
    label,
    sortKey: key,
    sortConfig,
    onSortToggle: handleSortToggle,
  }));

  const columns = [
    renderSelectColumn(handleToggleAll, handleToggleRow),
    {
      key: 'source',
      label: renderSortableLabel(t('organizer.table.originalFilename'), 'source'),
      render: (value, row) => createElement(
        'span',
        {
          className: tableStyles['cell-value'],
          onMouseEnter: (e) => onMouseEnterSource && onMouseEnterSource(e, row),
          onMouseMove: (e) => onMouseMoveSource && onMouseMoveSource(e),
          onMouseLeave: () => onMouseLeaveSource && onMouseLeaveSource(),
        },
        value
      ),
    },
    {
      key: 'arrow',
      label: '',
      width: '32px',
      align: 'center',
      render: (value, row) => createElement(OrganizerArrowCell, { row, activeMainTab }),
    },
    {
      key: 'target',
      label: activeMainTab === 'manual'
        ? t('organizer.table.proposedFilename')
        : renderSortableLabel(t('organizer.table.proposedFilename'), 'target'),
      render: (value, row) => createElement(
        'div',
        {
          onMouseEnter: onMouseLeaveSource,
          className: tableStyles['full-width'],
        },
        createElement(OrganizerProposedFilenameCell, {
          value,
          row,
          activeMainTab,
          onOpenMatch,
          onOpenOverride,
          t,
        })
      ),
    },
  ];

  if (activeMainTab === 'extras') {
    if (activeExtrasTab === 'bonus' || activeExtrasTab === 'images') {
      columns.push({ key: 'category', label: renderSortableLabel(t('organizer.table.subcategory'), 'category'), align: 'center', width: '15%' });
    } else if (activeExtrasTab === 'subtitles' || activeExtrasTab === 'audio') {
      columns.push({ key: 'category', label: renderSortableLabel(t('organizer.table.subcategory'), 'category'), align: 'center', width: '15%' });
      columns.push({
        key: 'language',
        label: renderSortableLabel(t('organizer.table.language'), 'language'),
        align: 'center',
        width: '10%',
        render: (value) => (value ? String(value).substring(0, 2).toUpperCase() : ''),
      });
    } else if (activeExtrasTab === 'metadata') {
      columns.push({ key: 'extension', label: renderSortableLabel(t('organizer.table.extension'), 'extension'), align: 'center', width: '12%' });
    }
  } else {
    columns.push({
      key: 'status',
      label: activeMainTab === 'manual' ? renderSortableLabel(t('organizer.table.status'), 'status') : t('organizer.table.status'),
      align: 'center',
      width: '20%',
      render: (value, row) => createElement(OrganizerStatusCell, {
        value,
        row,
        collisionStrategy,
        normalizeStatusTone,
        t,
      }),
    });
  }

  const targetCol = columns.find((c) => c.key === 'target');
  if (activeMainTab === 'manual' && targetCol) {
    targetCol.width = '15%';
  }

  // Calculate sum of specific widths (excluding select, source)
  let specificPercent = 0;
  columns.forEach((col) => {
    if (col.key !== 'source' && col.width && col.width.endsWith('%')) {
      specificPercent += parseFloat(col.width);
    }
  });

  const remainingPercent = 100 - specificPercent;
  const sourceCol = columns.find((c) => c.key === 'source');
  if (sourceCol) {
    if (activeMainTab === 'manual') {
      sourceCol.width = `${remainingPercent.toFixed(2)}%`;
    } else {
      const halfWidth = `${(remainingPercent / 2).toFixed(2)}%`;
      sourceCol.width = halfWidth;
      if (targetCol) targetCol.width = halfWidth;
    }
  }

  return columns;
}
