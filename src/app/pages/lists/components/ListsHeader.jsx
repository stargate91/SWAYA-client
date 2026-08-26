import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Dropdown from '@/ui/Dropdown';
import { Plus, Download, Search, PenLine } from '@/ui/icons';
import ListCollageIcon from './ListCollageIcon';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import { useListHeaderSticky } from '../hooks/useListHeaderSticky';
import styles from './ListsHeader.module.css';

export default function ListsHeader({
  activeList,
  createdLabel,
  t,
  handleExportList,
  handleStartAddItems,
  onImageClick,
  filters: propFilters,
  ...props
}) {
  const filters = propFilters || props;
  const {
    isPersonList = activeList?.list_type === 'person',
    mediaTypeOptions,
    listSearchQuery,
    setListSearchQuery,
    watchedFilter,
    setWatchedFilter,
    libraryFilter,
    setLibraryFilter,
    mediaTypeFilter,
    setMediaTypeFilter,
    genreFilter,
    setGenreFilter,
    genderFilter,
    setGenderFilter,
    jobFilter,
    setJobFilter,
    sortKey,
    setSortKey,
    sortOptions,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    availableGenres = [],
  } = filters;

  const {
    isStuck,
    heroRef,
    themeRef,
    buttonThemeRef,
    handleImageKeyDown,
  } = useListHeaderSticky({ activeList, onImageClick });

  const onToggleSortDirection = toggleSortDirection || (() => setSortDirection?.((prev) => (prev === 'asc' ? 'desc' : 'asc')));

  return (
    <div ref={themeRef} className={styles.contents}>
      <div ref={heroRef} className={styles['lists-header-hero']}>
        <Inline justify="between" align="start" fullWidth>
          <Inline align="center" gap="lg" flex={1} className="u-min-w-0">
            <div
              className={styles['lists-header__cover-wrapper']}
              onClick={onImageClick}
              role="button"
              tabIndex={0}
              onKeyDown={handleImageKeyDown}
            >
              <ListCollageIcon
                samplePosters={activeList.sample_posters}
                listType={activeList.list_type}
                color={activeList.color}
                customImagePath={activeList.custom_image_path}
                iconSize={48}
              />
              <div className={styles['lists-header__cover-overlay']}>
                <PenLine size={20} />
              </div>
            </div>
            <Stack gap="sm">
              <Inline gap="md" align="center">
                <Text as="h1" variant="hero" weight="extrabold" color="ink" truncate>
                  {activeList.system_key ? t(`dynamic.defaultLists.${activeList.system_key}.name`) : activeList.name}
                </Text>
              </Inline>
              {(activeList.system_key || activeList.description) && (
                <Text as="p" variant="small" color="secondary">
                  {activeList.system_key ? t(`dynamic.defaultLists.${activeList.system_key}.description`) : activeList.description}
                </Text>
              )}
              {activeList.created_at && (
                <Text variant="caption" color="muted">
                  {createdLabel}
                </Text>
              )}
            </Stack>
          </Inline>
          <Inline gap="md" align="center">
            <Button
              variant="secondary-neutral"
              size="sm"
              onClick={() => handleExportList(activeList.id)}
            >
              <Download size={14} />
              <span>{t('lists.export') || 'Export'}</span>
            </Button>
            <span ref={buttonThemeRef}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleStartAddItems}
              >
                <Plus size={14} />
                <span>{activeList.list_type === 'person' ? (t('lists.add_people') || 'Add People') : (t('lists.add_titles') || 'Add Titles')}</span>
              </Button>
            </span>
          </Inline>
        </Inline>
      </div>

      <div className={`${styles['lists-header-filters']} ${isStuck ? styles['is-stuck'] : ''}`}>
        <Dropdown
          className={styles['filter-dropdown']}
          label={t('lists.sort_label') || 'Sort:'}
          labelPlacement="inside"
          value={sortKey}
          options={sortOptions}
          onChange={(e) => setSortKey?.(e.target.value)}
          variant="sorter"
          width="auto"
          sortDirection={sortDirection}
          onSortDirectionToggle={onToggleSortDirection}
          themeColor={activeList.color || 'var(--color-accent-blue)'}
        />
        {activeList.list_type !== 'person' && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('lists.filter_library_label') || 'Library:'}
            labelPlacement="inside"
            value={libraryFilter}
            onChange={(e) => setLibraryFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={[
              { value: 'all', label: t('lists.filter_library_all') || 'All' },
              { value: 'have', label: t('lists.filter_library_have') || 'Have' },
              { value: 'not_have', label: t('lists.filter_library_not_have') || 'Not Have' },
            ]}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        {mediaTypeOptions && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('lists.filter_media_type_label') || 'Type:'}
            labelPlacement="inside"
            value={mediaTypeFilter}
            onChange={(e) => setMediaTypeFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={mediaTypeOptions}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        {!isPersonList && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('library.filter.statusLabel') || 'Status:'}
            labelPlacement="inside"
            value={watchedFilter}
            onChange={(e) => setWatchedFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={[
              { value: 'all', label: t('library.filter.all') || 'All' },
              { value: 'watched', label: t('library.filter.watched') || 'Watched' },
              { value: 'unwatched', label: t('library.filter.unwatched') || 'Unwatched' },
            ]}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        {!isPersonList && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('library.filter.genreLabel') || 'Genre:'}
            labelPlacement="inside"
            value={genreFilter}
            onChange={(e) => setGenreFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={availableGenres.map((genre) => ({
              value: genre,
              label: genre === 'all' ? (t('library.filter.all') || 'All') : genre,
            }))}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        {isPersonList && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('library.filter.genderLabel') || 'Gender:'}
            labelPlacement="inside"
            value={genderFilter}
            onChange={(e) => setGenderFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={[
              { value: 'all', label: t('library.filter.all') || 'All' },
              { value: 'female', label: t('library.filter.female') || 'Female' },
              { value: 'male', label: t('library.filter.male') || 'Male' },
            ]}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        {isPersonList && (
          <Dropdown
            className={styles['filter-dropdown']}
            label={t('lists.filter_role_label') || 'Role:'}
            labelPlacement="inside"
            value={jobFilter}
            onChange={(e) => setJobFilter?.(e.target.value)}
            variant="sorter"
            width="auto"
            options={[
              { value: 'all', label: t('lists.filter_job_all') || 'All' },
              { value: 'actor', label: t('lists.filter_job_actor') || 'Actor' },
              { value: 'director', label: t('lists.filter_job_director') || 'Director' },
              { value: 'writer', label: t('lists.filter_job_writer') || 'Writer' },
              { value: 'sound', label: t('dynamic.roles.sound') || 'Composer' },
            ]}
            themeColor={activeList.color || 'var(--color-accent-blue)'}
          />
        )}
        <div className={styles['search-wrapper']}>
          <Input
            type="search"
            size="xs"
            width="100%"
            placeholder={t('common.searchPlaceholder') || 'Search in this list...'}
            value={listSearchQuery}
            onChange={(e) => setListSearchQuery?.(e.target.value)}
            leftElement={<Search size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
