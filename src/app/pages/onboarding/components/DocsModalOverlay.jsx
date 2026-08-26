import PropTypes from 'prop-types';
import Overlay from '@/ui/Overlay';
import Lightbox from '@/ui/Lightbox';
import DocsWizardPanel from '@/components/wizard/DocsWizardPanel';
import { useDocsModalState } from '../hooks/useDocsModalState';
import styles from '../OnboardingWizard.module.css';

export default function DocsModalOverlay({
  docsModal,
  onClose,
  settings,
  updateSettingsMutation,
  onApplyValues,
  t,
}) {
  const {
    wizardStep,
    setWizardStep,
    lightboxUrl,
    setLightboxUrl,
    closeLightbox,
  } = useDocsModalState();

  return (
    <Overlay centered width="wide" padding="flush" onClose={onClose}>
      <Overlay.ContentWrapper className={styles['onboarding-docs-modal']}>
        <Overlay.Content width="wide">
          <div className="settings-tab-content">
            <DocsWizardPanel
              activeTab={docsModal}
              wizardStep={wizardStep}
              setWizardStep={setWizardStep}
              settings={settings}
              updateSettingsMutation={updateSettingsMutation}
              setActiveLightboxUrl={setLightboxUrl}
              onApplyValues={onApplyValues}
              t={t}
            />
          </div>
        </Overlay.Content>
      </Overlay.ContentWrapper>
      {lightboxUrl && (
        <Lightbox imageUrl={lightboxUrl} onClose={closeLightbox} />
      )}
    </Overlay>
  );
}

DocsModalOverlay.propTypes = {
  docsModal: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.object,
  updateSettingsMutation: PropTypes.object,
  onApplyValues: PropTypes.func,
  t: PropTypes.func.isRequired,
};
