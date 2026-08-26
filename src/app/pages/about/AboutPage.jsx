import Lightbox from '@/ui/Lightbox';
import Overlay from '@/ui/Overlay';
import AboutSidebar from './components/AboutSidebar';
import GeneralPanel from './components/GeneralPanel';
import NoticesPanel from './components/NoticesPanel';
import ThirdPartyPanel from './components/ThirdPartyPanel';
import DocsWizardPanel from '@/components/wizard/DocsWizardPanel';
import ChangelogPanel from './components/ChangelogPanel';
import { useAboutPage } from './hooks/useAboutPage';

export default function AboutPage() {
  const {
    t,
    activeTab,
    isDocsExpanded,
    setIsDocsExpanded,
    handleSetActiveTab,
    wizardStep,
    setWizardStep,
    settings,
    updateSettingsMutation,
    activeLightboxUrl,
    setActiveLightboxUrl,
    changelogContent,
    isLoadingChangelog,
    changelogError,
    handleClose,
    tabs,
    appInfo,
  } = useAboutPage();

  return (
    <Overlay width="compact" onClose={handleClose}>
      <AboutSidebar
        activeTab={activeTab}
        isDocsExpanded={isDocsExpanded}
        setIsDocsExpanded={setIsDocsExpanded}
        handleSetActiveTab={handleSetActiveTab}
        tabs={tabs}
        t={t}
      />

      <Overlay.ContentWrapper>
        <Overlay.Content>
          <div className="settings-tab-content">
            {activeTab === 'info' && (
              <GeneralPanel t={t} appInfo={appInfo} />
            )}

            {activeTab === 'changelog' && (
              <ChangelogPanel
                t={t}
                isLoadingChangelog={isLoadingChangelog}
                changelogError={changelogError}
                changelogContent={changelogContent}
              />
            )}

            {activeTab.startsWith('docs_') && (
              <DocsWizardPanel
                activeTab={activeTab}
                wizardStep={wizardStep}
                setWizardStep={setWizardStep}
                settings={settings}
                updateSettingsMutation={updateSettingsMutation}
                setActiveLightboxUrl={setActiveLightboxUrl}
                t={t}
              />
            )}

            {(activeTab === 'privacy' || activeTab === 'license') && (
              <NoticesPanel t={t} activeTab={activeTab} />
            )}

            {activeTab === 'third_party' && (
              <ThirdPartyPanel t={t} />
            )}
          </div>
        </Overlay.Content>
      </Overlay.ContentWrapper>
      <Lightbox imageUrl={activeLightboxUrl} onClose={() => setActiveLightboxUrl(null)} t={t} />
    </Overlay>
  );
}
