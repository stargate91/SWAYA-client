import Card from '@/ui/Card';
import Stack from '@/ui/Stack';
import Inline from '@/ui/Inline';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Text from '@/ui/Text';
import Chip from '@/ui/Chip';
import { useSettingsField } from '../SettingsFormContext.jsx';
import { useTagSafetyFilters } from '../hooks';

export default function TagSafetyFilters({ t }) {
  const blacklistField = useSettingsField('adult_tag_blacklist');
  const {
    newBlacklistWord,
    setNewBlacklistWord,
    currentBlacklist,
    handleAddBlacklist,
    handleRemoveBlacklist,
    handleAddCustomWord,
    presetBlacklist,
  } = useTagSafetyFilters(blacklistField);

  return (
    <Card
      title={t('settingsPage.sections.adultSafety.title') || 'Adult Content Safety Filters'}
      eyebrow={t('settingsPage.sections.adultSafety.eyebrow') || 'SAFETY'}
    >
      <Stack gap="xl">
        {/* Blacklist Section */}
        <Stack gap="md">
          <Stack gap="xs">
            <Text variant="title" weight="bold">
              {t('settingsPage.sections.adultSafety.blacklistTitle') || 'Tag Blacklist'}
            </Text>
            <Text variant="small" color="muted">
              {t('settingsPage.sections.adultSafety.blacklistHint') || 'Items containing any of these tags (or title keywords) will be hidden completely.'}
            </Text>
          </Stack>

          {/* Current Active Blacklist Chips */}
          <Card variant="soft" padding="xs">
            <Inline gap="xs" wrap align="center">
              {currentBlacklist.map(tag => (
                <Chip
                  key={tag}
                  variant="removable"
                  size="sm"
                  color="var(--color-state-danger)"
                  onRemove={() => handleRemoveBlacklist(tag)}
                >
                  {tag}
                </Chip>
              ))}
              {currentBlacklist.length === 0 && (
                <Text variant="small" color="muted" italic>
                  {t('settingsPage.sections.adultSafety.emptyBlacklist') || 'No blacklisted tags.'}
                </Text>
              )}
            </Inline>
          </Card>

          {/* Custom Tag Input */}
          <Inline gap="md" align="center" fullWidth>
            <Input
              flex={1}
              placeholder={t('settingsPage.sections.adultSafety.addCustomPlaceholder') || 'Add custom tag...'}
              value={newBlacklistWord}
              onChange={(e) => setNewBlacklistWord(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomWord();
                }
              }}
            />
            <Button
              variant="secondary-neutral"
              onClick={handleAddCustomWord}
            >
              {t('common.add') || 'Add'}
            </Button>
          </Inline>

          {/* Recommended Preset Chips */}
          <Card variant="soft" padding="sm">
            <Stack gap="xs">
              <Text variant="small" color="muted" weight="medium">
                {t('settingsPage.sections.adultSafety.recommendedBlacklist') || 'Recommended blocks:'}
              </Text>
              <Inline gap="xs" wrap>
                {presetBlacklist.map(tag => {
                  const isAdded = currentBlacklist.includes(tag);
                  return (
                    <Chip
                      key={tag}
                      variant={isAdded ? 'dashed' : 'default'}
                      size="xs"
                      disabled={isAdded}
                      onClick={() => !isAdded && handleAddBlacklist(tag)}
                    >
                      {['+', tag].join(' ')}
                    </Chip>
                  );
                })}
              </Inline>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </Card>
  );
}

