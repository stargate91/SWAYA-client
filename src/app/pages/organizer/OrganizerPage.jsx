import OrganizerPageContent from './components/OrganizerPageContent';
import Button from '@/ui/Button';
import UtilityBarPortal from '@/ui/UtilityBarPortal';
import Popover from '@/ui/Popover';
import OrganizerScanSettingsPanel from './components/OrganizerScanSettingsPanel';
import { SlidersHorizontal } from '@/ui/icons';
import { OrganizerModalProvider } from './providers/OrganizerModalProvider';
import { useOrganizerPageController } from './hooks';

export default function OrganizerPage() {
  const {
    scanModeOptions,
    scanSettingsTriggerLabel,
    modalProviderProps,
    scanSettingsProps,
    pageContentProps,
  } = useOrganizerPageController();

  return (
    <OrganizerModalProvider {...modalProviderProps}>
      <UtilityBarPortal align="right" enabled={scanModeOptions.length > 1}>
        <div className="utility-bar-wrapper">
          <Popover
            align="right"
            width="22rem"
            ignoreSelectors={['.scan-settings-dropdown-menu']}
            trigger={
              <Button
                variant="secondary-neutral"
                size="sm"
                leftIcon={<SlidersHorizontal size={14} />}
              >
                {scanSettingsTriggerLabel}
              </Button>
            }
          >
            {({ close }) => (
              <OrganizerScanSettingsPanel
                {...scanSettingsProps}
                close={close}
              />
            )}
          </Popover>
        </div>
      </UtilityBarPortal>
      <OrganizerPageContent {...pageContentProps} />
    </OrganizerModalProvider>
  );
}
