import NavMenu from '@/ui/NavMenu';
import Stack from '@/ui/Stack';
import Text from '@/ui/Text';
import Input from '@/ui/Input';
import IconButton from '@/ui/IconButton';
import { Search, X } from '@/ui/icons';
import { useSettingsSidebar } from '../hooks';

export default function SettingsSidebar({
  t,
  visibleOrganizationTabs,
  visibleAdultTabs,
  activeTab,
  onTabSelect,
  includeAdult = false,
}) {
  const { searchQuery, setSearchQuery, sidebarGroups } = useSettingsSidebar({
    t,
    visibleOrganizationTabs,
    visibleAdultTabs,
    activeTab,
    onTabSelect,
    includeAdult,
  });

  const sidebarHeader = (
    <Stack gap="sm">
      <Text as="h1" variant="small" weight="bold" uppercase color="primary">
        {t('sidebar.settings')}
      </Text>
      <Input
        size="sm"
        placeholder={t('settingsPage.sidebar.searchPlaceholder') || 'Search settings...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftElement={<Search size={14} />}
        rightElement={
          searchQuery ? (
            <IconButton
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => setSearchQuery('')}
              label={t('common.clear') || 'Clear'}
              title={null}
            >
              <X size={12} />
            </IconButton>
          ) : null
        }
      />
    </Stack>
  );

  return (
    <NavMenu
      header={sidebarHeader}
      groups={sidebarGroups}
      onTabSelect={onTabSelect}
    />
  );
}
