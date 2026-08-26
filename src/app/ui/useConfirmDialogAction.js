import { useState } from 'react';
import { useTranslation } from '@/providers/LanguageContext';

/**
 * Hook to manage asynchronous confirmation dialog execution and state.
 *
 * @param {object} params
 * @param {object} params.modal - Modal descriptor object
 * @param {() => void} params.onClose - Modal close handler
 * @returns {{
 *   loading: boolean,
 *   handleConfirm: () => Promise<void>,
 *   handleCancel: () => void,
 *   confirmVariant: 'danger' | 'primary',
 *   cancelLabel: string,
 *   confirmLabel: string
 * }}
 */
export function useConfirmDialogAction({ modal, onClose }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      if (modal.onConfirmAction) {
        await modal.onConfirmAction();
      }
    } catch (err) {
      console.error('Confirm dialog action failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (modal.onCancelAction) {
      modal.onCancelAction();
    } else {
      onClose();
    }
  };

  const confirmVariant = modal.variant === 'danger' ? 'danger' : 'primary';
  const cancelLabel = modal.cancelText || t('common.cancel');
  const confirmLabel = modal.confirmText || t('common.confirm');

  return {
    loading,
    handleConfirm,
    handleCancel,
    confirmVariant,
    cancelLabel,
    confirmLabel,
  };
}

export default useConfirmDialogAction;
