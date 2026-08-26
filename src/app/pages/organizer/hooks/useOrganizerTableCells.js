import { useOrganizerRowFormatter } from './useOrganizerRowFormatter';

export { useOrganizerRowFormatter } from './useOrganizerRowFormatter';

/**
 * View-model evaluation for Organizer Arrow Cell.
 *
 * @param {Object} params
 * @param {Object} params.row - Organizer row data
 * @param {string} [params.activeMainTab] - Active main tab ('pending' | 'manual' | 'extras' | etc.)
 * @returns {Object} { showArrow }
 */
export function useOrganizerArrowCellModel({ row = {}, activeMainTab }) {
  const { showArrow } = useOrganizerRowFormatter({ row, activeMainTab });
  return { showArrow };
}

/**
 * View-model evaluation for Organizer Proposed Filename Cell.
 *
 * @param {Object} params
 * @param {any} params.value - Proposed filename text value
 * @param {Object} params.row - Organizer row data
 * @param {string} [params.activeMainTab] - Active main tab
 * @param {Function} [params.onOpenMatch] - Callback to open match modal
 * @param {Function} [params.onOpenOverride] - Callback to open override modal
 * @param {Function} params.t - Localization translation function
 * @returns {Object} { badgeInfo, buttonInfo, textValue, handleActionClick }
 */
export function useOrganizerProposedFilenameCellModel({
  value,
  row = {},
  activeMainTab,
  onOpenMatch,
  onOpenOverride,
  t,
}) {
  const { badgeInfo, buttonInfo, textValue, handleActionClick } = useOrganizerRowFormatter({
    value,
    row,
    activeMainTab,
    onOpenMatch,
    onOpenOverride,
    t,
  });

  return {
    badgeInfo,
    buttonInfo,
    textValue,
    handleActionClick,
  };
}

/**
 * View-model evaluation for Organizer Status Cell.
 *
 * @param {Object} params
 * @param {any} params.value - Status text value
 * @param {Object} params.row - Organizer row data
 * @param {string} [params.collisionStrategy] - Current collision strategy
 * @param {Function} params.normalizeStatusTone - Function to normalize status tone
 * @param {Function} params.t - Localization translation function
 * @returns {Object} { statusTone, statusLabel, collisionPill, missingSeason, missingEpisode }
 */
export function useOrganizerStatusCellModel({
  value,
  row = {},
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
  } = useOrganizerRowFormatter({
    value,
    row,
    collisionStrategy,
    normalizeStatusTone,
    t,
  });

  return {
    statusTone,
    statusLabel,
    collisionPill,
    missingSeason,
    missingEpisode,
  };
}
