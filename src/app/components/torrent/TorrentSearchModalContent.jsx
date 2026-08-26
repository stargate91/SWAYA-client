import PropTypes from 'prop-types';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Table from '@/ui/Table';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Chip from '@/ui/Chip';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import { Search } from '@/ui/icons';
import { useTranslation } from '@/providers/LanguageContext';
import { useTorrentSearch } from './useTorrentSearch';
import { useTorrentSearchColumns } from './hooks/useTorrentSearchColumns';

export default function TorrentSearchModalContent({
  defaultQuery,
  mediaType,
  provider,
  externalId,
  isAdult,
}) {
  const { t } = useTranslation();
  const {
    query,
    setQuery,
    performSearch,
    loading,
    resultsCount,
    filteredResults,
    availableSources,
    availableResolutions,
    availableCodecs,
    selectedSource,
    setSelectedSource,
    selectedResolution,
    setSelectedResolution,
    selectedCodec,
    setSelectedCodec,
    activeDownloads,
    downloadingHash,
    handleDownload,
  } = useTorrentSearch({ defaultQuery, mediaType, provider, externalId, isAdult });

  const { columns, tableRows } = useTorrentSearchColumns({
    t,
    selectedResolution,
    setSelectedResolution,
    selectedCodec,
    setSelectedCodec,
    setSelectedSource,
    activeDownloads,
    downloadingHash,
    handleDownload,
    filteredResults,
  });

  return (
    <Stack fullHeight gap="lg">
      <Inline gap="md">
        <Input
          flex={1}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('torrent.searchModal.searchPlaceholder') || 'Search term...'}
          onKeyDown={(e) => e.key === 'Enter' && performSearch()}
        />
        <Button onClick={() => performSearch()} disabled={loading} leftIcon={<Search size={16} />}>
          {t('torrent.searchModal.search') || 'Search'}
        </Button>
      </Inline>

      {resultsCount > 0 && !loading && (
        <Card variant="soft" padding="sm">
          <Stack gap="xs">
            {availableSources.length > 0 && (
              <Inline gap="xs" align="center" wrap>
                <Text variant="body" color="secondary" weight="semibold">
                  {t('torrent.searchModal.filterSource') || 'Source:'}
                </Text>
                <Chip
                  active={selectedSource === null}
                  size="sm"
                  onClick={() => setSelectedSource(null)}
                >
                  {t('torrent.searchModal.filterAll') || 'All'}
                </Chip>
                {availableSources.map((indexer) => (
                  <Chip
                    key={indexer}
                    active={selectedSource === indexer}
                    size="sm"
                    onClick={() => setSelectedSource(selectedSource === indexer ? null : indexer)}
                  >
                    {indexer}
                  </Chip>
                ))}
              </Inline>
            )}

            {availableResolutions.length > 0 && (
              <Inline gap="xs" align="center" wrap>
                <Text variant="body" color="secondary" weight="semibold">
                  {t('torrent.searchModal.filterResolution') || 'Resolution:'}
                </Text>
                <Chip
                  active={selectedResolution === null}
                  size="sm"
                  onClick={() => setSelectedResolution(null)}
                >
                  {t('torrent.searchModal.filterAll') || 'All'}
                </Chip>
                {availableResolutions.map((res) => (
                  <Chip
                    key={res}
                    active={selectedResolution === res}
                    size="sm"
                    onClick={() => setSelectedResolution(selectedResolution === res ? null : res)}
                  >
                    {res}
                  </Chip>
                ))}
              </Inline>
            )}

            {availableCodecs.length > 0 && (
              <Inline gap="xs" align="center" wrap>
                <Text variant="body" color="secondary" weight="semibold">
                  {t('torrent.searchModal.filterCodec') || 'Codec:'}
                </Text>
                <Chip
                  active={selectedCodec === null}
                  size="sm"
                  onClick={() => setSelectedCodec(null)}
                >
                  {t('torrent.searchModal.filterAll') || 'All'}
                </Chip>
                {availableCodecs.map((codec) => (
                  <Chip
                    key={codec}
                    active={selectedCodec === codec}
                    size="sm"
                    onClick={() => setSelectedCodec(selectedCodec === codec ? null : codec)}
                  >
                    {codec}
                  </Chip>
                ))}
              </Inline>
            )}
          </Stack>
        </Card>
      )}

      <Table
        columns={columns}
        rows={tableRows}
        loading={loading}
        loadingRowCount={6}
        emptyText={t('torrent.searchModal.noTorrents') || 'No torrents found. Try searching.'}
      />
    </Stack>
  );
}

TorrentSearchModalContent.propTypes = {
  defaultQuery: PropTypes.string,
  mediaType: PropTypes.string,
  provider: PropTypes.string,
  externalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAdult: PropTypes.bool,
};

