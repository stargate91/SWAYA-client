import { ArrowUpRight, ExternalLink } from '@/ui/icons';
import Tooltip from '@/ui/Tooltip';
import { useTranslation } from '@/providers/LanguageContext';
import CompactCard from '@/ui/CompactCard';
import SearchInputCombo from '@/ui/SearchInputCombo';
import IconButton from '@/ui/IconButton';
import Divider from '@/ui/Divider';
import SectionHeader from '@/ui/SectionHeader';
import { formatYear, truncateText } from '@/lib/formatters';
import { useGlobalSearch } from './useGlobalSearch';
import styles from './GlobalSearch.module.css';

export default function GlobalSearch() {
  const { t } = useTranslation();

  const {
    query,
    selectedSource,
    selectedType,
    setSelectedType,
    isOverlayOpen,
    containerRef,
    inputRef,
    filteredResults,
    groupedSections,
    ActiveTypeIcon,
    placeholder,
    hasAnyProvider,
    isLiveDemo,
    isSearchDisabled,
    translatedSources,
    translatedTypeOptions,
    handleInputChange,
    handleSourceSelect,
    handleKeyDown,
    handleResultClick,
    handleAdvancedSearchClick,
    handleSeeAllClick,
    handleFocus,
    resolveCardImageUrl,
  } = useGlobalSearch({ t });

  const tooltipContent = isLiveDemo
    ? (t('search.demoDisabled') || 'Search is disabled in live demo')
    : !hasAnyProvider
      ? (t('search.noProvidersConfigured') || 'Configure API keys in Settings')
      : (t('common.advancedSearch') || 'Advanced Search');

  return (
    <div className={styles['global-search']} ref={containerRef}>
      <SearchInputCombo
        inputRef={inputRef}
        value={query}
        tabIndex={-1}
        disabled={isSearchDisabled}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder={placeholder}
        sources={translatedSources}
        selectedSource={selectedSource}
        onSourceChange={handleSourceSelect}
        sourceLabel={t('search.source') || 'Source'}
        optionLabel={t('search.type') || 'Type'}
        options={translatedTypeOptions}
        selectedOption={selectedType}
        onOptionChange={setSelectedType}
        size="xs"
        rightElement={
          <Tooltip content={tooltipContent} side="bottom">
            <IconButton
              variant="ghost"
              size="xs"
              tabIndex={-1}
              disabled={isSearchDisabled}
              label={t('common.advancedSearch') || 'Advanced Search'}
              title={null}
              onClick={handleAdvancedSearchClick}
            >
              <ExternalLink size={12} />
            </IconButton>
          </Tooltip>
        }
      />

      {/* Suggestion Results Overlay */}
      {isOverlayOpen && filteredResults.length > 0 && (
        <div className={styles.overlay}>
          <div className={styles['results-list']}>
            {selectedType === 'all' && groupedSections ? (
              groupedSections.map((group, groupIdx) => (
                <div key={group.type} className={styles.group}>
                  {groupIdx > 0 && <Divider className={styles['group-divider']} />}
                  <SectionHeader title={group.title} className={styles['group-header']} />
                  {group.items.map((item, idx) => (
                    <CompactCard
                      key={`${item.id}-${item.media_type}-${idx}`}
                      className={styles.card}
                      size="sm"
                      aspect={item.media_type === 'scene' ? 'landscape' : (item.media_type === 'person' ? 'circle' : 'poster')}
                      imageUrl={resolveCardImageUrl(item)}
                      fallbackIcon={group.icon}
                      title={item.title}
                      meta={item.year ? formatYear(item.year) : null}
                      description={item.overview ? truncateText(item.overview, 60) : null}
                      rightElement={<ArrowUpRight className={styles['arrow-icon']} size={14} />}
                      onClick={() => handleResultClick(item)}
                    />
                  ))}
                </div>
              ))
            ) : (
              filteredResults.map((item, idx) => (
                <CompactCard
                  key={`${item.id}-${item.media_type}-${idx}`}
                  className={styles.card}
                  size="sm"
                  aspect={item.media_type === 'scene' ? 'landscape' : (item.media_type === 'person' ? 'circle' : 'poster')}
                  imageUrl={resolveCardImageUrl(item)}
                  fallbackIcon={ActiveTypeIcon}
                  title={item.title}
                  meta={item.year ? formatYear(item.year) : null}
                  description={item.overview ? truncateText(item.overview, 60) : null}
                  rightElement={<ArrowUpRight className={styles['arrow-icon']} size={14} />}
                  onClick={() => handleResultClick(item)}
                />
              ))
            )}

            {query.trim() && (
              <>
                <Divider className={styles['group-divider']} />
                <button
                  type="button"
                  className={styles['see-all-btn']}
                  onClick={handleSeeAllClick}
                >
                  <span>{t('search.seeAllResults', { query: query.trim(), defaultValue: `See all results for "${query.trim()}"` })}</span>
                  <ArrowUpRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
