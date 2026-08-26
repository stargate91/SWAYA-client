import Spinner from '@/ui/Spinner';
import Skeleton from '@/ui/Skeleton';
import MatchModalSearchForm from './MatchModalSearchForm';
import MatchModalBrowserToolbar from './MatchModalBrowserToolbar';
import MatchModalBucket from './MatchModalBucket';
import MatchModalResults from './MatchModalResults';
import MatchModalBrowser from './MatchModalBrowser';
import useMatchModalViewModel from '../../hooks/useMatchModalViewModel';
import EmptyState from '@/ui/EmptyState';
import ScrollRow from '@/ui/ScrollRow';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import styles from './MatchModalResults.module.css';

function getInitialMatchEmptyState({ row, mode, t }) {
  const isTvMode = mode === 'tv' || mode === 'tv';
  const isSceneMode = mode === 'scene';

  if (row?.rawStatus === 'no_match') {
    return {
      title: t('organizer.details.matchModal.noDetectedMatchesTitle') || 'No detected matches',
      description: isSceneMode
        ? (t('organizer.details.matchModal.noDetectedMatchesSceneDesc') || 'We could not detect a usable scene match for this item. Search above to find the right scene.')
        : isTvMode
          ? (t('organizer.details.matchModal.noDetectedMatchesTvDesc') || 'We could not detect a usable tv match for this item. Search above to find the right show.')
          : (t('organizer.details.matchModal.noDetectedMatchesMovieDesc') || 'We could not detect a usable movie match for this item. Search above to find the right title.'),
    };
  }

  if (row?.rawStatus === 'error') {
    return {
      title: t('organizer.details.matchModal.errorDetectedMatchesTitle') || 'Automatic matching ran into an issue',
      description: isSceneMode
        ? (t('organizer.details.matchModal.errorDetectedMatchesSceneDesc') || 'This item could not be matched automatically right now. Search above to choose the correct scene manually.')
        : isTvMode
          ? (t('organizer.details.matchModal.errorDetectedMatchesTvDesc') || 'This item could not be matched automatically right now. Search above to choose the correct show manually.')
          : (t('organizer.details.matchModal.errorDetectedMatchesMovieDesc') || 'This item could not be matched automatically right now. Search above to choose the correct movie manually.'),
    };
  }

  return {
    title: t('organizer.details.matchModal.noDetectedMatchesTitle') || 'No detected matches',
    description: isSceneMode
      ? (t('organizer.details.matchModal.noDetectedMatchesSceneDesc') || 'We could not detect a usable scene match for this item. Search above to find the right scene.')
      : isTvMode
        ? (t('organizer.details.matchModal.noDetectedMatchesTvDesc') || 'We could not detect a usable tv match for this item. Search above to find the right show.')
        : (t('organizer.details.matchModal.noDetectedMatchesMovieDesc') || 'We could not detect a usable movie match for this item. Search above to find the right title.'),
  };
}

