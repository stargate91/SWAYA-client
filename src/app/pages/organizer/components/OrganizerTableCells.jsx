import { memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, ChevronUp, ChevronDown } from '@/ui/icons';
import Checkbox from '@/ui/Checkbox';
import Pill from '@/ui/Pill';
import Tooltip from '@/ui/Tooltip';
import Inline from '@/ui/Inline';
import Badge from '@/ui/Badge';
import {
  useOrganizerArrowCellModel,
  useOrganizerProposedFilenameCellModel,
  useOrganizerStatusCellModel,
} from '../hooks/useOrganizerTableCells';
import tableStyles from '@/ui/Table.module.css';

export const OrganizerSelectHeader = memo(function OrganizerSelectHeader({ allSelected, onChange }) {
  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div onClick={(event) => event.stopPropagation()}>
      <Checkbox checked={allSelected} onChange={onChange} />
    </div>
  );
});

OrganizerSelectHeader.propTypes = {
  allSelected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export const OrganizerSelectCell = memo(function OrganizerSelectCell({ selected, onChange }) {
  return (
    /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
    <div onClick={(event) => event.stopPropagation()}>
      <Checkbox checked={selected} onChange={onChange} />
    </div>
  );
});

OrganizerSelectCell.propTypes = {
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export const OrganizerSortableHeader = memo(function OrganizerSortableHeader({
  label,
  sortKey,
  sortConfig,
  onSortToggle,
}) {
  if (!sortConfig || !onSortToggle) return label;
  const isActive = sortConfig.key === sortKey;
  return (
    <button
      type="button"
      className={tableStyles['sort-btn']}
      data-sort-active={isActive}
      onClick={(e) => {
        e.stopPropagation();
        onSortToggle(sortKey);
      }}
    >
      <span>{label}</span>
      {isActive ? (sortConfig.direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : null}
    </button>
  );
});

OrganizerSortableHeader.propTypes = {
  label: PropTypes.node,
  sortKey: PropTypes.string.isRequired,
  sortConfig: PropTypes.object,
  onSortToggle: PropTypes.func,
};

export const OrganizerArrowCell = memo(function OrganizerArrowCell({ row, activeMainTab }) {
  const { showArrow } = useOrganizerArrowCellModel({ row, activeMainTab });
  if (!showArrow) {
    return null;
  }
  return <ArrowRight size={14} className={tableStyles['cell-arrow']} />;
});

OrganizerArrowCell.propTypes = {
  row: PropTypes.object.isRequired,
  activeMainTab: PropTypes.string,
};

export const OrganizerProposedFilenameCell = memo(function OrganizerProposedFilenameCell({
  value,
  row,
  activeMainTab,
  onOpenMatch,
  onOpenOverride,
  t,
}) {
  const {
    badgeInfo,
    buttonInfo,
    textValue,
    handleActionClick,
  } = useOrganizerProposedFilenameCellModel({
    value,
    row,
    activeMainTab,
    onOpenMatch,
    onOpenOverride,
    t,
  });

  if (buttonInfo) {
    return (
      <button
        type="button"
        className={`${tableStyles['table-action-btn']} ${buttonInfo.isWarning ? tableStyles['is-warning'] : ''}`}
        onClick={handleActionClick}
      >
        {buttonInfo.label}
      </button>
    );
  }

  if (badgeInfo) {
    return <Badge family="status" tone={badgeInfo.tone}>{badgeInfo.label}</Badge>;
  }

  return (
    <span className={tableStyles['cell-value']}>
      {textValue}
    </span>
  );
});

OrganizerProposedFilenameCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object.isRequired,
  activeMainTab: PropTypes.string,
  onOpenMatch: PropTypes.func.isRequired,
  onOpenOverride: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export const OrganizerStatusCell = memo(function OrganizerStatusCell({
  value,
  row,
  collisionStrategy,
  normalizeStatusTone,
  t,
}) {
  const {
    statusTone,
    statusLabel,
    collisionPill,
    missingSeason,
    missingEpisode,
  } = useOrganizerStatusCellModel({
    value,
    row,
    collisionStrategy,
    normalizeStatusTone,
    t,
  });

  return (
    <Inline gap="sm" align="center" justify="center">
      <Pill variant={statusTone}>{statusLabel}</Pill>
      {collisionPill ? (
        <Pill variant="default">
          {collisionPill.label}
        </Pill>
      ) : null}
      {missingSeason ? (
        <Tooltip content={missingSeason.tooltip} side="top">
          <Pill variant="default">
            {missingSeason.label}
          </Pill>
        </Tooltip>
      ) : null}
      {missingEpisode ? (
        <Tooltip content={missingEpisode.tooltip} side="top">
          <Pill variant="default">
            {missingEpisode.label}
          </Pill>
        </Tooltip>
      ) : null}
    </Inline>
  );
});

OrganizerStatusCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object.isRequired,
  collisionStrategy: PropTypes.string,
  normalizeStatusTone: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

