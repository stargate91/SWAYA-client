import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import Spinner from '@/ui/Spinner';
import { Clock } from '@/ui/icons';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Card from '@/ui/Card';
import VirtualList from '@/ui/VirtualList';
import WatchedHistoryItemCard from './WatchedHistoryItemCard';
import styles from './HistoryList.module.css';

export default function WatchedHistoryList({
  isLoading,
  watchedHistory,
  hasNextPage,
  isFetchingNextPage,
  sentinelRef,
  playMutation,
  handlePlay,
  onTitleClick,
  t,
}) {
  if (isLoading) {
    return (
      <Stack gap="md">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} variant="soft" padding="md">
            <Inline gap="lg" align="center">
              <Skeleton variant="rect" width="6.25rem" height="3.5rem" radius="var(--radius-md)" />
              <Stack gap="sm" flex={1}>
                <Skeleton variant="rect" width="15.625rem" height="1.25rem" />
                <Skeleton variant="rect" width="9.375rem" height="0.875rem" />
              </Stack>
            </Inline>
          </Card>
        ))}
      </Stack>
    );
  }

  if (!watchedHistory || watchedHistory.length === 0) {
    return (
      <EmptyState
        size="lg"
        border="dashed"
        background="solid"
        title={t('historyPage.watchedEmptyTitle') || 'No playback history'}
        description={t('historyPage.watchedEmptyDesc') || 'Your recently watched movies and tv will be listed here.'}
        icon={Clock}
      />
    );
  }

  return (
    <Stack gap="lg">
      <VirtualList
        items={watchedHistory}
        estimateSize={96}
        gap="lg"
        scrollSelector=".shell__content"
        renderItem={(log, index) => (
          <WatchedHistoryItemCard
            key={log.id}
            log={log}
            index={index}
            playMutation={playMutation}
            handlePlay={handlePlay}
            onTitleClick={onTitleClick}
            t={t}
          />
        )}
      />
      {hasNextPage && (
        <Inline ref={sentinelRef} id="watched-sentinel" align="center" justify="center" className={styles.sentinel}>
          {isFetchingNextPage && <Spinner size={20} />}
        </Inline>
      )}
    </Stack>
  );
}
