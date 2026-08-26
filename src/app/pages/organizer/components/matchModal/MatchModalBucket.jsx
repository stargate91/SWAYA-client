import PropTypes from 'prop-types';
import Chip from '@/ui/Chip';
import Inline from '@/ui/Inline';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Stack from '@/ui/Stack';
import { useMatchModalBucketSelection } from '../../hooks/useMatchModalBucketSelection';

export default function MatchModalBucket({
  view,
  bucketEpisodeNumbers,
  onToggle,
  t,
}) {
  const {
    isVisible,
    chips,
    title,
  } = useMatchModalBucketSelection({
    view,
    bucketEpisodeNumbers,
    onToggle,
    t,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <Card variant="soft" padding="md">
      <Stack gap="sm">
        <Text variant="small" weight="bold">
          {title}
        </Text>
        <Inline gap="sm">
          {chips.map(({ episodeNumber, label, onRemove }) => (
            <Chip
              key={`bucket-${episodeNumber}`}
              onRemove={onRemove}
            >
              {label}
            </Chip>
          ))}
        </Inline>
      </Stack>
    </Card>
  );
}

MatchModalBucket.propTypes = {
  view: PropTypes.string,
  bucketEpisodeNumbers: PropTypes.array,
  onToggle: PropTypes.func,
  t: PropTypes.func,
};
