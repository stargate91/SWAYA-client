import PropTypes from 'prop-types';
import { Plus, X, Search } from '@/ui/icons';
import Chip from '@/ui/Chip';
import ColorSwatch from '@/ui/ColorSwatch';
import Inline from '@/ui/Inline';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Autocomplete from '@/ui/Autocomplete';
import ScrollRow from '@/ui/ScrollRow';
import { useBespokeTagManager } from '@/pages/library/hooks/useBespokeTagManager';

export default function BespokeTagManager({
  customTags = [],
  suggestedTags = [],
  isAdult = false,
  onUpdateTags,
  t,
}) {
  const {
    searchQuery,
    setSearchQuery,
    unassignedSuggestions,
    filteredTags,
    handleToggleTag,
    handleAddTag,
    handleKeyDown,
    getTagColor,
    trimmedQuery,
    canCreateTag,
  } = useBespokeTagManager({
    customTags,
    suggestedTags,
    isAdult,
    onUpdateTags,
  });

  return (
    <Stack gap="md">
      {/* Active Tags */}
      <Stack gap="sm">
        <Text variant="caption" weight="bold" color="muted" uppercase>
          {t('library.details.activeTags') || 'Active Tags'}
        </Text>
        {customTags.length > 0 ? (
          <ScrollRow size="sm">
            {customTags.map((tagName) => (
              <Chip
                key={tagName}
                color={getTagColor(tagName)}
                size="sm"
                onRemove={() => handleToggleTag(tagName)}
                title={`Remove tag: ${tagName}`}
              >
                {tagName}
              </Chip>
            ))}
          </ScrollRow>
        ) : (
          <Text variant="small" color="muted" italic>
            {t('library.details.noTagsAssigned') || 'No tags assigned.'}
          </Text>
        )}
      </Stack>

      {/* Add Tag Autocomplete Input */}
      <Autocomplete
        size="sm"
        leftElement={<Search size={13} />}
        rightElement={searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="bespoke-tagger-clear-btn"
          >
            <X size={12} />
          </button>
        )}
        placeholder={t('library.tags.searchOrAdd') || 'Search or add tag...'}
        value={searchQuery}
        onChange={setSearchQuery}
        options={filteredTags}
        onSelect={(tag) => handleAddTag(tag.name)}
        onKeyDown={handleKeyDown}
        renderItem={(tag) => (
          <Inline gap="sm" align="center">
            <ColorSwatch color={tag.color} size="dot" />
            <span>{tag.name}</span>
          </Inline>
        )}
        renderFooter={(closeDropdown, itemClass, createClass) => {
          if (!canCreateTag) return null;
          return (
            <button
              type="button"
              onClick={() => {
                handleAddTag(trimmedQuery);
                closeDropdown();
              }}
              className={`${itemClass} ${createClass}`}
            >
              <Plus size={12} />
              <span>{t('library.details.createTag', { name: trimmedQuery })}</span>
            </button>
          );
        }}
      />

      {/* Suggested Tags / Keywords */}
      {unassignedSuggestions.length > 0 && (
        <Stack gap="sm">
          <Text variant="caption" weight="bold" color="muted" uppercase>
            {t('library.details.suggestedTags') || 'Suggested Tags'}
          </Text>
          <ScrollRow size="sm">
            {unassignedSuggestions.map((tag) => (
              <Chip
                key={tag}
                variant="dashed"
                size="sm"
                leftElement={<Plus size={10} />}
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </Chip>
            ))}
          </ScrollRow>
        </Stack>
      )}
    </Stack>
  );
}

BespokeTagManager.propTypes = {
  customTags: PropTypes.arrayOf(PropTypes.string),
  suggestedTags: PropTypes.arrayOf(PropTypes.string),
  isAdult: PropTypes.bool,
  onUpdateTags: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
