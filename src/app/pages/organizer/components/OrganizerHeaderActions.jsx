import Button from '@/ui/Button';
import SplitButton from '@/ui/SplitButton';

const getRestoreDismissedLabel = (t, count) => `${t('organizer.buttons.restoreDismissed')} (${count})`;

export default function OrganizerHeaderActions({
  hasVisibleItems = false,
  dismissedCount = 0,
  hasActiveVisibleItems = false,
  hasReviewNeeded = false,
  isScanActive = false,
  isBrowseStarting = false,
  isLoadingAll = false,
  isRenamePending = false,
  isRenameStarting = false,
  isRetryPending = false,
  isOrganizing = false,
  browseButtonLabel = '',
  loadRestButtonLabel = '',
  renameButtonLabel = '',
  shouldShowLoadRest = false,
  onRemoveAll,
  onRetryMatch,
  onRestoreDismissed,
  onBrowseAndScan,
  onLoadAll,
  onRename,
  t = (k) => k,
}) {
  if (!hasVisibleItems && dismissedCount === 0) {
    return null;
  }

  return (
    <>
      {hasActiveVisibleItems && onRemoveAll ? (
        <Button
          variant="secondary-neutral"
          size="sm"
          className="organizer-panel__browse-btn"
          onClick={onRemoveAll}
        >
          {t('organizer.buttons.removeAll')}
        </Button>
      ) : null}

      {hasReviewNeeded && onRetryMatch ? (
        <Button
          variant="secondary"
          size="sm"
          className="organizer-panel__browse-btn"
          onClick={onRetryMatch}
          disabled={isScanActive || isRetryPending}
        >
          {isRetryPending
            ? t('organizer.buttons.retrying') || 'Retrying...'
            : t('organizer.buttons.retryMatch') || 'Retry Match'}
        </Button>
      ) : null}

      {dismissedCount > 0 && onRestoreDismissed ? (
        <Button
          variant="secondary-neutral"
          size="sm"
          onClick={onRestoreDismissed}
        >
          {getRestoreDismissedLabel(t, dismissedCount)}
        </Button>
      ) : null}

      {hasVisibleItems ? (
        <>
          {onBrowseAndScan ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={onBrowseAndScan}
              disabled={isScanActive || isBrowseStarting}
            >
              {browseButtonLabel}
            </Button>
          ) : null}

          {shouldShowLoadRest && onLoadAll ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={onLoadAll}
              disabled={isLoadingAll}
            >
              {loadRestButtonLabel}
            </Button>
          ) : null}

          {onRename ? (
            <SplitButton
              variant="primary"
              size="sm"
              label={renameButtonLabel}
              onClick={() => onRename(false)}
              disabled={isOrganizing || isRenamePending || isRenameStarting}
              options={[
                {
                  label: renameButtonLabel,
                  onClick: () => onRename(false),
                },
                {
                  label: t('organizer.renameModal.organizeInPlace') || 'Organize in Place',
                  onClick: () => onRename(true),
                },
              ]}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}
