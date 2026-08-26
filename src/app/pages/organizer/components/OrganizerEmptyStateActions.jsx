import Button from '@/ui/Button';

export default function OrganizerEmptyStateActions({
  emptyState = null,
  hasDatabaseItems = false,
  isScanActive = false,
  isBrowseStarting = false,
  isLoadingAll = false,
  browseButtonLabel = '',
  loadAllButtonLabel = '',
  onBrowseAndScan,
  onLoadAll,
}) {
  if (!emptyState) {
    return null;
  }

  if (hasDatabaseItems) {
    return (
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
        {onLoadAll ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onLoadAll}
            disabled={isLoadingAll}
          >
            {loadAllButtonLabel}
          </Button>
        ) : null}
      </>
    );
  }

  return onBrowseAndScan ? (
    <Button
      variant="primary"
      size="sm"
      onClick={onBrowseAndScan}
      disabled={isScanActive || isBrowseStarting}
    >
      {browseButtonLabel}
    </Button>
  ) : null;
}
