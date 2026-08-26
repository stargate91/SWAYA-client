import PropTypes from 'prop-types';
import useListManagement from '../../../hooks/useListManagement';
import { List, Plus, Loader2 } from '@/ui/icons';
import Checkbox from '@/ui/Checkbox';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Popover from '@/ui/Popover';
import Card from '@/ui/Card';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import SelectableItem from '@/ui/SelectableItem';

export default function ListsPopover({ item, type, t }) {
  const {
    loading,
    otherLists,
    actualListIds,
    handleToggleList,
    creating,
    newListName,
    setNewListName,
    onSubmitCreateList,
  } = useListManagement({ item, type, t });

  return (
    <Popover
      align="right"
      width="min(24rem, calc(100vw - 2.5rem))"
      trigger={
        <button
          type="button"
          className="media-detail-page__side-nav-toggle"
        >
          <Tooltip content={t('lists.title') || 'Lists'}>
            <List size={18} />
          </Tooltip>
        </button>
      }
    >
      <Card
        variant="glass-shaded"
        title={t('lists.title') || 'Lists'}
        headerVariant="shaded"
        padding="md"
        fullWidth
      >
        <Stack gap="md">
          {loading ? (
            <Spinner size="1.25rem" label={t('common.loading') || 'Loading...'} />
          ) : (
            <>
              {otherLists.length > 0 ? (
                <Stack
                  scrollable
                  maxHeight="10rem"
                  gap="sm"
                >
                  {otherLists.map((list) => {
                    const isAdded = actualListIds.includes(list.id);
                    return (
                      <SelectableItem
                        key={list.id}
                        selected={isAdded}
                        color={list.color}
                        onClick={() => handleToggleList(list)}
                        startSlot={<Checkbox checked={isAdded} readOnly />}
                        label={list.system_key ? t(`dynamic.defaultLists.${list.system_key}.name`) : list.name}
                      />
                    );
                  })}
                </Stack>
              ) : (
                <Stack padding="sm" align="center" fullWidth>
                  <Text
                    variant="small"
                    color="muted"
                    italic
                    align="center"
                  >
                    {t('lists.no_lists_yet') || 'No custom lists created yet.'}
                  </Text>
                </Stack>
              )}

              <form onSubmit={onSubmitCreateList}>
                <Inline align="center" gap="sm" fullWidth>
                  <Input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder={t('lists.create_quick_placeholder') || 'Quick create list...'}
                    size="sm"
                    flex={1}
                    disabled={creating}
                  />
                  <Button
                    type="submit"
                    variant="secondary-neutral"
                    size="sm"
                    disabled={creating || !newListName.trim()}
                    leftIcon={creating ? <Loader2 className="animate-spin" size={14} /> : <Plus size={14} />}
                  />
                </Inline>
              </form>
            </>
          )}
        </Stack>
      </Card>
    </Popover>
  );
}

ListsPopover.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
