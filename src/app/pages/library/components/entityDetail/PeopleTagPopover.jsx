import PropTypes from 'prop-types';
import { Plus, Tag, Search, X } from '@/ui/icons';
import Chip from '@/ui/Chip';
import ColorSwatch from '@/ui/ColorSwatch';
import Inline from '@/ui/Inline';
import Popover from '@/ui/Popover';
import Autocomplete from '@/ui/Autocomplete';
import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Tooltip from '@/ui/Tooltip';
import { usePeopleTagPopoverState } from '../../hooks/usePeopleTagPopoverState';
import styles from './PeopleTagPopover.module.css';

export default function PeopleTagPopover({ item, t, updatePersonStatusMutation }) {
  const {
    currentTags,
    assignedChips,
    hasSuggestedTags,
    suggestedChips,
    allSuggestedAssigned,
    filteredTags,
    searchQuery,
    setSearchQuery,
    isBusy,
    trimmedSearch,
    showCreateOption,
    onCreateTag,
    onSelectTag,
    onClearSearch,
    handleKeyDown,
  } = usePeopleTagPopoverState({
    item,
    updatePersonStatusMutation,
    t,
  });

  return (
    <Popover
      align="right"
      width="min(24rem, calc(100vw - 2.5rem))"
      ignoreSelectors={['.tagger-autocomplete-dropdown']}
      trigger={
        <button
          type="button"
          className="media-detail-page__side-nav-toggle"
        >
          <Tooltip content={t('library.details.tagger') || 'Tagger'}>
            <Tag size={18} />
          </Tooltip>
        </button>
      }
    >
      <Card
        variant="glass-shaded"
        title={t('library.details.tagger') || 'Tagger'}
        headerVariant="shaded"
        padding="md"
        fullWidth
      >
        <Stack gap="md">
          {/* Currently Assigned Tags */}
          <Stack gap="xs">
            <Text variant="caption" weight="bold" color="muted" uppercase>
              {t('library.tags.assignedTitle') || 'Assigned'}
            </Text>
            <Inline gap="sm" align="center" className={`${styles['tags-scroll']} custom-scrollbar`}>
              {assignedChips.map(({ name, color, onRemove }) => (
                <Chip
                  key={name}
                  color={color}
                  size="sm"
                  onRemove={onRemove}
                  disabled={isBusy}
                  title={t('common.remove') || 'Remove'}
                >
                  {name}
                </Chip>
              ))}
              {currentTags.length === 0 && (
                <Text variant="small" color="muted" italic>
                  {t('library.tags.noTagsAssigned') || 'No tags assigned.'}
                </Text>
              )}
            </Inline>
          </Stack>

          {/* Suggested Tags */}
          {hasSuggestedTags && (
            <Stack gap="xs">
              <Text variant="caption" weight="bold" color="muted" uppercase>
                {t('library.details.suggestedTags') || 'Suggested Tags'}
              </Text>
              <Inline gap="sm" align="center" className={`${styles['tags-scroll']} custom-scrollbar`}>
                {suggestedChips.map(({ name, onAdd }) => (
                  <Chip
                    key={name}
                    variant="dashed"
                    size="sm"
                    leftElement={<Plus size={10} />}
                    onClick={onAdd}
                    disabled={isBusy}
                  >
                    {name}
                  </Chip>
                ))}
                {allSuggestedAssigned && (
                  <Text variant="small" color="muted" italic>
                    {t('library.tags.allTagsAssigned') || 'All suggested tags assigned.'}
                  </Text>
                )}
              </Inline>
            </Stack>
          )}

          {/* Add Tag Autocomplete */}
          <Autocomplete
            size="sm"
            dropdownClassName="tagger-autocomplete-dropdown"
            leftElement={<Search size={13} />}
            rightElement={searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                className="bespoke-tagger-clear-btn"
              >
                <X size={12} />
              </button>
            )}
            placeholder={t('library.tags.searchOrAdd') || 'Search or add tag...'}
            value={searchQuery}
            onChange={setSearchQuery}
            options={filteredTags}
            onSelect={onSelectTag}
            onKeyDown={handleKeyDown}
            renderItem={(tag) => (
              <Inline gap="sm" align="center">
                <ColorSwatch color={tag.color} size="dot" />
                <span>{tag.name}</span>
              </Inline>
            )}
            renderFooter={(closeDropdown, itemClass, createClass) => {
              if (!showCreateOption) return null;
              return (
                <button
                  type="button"
                  onClick={() => onCreateTag(closeDropdown)}
                  className={`${itemClass} ${createClass}`}
                >
                  <Plus size={12} />
                  <span>{t('library.details.createTag', { name: trimmedSearch })}</span>
                </button>
              );
            }}
          />
        </Stack>
      </Card>
    </Popover>
  );
}

PeopleTagPopover.propTypes = {
  item: PropTypes.object,
  t: PropTypes.func.isRequired,
  updatePersonStatusMutation: PropTypes.object,
};
