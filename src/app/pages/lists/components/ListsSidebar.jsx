import { Plus, Download, Edit2, Trash2, Search } from '@/ui/icons';
import Tooltip from '@/ui/Tooltip';
import Skeleton from '@/ui/Skeleton';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Input from '@/ui/Input';
import IconButton from '@/ui/IconButton';
import ListCollageIcon from './ListCollageIcon';
import styles from './ListsSidebar.module.css';
import { useListsSidebar } from '../hooks/useListsSidebar';

export default function ListsSidebar({
  t,
  isLoading,
  lists,
  activeListId,
  setActiveListId,
  handleTriggerImport,
  handleStartCreate,
  handleStartEdit,
  handleDelete,
}) {
  const { sidebarSearch, setSidebarSearch, filteredLists } = useListsSidebar({ lists });

  return (
    <aside className={styles['lists-sidebar']}>
      <Inline justify="between" align="center" wrap={false} fullWidth>
        <Text variant="display" weight="bold" color="ink">
          {t('lists.sidebar_title') || 'My Lists'}
        </Text>
        <Inline gap="sm" align="center" wrap={false}>
          <Tooltip content={t('lists.import_title') || 'Import List'} side="top">
            <IconButton
              size="sm"
              variant="secondary-neutral"
              onClick={handleTriggerImport}
              label={t('lists.import_title') || 'Import List'}
              title={null}
            >
              <Download size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip content={t('lists.create_title') || 'Create New List'} side="top">
            <IconButton
              size="sm"
              variant="secondary"
              onClick={handleStartCreate}
              label={t('lists.create_title') || 'Create New List'}
              title={null}
            >
              <Plus size={16} />
            </IconButton>
          </Tooltip>
        </Inline>
      </Inline>

      <Input
        type="search"
        size="xs"
        placeholder={t('common.searchPlaceholder') || 'Filter lists...'}
        value={sidebarSearch}
        onChange={(e) => setSidebarSearch(e.target.value)}
        leftElement={<Search size={14} />}
      />

      <div className={`${styles['lists-sidebar__content']} no-scrollbar`}>
        {isLoading ? (
          <Stack gap="md" fullWidth>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className={styles['lists-sidebar__item']}>
                <Inline gap="lg" align="center" wrap={false} className={styles['lists-sidebar__item-left']}>
                  <Skeleton width="4.375rem" height="4.375rem" radius="var(--radius-md)" />
                  <Stack gap="xs" flex={1} className={styles['lists-sidebar__item-info']}>
                    <Skeleton width="60%" height="0.875rem" />
                    <Skeleton width="85%" height="0.75rem" />
                    <Skeleton width="35%" height="0.65rem" />
                  </Stack>
                </Inline>
              </div>
            ))}
          </Stack>
        ) : filteredLists.length === 0 ? (
          <Inline justify="center" align="center" padding="xl" fullWidth>
            <Text color="secondary" size="xs">
              {t('common.noResults') || 'No lists found'}
            </Text>
          </Inline>
        ) : (
          <Stack gap="md" fullWidth>
            {filteredLists.map((list) => {
              const isActive = activeListId === list.id;

              return (
                <div
                  key={list.id}
                  className={`${styles['lists-sidebar__item']} ${isActive ? styles['is-active'] : ''}`}
                  onClick={() => setActiveListId(list.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveListId(list.id)}
                  // eslint-disable-next-line react/forbid-dom-props
                  style={{ '--list-theme-color': list.color || 'var(--color-accent-blue)' }}
                >
                  <Inline gap="lg" align="center" wrap={false} className={styles['lists-sidebar__item-left']}>
                    <div className={styles['lists-sidebar__item-icon-wrap']}>
                      <ListCollageIcon
                        samplePosters={list.sample_posters}
                        listType={list.list_type}
                        color={list.color}
                        customImagePath={list.custom_image_path}
                      />
                    </div>
                    <Stack gap="2xs" flex={1} justify="center" className={styles['lists-sidebar__item-info']}>
                      <Text truncate weight="bold" size="xs">
                        {list.system_key ? t(`dynamic.defaultLists.${list.system_key}.name`) : list.name}
                      </Text>
                      <Text truncate size="2xs" color="muted">
                        {list.system_key ? t(`dynamic.defaultLists.${list.system_key}.description`) : (list.description || t('lists.no_description') || 'No description')}
                      </Text>
                      <span className={styles['lists-sidebar__item-meta']}>
                        {list.item_count} {t('lists.items_suffix') || 'ITEMS'}
                      </span>
                    </Stack>
                  </Inline>

                  <Inline gap="md" align="center" wrap={false} className={styles['lists-sidebar__item-right']}>
                    {!list.is_watchlist && (
                      <div className={styles['lists-sidebar__item-actions']}>
                        <Tooltip content={t('common.edit') || 'Edit'} side="top">
                          <IconButton
                            size="xs"
                            variant="ghost"
                            onClick={(e) => handleStartEdit(list, e)}
                            label={t('common.edit') || 'Edit'}
                            title={null}
                          >
                            <Edit2 size={12} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content={t('common.delete') || 'Delete'} side="top">
                          <IconButton
                            size="xs"
                            variant="ghost"
                            destructiveHover
                            onClick={(e) => handleDelete(list.id, e)}
                            label={t('common.delete') || 'Delete'}
                            title={null}
                          >
                            <Trash2 size={12} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </Inline>
                </div>
              );
            })}
          </Stack>
        )}
      </div>
    </aside>
  );
}
