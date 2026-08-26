/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import ToastViewport from '@/ui/ToastViewport';
import ModalViewport from '@/ui/ModalViewport';
import { useUiBridge, defaultUiBridge } from './useUiBridge';
import { toast as storeToast } from '@/stores/useToastStore';
import {
  openModal as storeOpenModal,
  closeModal as storeCloseModal,
  updateModal as storeUpdateModal,
  closeAllModals as storeCloseAllModals,
  confirmDialog as storeConfirmDialog,
} from '@/stores/useModalStore';

const UiContext = createContext(null);

export const UiProvider = ({ children }) => {
  const value = useUiBridge();

  return (
    <UiContext.Provider value={value}>
      {children}
      <ToastViewport />
      <ModalViewport />
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const value = useContext(UiContext);
  return value || defaultUiBridge;
};

export {
  storeToast as toast,
  storeOpenModal as openModal,
  storeCloseModal as closeModal,
  storeUpdateModal as updateModal,
  storeCloseAllModals as closeAllModals,
  storeConfirmDialog as confirmDialog,
};

