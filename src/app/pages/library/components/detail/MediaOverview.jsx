/* eslint-disable react/forbid-component-props */
import { useMediaDetailContext } from './MediaDetailContext';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';

export default function MediaOverview() {
  const { state, actions, t } = useMediaDetailContext();
  const {
    overview,
    overviewRef,
    isTruncated
  } = state;

  const {
    handleReadMore
  } = actions;

  if (!overview) return null;

  return (
    <Stack gap="xs" style={{ maxWidth: '35rem' }}>
      <Text
        as="div"
        ref={overviewRef}
        clamp={3}
        size="md"
        leading="relaxed"
        color="primary-80"
        shadow="tagline"
      >
        {overview}
      </Text>
      {isTruncated && (
        <Text
          interactive
          color="accent"
          size="md"
          onClick={handleReadMore}
        >
          {t('library.details.readMore') || 'Read More'}
        </Text>
      )}
    </Stack>
  );
}
