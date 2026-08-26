import Page from '@/ui/Page';
import Table from '@/ui/Table';
import EmptyState from '@/ui/EmptyState';
import Input from '@/ui/Input';
import IconButton from '@/ui/IconButton';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Grid from '@/ui/Grid';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import SegmentedControl from '@/ui/SegmentedControl';
import { useTranslation } from '@/providers/LanguageContext';
import {
  Search,
  RefreshCw,
  AlertTriangle,
  Download,
} from '@/ui/icons';
import { formatSpeed } from '@/lib/formatters';
import { useTorrentPage } from './hooks/useTorrentPage';
import { useTorrentTable } from './hooks/useTorrentTable';

export default function TorrentPage() {
  const { t } = useTranslation();
  const {
    torrentEnabled,
    isLoading,
    isFetching,
    refetch,
    torrents,
    filteredTorrents,
    stats,
    activeDownloadsRatio,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDirection,
    handleSort,
    pauseTorrent,
    resumeTorrent,
    deleteTorrent,
  } = useTorrentPage();

  const {
    columns,
    rowActions,
    filterOptions,
  } = useTorrentTable({
    t,
    resumeTorrent,
    pauseTorrent,
    deleteTorrent,
  });

  if (!torrentEnabled) {
    return (
      <EmptyState
        icon={AlertTriangle}
        iconColor="warning"
        size="lg"
        border="solid"
        background="solid"
        title={t('torrent.title') || 'Downloads'}
        description={
          t('torrent.disabledMessage') ||
          'Torrent integration is disabled. You can enable it under Settings > Torrents.'
        }
      />
    );
  }

  const headerActions = (
    <Tooltip content={t('torrent.actions.refresh') || 'Refresh torrents'} side="bottom">
      <IconButton
        variant="ghost"
        size="md"
        onClick={() => refetch()}
        disabled={isFetching}
        label={t('torrent.actions.refresh') || 'Refresh torrents'}
        title={null}
      >
        <RefreshCw size={16} className={isFetching ? 'u-spin' : ''} />
      </IconButton>
    </Tooltip>
  );

  return (
    <Page
      variant="viewport"
      title={t('torrent.title') || 'Downloads'}
      description={t('torrent.description') || 'Monitor and manage your active and completed downloads'}
      actions={headerActions}
    >
      <Stack fullHeight gap="xl">
        {/* Stats Cards Row */}
        <Grid variant="three-cols">
          <Card variant="default">
            <Stack gap="xs">
              <Text variant="caption" color="muted" weight="medium" uppercase>
                {t('torrent.stats.downloadSpeed') || 'Download Speed'}
              </Text>
              <Text variant="display" weight="bold">
                {formatSpeed(stats.totalDlSpeed)}
              </Text>
              <Text variant="xsmall" color="muted">
                {t('dynamic.torrent.stats.activeDownloadsDesc', { count: stats.downloadingCount }) ||
                  `Active across ${stats.downloadingCount} downloads`}
              </Text>
            </Stack>
          </Card>
          <Card variant="default">
            <Stack gap="xs">
              <Text variant="caption" color="muted" weight="medium" uppercase>
                {t('torrent.stats.activeDownloads') || 'Active Downloads'}
              </Text>
              <Text variant="display" weight="bold">
                {activeDownloadsRatio}
              </Text>
              <Text variant="xsmall" color="muted">
                {t('dynamic.torrent.stats.pausedDownloadsDesc', { count: stats.pausedCount }) ||
                  `${stats.pausedCount} downloads currently paused`}
              </Text>
            </Stack>
          </Card>
          <Card variant="default">
            <Stack gap="xs">
              <Text variant="caption" color="muted" weight="medium" uppercase>
                {t('torrent.stats.seeding') || 'Seeding'}
              </Text>
              <Text variant="display" weight="bold">
                {stats.seedingCount}
              </Text>
              <Text variant="xsmall" color="muted">
                {t('torrent.stats.seedingDesc') || 'Completed and sharing with swarm'}
              </Text>
            </Stack>
          </Card>
        </Grid>

        {!isLoading && torrents.length === 0 ? (
          <EmptyState
            size="lg"
            border="dashed"
            background="solid"
            icon={Download}
            animateIcon={true}
            fillHeight
            title={t('torrent.empty.title') || 'No downloads yet'}
            description={
              t('torrent.empty.description') ||
              'Your active torrent downloads will appear here. Add downloads by opening magnet links or adding torrent files.'
            }
          />
        ) : (
          <>
            {/* Filter and Search Bar */}
            <Inline align="center" justify="between" gap="md">
              <SegmentedControl
                options={filterOptions}
                value={activeFilter}
                onChange={setActiveFilter}
                variant="filter"
                animated={true}
              />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('torrent.searchPlaceholder') || 'Search downloads...'}
                leftElement={<Search size={16} />}
                size="sm"
              />
            </Inline>

            {/* Downloads Table */}
            <Table
              variant="default"
              virtualized={filteredTorrents.length > 15}
              estimateRowHeight={54}
              columns={columns}
              rows={filteredTorrents}
              loading={isLoading}
              emptyText={t('torrent.noTorrents') || 'No downloads found'}
              rowActions={rowActions}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              className="u-flex-grow-1 u-min-h-0"
            />
          </>
        )}
      </Stack>
    </Page>
  );
}