export default function OrganizerMatchModalContent({
  row,
  rows = [],
  t,
  toast,
  onResolved,
  scanMode,
  sessionMode,
}) {
  const {
    query,
    setQuery,
    year,
    setYear,
    season,
    setSeason,
    episode,
    setEpisode,
    mode,
    isTvMode,
    isSearching,
    hasSearched,
    isBrowserLoading,
    browserTitle,
    browserMetaItems,
    results,
    browserState,
    bucketEpisodeNumbers,
    visibleResultCandidates,
    shouldShowPosterResults,
    shouldShowListResults,
    isResolvingId,
    provider,
    providerOptions,
    handleSearch,
    handleModeChange,
    handleCandidateSelect,
    handleBrowseSeason,
    handleSelectEpisode,
    handleBrowserBack,
    handleResolve,
    handleProviderChange,
    toggleBucketEpisode,
    handleApplyBucket,
  } = useMatchModalViewModel({ row, rows, t, toast, onResolved, scanMode });

  const targetRows = rows.length > 0 ? rows : (row ? [row] : []);
  const isBulk = targetRows.length > 1;
  const shouldShowStatusEmptyState = !isBulk && !hasSearched && browserState.view === 'results' && ['no_match', 'new', 'error'].includes(row?.rawStatus);
  const initialMatchEmptyState = shouldShowStatusEmptyState
    ? getInitialMatchEmptyState({ row, mode, t })
    : null;

  return (
    <Stack gap="lg">
      <MatchModalSearchForm
        query={query}
        setQuery={setQuery}
        year={year}
        setYear={setYear}
        season={season}
        setSeason={setSeason}
        episode={episode}
        setEpisode={setEpisode}
        mode={mode}
        isTvMode={isTvMode}
        isSearching={isSearching}
        onSearch={handleSearch}
        onModeChange={handleModeChange}
        isBulk={isBulk}
        t={t}
        provider={provider}
        setProvider={handleProviderChange}
        sessionMode={sessionMode}
        scanMode={scanMode}
        providerOptions={providerOptions}
      />

      <Stack gap="md" as="section">
        {isBulk && !hasSearched && browserState.view === 'results' ? (
          <EmptyState
            size="md"
            border="dashed"
            background="translucent"
            title={t('organizer.details.matchModal.bulkSearchIntroTitle')}
            description={t('organizer.details.matchModal.bulkSearchIntroDesc')}
          />
        ) : shouldShowStatusEmptyState ? (
          <EmptyState
            size="md"
            border="dashed"
            background="translucent"
            title={initialMatchEmptyState.title}
            description={initialMatchEmptyState.description}
          />
        ) : (
          <>
            <Stack gap="2xs">
              <Text variant="small" weight="bold">
                {browserState.view === 'results'
                  ? (hasSearched
                    ? t('organizer.details.matchModal.searchResults')
                    : t('organizer.details.matchModal.detectedMatches'))
                  : browserState.view === 'seasons'
                    ? t('organizer.details.matchModal.seasons')
                    : t('organizer.details.matchModal.episodes')}
              </Text>
              <Text variant="small" color="muted">
                {browserState.view === 'results'
                  ? (hasSearched
                    ? t('organizer.details.matchModal.searchResultsHint')
                    : t('organizer.details.matchModal.detectedMatchesHint'))
                  : browserState.view === 'seasons'
                    ? t('organizer.details.matchModal.seasonsHint')
                    : t('organizer.details.matchModal.episodesHint')}
              </Text>
            </Stack>

            <MatchModalBrowserToolbar
              view={browserState.view}
              browserTitle={browserTitle}
              browserMetaItems={browserMetaItems}
              tvCandidate={browserState.tvCandidate}
              selectedSeason={browserState.selectedSeason}
              bucketEpisodeNumbers={bucketEpisodeNumbers}
              onBack={handleBrowserBack}
              onResolve={handleResolve}
              onApplyBucket={handleApplyBucket}
              t={t}
            />

            {!isBulk ? (
              <MatchModalBucket
                view={browserState.view}
                bucketEpisodeNumbers={bucketEpisodeNumbers}
                onToggle={toggleBucketEpisode}
                t={t}
              />
            ) : null}

            {isBrowserLoading || isSearching ? (
              isSearching || hasSearched ? (
                <Stack gap="md" className={styles['results-list']}>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton.CompactCard
                      key={idx}
                      aspect={mode === 'scene' ? 'landscape' : 'poster'}
                    />
                  ))}
                </Stack>
              ) : (
                <ScrollRow
                  enableWheelScroll
                  showArrows
                  gap="sm"
                  className={styles['poster-row']}
                >
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <Skeleton.Card key={idx} aspect={mode === 'scene' ? 'scene' : 'poster'} />
                  ))}
                </ScrollRow>
              )
            ) : isResolvingId ? (
              <Spinner label={t('organizer.details.matchModal.applying')} />
            ) : null}

            {!isBrowserLoading && !isSearching ? (
              <MatchModalResults
                results={results}
                visibleResultCandidates={visibleResultCandidates}
                shouldShowPosterResults={shouldShowPosterResults}
                shouldShowListResults={shouldShowListResults}
                mode={mode}
                isResolvingId={isResolvingId}
                isBrowserLoading={isBrowserLoading}
                isSearching={isSearching}
                onCandidateSelect={handleCandidateSelect}
                row={row}
                t={t}
                hasSearched={hasSearched}
                view={browserState.view}
              />
            ) : null}

            <MatchModalBrowser
              browserState={browserState}
              isBrowserLoading={isBrowserLoading}
              row={row}
              bucketEpisodeNumbers={bucketEpisodeNumbers}
              isResolvingId={isResolvingId}
              onBrowseSeason={handleBrowseSeason}
              onSelectEpisode={handleSelectEpisode}
              onToggleBucketEpisode={toggleBucketEpisode}
              episode={episode}
              t={t}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
}
