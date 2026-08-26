import Input from '@/ui/Input';
import Button from '@/ui/Button';
import IconButton from '@/ui/IconButton';
import Tooltip from '@/ui/Tooltip';
import { resolveMediaImageUrl } from '@/lib/imageUrls';
import Spinner from '@/ui/Spinner';
import Skeleton from '@/ui/Skeleton';
import Alert from '@/ui/Alert';
import EmptyState from '@/ui/EmptyState';
import Card from '@/ui/Card';
import { Search, Link as LinkIcon, User, Trash2, GitFork, Star, ArrowLeft } from '@/ui/icons';
import Grid from '@/ui/Grid';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { usePerformerLinking } from './usePerformerLinking';
import GenderSilhouette from './GenderSilhouette';
import styles from './PerformerLinkingTab.module.css';

export default function PerformerLinkingTab({ personId, defaultQuery = '', person: initialPerson }) {
  const {
    t,
    person,
    sourceBuckets,
    activeSearchSource,
    query,
    setQuery,
    filteredResults,
    isSearching,
    error,
    hasSearched,
    linkingSource,
    linkMutation,
    unlinkMutation,
    setPrimaryMutation,
    getLinkedInfo,
    handleSearch,
    handleLink,
    handleUnlink,
    handleSetPrimary,
    resetSearch,
    handleOpenSearch,
  } = usePerformerLinking({ personId, defaultQuery, person: initialPerson });

  if (activeSearchSource) {
    return (
      <Stack gap="xl" fullWidth>
        <Inline gap="lg" align="center">
          <Button
            variant="secondary-neutral"
            leftIcon={<ArrowLeft size={14} />}
            animateIcon
            onClick={resetSearch}
          >
            {t('library.performerEdit.backToSources') || 'Back to Sources'}
          </Button>
          <Text variant="title" weight="semibold">
            {t('common.search') || 'Search'} {sourceBuckets.find((b) => b.key === activeSearchSource)?.label}
          </Text>
        </Inline>

        <Inline as="form" onSubmit={handleSearch} gap="md" align="center" className={styles['search-form']}>
          <Input
            flex={1}
            type="text"
            placeholder={t('library.addPeople.adultTmdbSearchPlaceholder') || 'Search performer...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <Tooltip content={isSearching ? (t('library.performerEdit.searching') || 'Searching...') : (t('common.search') || 'Search')} side="top">
            <IconButton
              type="submit"
              variant="secondary"
              disabled={isSearching}
            >
              <Search size={16} />
            </IconButton>
          </Tooltip>
        </Inline>

        <div>
          {isSearching ? (
            <Grid variant="auto-poster">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={`linking-skeleton-${idx}`} variant="flat-glass" padding="none">
                  <div className={styles['image-wrapper']}>
                    <Skeleton width="100%" height="100%" radius="0" />
                  </div>
                  <Stack gap="sm" padding="sm" flex={1} justify="between">
                    <Stack gap="2xs">
                      <Skeleton variant="text" width="70%" height="0.875rem" />
                      <Skeleton variant="text" width="40%" height="0.625rem" />
                    </Stack>
                    <Skeleton height="var(--button-height-sm)" radius="var(--radius-sm)" />
                  </Stack>
                </Card>
              ))}
            </Grid>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : filteredResults.length > 0 ? (
            <Grid variant="auto-poster">
              {filteredResults.map((item) => {
                const rawProfileUrl = item.profile_path || item.poster_path;
                const profileUrl = rawProfileUrl ? resolveMediaImageUrl(rawProfileUrl, 'personThumb') : null;
                return (
                  <Card key={item.id} variant="flat-glass" padding="none">
                    <div className={styles['image-wrapper']}>
                      {profileUrl ? (
                        <img src={profileUrl} alt={item.name} className={styles['card-img']} />
                      ) : (
                        <div className={styles['avatar-placeholder']}>
                          <GenderSilhouette gender={item.gender !== undefined ? item.gender : person?.gender} />
                        </div>
                      )}
                    </div>
                    <Stack gap="sm" padding="sm" flex={1} justify="between">
                      <Stack gap="2xs">
                        <Text variant="small" weight="semibold" clamp={2} color="primary" title={item.name}>
                          {item.name}
                        </Text>
                        {item.disambiguation && (
                          <Text variant="2xs" color="muted" truncate title={item.disambiguation}>
                            {item.disambiguation}
                          </Text>
                        )}
                      </Stack>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleLink(item)}
                        disabled={linkMutation.isPending}
                        icon={LinkIcon}
                        fullWidth
                      >
                        {t('library.performerEdit.link') || 'Link'}
                      </Button>
                    </Stack>
                  </Card>
                );
              })}
            </Grid>
          ) : hasSearched ? (
            <EmptyState
              border="dashed"
              background="translucent"
              size="md"
              description={t('library.performerEdit.noResultsMatch') || 'No results match the query. Try a different name.'}
            />
          ) : (
            <EmptyState
              border="dashed"
              background="translucent"
              size="md"
              description={t('library.performerEdit.typeANameHint') || 'Type a name above and press search to locate performer data.'}
            />
          )}
        </div>
      </Stack>
    );
  }

  return (
    <Stack gap="md" fullWidth>
      <Grid variant="scene">
        {sourceBuckets.map((bucket) => {
          const linkedInfo = getLinkedInfo(bucket);
          const isLinked = Boolean(linkedInfo);
          const isPrimary = person?.primary_provider === bucket.dbName;
          const profileImg = isLinked ? (linkedInfo.profile_url ? resolveMediaImageUrl(linkedInfo.profile_url, 'personThumb') : (person?.profile_path ? resolveMediaImageUrl(person.profile_path, 'personThumb') : null)) : null;
          const isLinking = linkingSource === bucket.key;

          return (
            <Card
              key={bucket.key}
              variant="flat-glass"
              padding="none"
              className={styles['linker-card']}
              data-primary={isPrimary}
              data-linked={isLinked}
              data-linking={isLinking}
            >
              <div className={styles['image-wrapper']}>
                {isLinking ? (
                  <GenderSilhouette gender={person?.gender} isLinking={true} />
                ) : isLinked ? (
                  profileImg ? (
                    <img src={profileImg} alt={person?.name} className={styles['card-img']} />
                  ) : (
                    <div className={styles['avatar-placeholder']}>
                      <User size={32} />
                    </div>
                  )
                ) : (
                  <GenderSilhouette gender={person?.gender} />
                )}
                <div className={styles['card-badge']}>
                  {bucket.label}
                </div>
              </div>

              <Stack gap="md" padding="md" flex={1} justify="between" className={styles['card-body']}>
                <Stack gap="2xs">
                  {isLinking ? (
                    <Stack gap="sm" align="center" justify="center" className={styles['linking-spinner']}>
                      <Spinner label={t('library.performerEdit.linkingEnriching') || 'Linking & Enriching...'} />
                    </Stack>
                  ) : isLinked ? (
                    <>
                      <Text variant="small" weight="semibold" truncate color="primary">
                        {person?.name}
                      </Text>
                      <Text variant="2xs" color="muted" title={linkedInfo.external_id}>
                        {t('library.performerEdit.idLabel') || 'ID:'} {linkedInfo.external_id}
                      </Text>
                    </>
                  ) : (
                    <Text variant="small" color="muted" italic>
                      {t('library.performerEdit.notConnected') || 'Not Connected'}
                    </Text>
                  )}
                </Stack>

                <Stack gap="sm">
                  {isLinking ? null : isLinked ? (
                    <Stack gap="sm">
                      <Grid variant="split" gap="xs">
                        <Tooltip content="Separate profile connection" side="top" fullWidth>
                          <Button
                            variant="secondary-neutral"
                            size="sm"
                            onClick={() => handleUnlink(bucket.key, 'split')}
                            disabled={unlinkMutation.isPending}
                            icon={GitFork}
                            fullWidth
                          >
                            {t('library.performerEdit.split') || 'Split'}
                          </Button>
                        </Tooltip>
                        <Tooltip content="Remove profile link" side="top" fullWidth>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleUnlink(bucket.key, 'remove')}
                            disabled={unlinkMutation.isPending}
                            icon={Trash2}
                            fullWidth
                          >
                            {t('common.remove') || 'Remove'}
                          </Button>
                        </Tooltip>
                      </Grid>

                      <Button
                        variant={isPrimary ? 'primary' : 'secondary-neutral'}
                        size="sm"
                        onClick={() => handleSetPrimary(isPrimary ? 'none' : bucket.key)}
                        disabled={setPrimaryMutation.isPending}
                        icon={Star}
                        fullWidth
                      >
                        {isPrimary ? (t('library.performerEdit.primarySource') || 'Primary Source') : (t('library.performerEdit.setPrimary') || 'Set Primary')}
                      </Button>
                    </Stack>
                  ) : (
                    <Tooltip
                      content={!bucket.isConfigured ? (t('library.performerEdit.apiKeyRequired') || 'API key required in Settings') : null}
                      disabled={bucket.isConfigured}
                      side="top"
                      fullWidth
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleOpenSearch(bucket.key)}
                        disabled={!bucket.isConfigured}
                        icon={Search}
                        fullWidth
                      >
                        {t('library.performerEdit.connect') || 'Connect'}
                      </Button>
                    </Tooltip>
                  )}
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Grid>
    </Stack>
  );
}


