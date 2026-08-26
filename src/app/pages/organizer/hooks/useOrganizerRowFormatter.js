import { useMemo, useCallback } from 'react';
import {
  isEpisodeMediaType,
  isMovieMediaType,
  isMovieOrEpisodeMediaType,
  isSceneMediaType,
} from '@/lib/mediaTypes';
import { mapCollisionStrategyLabel, shouldShowCollisionStrategy } from '@/lib/mappers';

const UNMATCHED_PARENT_STATUSES = ['new', 'uncertain', 'no_match', 'multiple', 'error'];

/**
 * Hook to compute complete row evaluation and formatting models
 * for Organizer table cells.
 *
 * @param {object} params
 * @param {object} params.row - Organizer row data
 * @param {string} [params.value] - Cell value (for filename/status cells)
 * @param {string} [params.activeMainTab] - Active main tab ('pending' | 'manual' | 'extras' | etc.)
 * @param {string} [params.collisionStrategy] - Collision resolution strategy
 * @param {Function} [params.normalizeStatusTone] - Status tone normalizer
 * @param {Function} [params.onOpenMatch] - Callback to open match modal
 * @param {Function} [params.onOpenOverride] - Callback to open override modal
 * @param {Function} [params.t] - Translation function
 */
export function useOrganizerRowFormatter({
  row = {},
  value,
  activeMainTab,
  collisionStrategy,
  normalizeStatusTone,
  onOpenMatch,
  onOpenOverride,
  t,
} = {}) {
  const isManualReview = activeMainTab === 'manual';
  const isExtra = row?.rawType === 'extra';
  const isEpisode = isEpisodeMediaType(row?.rawType);
  const isMovie = isMovieMediaType(row?.rawType);
  const isScene = isSceneMediaType(row?.rawType);

  const hasParentIssue = Boolean(
    isExtra &&
    row?.parentStatus &&
    UNMATCHED_PARENT_STATUSES.includes(row.parentStatus.toLowerCase())
  );
  const isSkipAction = isExtra && row?.rawAction === 'skip';
  const isDeleteAction = isExtra && row?.rawAction === 'delete';

  // Arrow cell model
  const showArrow = useMemo(() => {
    if (isManualReview && !isExtra) {
      return false;
    }
    if (isExtra && (hasParentIssue || isSkipAction || isDeleteAction)) {
      return false;
    }
    return true;
  }, [isManualReview, isExtra, hasParentIssue, isSkipAction, isDeleteAction]);

  // Proposed filename cell model
  const badgeInfo = useMemo(() => {
    if (isExtra) {
      if (hasParentIssue) {
        return {
          type: 'badge',
          tone: 'warning',
          label: t?.('organizer.table.targetNotes.fixParentFirst') || 'Fix parent first',
        };
      }
      if (isSkipAction) {
        return {
          type: 'badge',
          tone: 'neutral',
          label: t?.('organizer.table.targetNotes.skip') || 'Skip',
        };
      }
      if (isDeleteAction) {
        return {
          type: 'badge',
          tone: 'danger',
          label: t?.('organizer.table.targetNotes.delete') || 'Delete',
        };
      }
    }
    return null;
  }, [isExtra, hasParentIssue, isSkipAction, isDeleteAction, t]);

  const buttonInfo = useMemo(() => {
    if (!isManualReview || isExtra || row?.rawType === 'video') {
      return null;
    }

    const isMissingSeason = isEpisode && (row?.season === null || row?.season === undefined || row?.season === '');
    const isMissingEpisode = isEpisode && (row?.episode === null || row?.episode === undefined || row?.episode === '');

    if (isEpisode && (isMissingSeason || isMissingEpisode)) {
      let label = t?.('organizer.actions.fixEpisode') || 'Fix E';
      if (isMissingSeason && isMissingEpisode) {
        label = t?.('organizer.actions.fixSeasonAndEpisode') || 'Fix S & E';
      } else if (isMissingSeason) {
        label = t?.('organizer.actions.fixSeason') || 'Fix S';
      }

      return {
        type: 'button',
        actionType: 'override',
        label,
        isWarning: true,
      };
    }

    return {
      type: 'button',
      actionType: 'match',
      label: t?.('organizer.actions.fixMatch') || 'Fix Match',
      isWarning: false,
    };
  }, [isManualReview, isExtra, row?.rawType, isEpisode, row?.season, row?.episode, t]);

  const handleActionClick = useCallback(
    (e) => {
      e?.stopPropagation?.();
      if (!buttonInfo) return;
      if (buttonInfo.actionType === 'override') {
        onOpenOverride?.(row);
      } else {
        onOpenMatch?.(row);
      }
    },
    [buttonInfo, onOpenOverride, onOpenMatch, row]
  );

  // Status cell model
  const statusTone = useMemo(() => {
    return normalizeStatusTone?.(row?.statusTone || value, t) || 'default';
  }, [normalizeStatusTone, row?.statusTone, value, t]);

  const collisionPill = useMemo(() => {
    if (isMovieOrEpisodeMediaType(row?.rawType) && shouldShowCollisionStrategy(row)) {
      return {
        label: mapCollisionStrategyLabel(row?.rawAction || collisionStrategy, t),
      };
    }
    return null;
  }, [row, collisionStrategy, t]);

  const missingSeason = useMemo(() => {
    const isUncertain = row?.rawStatus === 'uncertain';
    const isNotMovieOrScene = !isMovie && !isScene;
    const hasMissingSeason = row?.season === null || row?.season === undefined || row?.season === '';

    if (isUncertain && isNotMovieOrScene && hasMissingSeason) {
      return {
        tooltip: t?.('organizer.status.missingSeasonTooltip') || 'Missing season information',
        label: t?.('organizer.status.missingSeason') || 'Missing Season',
      };
    }
    return null;
  }, [row?.rawStatus, isMovie, isScene, row?.season, t]);

  const missingEpisode = useMemo(() => {
    const isUncertain = row?.rawStatus === 'uncertain';
    const isNotMovieOrScene = !isMovie && !isScene;
    const hasMissingEpisode = row?.episode === null || row?.episode === undefined || row?.episode === '';

    if (isUncertain && isNotMovieOrScene && hasMissingEpisode) {
      return {
        tooltip: t?.('organizer.status.missingEpisodeTooltip') || 'Missing episode information',
        label: t?.('organizer.status.missingEpisode') || 'Missing Episode',
      };
    }
    return null;
  }, [row?.rawStatus, isMovie, isScene, row?.episode, t]);

  return {
    showArrow,
    badgeInfo,
    buttonInfo,
    textValue: value,
    handleActionClick,
    statusTone,
    statusLabel: value,
    collisionPill,
    missingSeason,
    missingEpisode,
    isExtra,
    isEpisode,
    isMovie,
    isScene,
    hasParentIssue,
    isSkipAction,
    isDeleteAction,
  };
}
