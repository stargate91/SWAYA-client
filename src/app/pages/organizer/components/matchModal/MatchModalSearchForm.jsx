import { Search } from '@/ui/icons';
import { isNsfwMode } from '@/stores/useLibraryModeStore';
import IconButton from '@/ui/IconButton';
import Tooltip from '@/ui/Tooltip';
import Input from '@/ui/Input';
import SearchInputCombo from '@/ui/SearchInputCombo';
import Inline from '@/ui/Inline';
import { useMatchModalPlaceholders } from '../../hooks/useMatchModalPlaceholders';
import styles from './MatchModalSearchForm.module.css';

export default function MatchModalSearchForm({
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
  onSearch,
  isBulk = false,
  t,
  provider,
  setProvider,
  sessionMode,
  providerOptions,
}) {
  const { queryPlaceholder } = useMatchModalPlaceholders({ mode, isTvMode, t });

  return (
    <form
      onSubmit={onSearch}
      className={styles.form}
    >
      <Inline align="center" gap="md" fullWidth wrap={false}>
        <div className={styles['query-wrapper']}>
          {isNsfwMode(sessionMode) ? (
            <SearchInputCombo
              size="lg"
              showSearchIcon={false}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={queryPlaceholder}
              selectedOption={provider}
              onOptionChange={(val) => setProvider({ target: { value: val } })}
              options={providerOptions}
              aria-label={t('organizer.details.matchModal.query')}
            />
          ) : (
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={queryPlaceholder}
              aria-label={t('organizer.details.matchModal.query')}
            />
          )}
        </div>

        <div className={styles['year-input']}>
          <Input
            value={year}
            onChange={(event) => setYear(event.target.value)}
            placeholder={t('organizer.details.matchModal.year')}
            aria-label={t('organizer.details.matchModal.year')}
            inputMode="numeric"
          />
        </div>

        {isTvMode && !isBulk ? (
          <div className={styles['episode-input']}>
            <Input
              value={season}
              onChange={(event) => setSeason(event.target.value)}
              placeholder={t('organizer.details.matchModal.seasonShort')}
              aria-label={t('organizer.details.matchModal.seasonShort')}
              inputMode="numeric"
            />
          </div>
        ) : null}

        {isTvMode && !isBulk ? (
          <div className={styles['episode-input']}>
            <Input
              value={episode}
              onChange={(event) => setEpisode(event.target.value)}
              placeholder={t('organizer.details.matchModal.episodeShort')}
              aria-label={t('organizer.details.matchModal.episodeShort')}
              inputMode="numeric"
            />
          </div>
        ) : null}

        <Tooltip
          content={isSearching ? t('organizer.details.matchModal.searching') : t('common.search')}
          side="top"
        >
          <IconButton
            type="submit"
            variant="secondary"
            disabled={isSearching}
            label={isSearching ? t('organizer.details.matchModal.searching') : t('common.search')}
            title={null}
          >
            <Search size={15} />
          </IconButton>
        </Tooltip>
      </Inline>
    </form>
  );
}


