import { memo } from 'react';
import PropTypes from 'prop-types';
import Text from '@/ui/Text';
import Badge from '@/ui/Badge';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import LinearProgress from '@/ui/LinearProgress';
import {
  useTorrentProgressFormatter,
  useTorrentStatusBadgeFormatter,
} from '../hooks/useTorrentCellFormatters';

export const TorrentProgressCell = memo(function TorrentProgressCell({ progress, row }) {
  const {
    isDownloading,
    variant,
    progressPercent,
    speedAndEtaText,
  } = useTorrentProgressFormatter({ progress, row });

  return (
    <Stack gap="2xs" fullWidth>
      <LinearProgress value={progress} size="xs" variant={variant} />
      <Inline justify="between">
        <Text variant="xsmall" color="muted">
          {progressPercent}
        </Text>
        {isDownloading && (
          <Text variant="xsmall" color="accent" weight="medium">
            {speedAndEtaText}
          </Text>
        )}
      </Inline>
    </Stack>
  );
});

TorrentProgressCell.displayName = 'TorrentProgressCell';
TorrentProgressCell.propTypes = {
  progress: PropTypes.number,
  row: PropTypes.object,
};

export const TorrentStatusBadge = memo(function TorrentStatusBadge({ state, t }) {
  const { tone, label } = useTorrentStatusBadgeFormatter({ state, t });

  return <Badge tone={tone}>{label}</Badge>;
});

TorrentStatusBadge.displayName = 'TorrentStatusBadge';
TorrentStatusBadge.propTypes = {
  state: PropTypes.string,
  t: PropTypes.func,
};
