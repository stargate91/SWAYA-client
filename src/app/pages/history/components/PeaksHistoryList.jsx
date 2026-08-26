import PropTypes from 'prop-types';
import Spinner from '@/ui/Spinner';
import EmptyState from '@/ui/EmptyState';
import { Droplets } from '@/ui/icons';
import Stack from '@/ui/Stack';
import VirtualList from '@/ui/VirtualList';
import { usePeaksHistoryList } from '../hooks/usePeaksHistoryList';
import PeaksHistoryItemCard from './PeaksHistoryItemCard';

export default function PeaksHistoryList({
  isLoading,
  peaksData,
  playMutation,
  handlePlayMoment,
  setLightboxImage,
  onTitleClick,
  t,
}) {
  const {
    items,
    isEmpty,
    emptyTitle,
    emptyDesc,
  } = usePeaksHistoryList({
    peaksData,
    t,
  });

  if (isLoading) {
    return (
      <Stack justify="center" align="center" padding="4xl">
        <Spinner size="lg" />
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
        icon={Droplets}
      />
    );
  }

  return (
    <Stack gap="lg">
      <VirtualList
        items={items}
        estimateSize={96}
        gap="lg"
        scrollSelector=".shell__content"
        renderItem={(log, index) => (
          <PeaksHistoryItemCard
            key={log.id}
            log={log}
            index={index}
            playMutation={playMutation}
            handlePlayMoment={handlePlayMoment}
            setLightboxImage={setLightboxImage}
            onTitleClick={onTitleClick}
            t={t}
          />
        )}
      />
    </Stack>
  );
}

PeaksHistoryList.propTypes = {
  isLoading: PropTypes.bool,
  peaksData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  playMutation: PropTypes.object,
  handlePlayMoment: PropTypes.func,
  setLightboxImage: PropTypes.func,
  onTitleClick: PropTypes.func,
  t: PropTypes.func,
};
