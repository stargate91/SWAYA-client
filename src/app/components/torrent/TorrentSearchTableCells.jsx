import { memo } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@/ui/Tooltip';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Chip from '@/ui/Chip';
import Badge from '@/ui/Badge';
import Text from '@/ui/Text';
import IconButton from '@/ui/IconButton';
import Spinner from '@/ui/Spinner';
import { Download, CheckCircle } from '@/ui/icons';
import { formatPercent } from '@/lib/formatters';
import { getActiveDownloadMatch, getTorrentDownloadStatus } from './torrentMatching';
import styles from './TorrentSearchModalContent.module.css';

export const TorrentTitleCell = memo(function TorrentTitleCell({
  item,
  selectedResolution,
  setSelectedResolution,
  selectedCodec,
  setSelectedCodec,
}) {
  return (
    <Tooltip content={item.title} side="top" fullWidth>
      <Stack fullWidth gap="2xs" className={styles['title-stack']}>
        <Text weight="semibold" truncate>
          {item.title}
        </Text>
        <Inline gap="xs" wrap={false} className={styles['meta-inline']}>
          {item.year && <Badge size="xs">{item.year}</Badge>}
          {item.resolution && (
            <Chip
              size="xs"
              active={selectedResolution === item.resolution}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedResolution((prev) => (prev === item.resolution ? null : item.resolution));
              }}
            >
              {item.resolution}
            </Chip>
          )}
          {item.video_codec && (
            <Chip
              size="xs"
              active={selectedCodec === item.video_codec}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCodec((prev) => (prev === item.video_codec ? null : item.video_codec));
              }}
            >
              {item.video_codec}
            </Chip>
          )}
          {item.source && (
            <Badge size="xs" className={styles['source-badge']}>
              <Text as="span" variant="caption" truncate>
                {item.source}
              </Text>
            </Badge>
          )}
        </Inline>
        {item.release_group && (
          <Text variant="xsmall" color="muted" truncate title={item.release_group}>
            {item.release_group}
          </Text>
        )}
      </Stack>
    </Tooltip>
  );
});

TorrentTitleCell.propTypes = {
  item: PropTypes.object.isRequired,
  selectedResolution: PropTypes.string,
  setSelectedResolution: PropTypes.func.isRequired,
  selectedCodec: PropTypes.string,
  setSelectedCodec: PropTypes.func.isRequired,
};

export const TorrentActionCell = memo(function TorrentActionCell({
  item,
  activeDownloads,
  downloadingHash,
  handleDownload,
  t,
}) {
  const identifier = item.magnetUri || item.downloadUrl;
  const dlMatch = getActiveDownloadMatch(item, activeDownloads);
  const { isCompleted, isDownloading, progress, state } = getTorrentDownloadStatus(dlMatch);

  if (isCompleted) {
    return (
      <Tooltip content={t('torrent.searchModal.downloaded') || 'Already downloaded / Seeding'} side="top">
        <Badge tone="success" size="xs" roundness="full" leftIcon={<CheckCircle size={14} />} />
      </Tooltip>
    );
  }

  if (isDownloading) {
    return (
      <Tooltip
        content={
          t('dynamic.torrent.searchModal.statusInClientDownloading', { progress: formatPercent(progress) }) ||
          `${t('torrent.searchModal.downloading') || 'Downloading'} (${formatPercent(progress)}) - ${state}`
        }
        side="top"
      >
        <Badge tone="accent" size="xs" leftIcon={<Spinner size="xs" />}>
          {formatPercent(progress)}
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={t('torrent.searchModal.btnGet') || 'Get'} side="top">
      <IconButton
        variant="secondary"
        size="sm"
        disabled={downloadingHash !== null}
        onClick={() => handleDownload(item)}
        label={t('torrent.searchModal.btnGet') || 'Get'}
        title={null}
      >
        {downloadingHash === identifier ? (
          <Spinner size="xs" label="" />
        ) : (
          <Download size={14} />
        )}
      </IconButton>
    </Tooltip>
  );
});

TorrentActionCell.propTypes = {
  item: PropTypes.object.isRequired,
  activeDownloads: PropTypes.array,
  downloadingHash: PropTypes.string,
  handleDownload: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
