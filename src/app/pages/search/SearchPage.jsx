import { Search, Clapperboard, ImageOff } from '@/ui/icons';
import Page from '@/ui/Page';
import Skeleton from '@/ui/Skeleton';
import EmptyState from '@/ui/EmptyState';
import Grid from '@/ui/Grid';
import Stack from '@/ui/Stack';
import Card from '@/ui/Card';
import { TYPES_BY_SOURCE } from '@/lib/searchConstants';
import useSearchPageController from './components/useSearchPageController';
import SearchInput from './components/SearchInput';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';

export default function SearchPage() {
  const {
    t,
    localQuery,
    setLocalQuery,
    urlQuery,
    urlSource,
    urlType,
    isLoading,
    isMoreLoading,
    setLoadedPage,
    hasMorePages,
    filteredResults,
    sourceOptions,
    typeOptions,
    handleSourceChange,
    handleTypeChange,
    handleSearchSubmit,
    handleCardClick,
    hasAnyProvider,
  } = useSearchPageController();

  const activeTypeObj = (TYPES_BY_SOURCE[urlSource] || []).find(t => t.id === urlType) || { name: urlType, icon: Clapperboard };
  const FallbackIcon = activeTypeObj.icon;

  const pageTitle = urlQuery 
    ? t('search.resultsFor', { query: urlQuery, defaultValue: `Search Results for "${urlQuery}"` }) 
    : t('search.title', { defaultValue: 'Global Search' });

  return (
    <Page title={pageTitle}>
      <Stack gap="xl">
        <Card variant="soft" padding="md">
          <Stack gap="lg">
            <SearchInput
              localQuery={localQuery}
              setLocalQuery={setLocalQuery}
              handleSearchSubmit={handleSearchSubmit}
              disabled={!hasAnyProvider}
              t={t}
            />

            <SearchFilters
              urlSource={urlSource}
              handleSourceChange={handleSourceChange}
              sourceOptions={sourceOptions}
              urlType={urlType}
              handleTypeChange={handleTypeChange}
              typeOptions={typeOptions}
              t={t}
            />
          </Stack>
        </Card>

        <Stack gap="md">
          {isLoading ? (
            <Grid variant={urlType === 'scene' ? 'scene' : ((urlType === 'studio' || urlType === 'company' || urlType === 'network') ? 'logo' : 'poster')}>
              {Array.from({ length: (urlType === 'studio' || urlType === 'company' || urlType === 'network') ? 12 : (urlType === 'scene' ? 8 : 16) }).map((_, idx) => (
                <Skeleton.Card
                  key={idx}
                  aspect={(urlType === 'studio' || urlType === 'company' || urlType === 'network') ? 'logo' : (urlType === 'scene' ? 'scene' : 'poster')}
                />
              ))}
            </Grid>
          ) : !urlQuery.trim() ? (
            <EmptyState
              size="lg"
              border="dashed"
              background="solid"
              icon={Search}
              title={t('search.empty.title', { defaultValue: 'Start Searching' })}
              description={t('search.empty.desc', { defaultValue: 'Search metadata from TMDb, StashDB, FansDB, or ThePornDB' })}
            />
          ) : filteredResults.length === 0 ? (
            <EmptyState
              size="lg"
              border="dashed"
              background="solid"
              icon={ImageOff}
              title={t('search.noResults.title', { defaultValue: 'No Results Found' })}
              description={t('search.noResults.desc', { defaultValue: 'Try another query or change search settings.' })}
            />
          ) : (
            <SearchResults
              filteredResults={filteredResults}
              urlType={urlType}
              FallbackIcon={FallbackIcon}
              handleCardClick={handleCardClick}
              hasMorePages={hasMorePages}
              setLoadedPage={setLoadedPage}
              isMoreLoading={isMoreLoading}
              t={t}
            />
          )}
        </Stack>
      </Stack>
    </Page>
  );
}
