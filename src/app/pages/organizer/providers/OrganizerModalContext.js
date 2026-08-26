import { createContext } from 'react';

export const OrganizerModalContext = createContext(null);
export const OrganizerModalActionsContext = createContext(null);

// Aliases representing actions & selection context
export const OrganizerContext = OrganizerModalContext;
export const OrganizerActionsContext = OrganizerModalActionsContext;
