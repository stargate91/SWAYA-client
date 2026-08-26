import PropTypes from 'prop-types';
import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import Spinner from '@/ui/Spinner';
import { RotateCcw } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Card from '@/ui/Card';
import VirtualList from '@/ui/VirtualList';
import { useRenameHistoryList } from '../hooks/useRenameHistoryList';
import HistoryCard from './HistoryCard';
import styles from './HistoryList.module.css';

export default function RenameHistoryList({
  isLoading,
  history,
  hasNextPage,
  isFetchingNextPage,
  sentinelRef,
  isAnyTaskActive,
  revertingBatchIds,
  onConfirmUndo,
  t,
}) {
  const {
    isEmpty,
    emptyTitle,
    emptyDesc,
  } = useRenameHistoryList({
    history,
    t,
  });

  if (isLoading) {
    return (
      <Stack gap="md">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} variant="soft" padding="md">
            <Stack gap="sm">
              <Inline align="center" justify="between" fullWidth>
                <Skeleton variant="rect" width="12.5rem" height="1.5rem" />
                <Skeleton variant="rect" width="5rem" height="1.5rem" />
              </Inline>
              <Skeleton variant="text" width="60%" height="1rem" />
              <Skeleton variant="text" width="40%" height="1rem" />
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        size="lg"
        border="dashed"
        background="solid"
        title={emptyTitle}
        description={emptyDesc}
        icon={RotateCcw}
      />
    );
  }

  return (
    <Stack gap="lg">
      <VirtualList
        items={history}
        estimateSize={140}
        gap="lg"
        scrollSelector=".shell__content"
        renderItem={(batch, index) => (
          <HistoryCard
            key={batch.id}
            batch={batch}
            index={index}
            isAnyTaskActive={isAnyTaskActive}
            isReverting={revertingBatchIds?.has(batch.id)}
            onConfirmUndo={onConfirmUndo}
          />
        )}
      />
      {hasNextPage && (
        <Inline ref={sentinelRef} id="history-sentinel" align="center" justify="center" className={styles.sentinel}>
          {isFetchingNextPage && <Spinner size={20} />}
        </Inline>
      )}
    </Stack>
  );
}

RenameHistoryList.propTypes = {
  isLoading: PropTypes.bool,
  history: PropTypes.array,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool,
  sentinelRef: PropTypes.object,
  isAnyTaskActive: PropTypes.bool,
  revertingBatchIds: PropTypes.object,
  onConfirmUndo: PropTypes.func,
  t: PropTypes.func,
};
