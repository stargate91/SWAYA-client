import { useNavigate } from 'react-router-dom';
import EmptyState from '@/ui/EmptyState';
import Button from '@/ui/Button';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Text from '@/ui/Text';
import Card from '@/ui/Card';
import Grid from '@/ui/Grid';
import { navigateToLibraryItem } from '@/lib/routes';
import { LibraryPosterCard } from './LibraryPosterCard';
import { useTagPanelItems } from '../hooks/useTagPanelItems';

export default function ExpandedTagPanel({
  tag,
  t,
  emptyIcon,
  isFocusMode = false,
  activeSessionMode,
}) {
  const navigate = useNavigate();
  const {
    paginatedItems,
    allItems,
    hasMore,
    isLoading,
    loadMore,
    handleRemoveTagItem,
  } = useTagPanelItems({ tag, activeSessionMode });

  if (isLoading) {
    return (
      <div className="library-content">
        <div className="library-loading">
          <div className="library-spinner" />
        </div>
      </div>
    );
  }

  if (allItems.length === 0) {
    return (
      <div
        /* eslint-disable-next-line react/forbid-dom-props */
        style={{ '--tag-color': tag.color || 'var(--color-accent)' }}
      >
        <Card variant={isFocusMode ? 'focus-panel' : 'transparent'}>
          {isFocusMode ? (
            <Stack gap="sm">
              <Inline gap="md" align="center">
                <Text as="h2" variant="hero" weight="bold">
                  {(t('library.tags.focusTitle') || 'Items tagged with "{name}"').replace('{name}', tag.name)}
                </Text>
              </Inline>
            </Stack>
          ) : null}
          <EmptyState
            layout="left"
            size="md"
            border="none"
            background="none"
            title={(t('library.tags.emptyFocusTitle') || 'This tag is ready to use.').replace('{name}', tag.name)}
            description={(t('library.tags.emptyFocusDescription') || 'Add this tag to movies, shows, or people and they will appear here.').replace('{name}', tag.name)}
          />
        </Card>
      </div>
    );
  }

  return (
    <div
      /* eslint-disable-next-line react/forbid-dom-props */
      style={{ '--tag-color': tag.color || 'var(--color-accent)' }}
    >
      <Card variant={isFocusMode ? 'focus-panel' : 'transparent'}>
        {isFocusMode ? (
          <Stack gap="sm">
            <Inline gap="md" align="center">
              <Text as="h2" variant="hero" weight="bold">
                {(t('library.tags.focusTitle') || 'Items tagged with "{name}"').replace('{name}', tag.name)}
              </Text>
            </Inline>
          </Stack>
        ) : null}
        <Grid variant="mixed">
          {paginatedItems.map((item, index) => (
            <LibraryPosterCard
              key={item.id ? `${item.type || item.media_type || 'item'}-${item.id}` : index}
              item={item}
              t={t}
              emptyIcon={emptyIcon}
              onRemove={(targetItem) => handleRemoveTagItem(targetItem)}
              onItemClick={() => navigateToLibraryItem(navigate, item)}
            />
          ))}
        </Grid>

        {hasMore && (
          <div className="library-grid-load-more">
            <Button variant="secondary" onClick={loadMore}>
              {t('common.showMore') || 'Show More'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
