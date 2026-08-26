import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import { Tabs } from '@/ui/Tabs';
import Chip from '@/ui/Chip';
import Divider from '@/ui/Divider';
import { Search } from '@/ui/icons';
import Input from '@/ui/Input';

export default function DrawerSearchHeader({
  isSfwVideoList,
  isAdultActive,
  source,
  onSourceChange,
  mediaType,
  setMediaType,
  mediaTypeOptions = [],
  showMediaTypeChips,
  provider,
  setProvider,
  providerOptions = [],
  showProviderChips,
  statusFilter,
  setStatusFilter,
  query,
  setQuery,
  placeholder,
  setResults,
  t,
}) {
  return (
    <>
      <Stack gap="sm" padding="lg">
        {!isSfwVideoList && (
          <Tabs
            variant="glass-pill"
            value={source}
            tabs={[
              { label: t('lists.source_library'), value: 'library' },
              { label: isAdultActive ? t('lists.source_discover_online') : t('lists.source_discover_tmdb'), value: 'discover' }
            ]}
            onChange={onSourceChange}
          />
        )}

        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          leftElement={<Search size={16} />}
        />

        <Inline gap="xs" align="center" wrap>
          {source === 'library' && (
            <Inline gap="xs" align="center">
              <Chip
                variant="glass"
                size="sm"
                active={statusFilter === 'not_added'}
                onClick={() => setStatusFilter('not_added')}
              >
                {t('lists.status_not_in_list')}
              </Chip>
              <Chip
                variant="glass"
                size="sm"
                active={statusFilter === 'added'}
                onClick={() => setStatusFilter('added')}
              >
                {t('lists.status_in_list')}
              </Chip>
            </Inline>
          )}

          {source === 'library' && showMediaTypeChips && (
            <Divider orientation="vertical" />
          )}

          {showMediaTypeChips && (
            <Inline gap="xs" align="center">
              {mediaTypeOptions.map((opt) => (
                <Chip
                  key={opt.value}
                  variant="glass"
                  size="sm"
                  active={mediaType === opt.value}
                  onClick={() => {
                    setMediaType(opt.value);
                    if (opt.value === 'scene') setProvider('theporndb');
                    else setProvider('tmdb');
                    setResults([]);
                  }}
                >
                  {opt.label}
                </Chip>
              ))}
            </Inline>
          )}

          {((source === 'library' || showMediaTypeChips) && showProviderChips) && (
            <Divider orientation="vertical" />
          )}

          {showProviderChips && (
            <Inline gap="xs" align="center">
              {providerOptions.map((opt) => (
                <Chip
                  key={opt.value}
                  variant="glass"
                  size="sm"
                  active={provider === opt.value}
                  onClick={() => {
                    setProvider(opt.value);
                    setResults([]);
                  }}
                >
                  {opt.label}
                </Chip>
              ))}
            </Inline>
          )}
        </Inline>
      </Stack>
      <Divider />
    </>
  );
}
