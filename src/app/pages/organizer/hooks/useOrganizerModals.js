import { useContext } from 'react';
import { OrganizerModalContext, OrganizerModalActionsContext } from '../providers/OrganizerModalContext';

export function useOrganizerModals() {
  const context = useContext(OrganizerModalContext);
  if (!context) {
    throw new Error('useOrganizerModals must be used within OrganizerModalProvider');
  }
  return context;
}

export function useOrganizerStableActions() {
  const context = useContext(OrganizerModalActionsContext);
  if (!context) {
    throw new Error('useOrganizerStableActions must be used within OrganizerModalProvider');
  }
  return context;
}

export const useOrganizerUI = useOrganizerModals;
export const useOrganizerModalActionsContext = useOrganizerStableActions;
