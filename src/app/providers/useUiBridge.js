import { useMemo } from 'react';
import { useToastStore, toast as storeToast } from '@/stores/useToastStore';
import {
  openModal as storeOpenModal,
  closeModal as storeCloseModal,
  updateModal as storeUpdateModal,
  closeAllModals as storeCloseAllModals,
  confirmDialog as storeConfirmDialog,
} from '@/stores/useModalStore';

export const defaultUiBridge = {
  toast: storeToast,
  removeToast: (id) => useToastStore.getState().removeToast(id),
  openModal: storeOpenModal,
  updateModal: storeUpdateModal,
  closeModal: storeCloseModal,
  closeAllModals: storeCloseAllModals,
  confirmDialog: storeConfirmDialog,
};

/**
 * Hook to create a stable bridge interface uniting modal and toast global store actions.
 *
 * @returns {typeof defaultUiBridge}
 */
export function useUiBridge() {
  return useMemo(
    () => ({
      toast: (title, tone = 'default', options = {}) => storeToast(title, tone, options),
      removeToast: (id) => useToastStore.getState().removeToast(id),
      openModal: (modalConfig) => storeOpenModal(modalConfig),
      updateModal: (updates, id) => storeUpdateModal(updates, id),
      closeModal: (id) => storeCloseModal(id),
      closeAllModals: () => storeCloseAllModals(),
      confirmDialog: (options) => storeConfirmDialog(options),
    }),
    []
  );
}

export default useUiBridge;
