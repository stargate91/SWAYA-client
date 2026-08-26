import { useState, useCallback } from 'react';

/**
 * State and action coordination hook for ClosePromptModalContent.
 *
 * @param {Object} params
 * @param {Function} params.onAction - Close action callback (action, remember)
 */
export function useClosePromptModalState({ onAction } = {}) {
  const [remember, setRemember] = useState(false);

  const handleCancel = useCallback(() => {
    onAction?.('cancel', remember);
  }, [onAction, remember]);

  const handleMinimizeToTray = useCallback(() => {
    onAction?.('minimize-to-tray', remember);
  }, [onAction, remember]);

  const handleQuit = useCallback(() => {
    onAction?.('quit', remember);
  }, [onAction, remember]);

  return {
    remember,
    setRemember,
    handleCancel,
    handleMinimizeToTray,
    handleQuit,
  };
}

export default useClosePromptModalState;
