import { useEffect, useCallback, useRef, createElement } from 'react';
import { AlertTriangle } from '@/ui/icons';
import { useSettingsQuery, useUpdateSettingsMutation } from '@/queries';
import { useTranslation } from '@/providers/LanguageContext';
import { useUi } from '@/providers/UiProvider';
import { sendIpc, onIpc } from '@/lib/ipc';
import ClosePromptModalContent from './ClosePromptModalContent';

const sendCloseResponse = (payload) => {
  sendIpc('app-close-response', payload);
};

export function useAppClosePrompt() {
  const settingsQuery = useSettingsQuery();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const closeBehavior = settingsQuery.data?.close_button_behavior || 'ask';
  const { t } = useTranslation();
  const { openModal, closeModal } = useUi();
  const isRespondedRef = useRef(false);

  const handleAction = useCallback(async (action, remember = false) => {
    isRespondedRef.current = true;
    closeModal();

    if (remember && (action === 'minimize-to-tray' || action === 'quit')) {
      const targetBehavior = action === 'minimize-to-tray' ? 'tray' : 'quit';
      try {
        await updateSettingsMutation.mutateAsync({
          close_button_behavior: targetBehavior,
        });
      } catch (err) {
        console.error('Failed to save close behavior:', err);
      }
    }

    sendCloseResponse({ action, rememberChoice: remember, source: 'quit-button' });
  }, [closeModal, updateSettingsMutation]);

  useEffect(() => {
    const handleCloseRequested = (_event, payload = {}) => {
      const source = payload?.source || 'quit-button';

      if (closeBehavior === 'tray') {
        sendCloseResponse({ action: 'minimize-to-tray', rememberChoice: true, source });
        return;
      }

      if (closeBehavior === 'quit') {
        sendCloseResponse({ action: 'quit', rememberChoice: true, source });
        return;
      }

      isRespondedRef.current = false;
      openModal({
        title: t('closePrompt.title'),
        description: t('closePrompt.description'),
        variant: 'danger',
        icon: AlertTriangle,
        footer: null,
        onClose: () => {
          if (!isRespondedRef.current) {
            handleAction('cancel', false);
          }
        },
        content: createElement(ClosePromptModalContent, { onAction: handleAction, t }),
      });
    };

    const unsubscribe = onIpc('app-close-requested', handleCloseRequested);
    return () => {
      unsubscribe();
    };
  }, [closeBehavior, handleAction, openModal, t]);
}

export default useAppClosePrompt;
