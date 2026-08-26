import { useState, useCallback } from 'react';

/**
 * State management hook for DocsModalOverlay wizard step and lightbox preview.
 */
export function useDocsModalState(initialStep = 0) {
  const [wizardStep, setWizardStep] = useState(initialStep);
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const closeLightbox = useCallback(() => {
    setLightboxUrl(null);
  }, []);

  return {
    wizardStep,
    setWizardStep,
    lightboxUrl,
    setLightboxUrl,
    closeLightbox,
  };
}

export default useDocsModalState;
