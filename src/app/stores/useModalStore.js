import { create } from 'zustand';

export const useModalStore = create((set, get) => ({
  modals: [],

  openModal: (modalConfig) => {
    const id = modalConfig.id || `modal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newModal = {
      ...modalConfig,
      id,
    };

    set((state) => ({
      modals: [...state.modals.filter((m) => m.id !== id), newModal],
    }));

    return id;
  },

  updateModal: (updates, modalId) => {
    set((state) => {
      if (state.modals.length === 0) return state;
      const targetId = modalId || state.modals[state.modals.length - 1].id;
      return {
        modals: state.modals.map((m) =>
          m.id === targetId ? { ...m, ...(typeof updates === 'function' ? updates(m) : updates) } : m
        ),
      };
    });
  },

  closeModal: (modalId) => {
    const { modals } = get();
    if (modals.length === 0) return;
    const cleanId = typeof modalId === 'string' ? modalId : undefined;
    const targetModal = cleanId
      ? modals.find((m) => m.id === cleanId)
      : modals[modals.length - 1];

    if (!targetModal) return;

    // Immediately remove from active modals BEFORE running callbacks to prevent infinite recursion
    set((state) => ({
      modals: cleanId
        ? state.modals.filter((m) => m.id !== cleanId)
        : state.modals.slice(0, -1),
    }));

    if (targetModal.onClose) {
      try {
        targetModal.onClose();
      } catch (err) {
        console.error('Error during modal onClose:', err);
      }
    }
  },

  closeAllModals: () => {
    const { modals } = get();
    set({ modals: [] });
    modals.forEach((m) => {
      if (m.onClose) {
        try {
          m.onClose();
        } catch (err) {
          console.error('Error during modal onClose:', err);
        }
      }
    });
  },

  confirmDialog: ({
    title,
    description,
    content,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    width = 'md',
    icon,
    onConfirm,
    onCancel,
    closeOnBackdropClick = true,
  }) => {
    const modalId = `confirm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    const handleConfirm = async () => {
      if (onConfirm) {
        const result = await onConfirm();
        if (result === false) return;
      }
      get().closeModal(modalId);
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
    };

    get().openModal({
      id: modalId,
      title,
      description,
      content,
      variant,
      width,
      icon,
      closeOnBackdropClick,
      onClose: handleCancel,
      isConfirmDialog: true,
      confirmText,
      cancelText,
      onConfirmAction: handleConfirm,
      onCancelAction: () => get().closeModal(modalId),
    });

    return modalId;
  },
}));

export const openModal = (config) => useModalStore.getState().openModal(config);
export const closeModal = (id) => useModalStore.getState().closeModal(id);
export const updateModal = (updates, id) => useModalStore.getState().updateModal(updates, id);
export const closeAllModals = () => useModalStore.getState().closeAllModals();
export const confirmDialog = (options) => useModalStore.getState().confirmDialog(options);
