import Skeleton from '@/ui/Skeleton';
import ScrollRow from '@/ui/ScrollRow';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { useTranslation } from '@/providers/LanguageContext';
import useContinueWatching from './hooks/useContinueWatching';
import ContinueWatchingCard from './components/ContinueWatchingCard';

const ContinueWatchingWidget = () => {
  const { t: T } = useTranslation();
  const {
    isLoading,
    localItems,
    activePlayback,
    handlePlay,
    handleResetProgress,
  } = useContinueWatching();

  if (isLoading) {
    return (
      <Stack gap="xl" className="animate-fade-in">
        <Skeleton variant="text" width="14rem" height="2rem" />
        <Skeleton.Row>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rect"
              width="25.875rem"
              height="14.5625rem"
              radius="var(--radius-lg)"
            />
          ))}
        </Skeleton.Row>
      </Stack>
    );
  }

  if (!localItems.length && !activePlayback) {
    return null;
  }

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Text as="h3" variant="display" weight="extrabold">
        {T('dashboard.continue_watching.title') || 'Continue Watching'}
      </Text>
      <ScrollRow>
        {localItems.map((item) => (
          <ContinueWatchingCard
            key={`cw-${item.id}`}
            item={item}
            activePlayback={activePlayback}
            handlePlay={handlePlay}
            handleResetProgress={handleResetProgress}
            t={T}
          />
        ))}
      </ScrollRow>
    </Stack>
  );
};

export default ContinueWatchingWidget;
